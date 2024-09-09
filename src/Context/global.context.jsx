import { createContext, useEffect, useContext, useReducer } from "react";

export const initialState = { theme: "" };

export const ContextGlobal = createContext(undefined);

const reducer = (state, action) => {
  const theme = state.theme === "light" ? "dark" : "light";
 
  switch (action.type) {
    case "INITIAL_THEME":
      return { ...state, theme: action.payload };
    case "TOGGLE_THEME":
      localStorage.setItem('darkMode',JSON.stringify({theme}))
      return { ...state, theme: theme };
    default:
      throw new Error();
  }
};

export const Context = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const tempTheme = localStorage.getItem('darkMode');
    dispatch({ type: "INITIAL_THEME", payload: tempTheme ? JSON.parse(tempTheme).theme : "light" });
  }, []);

  return (
    <ContextGlobal.Provider
      value={{
        theme: state.theme,
        toggleTheme: () => dispatch({ type: "TOGGLE_THEME" }),
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};

export default Context;

export const useDarkModeStates = () => useContext(ContextGlobal);
