import { createContext, useState } from "react";

const FavoriteProductsContext = createContext({
    favorites: [],
    addFavoriteProduct: (prodcutId) => { },
    removeFavoriteProduct: (prodcutId) => { },
    productIsFavorite: (prodcutId) => { },
});

export function FavoriteProductProvider(props, { data }) {

    const [favoriteProducts, setFavoriteProducts] = useState([])

    const addFavoriteProduct = (prodcutId) => {
        setFavoriteProducts((prevFavoriteProducts) => {
            return prevFavoriteProducts.concat(prodcutId);
        });
    }

    function removeFavoriteProduct(prodcutId) {
        setFavoriteProducts(prevFavoriteProducts => {
            return prevFavoriteProducts.filter(prod => prod.id !== prodcutId);
        });
    }

    function productIsFavorite(prodcutId, favState) {
        if (favState) {
            return true
        }
        else {
            return favoriteProducts.some(prod => prod.id === prodcutId);
        }
    }

    const contextProducts = {
        favorites: favoriteProducts,
        addFavoriteProduct: addFavoriteProduct,
        removeFavoriteProduct: removeFavoriteProduct,
        productIsFavorite: productIsFavorite,
    };

    return (
        <FavoriteProductsContext.Provider value={contextProducts}>
            {props.children}
        </FavoriteProductsContext.Provider>
    )
}

export default FavoriteProductsContext
