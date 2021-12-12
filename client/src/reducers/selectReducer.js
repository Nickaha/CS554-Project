const initalState = 
    {
      pickup_or_takeout: null,
      selected_bowl_name: null,
      protein_count: null,
      selected_base: null,
      selected_protein: null,
      selected_topping: null,
      selected_sauce: null,
      editing_item: null
    }

const selectReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SELECT_PICKUP_OR_TAKEOUT':
      return { ...state, pickup_or_takeout: payload.pickup_or_takeout};
    case 'SELECT_BOWL_NAME':
      return { ...state, selected_bowl_name: payload.selected_bowl_name};
    case 'SELECT_PROTEIN_COUNT':
      return { ...state, protein_count: payload.protein_count};
    case 'SELECT_BASE':
      return { ...state, selected_base: payload.selected_base};
    case 'SELECT_PROTEIN':
      return { ...state, selected_protein: payload.selected_protein};
    case 'SELECT_TOPPING':
      return { ...state, selected_topping: payload.selected_topping};
    case 'SELECT_SAUCE':
      return { ...state, selected_sauce: payload.selected_sauce};
    case 'EDITING_ITEM':
      return { ...state, editing_item: payload.editing_item};
    
    default:
      return state;
  }
};

export default selectReducer;