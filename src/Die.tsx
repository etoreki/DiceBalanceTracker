import React, { useState } from "react";
import { DiceSet } from "./Interfaces/diceSet";
import { Die } from "./Interfaces/die";
import criticalValues from "./Data/criticalValues.json";
import { Button, Form } from "react-bootstrap";

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
    const [editting, isEditting] = useState<boolean>(false);
    const [editRolls, setEditRolls] = useState<number[]>(currentDie.rollTotals);
    const [name, setName] = useState<string>(currentDie.name);
    function getBalanceScore(): number {
        const totalRolls = currentDie.rollTotals.reduce(
            (sum: number, rolls: number) => sum + rolls,
            0
        );
        const rawBalance = currentDie.rollTotals.reduce(
            (balance: number, rolls: number) =>
                balance +
                (rolls - totalRolls / currentDie.sides) *
                    (rolls - totalRolls / currentDie.sides),
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
            die.id === currentDie.id
                ? { ...die, rollTotals: newRollTotals }
                : { ...die }
        );
        const newDiceSets = diceSets.map((set: DiceSet) =>
            set.id === currentSet.id ? { ...set, dice: newDice } : { ...set }
        );
        setDiceSets(newDiceSets);
    }
    function updateRolls(newValue: string, index: number) {
        const newRolls = editRolls.map((num, index2) =>
            index === index2 ? parseInt(newValue) : num
        );
        setEditRolls(newRolls);
    }
    function saveChanges() {
        const newDice = currentSet.dice.map((die: Die) =>
            die.id === currentDie.id
                ? { ...die, rollTotals: editRolls, name: name }
                : { ...die }
        );
        const newDiceSets = diceSets.map((set: DiceSet) =>
            set.id === currentSet.id ? { ...set, dice: newDice } : { ...set }
        );
        setDiceSets(newDiceSets);
        isEditting(false);
    }
    function cancelEdit() {
        setEditRolls(currentDie.rollTotals);
        setName(currentDie.name);
        isEditting(false);
    }
    return (
        <table>
            <tr>
                <td>
                    {editting ? (
                        <Form.Control
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    ) : (
                        <strong>{currentDie.name}</strong>
                    )}
                </td>
                {currentDie.rollTotals.map((num, index) => (
                    <td key={currentDie.id + index}>
                        <strong>{index + 1}</strong>
                    </td>
                ))}
                <td>
                    <strong>Total Rolls</strong>
                </td>
            </tr>
            <tr>
                <td>
                    {getBalanceScore() < getBalancePoint()
                        ? parseFloat("" + getBalanceScore()).toFixed(2) +
                          "/" +
                          parseFloat("" + getBalancePoint()).toFixed(2) +
                          "\nBalanced ✓"
                        : parseFloat("" + getBalanceScore()).toFixed(2) +
                          "/" +
                          parseFloat("" + getBalancePoint()).toFixed(2) +
                          "\nNot Balanced ✗"}
                </td>
                {currentDie.rollTotals.map((num, index) => (
                    <td key={currentDie.id + index}>
                        {editting ? (
                            <Form.Control
                                type="number"
                                value={editRolls[index]}
                                onChange={(event) =>
                                    updateRolls(event.target.value, index)
                                }
                            />
                        ) : (
                            <Button onClick={() => addRoll(index)}>
                                {num}
                            </Button>
                        )}
                    </td>
                ))}
                <td>
                    {currentDie.rollTotals.reduce(
                        (sum: number, rolls: number) => sum + rolls,
                        0
                    )}
                </td>
                <td>
                    {editting ? (
                        <>
                            <Button onClick={() => saveChanges()}>
                                Save Changes
                            </Button>
                            <Button onClick={() => cancelEdit()}>Cancel</Button>
                        </>
                    ) : (
                        <Button onClick={() => isEditting(true)}>
                            Edit Values
                        </Button>
                    )}
                </td>
            </tr>
        </table>
    );
}
