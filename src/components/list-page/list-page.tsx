import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {IElementList, INode} from "../../types/linked-list";
import {LinkedList} from "../../utils/linked-list";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./list-page.module.css";
import {ArrowIcon} from "../ui/icons/arrow-icon";


export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<{value: string, index: string}>({ value: "", index: "" });
  const [linkedList] = useState(new LinkedList<IElementList>([{value: 12, state: ElementStates.Default}, {value: 22, state: ElementStates.Default}, {value: 43, state: ElementStates.Default}, {value: 32, state: ElementStates.Default}]));
  const [listArr, setListArr] = useState<Array<INode<IElementList>>>(linkedList.toArray());
  const [node, setNode] = useState({addNode: false, delete: false, value: ""});
  const [elementIndex, setElementIndex] = useState<number>(0);
  const [isLoader, setIsLoader] = useState({loader: false, button: ""});
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  const onAddHeadButtonClick = async () => {
    setIsLoader({loader: true, button: "addHead"});
    setNode({...node, addNode: true})
    setElementIndex(linkedList.getLength());
    setListArr(linkedList.toArray());
    await delay(SHORT_DELAY_IN_MS);
    linkedList.prepend({
      value: inputValue.value,
      state: ElementStates.Modified,
    });
    setNode({...node, addNode: false})
    setListArr(linkedList.toArray());
    await delay(SHORT_DELAY_IN_MS);
    linkedList.getLastAddedNode()!.value = {
      value: inputValue.value,
      state: ElementStates.Default,
    };
    setListArr(linkedList.toArray());
    setInputValue({ value: "", index: "" });
    setIsLoader({loader: false, button: ""});
  };

  const onAddTailButtonClick = async () => {
    setIsLoader({loader: true, button: "addTail"});
    setNode({...node, addNode: true})
    setElementIndex(1);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.append({
      value: inputValue.value,
      state: ElementStates.Modified,
    });
    setNode({...node, addNode: false})
    setListArr(linkedList.toArray());
    await delay(SHORT_DELAY_IN_MS);
    linkedList.getLastAddedNode()!.value = {
      value: inputValue.value,
      state: ElementStates.Default,
    };
    setListArr(linkedList.toArray());
    setInputValue({ value: "", index: "" });
    setIsLoader({loader: false, button: ""});
  };
  const onDeleteHeadButtonClick = async () => {
    setIsLoader({loader: true, button: "deleteHead"});
    setNode({...node, delete: true, value: linkedList.findByIndex(0).value});
    setElementIndex(linkedList.getLength());
    linkedList.findByIndex(0).value = "";
    await delay(SHORT_DELAY_IN_MS);
    linkedList.deleteHead();
    setListArr(linkedList.toArray());
    setNode({...node, delete: false});
    setIsLoader({loader: false, button: ""});
  };
  const onDeleteTailButtonClick = async () => {
    setIsLoader({loader: true, button: "deleteTail"});
    setNode({...node, delete: true, value: linkedList.findByIndex(linkedList.getLength() - 1).value});
    setElementIndex(1);
    linkedList.findByIndex(linkedList.getLength() - 1).value = "";
    await delay(SHORT_DELAY_IN_MS);
    linkedList.deleteTail();
    setListArr(linkedList.toArray());
    setNode({...node, delete: false});
    setIsLoader({loader: false, button: ""});
  };
  const onAddByIndexButtonClick = async () => {
    setIsLoader({loader: true, button: "addByIndex"});
    setNode({...node, addNode: true})
    for (let i = 0; i <= +inputValue.index; i++) {
      setElementIndex(linkedList.getLength() - i);
      if (i < +inputValue.index) {
        linkedList.findByIndex(i).state = ElementStates.Changing;
      }
      setListArr(linkedList.toArray());
      await delay(SHORT_DELAY_IN_MS);
    }
    setNode({...node, addNode: false})
    linkedList.addByIndex(+inputValue.index, {
      value: inputValue.value,
      state: ElementStates.Modified,
    });
    setListArr(linkedList.toArray());
    await delay(SHORT_DELAY_IN_MS);
    linkedList.toArray().forEach((item) => (item.value.state = ElementStates.Default));
    setListArr(linkedList.toArray());
    setInputValue({ value: "", index: "" });
    setIsLoader({loader: false, button: ""});
  };
  const onDeleteByIndexButtonClick = async () => {
    setIsLoader({loader: true, button: "deleteByIndex"});
    for (let i = 0; i <= +inputValue.index; i++) {
      if (i < +inputValue.index) {
        linkedList.findByIndex(i).state = ElementStates.Changing;
      }
      setListArr(linkedList.toArray());
      await delay(SHORT_DELAY_IN_MS);
    }
    setNode({...node, delete: true, value: linkedList.findByIndex(+inputValue.index).value});
    setElementIndex(linkedList.getLength() - +inputValue.index);
    linkedList.findByIndex(+inputValue.index).value = "";
    setListArr(linkedList.toArray());
    await delay(SHORT_DELAY_IN_MS);
    setNode({...node, delete: false});
    linkedList.deleteByIndex(+inputValue.index);
    setListArr(linkedList.toArray());
    linkedList.toArray().forEach((item) => (item.value.state = ElementStates.Default));
    setListArr(linkedList.toArray());
    setInputValue({ value: "", index: "" });
    setIsLoader({loader: false, button: ""});
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <Input name="value" type="text" isLimitText={true} maxLength={4} value={inputValue?.value} onChange={onChange}/>
        <Button onClick={onAddHeadButtonClick} isLoader={isLoader.loader && isLoader.button === "addHead"} text="Добавить в head" disabled={!inputValue.value || isLoader.loader} extraClass={styles.button}/>
        <Button onClick={onAddTailButtonClick} isLoader={isLoader.loader && isLoader.button === "addTail"} text="Добавить в tail" disabled={!inputValue.value || isLoader.loader} extraClass={styles.button}/>
        <Button onClick={onDeleteHeadButtonClick} isLoader={isLoader.loader && isLoader.button === "deleteHead"} text="Удалить из head" disabled={linkedList.isEmpty() || isLoader.loader} extraClass={styles.button}/>
        <Button onClick={onDeleteTailButtonClick} isLoader={isLoader.loader && isLoader.button === "deleteTail"} text="Удалить из tail" disabled={linkedList.isEmpty() || isLoader.loader} extraClass={styles.button}/>
      </div>
      <div className={styles.wrapperIndex}>
        <Input name="index" max={linkedList.getLength() - 1} min={0} type="number" value={inputValue?.index} onChange={onChange}/>
        <Button onClick={onAddByIndexButtonClick} isLoader={isLoader.loader && isLoader.button ===  "addByIndex"} text="Добавить по индексу" disabled={!inputValue.index || +inputValue.index > linkedList.getLength() - 1} extraClass={styles.buttonIndex}/>
        <Button onClick={onDeleteByIndexButtonClick} isLoader={isLoader.loader && isLoader.button === "deleteByIndex"} text="Удалить по индексу" disabled={!inputValue.index || +inputValue.index > linkedList.getLength() - 1} extraClass={styles.buttonIndex}/>
      </div>
      <ul className={styles.letters}>
        {listArr ? listArr.map((item: any, index: number) => (
            <li className={styles.list} key={index}>
              {node.addNode && linkedList.getLength() - elementIndex === index && (
                  <Circle state={ElementStates.Changing} isSmall={true} letter={inputValue.value} extraClass={styles.addNode}/>
              )}
              <Circle key={index} index={index} letter={item.value.value} state={item.value.color} tail={!item.next && !node.delete ? "tail" : ""} head={index === 0 && !node.addNode ? "head" : ""}/>
              {node.delete && linkedList.getLength() - elementIndex === index && (
                  <Circle state={ElementStates.Changing} isSmall={true} letter={node.value} extraClass={styles.deleteNode}/>
              )}
              {item.next && <ArrowIcon fill={item.value.color === ElementStates.Changing ? '#D252E1' : undefined}/>}
            </li>
        )) : <></>}
      </ul>
    </SolutionLayout>
  );
};
