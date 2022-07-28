import React from "react";
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
    return <div></div>;
}
