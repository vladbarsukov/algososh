import {bubbleSort, selectionSort} from "./sorting";

describe('sorting', () => {
  const numberArr = [3, 43, 2];
  const sortedNumberArr = [2, 3, 43]
  const oneElementArr = [1];
  const sortedOneElementArr = [1];

  const setSortingIndex = jest.fn(); // Создаем mock-функцию для setState
  const setSortedIndex = jest.fn(); // Создаем mock-функцию для setState
  const setNumArr = jest.fn(); // Создаем mock-функцию для setState

  it('should return selection sorted array', async () => {
    const selectionSorting = await selectionSort(numberArr, true, setSortingIndex, setSortedIndex, setNumArr)
    expect(selectionSorting).toEqual(sortedNumberArr);
    expect(setNumArr).toHaveBeenCalledWith(sortedNumberArr);
  });

  it('should return selection sorted array consisting of a single element', async () => {
    const selectionSorting = await selectionSort(oneElementArr, true, setSortingIndex, setSortedIndex, setNumArr)
    expect(selectionSorting).toEqual(sortedOneElementArr);
    expect(setNumArr).toHaveBeenCalledWith(sortedOneElementArr);
  });

  it('should return selection sorted void array', async () => {
    const selectionSorting = await selectionSort([], true, setSortingIndex, setSortedIndex, setNumArr)
    expect(selectionSorting).toEqual([]);
    expect(setNumArr).toHaveBeenCalledWith([]);
  });

  it('should return bubble sorted array', async () => {
    const bubbleSorting = await bubbleSort(numberArr, true, setSortingIndex, setSortedIndex, setNumArr)
    expect(bubbleSorting).toEqual(sortedNumberArr);
    expect(setNumArr).toHaveBeenCalledWith(sortedNumberArr);
  });

  it('should return bubble sorted array consisting of a single element', async () => {
    const bubbleSorting = await bubbleSort(oneElementArr, true, setSortingIndex, setSortedIndex, setNumArr)
    expect(bubbleSorting).toEqual(sortedOneElementArr);
    expect(setNumArr).toHaveBeenCalledWith(sortedOneElementArr);
  });

  it('should return bubble sorted array consisting of a single element', async () => {
    const bubbleSorting = await bubbleSort([], true, setSortingIndex, setSortedIndex, setNumArr)
    expect(bubbleSorting).toEqual([]);
    expect(setNumArr).toHaveBeenCalledWith([]);
  });
});