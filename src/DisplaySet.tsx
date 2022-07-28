import { DiceSet } from "./Interfaces/diceSet";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
    const [primColor, setPrimColor] = useState<number>(currentSet.primaryColor);
    const [secondColor, setSecondColor] = useState<number>(
        currentSet.secondaryColor
    );
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
    return (
        <div>
            <table className="Table-Header"></table>
            {edit ? (
                <div>
                    <Form.Group className="dropdownWidth" controlId="setName">
                        <Form.Label>Name of Dice Set: </Form.Label>
                        <Form.Control value={name} onChange={editName} />
                    </Form.Group>
                    <Button onClick={saveChanges}>Save Changes</Button>
                    <Button onClick={cancelChanges}>Cancel</Button>
                </div>
            ) : (
                <div>
                    <h4>
                        {semester.name}{" "}
                        <Button
                            className="btntransparent"
                            onClick={() => setEdit(true)}
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/84/84380.png"
                                height="40"
                                width="40"
                            />
                            Edit Semester Name
                        </Button>
                    </h4>
                </div>
            )}
        </div>
    );
}
