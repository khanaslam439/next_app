import { createContext, useState } from "react";

const FavoriteStoreContext = createContext({
  favorites: [],
  addFavoriteStore: (favoriteStore) => {},
  removeFavoriteStore: (StoreId) => {},
  storeIsFavorite: (StoreId) => {},
});

export function FavoriteStoreProvider(props) {
  const [favoriteStores, setFavoriteStores] = useState([]);

  const addFavoriteStore = (favStore) => {
    setFavoriteStores((prevFavStores) => {
      return prevFavStores.concat(favStore);
    });
  };

  function removeFavoriteStore(storeId) {
    setFavoriteStores((prevFavStores) => {
      return prevFavStores.filter((store) => store.id !== storeId);
    });
  }

  function storeIsFavorite(storeId, favState) {
    if (favState) {
        return true
    }
    else {
        return favoriteStores.some(store => store.id === storeId);
    }
}

  const contextStore = {
    favorites: favoriteStores,
    addFavoriteStore: addFavoriteStore,
    removeFavoriteStore: removeFavoriteStore,
    storeIsFavorite: storeIsFavorite,
  };

  return (
    <FavoriteStoreContext.Provider value={contextStore}>
      {props.children}
    </FavoriteStoreContext.Provider>
  );
}

export default FavoriteStoreContext;
