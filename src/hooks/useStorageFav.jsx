import { useState, useEffect } from 'react';

function useStorageFav() {
    const [favs, setFavs] = useState([]);
    const [favIds, setFavIds] = useState([]);
    const key = 'favs';

    useEffect(() => {
        loadFavs();
    }, []);

    const addFavs = (fav) => {
        // Validate fav object
        if (!fav || typeof fav !== 'object' || !fav.id) {
            console.error('Invalid fav object:', fav);
            return;
        }

        // Check if fav already exists
        const exists = favs.some((f) => f.id === fav.id);
        if (exists) {
            console.warn('Fav already exists:', fav);
            return;
        }

        // Add fav to the list of favs
        const newFavs = [...favs, fav];
        setFavs(newFavs);
        const ids = newFavs.map((obj) => obj.id);
        setFavIds(ids)
        saveFavs(newFavs);
    };

    const loadFavs = () => {
        const storedFavs = localStorage.getItem(key);

        if (storedFavs) {
            try {
                const parsedFavs = JSON.parse(storedFavs);
                setFavs(parsedFavs);
                const ids = parsedFavs.map((obj) => obj.id);
                setFavIds(ids)
            } catch (error) {
                console.error('Error parsing stored favs:', error);
            }
        } else {
            saveFavs([]);
        }
    };

    const updateFavs = (updatedFav) => {
        // Validate updatedFav object
        if (!updatedFav || typeof updatedFav !== 'object' || !updatedFav.id) {
            console.error('Invalid updatedFav object:', updatedFav);
            return;
        }

        // Find the index of the fav to update
        const index = favs.findIndex((fav) => fav.id === updatedFav.id);
        if (index === -1) {
            console.warn('Fav not found:', updatedFav);
            return;
        }

        // Update the fav
        const newFavs = [...favs];
        newFavs[index] = updatedFav;
        setFavs(newFavs);
        saveFavs(newFavs);
    };

    const deleteFavs = (id) => {
        // Find the index of the fav to delete
        const index = favs.findIndex((fav) => fav.id === id);
        if (index === -1) {
            console.warn('Fav not found:', id);
            return;
        }

        // Delete the fav
        const newFavs = [...favs];
        newFavs.splice(index, 1);
        setFavs(newFavs);
        const ids = newFavs.map((obj) => obj.id);
        setFavIds(ids)
        saveFavs(newFavs);
    };

    const checkIfIsFavorite = (id) => {
        return favIds.includes(id);
    }

    const saveFavs = (favsToSave) => {
        try {
            localStorage.setItem(key, JSON.stringify(favsToSave));
        } catch (error) {
            console.error('Error saving favs:', error);
        }
    };

    return { favs, addFavs, updateFavs, deleteFavs, favIds, checkIfIsFavorite };
}

export default useStorageFav;
