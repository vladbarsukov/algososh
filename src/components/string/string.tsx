import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css"
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState('');
  const [newString, setNewString] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState<null | number>(null);
  const [endIndex, setEndIndex] = useState<null | number>(null);
  const [disableButton, setDisableButton] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setString(e.target.value);
  const onClick = () => {
    setDisableButton(true)
    setStartIndex(null);
    setEndIndex(null);
    const str = string.split('');
    setNewString(str);
    setString('');
    setTimeout(() => reverseStr(str, 0, str.length - 1), 1000);
  };

  const swap = (str: string[], firstIndex: number, secondIndex: number): void => {
    const temp = str[firstIndex];
    str[firstIndex] = str[secondIndex];
    str[secondIndex] = temp;
  }
  const reverseStr = (str: string[], i: number, j: number) => {
    if (i < j) {
      swap(str, i, j);
      setStartIndex(i);
      setEndIndex(j);
      setNewString([...str]);
      setTimeout(() => reverseStr(str, i + 1, j - 1), 1000);
    } else {
      setDisableButton(false)
    }
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <Input value={string} onChange={onChange} maxLength={11}/>
          <p className={styles.text}>Максимум — 11 символов</p>
        </div>
        <div className={styles.button}>
          <Button disabled={disableButton} onClick={() => onClick()} text={'Развернуть'}/>
        </div>
      </div>
      <div className={styles.letters}>
      { newString ? newString.map((letter, index) =>
            <Circle extraClass={'mr-8'} state={index === startIndex ||  index === endIndex ? ElementStates.Modified : ElementStates.Default } key={index} letter={letter}/>
        ) : <></>
      }
      </div>
    </SolutionLayout>
  );
};
