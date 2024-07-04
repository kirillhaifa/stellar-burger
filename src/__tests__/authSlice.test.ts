import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  startAuthCheck,
  finishAuthCheck,
  setData,
  setUser,
  clearData,
  setDesiredUrl,
  checkAuth,
  fetchUserOrders
} from '../services/slices/authSlice';
import { getUserApi, getOrdersApi, TAuthResponse } from '@api';
import { TUser, TOrder } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';

jest.mock('@api');
jest.mock('../utils/cookie');

const mockUser: TUser = {
  name: 'John Doe',
  email: 'john.doe@example.com'
};

const mockOrders = {
  success: true,
  orders: [
    {
      _id: '6667709e97ede0001d06fdc2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-06-10T21:31:10.314Z',
      updatedAt: '2024-06-10T21:31:10.740Z',
      number: 42072
    },
    {
      _id: '66677cc797ede0001d06fdcc',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space астероидный бургер',
      createdAt: '2024-06-10T22:23:03.424Z',
      updatedAt: '2024-06-10T22:23:03.797Z',
      number: 42073
    },
    {
      _id: '6668438f97ede0001d06ff47',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный метеоритный бургер',
      createdAt: '2024-06-11T12:31:11.302Z',
      updatedAt: '2024-06-11T12:31:11.760Z',
      number: 42108
    }
  ],
  total: 44564,
  totalToday: 81
};

const initialState = {
  user: {
    name: '',
    email: ''
  },
  authIsChecking: false,
  authorized: false,
  orders: [],
  ordersIsLoading: false,
  desiredUrl: null
};

describe('authSlice', () => {
  beforeAll(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock
    });
  });

  let store = configureStore({
    reducer: { auth: authReducer }
  });

  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authReducer }
    });
  });

  it('инициализация начального состояния', () => {
    expect(store.getState().auth).toEqual(initialState);
  });

  it('должен обрабатывать startAuthCheck', () => {
    store.dispatch(startAuthCheck());
    const state = store.getState().auth;
    expect(state.authIsChecking).toBe(true);
  });

  it('должен обрабатывать finishAuthCheck', () => {
    store.dispatch(finishAuthCheck());
    const state = store.getState().auth;
    expect(state.authIsChecking).toBe(false);
  });

  it('должен обрабатывать setData', () => {
    const authResponse: TAuthResponse = {
      success: true,
      user: mockUser,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };
    store.dispatch(setData(authResponse));
    const state = store.getState().auth;
    expect(state.user).toEqual(mockUser);
    expect(state.authorized).toBe(true);
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'accessToken', {
      expires: 3600
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      'refreshToken'
    );
  });

  it('должен обрабатывать setUser', () => {
    store.dispatch(setUser(mockUser));
    const state = store.getState().auth;
    expect(state.user).toEqual(mockUser);
    expect(state.authorized).toBe(true);
  });

  it('должен обрабатывать clearData', () => {
    store.dispatch(clearData());
    const state = store.getState().auth;
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.authorized).toBe(false);
    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
  });

  it('должен обрабатывать setDesiredUrl', () => {
    const url = '/profile';
    store.dispatch(setDesiredUrl(url));
    const state = store.getState().auth;
    expect(state.desiredUrl).toBe(url);
  });

  it('должен обрабатывать checkAuth.pending', () => {
    store.dispatch(checkAuth.pending('auth/checkAuth/pending'));
    const state = store.getState().auth;
    expect(state.authIsChecking).toBe(true);
  });

  it('должен обрабатывать checkAuth.fulfilled', () => {
    store.dispatch(checkAuth.fulfilled(undefined, 'auth/checkAuth/fulfilled'));
    const state = store.getState().auth;
    expect(state.authIsChecking).toBe(false);
  });

  it('должен обрабатывать checkAuth.rejected', () => {
    store.dispatch(
      checkAuth.rejected(new Error('error'), 'auth/checkAuth/rejected')
    );
    const state = store.getState().auth;
    expect(state.authIsChecking).toBe(false);
    expect(state.user).toEqual({ name: '', email: '' });
    expect(state.authorized).toBe(false);
  });

  it('должен обрабатывать fetchUserOrders.pending', () => {
    store.dispatch(fetchUserOrders.pending('auth/fetchUserOrders/pending'));
    const state = store.getState().auth;
    expect(state.ordersIsLoading).toBe(true);
  });

  it('должен обрабатывать fetchUserOrders.fulfilled', async () => {
    (getOrdersApi as jest.Mock).mockResolvedValueOnce(mockOrders);
    const action = await store.dispatch(
      fetchUserOrders.fulfilled(
        mockOrders.orders,
        'auth/fetchUserOrders/fulfilled'
      )
    );
    const state = store.getState().auth;
    expect(state.orders).toEqual(mockOrders.orders);
    expect(state.ordersIsLoading).toBe(false);
  });

  it('должен обрабатывать fetchUserOrders.rejected', () => {
    store.dispatch(
      fetchUserOrders.rejected(
        new Error('error'),
        'auth/fetchUserOrders/rejected'
      )
    );
    const state = store.getState().auth;
    expect(state.ordersIsLoading).toBe(false);
  });
});
