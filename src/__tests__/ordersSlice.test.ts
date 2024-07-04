import { configureStore } from '@reduxjs/toolkit';
import ordersReducer, { fetchOrders } from '../services/slices/ordersSlice';
import { getFeedsApi } from '@api';
import { TOrdersData, TFeedsResponse } from '@utils-types';

jest.mock('@api');

const mockOrders = [
  {
    _id: '66847a80856777001bb1f467',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2024-07-02T22:09:04.066Z',
    updatedAt: '2024-07-02T22:09:04.461Z',
    number: 44833
  },
  {
    _id: '66846ddd856777001bb1f448',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный антарианский бургер',
    createdAt: '2024-07-02T21:15:09.007Z',
    updatedAt: '2024-07-02T21:15:09.463Z',
    number: 44832
  },
  {
    _id: '66846d25856777001bb1f446',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-07-02T21:12:05.725Z',
    updatedAt: '2024-07-02T21:12:06.190Z',
    number: 44831
  }
];

const initialState: TOrdersData = {
  orders: [],
  total: 0,
  totalToday: 0
};

describe('ordersSlice', () => {
  let store = configureStore({
    reducer: { orders: ordersReducer }
  });
  beforeEach(() => {
    store = configureStore({
      reducer: { orders: ordersReducer }
    });
  });

  it('should handle initial state', () => {
    expect(store.getState().orders).toEqual(initialState);
  });

  it('should handle fetchOrders', async () => {
    (getFeedsApi as jest.Mock).mockResolvedValueOnce({
      orders: mockOrders,
      total: 3,
      totalToday: 2
    });

    await store.dispatch(fetchOrders());

    const state = store.getState().orders;

    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toEqual(3);
    expect(state.totalToday).toEqual(2);
  });
});
