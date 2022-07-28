import React from "react";
import "./App.css";

function App(): JSX.Element {
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
