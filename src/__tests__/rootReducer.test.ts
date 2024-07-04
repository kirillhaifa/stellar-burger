import { createStore } from 'redux';
import rootReducer from 'src/services/rootReducer'; // путь через алиас
import ingredientsReducer from 'src/services/slices/ingredientsSlice';
import constructorReducer from 'src/services/slices/constructorSlice';
import ordersReducer from 'src/services/slices/ordersSlice';
import authReducer from 'src/services/slices/authSlice';
import orderReducer from 'src/services/slices/orderSlice';

describe('rootReducer', () => {
  it('should initialize with correct default state', () => {
    // Создаем стор с использованием rootReducer
    const store = createStore(rootReducer);

    // Получаем начальное состояние стора
    const initialState = store.getState();

    // Ожидаемое начальное состояние
    const expectedInitialState = {
      ingredients: ingredientsReducer(undefined, { type: '@@INIT' }),
      constructorBurger: constructorReducer(undefined, { type: '@@INIT' }),
      orders: ordersReducer(undefined, { type: '@@INIT' }),
      auth: authReducer(undefined, { type: '@@INIT' }),
      order: orderReducer(undefined, { type: '@@INIT' })
    };

    // Проверяем, что начальное состояние соответствует ожидаемому
    expect(initialState).toEqual(expectedInitialState);
  });
});
