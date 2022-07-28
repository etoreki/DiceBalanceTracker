import { Die } from "./die";

export interface DiceSet {
    id: string;
    name: string;
    dice: Die[];
}
