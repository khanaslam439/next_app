import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import classes from "../../styles/products.module.css";
import storeLogo from "../../Assets/Images/store/storeLogo.png";
import { API_END_POINT } from "../../components/appConfig/AppConfig";
import { Button } from "react-bootstrap";
import strings from "../../Assets/Local/Local";
import FavoriteProductsContext from "../../store/FavoriteProductContext";
import UserCtx from "../../store/UserContext";
import { useRouter } from "next/router";

function Productcard(props) {
  const [prodCount, setProdCount] = useState(0);
  const { token } = useContext(UserCtx);
  const [showCount, setShowCount] = useState(false);
  const favoriteCtx = useContext(FavoriteProductsContext);
  const productIsFavorite = favoriteCtx.productIsFavorite(
    props.prodData.id,
    props.favState
  );
  const router = useRouter();

  function loginFirst() {
    router.push({
      pathname: "/Tajawal/login",
    });
  }

  function toggleProductFavorite() {
    if (productIsFavorite) {
      favoriteCtx.removeFavoriteProduct(props.prodData.id);
      props.removeProductFromFavorite(props.prodData.id);
    } else {
      favoriteCtx.addFavoriteProduct(props.prodData);
      props.favState === true
        ? ""
        : props.addProductToFavorite(props.prodData.id);
    }
  }

  strings.setLanguage(props.lang);

  useEffect(() => {
    if (localStorage.getItem("userCart") !== null) {
      let userCartArray = [];
      let selectedIndex = -1;
      userCartArray = JSON.parse(localStorage.getItem("userCart"));
      let result = userCartArray.filter((prod, index) => {
        if (prod.id === props.prodData.id) {
          selectedIndex = index;
          return prod.id === props.prodData.id;
        }
      });
      if (selectedIndex !== -1) {
        setShowCount(true);
        let count = result[0].count;
        setProdCount(count);
        selectedIndex = -1;
      }
    }
  }, []);

  function addToCart(productData, count) {
    // Modification BY  Bashandy

    let userCartArray = localStorage.getItem("userCart")
      ? JSON.parse(localStorage.getItem("userCart"))
      : [];
    let TraderArray = localStorage.getItem("traderCart")
      ? JSON.parse(localStorage.getItem("traderCart"))
      : [];

    let traderId = TraderArray.includes(productData.trader.id);
    if (!traderId) {
      TraderArray.push(productData.trader.id);
      localStorage.setItem("traderCart", JSON.stringify(TraderArray));
    }
    let products = userCartArray.some((el) => el.id === productData.id);
    if (products) {
      let index = userCartArray.findIndex((el) => el.id === productData.id);
      if (count > 0) {
        userCartArray[index].count = count;
        localStorage.setItem("userCart", JSON.stringify(userCartArray));
      } else {
        userCartArray.splice(index, 1);
        localStorage.setItem("userCart", JSON.stringify(userCartArray));
      }
    } else {
      productData.count = 1;
      userCartArray.push(productData);
      localStorage.setItem("userCart", JSON.stringify(userCartArray));
    }
  }
  function increaseProductCount() {
    setShowCount(true);
    let count = prodCount + 1;
    addToCart(props.prodData, count);
    setProdCount(count);
    // }
    // }
  }
  function decreaseProductCount() {
    if (prodCount - 1 === 0) {
      setShowCount(false);
      setProdCount(0);
      addToCart(props.prodData, 0);
    } else {
      let count = prodCount - 1;
      setProdCount(count);
      addToCart(props.prodData, count);
    }
  }

  return (
    <div
      className={
        classes.productcard + " mb-4 py-3 px-2 bg-white shadow-sm rounded"
      }
    >
      <div className={classes.productBtns + " position-relative"}>
        <Button
          onClick={
            Object.keys(token).length !== 0 ? toggleProductFavorite : loginFirst
          }
          className={
            classes.productFav + " position-absolute border d-lg-none d-block "
          }
          style={{
            color: productIsFavorite ? "#F15A24" : "#9EA4AF",
            top: "-10px",
            left: props.lang === "ar" ? "0" : "",
            right: props.lang === "en" ? "0" : "",
            zIndex: "50",
          }}
        >
          <i className="fas fa-heart"></i>
        </Button>
      </div>
      <Link href={`/Tajawal/products/${props.prodData.id}`}>
        <div
          className={props.lang === "ar" ? "text-right" : "text-left"}
          style={{ cursor: "pointer" }}
        >
          <div
            className={
              classes.productImg +
              " d-flex justify-content-center align-items-center mx-auto mb-2 pt-lg-0 pt-4"
            }
          >
            <img
              src={
                props.prodData.slider && props.prodData.slider.length > 0
                  ? `${API_END_POINT}/${props.prodData.slider[0]}`
                  : storeLogo
              }
              alt={props.prodData.name}
              className="img-fluid"
            />
          </div>
          <h4 className="mb-2">{props.prodData.name}</h4>
          <span>
            <i className="fas fa-star"></i> {props.prodData.rate.toFixed(1)}
          </span>
          <p className={classes.productPrice + " mt-1 mb-2"}>
            {props.prodData.price}{" "}
            <span className="mx-2">{strings.currency}</span>
          </p>
        </div>
      </Link>
      <div className={classes.productBtns + " d-flex justify-content-between"}>
        {showCount ? (
          <Button className="w-100 text-white d-flex justify-content-around align-items-center addToCartHandleBTN">
            <i className="fas fa-plus" onClick={increaseProductCount}></i>
            <span>{prodCount}</span>
            <i className="fas fa-minus" onClick={decreaseProductCount}></i>
          </Button>
        ) : (
          <Button onClick={increaseProductCount} className="w-100">
            {strings.addToCartBTN}
          </Button>
        )}
        <Button
          onClick={
            Object.keys(token).length !== 0 ? toggleProductFavorite : loginFirst
          }
          className={classes.productFav + " mx-2 border d-lg-block d-none"}
          style={{ color: productIsFavorite ? "#F15A24" : "#9EA4AF" }}
        >
          <i className="fas fa-heart"></i>
        </Button>
      </div>
    </div>
  );
}

export default Productcard;
