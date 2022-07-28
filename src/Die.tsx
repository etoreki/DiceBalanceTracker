import React from "react";
import { DiceSet } from "./Interfaces/diceSet";
import { Die } from "./Interfaces/die";
import criticalValues from "./Data/criticalValues.json";
import { Button } from "react-bootstrap";

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
    function getBalanceScore(): number {
        const totalRolls = currentDie.rollTotals.reduce(
            (sum: number, rolls: number) => sum + rolls,
            0
        );
        const rawBalance = currentDie.rollTotals.reduce(
            (balance: number, rolls: number) =>
                balance + (rolls - totalRolls) * (rolls - totalRolls),
            0
        );
        return rawBalance;
    }
    function getBalancePoint(): number {
        const totalRolls = currentDie.rollTotals.reduce(
            (sum: number, rolls: number) => sum + rolls,
            0
        );
        return (
            criticalValues[currentDie.sides - 2] *
            (totalRolls / currentDie.sides)
        );
    }
    function addRoll(index: number) {
        const newRollTotals = [...currentDie.rollTotals];
        newRollTotals[index] = newRollTotals[index] + 1;
        const newDice = currentSet.dice.map((die: Die) =>
            die.id === currentDie.id ? { ...die, sides: 5 } : { ...die }
        );
        const newDiceSets = diceSets.map((set: DiceSet) =>
            set.id === currentSet.id
                ? { ...set, diceSets: newDice }
                : { ...set }
        );
        setDiceSets(newDiceSets);
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
                <td>
                    {getBalanceScore() < getBalancePoint()
                        ? getBalanceScore() +
                          "/" +
                          getBalancePoint() +
                          "\nBalanced ✓"
                        : getBalanceScore() +
                          "/" +
                          getBalancePoint() +
                          "\nNot Balanced ✗"}
                </td>
                {currentDie.rollTotals.map((num, index) => (
                    <td key={currentDie.id + index}>
                        <Button onClick={() => addRoll(index)}>{num}</Button>
                    </td>
                ))}
            </tr>
        </table>
    );
}
