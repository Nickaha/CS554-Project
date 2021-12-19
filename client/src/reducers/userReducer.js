import { v4 as uuid } from 'uuid';

const initalState = {id:uuid()};

// Hacky fix -- Give the state an ID for order viewing.
const userReducer = (state = initalState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case 'CHANGE_ID':
        return { ...state, id: payload.id};

      default:
        return state;
    }
  };
  
export default userReducer;