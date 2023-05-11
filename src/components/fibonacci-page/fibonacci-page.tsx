import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-padge.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [disableButton, setDisableButton] = useState(false);
  const [fibonacciArr, setFibonacciArr] = useState<number[]>([]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNumber(+e.target.value)
  };

    const fibonacci = (n: number): void => {
        if (n === 1) {
            setFibonacciArr([1]);
        } else if (n === 2) {
            setFibonacciArr([1]);
            setTimeout(() => {
                setFibonacciArr(prevState => [...prevState, 1]);
            }, DELAY_IN_MS);
        } else {
            let prevPrevNum = 1;
            let prevNum = 1;
            setFibonacciArr([1]);
            setTimeout(() => {
                setFibonacciArr(prevState => [...prevState, 1]);
            }, DELAY_IN_MS);
            for (let i = 2; i <= n; i++) {
                const nextNum = prevPrevNum + prevNum;
                setTimeout(() => {
                    setFibonacciArr(prevState => [...prevState, nextNum]);
                    if (i === n) {
                        setDisableButton(false)
                    }
                }, i * DELAY_IN_MS);
                prevPrevNum = prevNum;
                prevNum = nextNum;
            }
        }
    };


    const onClick = () => {
        setDisableButton(true)
        if (number) {
            setTimeout(() => fibonacci(number), DELAY_IN_MS);
        }
    };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.wrapper}>
        <div className={styles.input}>
          <Input placeholder={"Введите число"} value={number && number <= 19 ? number : ''} onChange={onChange} isLimitText={true} type={'number'} max={19}/>
        </div>
        <div className={styles.button}>
          <Button onClick={() => onClick()} isLoader={disableButton} text={'Рассчитать'}/>
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
