import { useEffect, useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import reducer from "./reducer";
import cartItems from "./data";
const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const initialState = {
    loading: false,
    cart: [],
    cartTotal: 0,
    totalPriceInCart: 0,
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
  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: "FETCH_DATA", payload: data });
  };
  useEffect(() => {
    fetchData();
  }, []);
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
