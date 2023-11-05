const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        cart: new Map(),
      };
    case "REMOVE_ITEM":
      const newCart = new Map(state.cart);
      newCart.delete(action.payload.id);
      return {
        ...state,
        cart: newCart,
      };
    default:
      return state;
  }
};
export default reducer;
