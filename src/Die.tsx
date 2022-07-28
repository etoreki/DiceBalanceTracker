import React from "react";
import { disposeEmitNodes } from "typescript";
import { DiceSet } from "./Interfaces/diceSet";
import { Die } from "./Interfaces/die";

export function DisplayDie({
    diceSets,
    setDiceSets,
    currentSet,
    currentDie
}: {
    diceSets: DiceSet[];
    setDiceSets: (newDiceSets: DiceSet[]) => void;
    currentSet: DiceSet;
    currentDie: Die;
}): JSX.Element {
    function calcBalance() {
        const totalRolls = currentDie.rollTotals.reduce(
            (sum: number, rolls: number) => sum + rolls,
            0
        );
        const rawBalance = currentDie.rollTotals.reduce(
            (balance: number, rolls: number) =>
                balance + (rolls - totalRolls) * (rolls - totalRolls),
            0
        );
    }
    return (
        <table>
            <tr>
                <td>
                    <strong>{"D" + currentDie.sides}</strong>
                </td>
                {currentDie.rollTotals.map((num, index) => (
                    <td key={currentDie.id + index}>
                        <strong>{index + 1}</strong>
                    </td>
                ))}
            </tr>
            <tr>
                <td>{currentDie.balanced ? "Balanced ✓" : "Not Balanced ✗"}</td>
            </tr>
        </table>
    );
}
