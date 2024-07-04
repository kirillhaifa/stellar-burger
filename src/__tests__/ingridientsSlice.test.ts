import { UnknownAction, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, {
  fetchIngredients
} from '../services/slices/ingredientsSlice';
import { getIngredientsApi } from '@api';

jest.mock('@api');

const mockIngredients = [
  {
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
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
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
    __v: 0
  }
];

// Начальное состояние
const initialState = {
  items: [],
  loading: false,
  error: null
};

describe('слайс ингредиентов', () => {
  let store = configureStore({
    reducer: { ingredients: ingredientsReducer }
  });

  beforeEach(() => {
    store = configureStore({
      reducer: { ingredients: ingredientsReducer }
    });
  });

  it('инициализация начального состояния', () => {
    expect(store.getState().ingredients).toEqual(initialState);
  });

  it('должен обрабатывать fetchIngredients.pending', () => {
    store.dispatch(fetchIngredients.pending('fetchIngredients/pending'));
    const state = store.getState().ingredients;
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать fetchIngredients.fulfilled', async () => {
    (getIngredientsApi as jest.Mock).mockResolvedValueOnce(mockIngredients);

    await store.dispatch(fetchIngredients() as unknown as UnknownAction);
    const state = store.getState().ingredients;
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать fetchIngredients.rejected', async () => {
    const errorMessage = 'Failed to fetch ingredients';
    (getIngredientsApi as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await store.dispatch(fetchIngredients() as unknown as UnknownAction);
    const state = store.getState().ingredients;
    expect(state.loading).toBe(false);
    expect(state.items).toEqual([]);
    expect(state.error).toBe(errorMessage);
  });
});
