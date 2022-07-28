import React, { useState } from "react";
import "./App.css";

let data: DiceSet[] | (() => DiceSet[]) = [];
const saveDataKey = "DICE-BALANCE-TRACKER-DATA";
// Check if the user's data already exists
const previousData = localStorage.getItem(saveDataKey);
// If the data doesn't exist, `getItem` returns null
if (previousData !== null) {
    data = JSON.parse(previousData);
}

function App(): JSX.Element {
    const [diceSets, setDiceSets] = useState<DiceSet[]>(data);
    return (
        <div className="App">
            <header className="App-header">Dice Balance Checker</header>
            <p>
                Based on number of rolls of each face of a die determines if the
                die is balanced.
            </p>
        </div>
    );
}

export default App;
