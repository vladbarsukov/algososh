import {reverseStr} from "./string";


describe('reverseStr', () => {
  const oddString = [
    { value: 'h', state: 'default' },
    { value: 'e', state: 'default' },
    { value: 'l', state: 'default' },
    { value: 'l', state: 'default' },
    { value: 'o', state: 'default' },
  ];

  const reverseOddString = [
    { value: 'o', state: 'modified' },
    { value: 'l', state: 'modified' },
    { value: 'l', state: 'modified' },
    { value: 'e', state: 'modified' },
    { value: 'h', state: 'modified' },
  ];

  const evalString = [
    { value: 't', state: 'default' },
    { value: 'e', state: 'default' },
    { value: 's', state: 'default' },
    { value: 't', state: 'default' },
  ];

  const reverseEvalString = [
    { value: 't', state: 'modified' },
    { value: 's', state: 'modified' },
    { value: 'e', state: 'modified' },
    { value: 't', state: 'modified' },
  ];

  const oneLetterString = [
    { value: 't', state: 'default' },
  ];

  const reverseOneLetterString = [
    { value: 't', state: 'modified' },
  ];

  const noLetterString = [
    { value: '', state: 'default' },
  ];

  const reverseNoLetterString = [
    { value: '', state: 'modified' },
  ];

  it('should return reversed odd string', async () => {
    const setState = jest.fn(); // Создаем mock-функцию для setState
    const reversedStr = await reverseStr(oddString, setState);
    expect(reversedStr).toEqual(reverseOddString);
    expect(setState).toHaveBeenCalledWith(reverseOddString);
  });

  it('should return reversed eval string', async () => {
    const setState = jest.fn(); // Создаем mock-функцию для setState
    const reversedStr = await reverseStr(evalString, setState);
    expect(reversedStr).toEqual(reverseEvalString);
    expect(setState).toHaveBeenCalledWith(reverseEvalString);
  });

  it('should return reversed one letter string', async () => {
    const setState = jest.fn(); // Создаем mock-функцию для setState
    const reversedStr = await reverseStr(oneLetterString, setState);
    expect(reversedStr).toEqual(reverseOneLetterString);
    expect(setState).toHaveBeenCalledWith(reverseOneLetterString);
  });

  it('should return reversed no letter string', async () => {
    const setState = jest.fn(); // Создаем mock-функцию для setState
    const reversedStr = await reverseStr(noLetterString, setState);
    expect(reversedStr).toEqual(reverseNoLetterString);
    expect(setState).toHaveBeenCalledWith(reverseNoLetterString);
  });
});
