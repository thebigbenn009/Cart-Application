import { useEffect, useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import reducer from "./reducer";
import cartItems from "./data";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const initialState = {
    loading: false,
    cart: [...cartItems],
    cartTotal: cartItems.map((item) => item.amount).reduce((a, b) => a + b, 0),
    numOfItems: "",
    totalPriceInCart: cartItems
      .map((item) => item.amount * item.price)
      .reduce((a, b) => a + b, 0),
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const increaseItem = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  const decreaseItem = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, removeItem, increaseItem, decreaseItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
