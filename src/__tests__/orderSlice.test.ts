import { configureStore } from '@reduxjs/toolkit';
import orderReducer, {
  fetchOrderByNumber
} from '../services/slices/orderSlice';
import { getOrderByNumberApi } from '@api';

jest.mock('@api');

const mockOrder = {
  success: true,
  name: 'Флюоресцентный люминесцентный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
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
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      }
    ],
    _id: '66867174856777001bb1fc3a',
    owner: {
      name: 'kirill',
      email: 'format3473@gmail.com',
      createdAt: '2024-06-10T21:25:48.827Z',
      updatedAt: '2024-06-11T12:08:45.407Z'
    },
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-07-04T09:55:00.152Z',
    updatedAt: '2024-07-04T09:55:00.612Z',
    number: 44919,
    price: 2964
  }
};

// Начальное состояние
const initialState = {
  orderData: null,
  status: 'idle',
  error: null
};

describe('слайс заказа', () => {
  let store = configureStore({
    reducer: { order: orderReducer }
  });

  beforeEach(() => {
    store = configureStore({
      reducer: { order: orderReducer }
    });
  });

  it('инициализация начального состояния', () => {
    expect(store.getState().order).toEqual(initialState);
  });

  it('должен обрабатывать fetchOrderByNumber.pending', async () => {
    const action = fetchOrderByNumber(mockOrder.order.number);
    store.dispatch(action);

    const state = store.getState().order;
    expect(state.status).toBe('loading');
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать fetchOrderByNumber.fulfilled', async () => {
    (getOrderByNumberApi as jest.Mock).mockResolvedValueOnce({
      orders: [mockOrder]
    });

    const action = fetchOrderByNumber(mockOrder.order.number);
    await store.dispatch(action);

    const state = store.getState().order;
    expect(state.status).toBe('succeeded');
    expect(state.orderData).toEqual(mockOrder);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать fetchOrderByNumber.rejected', async () => {
    const errorMessage = 'Failed to fetch order';
    (getOrderByNumberApi as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const action = fetchOrderByNumber(mockOrder.order.number);
    await store.dispatch(action);

    const state = store.getState().order;
    expect(state.status).toBe('failed');
    expect(state.orderData).toBe(null);
    expect(state.error).toBe(errorMessage);
  });
});
