import { DiceSet } from "./Interfaces/diceSet";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SketchPicker } from "react-color";
import "./App.css";
import { Die } from "./Interfaces/die";
import { DisplayDie } from "./Die";
import { makeId } from "./createId";

export function DisplaySet({
    diceSets,
    setDiceSets,
    currentSet
}: {
    diceSets: DiceSet[];
    setDiceSets: (newDiceSets: DiceSet[]) => void;
    currentSet: DiceSet;
}): JSX.Element {
    const [edit, setEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>(currentSet.name);
    const [primColor, setPrimColor] = useState<string>(currentSet.primaryColor);
    const [secondColor, setSecondColor] = useState<string>(
        currentSet.secondaryColor
    );
    const [primChoose, setPrimChoose] = useState<boolean>(false);
    const [secondChoose, setSecondChoose] = useState<boolean>(false);
    function editName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function saveChanges() {
        const newSet = {
            ...currentSet,
            name: name,
            primaryColor: primColor,
            secondaryColor: secondColor
        };
        const newDiceSets = diceSets.map(
            (set: DiceSet): DiceSet =>
                set.id === currentSet.id ? newSet : { ...set }
        );
        setDiceSets(newDiceSets);
        setEdit(false);
    }
    function cancelChanges() {
        setName(currentSet.name);
        setPrimColor(currentSet.primaryColor);
        setSecondColor(currentSet.secondaryColor);
        setEdit(false);
    }
    function addDie() {
        const newDie = {
            id: makeId(),
            name: "D20",
            sides: 20,
            balanced: true,
            rollTotals: new Array(20).fill(0)
        };
        const newDiceSets = diceSets.map(
            (set: DiceSet): DiceSet =>
                set.id === currentSet.id
                    ? { ...set, dice: [...currentSet.dice, newDie] }
                    : { ...set }
        );
        setDiceSets(newDiceSets);
    }
    return (
        <div>
            {edit ? (
                <div>
                    <Form.Group className="dropdownWidth" controlId="setName">
                        <Form.Label>Name of Dice Set: </Form.Label>
                        <Form.Control value={name} onChange={editName} />
                        {primChoose ? (
                            <>
                                <SketchPicker
                                    color={primColor}
                                    onChange={(updatedColor) =>
                                        setPrimColor(updatedColor.hex)
                                    }
                                ></SketchPicker>
                                <Button onClick={() => setPrimChoose(false)}>
                                    Close
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setPrimChoose(true)}>
                                Choose Primary Color
                            </Button>
                        )}
                        {secondChoose ? (
                            <>
                                <SketchPicker
                                    color={secondColor}
                                    onChange={(updatedColor) =>
                                        setSecondColor(updatedColor.hex)
                                    }
                                ></SketchPicker>
                                <Button onClick={() => setSecondChoose(false)}>
                                    Close
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setSecondChoose(true)}>
                                Choose Secondary Color
                            </Button>
                        )}
                    </Form.Group>
                    <Button onClick={saveChanges}>Save Changes</Button>
                    <Button onClick={cancelChanges}>Cancel</Button>
                </div>
            ) : (
                <div>
                    <h4>
                        {currentSet.name}{" "}
                        <Button
                            className="btntransparent"
                            onClick={() => setEdit(true)}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                                height="40"
                                width="40"
                            />
                            Edit Dice Set
                        </Button>
                    </h4>
                </div>
            )}
            {currentSet.dice.map((die: Die) => (
                <DisplayDie
                    key={die.id}
                    diceSets={diceSets}
                    setDiceSets={setDiceSets}
                    currentSet={currentSet}
                    currentDie={die}
                ></DisplayDie>
            ))}
            <Button onClick={addDie}>Add Die</Button>
        </div>
    );
}
