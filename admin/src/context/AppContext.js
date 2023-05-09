import { createContext, useReducer } from "react";
import DarkModeReducer from "./DarkModeReducer";

const INITIAL_STATE = {
  darkMode: false,
};

export const AppContext = createContext(INITIAL_STATE);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <AppContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
