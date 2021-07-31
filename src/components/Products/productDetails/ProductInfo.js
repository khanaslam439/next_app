import { useContext, useState, useEffect } from "react";
import classes from "../../../styles/productDetails.module.css";
import ReactStars from "react-rating-stars-component";
import strings from "../../../Assets/Local/Local";
import UserCtx from "../../../store/UserContext";
import { API_END_POINT } from "../../appConfig/AppConfig";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

function ProductInfo(props) {
  const { token } = useContext(UserCtx);
  const [prodCount, setProdCount] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.productData.favorite);

  const router = useRouter();

  function loginFirst() {
    router.push({
      pathname: "/Tajawal/login",
    });
  }

  // handle favorite
  function addToFavorite() {
    let url = `${API_END_POINT}/favorites`;
    let dataBody = {
      product: props.productData.id,
    };
    axios
      .post(url, dataBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": props.lang,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("success Request");
        setIsFavorite(true);
      })
      .catch((error) => console.log("failed request: ", error.response));
  }
  function removeFromFavorite() {
    let url = `${API_END_POINT}/favorites`;
    let dataBody = {
      product: props.productData.id,
    };
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: dataBody,
      })
      .then(() => {
        console.log("success Request remove");
        setIsFavorite(false);
      })
      .catch((error) => console.log("failed request remove: ", error.response));
  }
  // handle favorite

  useEffect(() => {
    if (localStorage.getItem("userCart") !== null) {
      console.log("props.productData.favorite: ", props.productData.favorite);
      let userCartArray = [];
      let selectedIndex = -1;
      userCartArray = JSON.parse(localStorage.getItem("userCart"));
      let result = userCartArray.filter((prod, index) => {
        if (prod.id === props.productData.id) {
          selectedIndex = index;
          return prod.id === props.productData.id;
        }
      });
      if (selectedIndex !== -1) {
        setIsAddedToCart(true);
        let count = result[0].count;
        setProdCount(count);
        selectedIndex = -1;
      }
    }
  }, []);

  // Start handle shopping cart
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

    // if (localStorage.getItem("userCart") === null) {
    //   userCartArray.push(productData);
    //   TraderArray.push(productData.trader);
    //   productData.count = 1;
    //   localStorage.setItem("userCart", JSON.stringify(userCartArray));
    //   localStorage.setItem("traderCart", JSON.stringify(TraderArray));
    // } else {
    //   userCartArray = JSON.parse(localStorage.getItem("userCart"));
    //   TraderArray = JSON.parse(localStorage.getItem("traderCart"));
    //   let result = userCartArray.filter((prod, index) => {
    //     if (prod.id === props.productData.id) {
    //       selectedIndex = index;
    //       return prod.id === props.productData.id;
    //     }
    //   });
    //   if (selectedIndex === -1) {
    //     userCartArray.push(productData);
    //     TraderArray.push(productData.trader);
    //     productData.count = 1;
    //     localStorage.setItem("userCart", JSON.stringify(userCartArray));
    //     localStorage.setItem("traderCart", JSON.stringify(TraderArray));
    //   } else {
    //     if (count === 0) {
    //       userCartArray.splice(selectedIndex, 1);
    //       localStorage.setItem("userCart", JSON.stringify(userCartArray));
    //       selectedIndex = -1;
    //     } else {
    //       result[0].count = count;
    //       userCartArray.splice(selectedIndex, 1, result[0]);
    //       localStorage.setItem("userCart", JSON.stringify(userCartArray));
    //       selectedIndex = -1;
    //     }
    //   }
    // }
  }
  function increaseProductCount() {
    setIsAddedToCart(true);
    let count = prodCount + 1;
    if (count > props.productData.quantity) {
      count = props.productData.quantity;
      addToCart(props.productData, count);
      setProdCount(count);
    } else {
      addToCart(props.productData, count);
      setProdCount(count);
    }
  }

  function decreaseProductCount() {
    if (prodCount - 1 === 0) {
      setIsAddedToCart(false);
      setProdCount(0);
      addToCart(props.productData, 0);
    } else {
      let count = prodCount - 1;
      setProdCount(count);
      addToCart(props.productData, count);
    }
  }
  // End handle shopping cart

  // Start Rating
  const ratingChanged = (newRating) => {
    if (Object.keys(token).length !== 0) {
      addRate(newRating);
    } else {
      loginFirst();
    }
  };

  function addRate(rate) {
    let url = `${API_END_POINT}/rate`;
    let dataBody = {
      rate: rate,
      product: props.productData.id,
    };
    axios
      .post(url, dataBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": props.lang,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        props.ratingProduct(response);
      })
      .catch((error) =>
        console.log("Error request: ", error.response, props.productData)
      );
  }
  // End Rating

  strings.setLanguage(props.lang);

  return (
    <div className={classes.prodInfo}>
      <div>
        <h4 className={classes.prodName}>{props.productData.name}</h4>
        {props.productData.rate !== 0 && (
          <span className={classes.prodRate}>
            <i className="fas fa-star"></i> {props.productData.rate.toFixed(2)}
          </span>
        )}
        <p className={classes.prodPrice}>
          {props.productData.price}{" "}
          <span className="mx-2">{strings.currency}</span>
        </p>
        {props.productData.priceIncludeTaxes ? (
          <p className={classes.prodTax}>{strings.priceVAT}</p>
        ) : (
          <p className={classes.prodTax}>{strings.notPriceVAT}</p>
        )}
      </div>
      <div className={classes.prodStatus + " border-top border-bottom py-3"}>
        <h6>
          {strings.productState}:{" "}
          {props.productData.useStatus === "NEW"
            ? strings.productState1
            : strings.productState2}
        </h6>
        <h6>
          {strings.theSeller}: <span>{props.productData.trader.name}</span>
        </h6>
      </div>
      <div className={classes.adFavCart + " d-flex border-bottom pb-3 mb-3"}>
        {isAddedToCart ? (
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
            Object.keys(token).length !== 0
              ? isFavorite
                ? removeFromFavorite
                : addToFavorite
              : loginFirst
          }
          className={classes.prodFav + " px-2 mx-2 border rounded"}
          style={{ color: isFavorite ? "#f15a24" : "#9ea4af" }}
        >
          <i className="fas fa-heart"></i>
        </Button>
      </div>
      <div
        className={
          classes.prodAdRate +
          " bg-white py-2 d-flex justify-content-between align-items-center shadow-sm"
        }
      >
        <span className="px-3">{strings.addYourRate}</span>
        <div className={classes.rating + " px-2"}>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={22}
            activeColor="#F15A24"
            value="0"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
