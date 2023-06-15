import {DELAY_IN_MS} from "../constants/delays";
import {delay} from "./delay";

export const fibonacci = async (n: number, setState: any) => {
    if (n === 1) {
        setState([1]);
    } else if (n === 2) {
        setState([1]);
        await delay(DELAY_IN_MS)
        setState((prevState: number[]) => [...prevState, 1]);
    } else {
        let prevPrevNum = 1;
        let prevNum = 1;
        setState([1]);
        await delay(DELAY_IN_MS)
        setState((prevState: number[]) => [...prevState, 1]);
        for (let i = 2; i <= n; i++) {
            const nextNum = prevPrevNum + prevNum;
            await delay(DELAY_IN_MS)
            setState((prevState: number[]) => [...prevState, nextNum]);
            prevPrevNum = prevNum;
            prevNum = nextNum;
        }
    }
};