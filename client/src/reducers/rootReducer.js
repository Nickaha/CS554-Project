import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import selectReducer from './selectReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  selected: selectReducer
});

export default rootReducer;