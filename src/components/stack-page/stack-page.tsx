import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {IStack} from "../../types/stack";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

class Stack<T> implements IStack<T> {
  private container: T[] = [];
  push = (item: T): void => {
    this.container.push(item)
  };
  pop = (): void => {
    this.container.pop()
  };
  peak = (): T | null => {
    if (this.container.length === 0) {
      return null;
    }
    return this.container[this.container.length - 1];
  };
  getSize = () => this.container.length;
  getData = () => this.container;
  deleteData = () => {
    this.container = []
  }
}
const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [stackArr, setStackArr] = useState<string[]>([]);
  const [topIndex, setTopIndex] = useState<number>(-1);
  const [light, setLight] = useState<boolean>(true);
  const [isLoadButton, setIsLoadButton] = useState(false);
  const [disableButton, setDisableButton] = useState(false);



  const onChange = (e: ChangeEvent<HTMLInputElement>) => setData(e.target.value);

  const onAddButtonClick = () => {
    if (data) {
      stack.push(data);
      setData('')
      const curr = stack.getData()
      setStackArr(curr)
      console.log(curr)
      setTopIndex(curr.length - 1)
      setLight(true)
      setIsLoadButton(true)
      setDisableButton(true)
      setTimeout(() => {
        setLight(false)
        setIsLoadButton(false)
        setDisableButton(false)
      }, SHORT_DELAY_IN_MS);
    }
  }

  const onDeleteButtonClick = () => {
    stack.pop();
    const curr = [...stack.getData()];
    setStackArr(curr);
    setTopIndex(curr.length - 1)
  }

  const onCleanButtonClick = () => {
    stack.deleteData();
    const curr = [...stack.getData()];
    setStackArr(curr);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <Input value={data} onChange={onChange} type={'text'} isLimitText={true} maxLength={4}/>
        </div>
        <Button disabled={disableButton} isLoader={isLoadButton} onClick={onAddButtonClick} extraClass={'mr-6'} text={'Добавить'}/>
        <Button disabled={disableButton} onClick={onDeleteButtonClick} extraClass={'mr-40'} text={'Удалить'}/>
        <Button disabled={disableButton} onClick={onCleanButtonClick} text={'Очистить'}/>
      </div>
      <div className={styles.letters}>
        { stackArr ? stackArr.map((letter, index) =>
            <Circle state={light && topIndex === index ? ElementStates.Modified : ElementStates.Default } index={index} head={topIndex === index ? 'top' :''} extraClass={'mr-8'}  key={index} letter={letter}/>
        ) : <></>
        }
      </div>
    </SolutionLayout>
  );
};
