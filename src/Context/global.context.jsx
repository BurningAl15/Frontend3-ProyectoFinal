import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createContext, useEffect, useContext, useReducer } from "react";

export const initialState = { theme: "", favIds: [] };

export const GlobalContext = createContext(undefined);

const reducer = (state, action) => {
  const theme = state.theme === "light" ? "dark" : "light";

  switch (action.type) {
    // Dark Mode
    case "INITIAL_THEME":
      return { ...state, theme: action.payload };
    case "TOGGLE_THEME":
      localStorage.setItem("darkMode", JSON.stringify({ theme }));
      return { ...state, theme: theme };

    // Favorites
    case "ADD_FAV":
      if (state.favIds.includes(action.payload)) {
        console.warn("Fav ID already exists:", action.payload);
        return state;
      }

      return {
        ...state,
        favIds: [...state.favIds, action.payload],
      };
    case "REMOVE_FAV":
      const index = state.favIds.findIndex((favId) => favId === action.payload);
      if (index === -1) {
        console.warn("Fav ID not found:", action.payload);
        return state;
      }

      const remainingFavIds = state.favIds.filter(
        (favId) => favId !== action.payload
      );
      return {
        ...state,
        favIds: remainingFavIds,
      };
    case "LOAD_FAVS":
      return {
        ...state,
        favIds: action.payload,
      };
    default:
      return state;
  }
};

export const Context = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo
  const [state, dispatch] = useReducer(reducer, initialState);

  const { favIds, theme } = state;
  const key = "favIds";

  const notifyAdding = (name) => toast(`${name} added to favs`);
  const notifyRemoving = (name) => toast(`${name} removed from favs`);

  useEffect(() => {
    const tempTheme = localStorage.getItem("darkMode");
    dispatch({
      type: "INITIAL_THEME",
      payload: tempTheme ? JSON.parse(tempTheme).theme : "light",
    });

    loadFavs();
  }, []);

  const addFav = async (id) => {
    if (!id) {
      console.error("Invalid fav ID");
      return;
    }

    dispatch({ type: "ADD_FAV", payload: id });

    try {
      await saveFavs(favIds);
    } catch (error) {
      console.error("Error saving fav IDs:", error);
    }
  };

  const removeFav = async (id) => {
    if (!id) {
      console.error("Invalid fav ID");
      return;
    }

    dispatch({ type: "REMOVE_FAV", payload: id });

    try {
      await saveFavs(favIds);
    } catch (error) {
      console.error("Error saving fav IDs:", error);
    }
  };

  const checkIfIsFavorite = (id) => {
    return favIds.includes(id);
  };

  const loadFavs = async () => {
    const storedFavIds = localStorage.getItem(key);

    if (storedFavIds) {
      try {
        const parsedFavIds = JSON.parse(storedFavIds);
        dispatch({ type: "LOAD_FAVS", payload: parsedFavIds });
      } catch (error) {
        console.error("Error parsing stored fav IDs:", error);
      }
    } else {
      saveFavs([]);
    }
  };

  const saveFavs = async (favIdsToSave) => {
    try {
      localStorage.setItem(key, JSON.stringify(favIdsToSave));
    } catch (error) {
      console.error("Error saving fav IDs:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        toggleTheme: () => dispatch({ type: "TOGGLE_THEME" }),

        favIds,
        addFav,
        removeFav,
        checkIfIsFavorite,
        notifyAdding,
        notifyRemoving,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
