import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { DiceSet } from "./Interfaces/diceSet";
import { makeId } from "./createId";
import { SketchPicker } from "react-color";
import { Die } from "./Interfaces/die";

export function AddSetModal({
    show,
    closeModal,
    addDiceSet
}: {
    show: boolean;
    closeModal: () => void;
    addDiceSet: (newSet: DiceSet) => void;
}): JSX.Element {
    const [name, setName] = useState<string>("");
    const [primColor, setPrimColor] = useState<string>("#fff");
    const [secondColor, setSecondColor] = useState<string>("#000");
    const [primChoose, setPrimChoose] = useState<boolean>(false);
    const [secondChoose, setSecondChoose] = useState<boolean>(false);
    const [dice, setDice] = useState<string>("Custom");
    const [diceInSet, setDiceInSet] = useState<Die[]>([]);
    function updateDice(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.value === "Standard 7-dice Set") {
            setDice("Standard 7-dice Set");
            setDiceInSet([
                {
                    id: "0",
                    name: "D20",
                    sides: 20,
                    rollTotals: [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0
                    ]
                },
                {
                    id: "1",
                    name: "D12",
                    sides: 12,
                    rollTotals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: "2",
                    name: "D10%",
                    sides: 10,
                    rollTotals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: "3",
                    name: "D10",
                    sides: 10,
                    rollTotals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: "4",
                    name: "D8",
                    sides: 8,
                    rollTotals: [0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    id: "5",
                    name: "D6",
                    sides: 6,
                    rollTotals: [0, 0, 0, 0, 0, 0]
                },
                {
                    id: "6",
                    name: "D4",
                    sides: 4,
                    rollTotals: [0, 0, 0, 0]
                }
            ]);
        } else {
            setDice("Custom");
            setDiceInSet([]);
        }
    }
    function createSet() {
        const newSet = {
            id: makeId(),
            name: name,
            dice: diceInSet,
            primaryColor: primColor,
            secondaryColor: secondColor
        };
        addDiceSet(newSet);
        setDice("Custom");
        setDiceInSet([]);
        setName("");
        setPrimChoose(false);
        setSecondChoose(false);
        setPrimColor("#fff");
        setSecondColor("#000");
        closeModal();
    }
    return (
        <Modal show={show} onHide={closeModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Set</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="dropdownWidth" controlId="planName">
                    <Form.Label>Name of Dice Set: </Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="userPlans">
                    <Form.Label>Select Dice In Set:</Form.Label>
                    <Form.Select
                        className="dropdownWidth"
                        value={dice}
                        onChange={updateDice}
                    >
                        <option value={"Standard 7-dice Set"}>
                            Standard 7-Dice Set
                        </option>
                        <option value={"Custom"}>
                            Custom {"(No Default Dice)"}
                        </option>
                    </Form.Select>
                </Form.Group>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={createSet}>
                    Create Set
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
