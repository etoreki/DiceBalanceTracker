import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AddSetModal } from "./AddSetModal";
import "./App.css";
import { DisplaySet } from "./DisplaySet";
import { DiceSet } from "./Interfaces/diceSet";

let data: DiceSet[] | (() => DiceSet[]) = [
    {
        id: "1",
        name: "7 die RPG set",
        dice: [
            {
                id: "0",
                name: "D20",
                sides: 20,
                rollTotals: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
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
        ],
        primaryColor: "#fff",
        secondaryColor: "#000"
    }
];
const saveDataKey = "DICE-BALANCE-TRACKER-DATA";
// Check if the user's data already exists
const previousData = localStorage.getItem(saveDataKey);
// If the data doesn't exist, `getItem` returns null
if (previousData !== null) {
    data = JSON.parse(previousData);
}

function App(): JSX.Element {
    const [diceSets, setDiceSets] = useState<DiceSet[]>(data);
    const [addModal, toggleAddModal] = useState<boolean>(false);
    saveData();
    function addDiceSet(newSet: DiceSet) {
        setDiceSets([...diceSets, newSet]);
    }
    function closeModal() {
        toggleAddModal(false);
    }
    function saveData() {
        localStorage.setItem(saveDataKey, JSON.stringify(diceSets));
    }
    return (
        <div className="App">
            <header className="App-header">Dice Balance Checker</header>
            <p>
                Based on number of rolls of each face of a die determines if the
                die is balanced.
            </p>
            {diceSets.map((diceSet: DiceSet) => (
                <DisplaySet
                    key={diceSet.id}
                    diceSets={diceSets}
                    setDiceSets={setDiceSets}
                    currentSet={diceSet}
                ></DisplaySet>
            ))}
            <Button className="addSetBtn" onClick={() => toggleAddModal(true)}>
                Create New Set
            </Button>
            <AddSetModal
                show={addModal}
                closeModal={closeModal}
                addDiceSet={addDiceSet}
            ></AddSetModal>
        </div>
    );
}

export default App;
