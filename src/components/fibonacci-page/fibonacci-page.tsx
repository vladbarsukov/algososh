import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-padge.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {DELAY_IN_MS} from "../../constants/delays";
import {fibonacci} from "../../utils/fibonacci";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [disableButton, setDisableButton] = useState(false);
  const [fibonacciArr, setFibonacciArr] = useState<number[]>([]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNumber(+e.target.value)
  };

    const onClick = () => {
        setDisableButton(true)
        if (number) {
            fibonacci(number, setFibonacciArr)
            .then(() => setDisableButton(false))
        }
    };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <Input placeholder={"Введите число"} value={number && number <= 19 ? number : ''} onChange={onChange} isLimitText={true} type={'number'} max={19}/>
        </div>
        <div className={styles.button}>
          <Button onClick={() => onClick()} disabled={!(number && number <= 19)} isLoader={disableButton} text={'Рассчитать'}/>
        </div>
      </div>
      <div className={styles.letters}>
          { fibonacciArr ? fibonacciArr.map((letter, index) =>
              <Circle index={index} extraClass={styles.circle} key={index} letter={`${letter}`}/>
          ) : <></>
          }
      </div>
    </SolutionLayout>
  );
};
