import { DiceSet } from "./Interfaces/diceSet";
import React from "react";

export function DisplaySet({
    diceSets,
    setDiceSets,
    currentSet
}: {
    diceSets: DiceSet[];
    setDiceSets: (newDiceSets: DiceSet[]) => void;
    currentSet: DiceSet;
}): JSX.Element {
    return <div></div>;
}
