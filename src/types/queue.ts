
export interface IQueue<T>  {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    getData: () => T[];
    getLength: () => number;
    getTail: () => number;
    getHead: () => number;
    isFullQueue: () => boolean;
    isEmpty: () => boolean;
    clear: () => void;
}