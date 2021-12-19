import { v4 as uuid } from 'uuid';
const initalState = [];

let copyState = null;
let index = 0;


const cartReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CART':
      return [
        ...state,
        {
          id: uuid(),
          name: payload.name,
          base: payload.base,
          protein: payload.protein,
          topping: payload.topping,
          sauce: payload.sauce,
          price: payload.price
        }
      ];
    case 'DELETE_FROM_CART':
      copyState = [...state];
      index = copyState.findIndex((x) => x.id.toString() === payload.id.toString());
      copyState.splice(index, 1);
      return [...copyState];
    
    case 'EDIT_ITEM_IN_CART':
      copyState = [...state];
      index = copyState.findIndex((x) => x.id.toString() === payload.id.toString());
      copyState[index] = 
      {
        id: payload.id,
        name: payload.name,
        base: payload.base,
        protein: payload.protein,
        topping: payload.topping,
        sauce: payload.sauce,
        price: payload.price
      };
      return [...copyState];
    
    
    default:
      return state;
  }
};

export default cartReducer;