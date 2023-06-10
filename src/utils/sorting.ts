import {delay} from "./delay";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../constants/delays";
import {swap} from "./swap";

export const selectionSort = async (numArr: number[], ascending: boolean, setSortingIndex: any, setSortedIndex: any, setNumArr: any) => {
    for (let i = 0; i < numArr.length; i++) {
        let indexMin = i
        for (let j = i + 1; j < numArr.length; j++) {
            if (ascending ? numArr[j] < numArr[indexMin] : numArr[j] > numArr[indexMin]) {
                indexMin = j
                setSortingIndex({ firstIndex: i, secondIndex: j })
            }
        }
        await delay(SHORT_DELAY_IN_MS)
        swap(numArr, i, indexMin)
        setSortedIndex(i);
    }
    setSortedIndex(numArr.length + 1);
    setNumArr([...numArr]);
    return numArr
}

export const bubbleSort = async (numArr: number[], ascending: boolean, setSortingIndex: any, setSortedIndex: any, setNumArr: any) => {
    for (let i = 0; i < numArr.length; i++) {
        let sorted = true;
        for (let j = 0; j < numArr.length - 1 - i; j++) {
            if (ascending ? numArr[j + 1] < numArr[j] : numArr[j + 1] > numArr[j]) {
                swap(numArr, j, j + 1);
                setSortingIndex({ firstIndex: j, secondIndex: j + 1 });
                await delay(DELAY_IN_MS);
                sorted = false;
            }
        }
        if (sorted) {
            setSortedIndex(numArr.length - 1 - i);
            break;
        }
    }
    setSortingIndex({ firstIndex: null, secondIndex: null });
    setNumArr([...numArr]);
    return numArr
};
