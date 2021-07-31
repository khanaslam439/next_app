import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Lottie from "react-lottie";

import strings from "../../../Assets/Local/Local";
import UserCtx from "../../../store/UserContext";
import LangCtx from "../../../store/LangContext";
import emptyCartJson from "../../../Assets/Lottie/emptyCart.json";

import adsImg1 from "../../../Assets/Images/ads3.png";
import adsImg2 from "../../../Assets/Images/ads4.png";

import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import ShoppingCart from "../../../components/Cards/ShoppingCart";

import styles from "../../../styles/shoppingCart.module.css";
const Cart = () => {
  const { lang } = useContext(LangCtx);
  const { user } = useContext(UserCtx);
  const [isUser, setIsUser] = useState(true);
  const [userCartArray, setUserCartArray] = useState(
    localStorage.getItem("userCart")
      ? JSON.parse(localStorage.getItem("userCart"))
      : []
  );

  const [TraderArray, setTraderArray] = useState(
    localStorage.getItem("traderCart")
      ? JSON.parse(localStorage.getItem("traderCart"))
      : []
  );

  const [totalPrice, setTotalPrice] = useState(
    userCartArray.reduce((accumulator, { price, offer, count }) => {
      if (offer) {
        return accumulator + (price - (offer * price) / 100) * count;
      } else return accumulator + price * count;
    }, 0)
  );

  const [totalProducts, setTotalProducts] = useState(userCartArray.length);
  const cartLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyCartJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const deleteProduct = (productId, traderId) => {
    const newCart = userCartArray.filter(({ id }) => id !== productId);
    let traderflag = newCart.some((el) => el.trader.id === traderId);
    console.log("flag ===>", traderflag);
    if (!traderflag) {
      const newTrader = TraderArray.filter((id) => id !== traderId);
      setTraderArray(newTrader);
      localStorage.setItem("traderCart", JSON.stringify(newTrader));
    }
    localStorage.setItem("userCart", JSON.stringify(newCart));
    setUserCartArray(newCart);
    setTotalProducts(newCart.length);
    totalPriceHandel();
  };

  const totalPriceHandel = () => {
    console.log("userCartArray", userCartArray);
    setTotalPrice(
      userCartArray.reduce((accumulator, { price, offer, count }) => {
        if (offer) {
          return accumulator + (price - (offer * price) / 100) * count;
        } else return accumulator + price * count;
      }, 0)
    );
  };

  const countHandel = (id, method, traderId) => {
    switch (method) {
      case "add":
        const newProudcts = userCartArray.map((product) => {
          if (product.id === id) {
            product.count += 1;
            return product;
          } else return product;
        });
        setUserCartArray(newProudcts);
        console.log("New Products", newProudcts);
        localStorage.setItem("userCart", JSON.stringify(newProudcts));

        break;
      case "remove":
        const newProudctsArray = userCartArray.map((product) => {
          if (product.id === id) {
            product.count !== 0 ? (product.count -= 1) : (product.count = 0);
            return product;
          } else return product;
        });
        const filteredProducts = newProudctsArray.filter(
          (item) => item.count !== 0
        );
        setUserCartArray(filteredProducts);
        localStorage.setItem("userCart", JSON.stringify(filteredProducts));

        let traderflag = filteredProducts.some(
          (el) => el.trader.id === traderId
        );
        if (!traderflag) {
          const newTrader = TraderArray.filter((id) => id !== traderId);
          setTraderArray(newTrader);
          localStorage.setItem("traderCart", JSON.stringify(newTrader));
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (userCartArray.length) {
      totalPriceHandel();
    }
    setTotalProducts(userCartArray.length);
  }, [userCartArray]);
  useEffect(() => {
    if (!Object.keys(user).length) {
      setIsUser(false);
    }
  }, [lang, user]);
  strings.setLanguage(lang);

  return (
    <>
      <MetaDecartor title={strings.cartTitle} />
      <div className={`container-fluid ${styles.shopping_cart}`}>
        <div className="row">
          {userCartArray.length ? (
            <>
              <div className={`col-lg-6 col-md-9`}>
                {TraderArray.length &&
                  TraderArray.map((trader, indexTrader) => {
                    let product = userCartArray.filter(
                      (el) => el.trader.id === trader
                    );
                    console.log("products ===>", product);
                    if (product.length) {
                      return (
                        <section
                          className={styles.market_item_container}
                          key={indexTrader}
                        >
                          <div className={styles.market_name}>
                            <h6>
                              <span>{strings.store}</span> :{" "}
                              {product[0].trader.name}
                            </h6>
                            {/* <p>{`${strings.priceDelivery} : ${item.deliveryCost} ${strings.currency}`}</p> */}
                          </div>
                          {product.length &&
                            product.map((product, index) => (
                              <ShoppingCart
                                product={product}
                                deleteProductHandel={deleteProduct}
                                key={index}
                                countHandel={countHandel}
                              />
                            ))}
                        </section>
                      );
                    }
                  })}
              </div>
              <div className={`col-lg-4 col-md-3`}>
                <div className={styles.products_sum}>
                  <p>
                    {strings.numOfProducts} : {totalProducts}{" "}
                    {totalProducts > 1 ? strings.Products : strings.product}
                  </p>
                </div>
                <div className={styles.cart_total}>
                  <p>{strings.total}</p>
                  <h6>
                    {totalPrice} {strings.currency}
                  </h6>
                  <small>{strings.taxValue}</small>
                </div>
                <Link href={isUser ? "/Tajawal/payment" : "/Tajawal/login"}>
                  <a className={styles.btn_checkout}>{strings.btncheckout}</a>
                </Link>
              </div>
            </>
          ) : (
            <div className={`col-lg-10 col-md-9 ${styles.cart__empty} `}>
              <Lottie options={cartLottieOptions} height={250} width={250} />
              <h6> {strings.cartEmpty} </h6>
            </div>
          )}
          <div className={`col-lg-2 col-md-3 ${styles.ads_container}`}>
            <div className={styles.img_container}>
              <img src={adsImg1} alt="ads" />
            </div>
            <div className={styles.img_container}>
              <img src={adsImg2} alt="ads" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
