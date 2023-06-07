import {reverseStr} from "./string";

it ("should return reversed string", () => {


})

describe('reverseStr', () => {
  it('should return reversed string', async () => {
    const str = [
      { value: 'h', state: 'default' },
      { value: 'e', state: 'default' },
      { value: 'l', state: 'default' },
      { value: 'l', state: 'default' },
      { value: 'o', state: 'default' },
    ];

    const setState = jest.fn(); // Создаем mock-функцию для setState

    const reversedStr = await reverseStr(str, setState);

    // Ожидаем, что элементы массива были изменены в обратном порядке
    expect(reversedStr).toEqual([
      { value: 'o', state: 'modified' },
      { value: 'l', state: 'modified' },
      { value: 'l', state: 'modified' },
      { value: 'e', state: 'modified' },
      { value: 'h', state: 'modified' },
    ]);

    // Проверяем, что setState был вызван с измененным состоянием
    expect(setState).toHaveBeenCalledWith([
    { value: 'o', state: 'modified' },
    { value: 'l', state: 'modified' },
    { value: 'l', state: 'modified' },
    { value: 'e', state: 'modified' },
    { value: 'h', state: 'modified' },
    ]);
  });
});
