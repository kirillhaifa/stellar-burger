import { combineReducers } from 'redux';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import ordersReducer from './slices/ordersSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  orders: ordersReducer,
  auth: authReducer
});

export default rootReducer;
