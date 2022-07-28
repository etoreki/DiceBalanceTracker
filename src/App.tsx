import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import { makeId } from "./createId";
import { DiceSet } from "./Interfaces/diceSet";

let data: DiceSet[] | (() => DiceSet[]) = [
    {
        id: "1",
        name: "7 die RPG set",
        dice: [
            {
                id: "0",
                sides: 20,
                balanced: true,
                rollTotals: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ]
            },
            {
                id: "1",
                sides: 12,
                balanced: true,
                rollTotals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                id: "2",
                sides: 10,
                balanced: true,
                rollTotals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                id: "3",
                sides: 10,
                balanced: true,
                rollTotals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                id: "4",
                sides: 8,
                balanced: true,
                rollTotals: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                id: "5",
                sides: 6,
                balanced: true,
                rollTotals: [0, 0, 0, 0, 0, 0]
            },
            {
                id: "6",
                sides: 4,
                balanced: true,
                rollTotals: [0, 0, 0, 0]
            }
        ],
        primaryColor: 0xfff,
        secondaryColor: 0x000
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
    function addDiceSet() {
        const newSet = { id: makeId() };
    }
    return (
        <div className="App">
            <header className="App-header">Dice Balance Checker</header>
            <p>
                Based on number of rolls of each face of a die determines if the
                die is balanced.
            </p>
            {diceSets.map((diceSet: DiceSet) =>
                DisplaySet(diceSets, setDiceSets, diceSet.id)
            )}
            <Button className="addSetBtn" onClick={() => addDiceSet()}>
                New Set
            </Button>
        </div>
    );
}

export default App;
