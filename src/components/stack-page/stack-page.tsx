import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Stack} from "../../utils/stack";
import {delay} from "../../utils/delay";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [stack] = useState(new Stack<{value : string, state: ElementStates}>());
  const [stackArr, setStackArr] = useState<{value : string, state: ElementStates}[]>([]);
  const [isLoadAddButton, setIsLoadAddButton] = useState(false);
  const [isLoadDeleteButton, setIsLoadDeleteButton] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const onAddButtonClick = async () => {
    if (inputValue) {
      stack.push({ value: inputValue, state: ElementStates.Modified });
      setIsLoadAddButton(true)
      setInputValue('')
      setStackArr([...stack.getData()])
      setInputValue("")
      await delay(SHORT_DELAY_IN_MS)
      stack.peak()!.state = ElementStates.Default;
      setStackArr([...stack.getData()])
      setIsLoadAddButton(false)
    }
  }

  const onDeleteButtonClick = () => {
    setIsLoadDeleteButton(true)
    stack.pop();
    setStackArr([...stack.getData()]);
    setIsLoadDeleteButton(false)
  }

  const onCleanButtonClick = () => {
    stack.deleteData();
    setStackArr([...stack.getData()]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <Input value={inputValue} onChange={onChange} type={'text'} isLimitText={true} maxLength={4}/>
        </div>
        <Button disabled={isLoadDeleteButton || inputValue === ''} isLoader={isLoadAddButton} onClick={onAddButtonClick} extraClass={'mr-6'} text={'Добавить'}/>
        <Button disabled={isLoadAddButton} isLoader={isLoadDeleteButton} onClick={onDeleteButtonClick} extraClass={'mr-40'} text={'Удалить'}/>
        <Button disabled={isLoadDeleteButton || isLoadAddButton} onClick={onCleanButtonClick} text={'Очистить'}/>
      </div>
      <div className={styles.letters}>
        { stackArr ? stackArr.map((letter, index) =>
            <Circle state={letter.state} index={index} head={index === stackArr.length - 1 ? 'top' :''} extraClass={'mr-8'}  key={index} letter={letter.value}/>
        ) : <></>
        }
      </div>
    </SolutionLayout>
  );
};
