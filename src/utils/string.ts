import {ElementStates} from "../types/element-states";
import {delay} from "./delay";
import {DELAY_IN_MS} from "../constants/delays";
import {swap} from "./swap";

export const reverseStr = async (str: {value : string, state: ElementStates}[], setState: any) => {
    const mid = Math.ceil(str.length / 2);
    for (let i = 0; i < mid; i++) {
        let j = str.length - 1 - i;
        if (i !== j) {
            str[i].state = ElementStates.Changing;
            str[j].state = ElementStates.Changing;
            setState([...str]);
            await delay(DELAY_IN_MS);
        }
        swap(str, i, j);
        str[i].state = ElementStates.Modified;
        str[j].state = ElementStates.Modified;
        setState([...str]);
    }
    return str
};