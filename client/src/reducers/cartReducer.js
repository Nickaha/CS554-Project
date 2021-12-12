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
          name: payload.name,
          base: payload.base,
          protein: payload.protein,
          topping: payload.topping,
          sauce: payload.sauce
        }
      ];
    case 'DELETE_FROM_CART':
      copyState = [...state];
      index = copyState.findIndex((x) => x.name === payload.name);
      copyState.splice(index, 1);
      return [...copyState];
    
    case 'EDIT_ITEM_IN_CART':
      copyState = [...state];
      index = copyState.findIndex((x) => x.name === payload.name);
      copyState[index] = 
      {
        name: payload.name,
        base: payload.base,
        protein: payload.protein,
        topping: payload.topping,
        sauce: payload.sauce
      };
      return [...copyState];
    
    
    default:
      return state;
  }
};

export default cartReducer;