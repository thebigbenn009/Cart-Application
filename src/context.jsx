import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import reducer from "./reducer";
import cartItems from "./data";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const initialState = {
    loading: false,
    cart: new Map(cartItems.map((item) => [item.id, item])),
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };
  return (
    <AppContext.Provider value={{ ...state, clearCart, removeItem }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
