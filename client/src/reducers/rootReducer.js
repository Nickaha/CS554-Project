import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import selectReducer from './selectReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  selected: selectReducer,
  user: userReducer
});

export default rootReducer;