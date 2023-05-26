import {ElementStates} from "../types/element-states";

export const swap = (str: string[] | number[] | {value : string, state: ElementStates}[], firstIndex: number, secondIndex: number): void => {
    const temp = str[firstIndex];
    str[firstIndex] = str[secondIndex];
    str[secondIndex] = temp;
}