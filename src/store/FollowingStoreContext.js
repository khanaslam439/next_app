import { createContext, useState } from "react";

const FollowingStoreContext = createContext({
  followings: [],
  addFollowingStore: (followingStore) => { },
  removeFollowingStore: (StoreId) => { },
  storeIsFollowing: (StoreId) => { },
});

export function FollowingStoreProvider(props) {
  const [followingStores, setFollowingStores] = useState([]);

  const addFollowingStore = (followingStore) => {
    setFollowingStores((prevFollowingStores) => {
      return prevFollowingStores.concat(followingStore);
    });
  };

  function removeFollowingStore(storeId) {
    setFollowingStores((prevFollowingStores) => {
      return prevFollowingStores.filter((store) => store.id !== storeId);
    });
  }

  function storeIsFollowing(storeId, followState) {
    if (followState) {
      return true
    }
    else {
      return followingStores.some((store) => store.id === storeId);
    }
  }

  const contextStore = {
    followings: followingStores,
    addFollowingStore: addFollowingStore,
    removeFollowingStore: removeFollowingStore,
    storeIsFollowing: storeIsFollowing,
  };

  return (
    <FollowingStoreContext.Provider value={contextStore}>
      {props.children}
    </FollowingStoreContext.Provider>
  );
}

export default FollowingStoreContext;
