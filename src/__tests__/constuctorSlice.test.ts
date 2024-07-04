import constructorReducer, {
  addItem,
  removeItem,
  moveItemUp
} from '../services/slices/constructorSlice';

describe('тест constructorSlice', () => {
  const initialState = {
    bun: null,
    constructorIngredients: []
  };

  const ingridientBun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: '1',
    __v: 0
  };

  const ingridientMain1 = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    id: '2',
    __v: 0
  };

  const ingridientMain2 = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    id: '3',
    __v: 0
  };

  it('добавляем ингридиент', () => {
    //ожидаемое состояние
    const expectedState = {
      bun: ingridientBun,
      constructorIngredients: []
    };

    //состояение после добавления ингридиента
    const changedState = constructorReducer(
      initialState,
      addItem(ingridientBun)
    );

    //сравниваем измененное состояние с ожидаемым
    expect(changedState).toEqual(expectedState);
  });

  it('удаляем ингридиент', () => {
    //чтобы удалить что то, надо сначала что то добавить
    const addedState = constructorReducer(
      initialState,
      addItem(ingridientMain1)
    );

    //сначала проверим что добавилось
    const expectedAfterAddState = {
      bun: null,
      constructorIngredients: [ingridientMain1]
    };

    //сравниваем измененное состояние с ожидаемым
    expect(addedState).toEqual(expectedAfterAddState);

    //удаяем ингридиент
    const afterRemoveState = constructorReducer(
      addedState,
      removeItem(ingridientMain1.id)
    );

    //ожидаемое состояние
    const expectedState = {
      bun: null,
      constructorIngredients: []
    };

    expect(afterRemoveState).toEqual(expectedState);
  });

  it('двигаем ингридиент', () => {
    //добавим первый ингридиент
    let addedState = constructorReducer(initialState, addItem(ingridientMain1));

    //добваим второй ингридиент
    addedState = constructorReducer(addedState, addItem(ingridientMain2));

    const expectedState = {
      bun: null,
      constructorIngredients: [ingridientMain2, ingridientMain1]
    };

    //ожидаемое состояние
    const changedState = constructorReducer(addedState, moveItemUp(1));

    expect(changedState).toEqual(expectedState);
  });
});
