const addToCart = (name, base, protein, topping, sauce, price) => ({
    type: 'ADD_TO_CART',
    payload: {
        name: name,
        base: base,
        protein: protein,
        topping: topping,
        sauce: sauce,
        price: price
    }
});

const deleteFromCart = (id) => ({
    type: 'DELETE_FROM_CART',
    payload: {
        id: id,
    }
});

const editItemInCart = (id, name, base, protein, topping, sauce, price) => ({
    type: 'EDIT_ITEM_IN_CART',
    payload: {
        id: id,
        name: name,
        base: base,
        protein: protein,
        topping: topping,
        sauce: sauce,
        price: price
    }
});

const selectPickupOrTakeout = (choice) => ({
    type: 'SELECT_PICKUP_OR_TAKEOUT',
    payload: {
        pickup_or_takeout: choice
    }
});

const selectBowlName = (bowl_name) => ({
    type: 'SELECT_BOWL_NAME',
    payload: {
        selected_bowl_name: bowl_name
    }
});

const selectProteinCount = (n) => ({
    type: 'SELECT_PROTEIN_COUNT',
    payload: {
        protein_count: n
    }
});

const selectBase = (b) => ({
    type: 'SELECT_BASE',
    payload: {
        selected_base: b
    }
});

const selectProtein = (p) => ({
    type: 'SELECT_PROTEIN',
    payload: {
        selected_protein: p
    }
});

const selectTopping = (t) => ({
    type: 'SELECT_TOPPING',
    payload: {
        selected_topping: t
    }
});

const selectSauce = (s) => ({
    type: 'SELECT_SAUCE',
    payload: {
        selected_sauce: s
    }
});

const editingItem = () => ({
    type: 'EDITING_ITEM',
    payload: {
        editing_item: true
    }
});

const changeId = (id) => ({
    type: 'CHANGE_ID',
    payload:{
        id: id
    }
});


module.exports = {
  addToCart,
  deleteFromCart,
  editItemInCart,
  selectPickupOrTakeout,
  selectBowlName,
  selectProteinCount,
  selectBase,
  selectProtein,
  selectTopping,
  selectSauce,
  editingItem,
  changeId
};

