export const swap = (str: string[] | number[], firstIndex: number, secondIndex: number): void => {
    const temp = str[firstIndex];
    str[firstIndex] = str[secondIndex];
    str[secondIndex] = temp;
}