import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue-page.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Queue} from "../../utils/queue";
import {delay} from "../../utils/delay";

export const QueuePage: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [queue] = useState(new Queue<{value : string, state: ElementStates}>(7));
    const [queueArr, setQueueArr] = useState<{value : string, state: ElementStates}[]>(queue.getData());
    const [isLoader, setIsLoader] = useState({addButton: false, deleteButton: false});
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
    const onAddButtonClick = async () => {
        if (inputValue) {
            setIsLoader({...isLoader, addButton: true});
            queue.enqueue({ value: inputValue, state: ElementStates.Modified });
            setInputValue("");
            setQueueArr([...queue.getData()]);
            await delay(SHORT_DELAY_IN_MS);
            queue.getData()[queue.getTail() - 1].state = ElementStates.Default;
            setQueueArr([...queue.getData()]);
            setIsLoader({...isLoader, addButton: false});
        }
    };

    const onDeleteButtonClick = async () => {
        setIsLoader({...isLoader, deleteButton: true});
        queue.getData()[queue.getHead()].state = ElementStates.Modified;
        setQueueArr([...queue.getData()]);
        await delay(SHORT_DELAY_IN_MS);
        queue.dequeue();
        setQueueArr([...queue.getData()]);
        setIsLoader({...isLoader, deleteButton: false});

        // setIsLoaderDeleteButton(false);
    };

    const onCleanButtonClick = () => {
        queue.clear();
        setQueueArr([...queue.getData()]);
    };

    return (
        <SolutionLayout title="Очередь">
            <div className={style.wrapper}>
              <Input type="text" isLimitText={true} maxLength={4} value={inputValue} onChange={onChange} extraClass="mr-6"/>
              <Button text="Добавить" onClick={onAddButtonClick} isLoader={isLoader.addButton} disabled={isLoader.deleteButton || !inputValue || queue.isFullQueue()} extraClass={`mr-6 ${style.addButton}`}/>
              <Button text="Удалить" onClick={onDeleteButtonClick} isLoader={isLoader.deleteButton} disabled={isLoader.addButton || queue.isEmpty()} extraClass={`mr-40 ${style.deleteButton}`}/>
              <Button onClick={onCleanButtonClick} text="Очистить" disabled={isLoader.addButton || isLoader.deleteButton || queue.isEmpty()} extraClass={style.cleanButton}/>
            </div>
            <div className={style.letters}>
              {queueArr ? queueArr.map((item: {value : string, state: ElementStates}, index: number) => (
                <Circle key={index} index={index} letter={item.value} state={item.state} head={index === queue.getHead() && !queue.isEmpty() ? "head" : ""} tail={index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : ""}/>
              )) : <></>}
            </div>
        </SolutionLayout>
    );
};
