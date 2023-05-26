import {Node} from "../utils/linked-list";
import {ElementStates} from "./element-states";

export interface INode<T>  {
    value: T;
    next: INode<T> | null;
}

export interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    deleteTail: () => void;
    deleteHead: () => void;
    toArray: () => INode<T>[];
    findByIndex: (index: number) => Node<T>;
    addByIndex: (index: number, data: T) => void;
    deleteByIndex: (index: number) => void;
    getLastAddedNode: () => Node<T> | null;
    isEmpty: () => boolean;
    getLength: () => number;
}

export interface IElementList  {
    value: string | number;
    state: ElementStates
}
