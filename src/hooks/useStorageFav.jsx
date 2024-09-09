// import { toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

export function useStorageFav() {
  const [favs, setFavs] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const key = "favs";

  // Removed toast notifications (optional, uncomment if needed)
  // const notifyAdded = (name) => toast(`${name} has been added to favs!`);
  // const notifyOut = (name) => toast(`${name} has been took off from favs!`);

  useEffect(() => {
    loadFavs();
  }, []);

  const addFavs = async (fav) => {
    if (!fav || typeof fav !== "object" || !fav.id) {
      console.error("Invalid fav object:", fav);
      return;
    }

    const exists = favs.some((f) => f.id === fav.id);
    if (exists) {
      console.warn("Fav already exists:", fav);
      return;
    }

    const tempFavs = [...favs, fav];
    setFavs(tempFavs); // Update state for UI feedback (consider debouncing)

    try {
      const currentTimestamp = Date.now(); // Track time for potential debouncing
      const pendingChanges = [fav]; // Array to store upcoming changes

      const saveBatch = async () => {
        if (pendingChanges.length > 0) {
          const updatedFavs = [...favs, ...pendingChanges];
          const updatedFavIds = updatedFavs.map((obj) => obj.id);
          await saveFavs(updatedFavs);
          setFavs(updatedFavs);
          setFavIds(updatedFavIds);
          pendingChanges.length = 0; 
        }
      };

      const debouncedSave = setTimeout(saveBatch, 500); 

      const handleSave = async () => {
        clearTimeout(debouncedSave); 
        await saveBatch(); 
      };

      await handleSave(); 

      //   notifyAdded(fav.name); // Use fav.name directly (assuming it exists)
    } catch (error) {
      console.error("Error saving favs:", error);

      // Optionally, revert state if saving fails (consider user feedback)
      // setFavs(favs); // Revert to original state if needed
    }
  };

  const loadFavs = async () => {
    const storedFavs = localStorage.getItem(key);

    if (storedFavs) {
      try {
        const parsedFavs = JSON.parse(storedFavs);
        setFavs(parsedFavs);
        const ids = parsedFavs.map((obj) => obj.id);
        setFavIds(ids);
      } catch (error) {
        console.error("Error parsing stored favs:", error);
      }
    } else {
      saveFavs([]);
    }
  };

  const updateFavs = async (updatedFav) => {
    // Validate updatedFav object
    if (!updatedFav || typeof updatedFav !== "object" || !updatedFav.id) {
      console.error("Invalid updatedFav object:", updatedFav);
      return;
    }

    // Find the index of the fav to update
    const index = favs.findIndex((fav) => fav.id === updatedFav.id);
    if (index === -1) {
      console.warn("Fav not found:", updatedFav);
      return;
    }

    // Update the fav
    const newFavs = [...favs];
    newFavs[index] = updatedFav;
    setFavs(newFavs);
    await saveFavs(newFavs);
  };

  const deleteFavs = async (id) => {
    const remainingFavs = favs.filter((fav) => fav.id !== id);

    if (remainingFavs.length === favs.length) {
      console.warn("Fav not found:", id);
      return;
    }

    setFavs(remainingFavs);

    // const removedFav = favs.find((fav) => fav.id === id);
    // const removedFavName = removedFav ? removedFav.name : "";

    // Remove from favIds state
    const updatedFavIds = remainingFavs.map((fav) => fav.id);
    setFavIds(updatedFavIds);

    // Call notifyOut with removedFavName (if found)
    // notifyOut(removedFavName);

    await saveFavs(remainingFavs);
  };

  const checkIfIsFavorite = (id) => {
    return favIds.includes(id);
  };

  const saveFavs = async (favsToSave) => {
    try {
      localStorage.setItem(key, JSON.stringify(favsToSave));
    } catch (error) {
      console.error("Error saving favs:", error);
    }
  };

  return { favs, addFavs, updateFavs, deleteFavs, favIds, checkIfIsFavorite };
}
