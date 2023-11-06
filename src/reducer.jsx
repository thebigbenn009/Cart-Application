const roundToTwoDecimalPlaces = (number) => {
  const roundedNumber = Number(number).toFixed(2);
  return parseFloat(roundedNumber);
};
const calculateTotals = (newItems) => {
  const inappropriateTotals = newItems
    .map((item) => item.amount * item.price)
    .reduce((a, b) => a + b, 0);
  return roundToTwoDecimalPlaces(inappropriateTotals);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        cartTotal: 0,
      };
    case "REMOVE_ITEM":
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      const removedItem = state.cart.find((item) => item.id === action.payload);

      return {
        ...state,
        cart: newCart,
        cartTotal: state.cartTotal - removedItem.amount,
        totalPriceInCart: calculateTotals(newCart),
      };
    case "INCREASE":
      const newItem = state.cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });

      return {
        ...state,
        cart: newItem,
        cartTotal: state.cartTotal + 1,
        totalPriceInCart: calculateTotals(newItem),
      };
    case "DECREASE":
      const newItems = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount > 0);

      return {
        ...state,
        cart: newItems,
        cartTotal: state.cartTotal - 1,
        totalPriceInCart: calculateTotals(newItems),
      };

    default:
      return state;
  }
};
export default reducer;
