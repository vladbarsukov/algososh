import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./string.module.css"
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {reverseStr} from "../../utils/string";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<{value : string, state: ElementStates}[]>([]);
  const [disableButton, setDisableButton] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setString(
    e.target.value.split("").map((value: string) => {
      return { value, state: ElementStates.Default }
  }));

  const onClick = () => {
    setDisableButton(true)
    reverseStr(string, setString)
    .then(() => setDisableButton(false))
  }

  return (
      <SolutionLayout title="Строка">
        <div className={styles.wrapper}>
          <div className={styles.input}>
            <Input onChange={onChange} type={'text'} isLimitText={true} maxLength={11}/>
          </div>
          <div className={styles.button}>
            <Button disabled={!string.length} isLoader={disableButton} onClick={() => onClick()} text={'Развернуть'}/>
          </div>
        </div>
        <div className={styles.letters}>
          { string ? string.map((letter, index) =>
              <Circle extraClass={'mr-8'} state={letter.state} key={index} letter={letter.value}/>
          ) : <></>
          }
        </div>
      </SolutionLayout>
  );
};
