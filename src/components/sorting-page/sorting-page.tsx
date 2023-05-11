import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting-padge.module.css";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {swap} from "../../utils/swap";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [radioButton, setRadioButton] = useState(true);
  const [numArr, setNumArr] = useState<number[]>([]);

  const [sortingIndex, setSortingIndex] = useState<{firstIndex: number | null, secondIndex: number | null}>({firstIndex: null, secondIndex: null});
  const [sortedIndex, setSortedIndex] = useState<null | number>(null);

  const onClickRadioButton = () => {
    setRadioButton(!radioButton)
  }
  const generateRandomArray = () => {
    const minLen = 3;
    const maxLen = 17;
    const range = 101;
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    const randomArr = [];
    for (let i = 0; i < len; i++) {
      randomArr.push(Math.floor(Math.random() * range));
    }
    setNumArr(randomArr);
  }
  const selectionSort = async (ascending: boolean) => {
    for (let i = 0; i < numArr.length; i++) {
      let indexMin = i
      for (let j = i + 1; j < numArr.length; j++) {
        if (ascending ? numArr[j] < numArr[indexMin] : numArr[j] > numArr[indexMin]) {
          indexMin = j
          setSortingIndex({ firstIndex: i, secondIndex: j })
        }
      }
      await new Promise((resolve) =>
          setTimeout(() => {
            resolve(null);
          }, DELAY_IN_MS)
      );
      swap(numArr, i, indexMin)
      setSortedIndex(i);
    }
    setSortedIndex(numArr.length + 1);
    setNumArr([...numArr]);
  }

  const bubbleSort = async (ascending: boolean) => {
    for (let i = 0; i < numArr.length; i++) {
      for (let j = 0; j < numArr.length - 1 - i; j++) {
        if (ascending ? numArr[j + 1] < numArr[j] : numArr[j + 1] > numArr[j]) {
          swap(numArr, j, j + 1);
          setSortingIndex({ firstIndex: j, secondIndex: j + 1 });
          await new Promise((resolve) =>
              setTimeout(() => {
                resolve(null);
              }, DELAY_IN_MS)
          );
        }
      }
    }
    setSortingIndex({ firstIndex: null, secondIndex: null });
    setNumArr([...numArr]);
  };

  const handleGenerateArrClick = async () => {
    setSortingIndex({ firstIndex: null, secondIndex: null })
    setSortedIndex(null);
    generateRandomArray()
  }

  const handleAscendingSortClick = async () => {
    setSortingIndex({ firstIndex: null, secondIndex: null })
    setSortedIndex(null);
    radioButton ? await selectionSort(true) : await bubbleSort(true)
  }

  const handleDescendingSortClick = async () => {
    setSortingIndex({ firstIndex: null, secondIndex: null })
    setSortedIndex(null);
    radioButton ? await selectionSort(false) : await bubbleSort(false)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles.radioButton}>
          <RadioInput onChange={onClickRadioButton} checked={radioButton} label={"Выбор"}/>
          <RadioInput onChange={onClickRadioButton} checked={!radioButton} label={"Пузырек"}/>
        </div>
        <Button sorting={Direction.Ascending} onClick={handleAscendingSortClick}  extraClass={'mr-6'} text={'По возрастанию'}/>
        <Button sorting={Direction.Descending} onClick={handleDescendingSortClick} text={'По убыванию'}/>
        <Button onClick={handleGenerateArrClick} extraClass={'ml-40'} text={'Новый массив'}/>
      </div>
      <div className={styles.letters}>
        {numArr ? numArr.map((number, index) =>
            <Column
                state={
                  sortedIndex !== null && index <= sortedIndex
                      ? ElementStates.Modified
                      : sortingIndex.firstIndex === index || sortingIndex.secondIndex === index
                          ? ElementStates.Changing
                          : ElementStates.Default
                }
                extraClass={'mr-5'}
                key={index}
                index={number}
            />
        ) : <></>}
      </div>
    </SolutionLayout>
  );
};
