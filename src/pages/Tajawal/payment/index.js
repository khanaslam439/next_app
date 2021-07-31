import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { orange } from "@material-ui/core/colors";
import axios from "axios";
import Lottie from "react-lottie";
import Snackbar from "@material-ui/core/Snackbar";

import Loading from "../../../components/Loading/Loading";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import strings from "../../../Assets/Local/Local";
import LangCtx from "../../../store/LangContext";
import UserCtx from "../../../store/UserContext";
import btnLottie from "../../../Assets/Lottie/loading.json";

import adsImg1 from "../../../Assets/Images/ads3.png";
import adsImg2 from "../../../Assets/Images/ads4.png";

import styles from "../../../styles/payment.module.css";
import ProductList from "../../../components/payment/ProductList";

const Payment = () => {
  const { lang } = useContext(LangCtx);
  const { user, token } = useContext(UserCtx);
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("tajwal_payment_method")
      ? JSON.parse(localStorage.getItem("tajwal_payment_method"))
      : "1"
  );
  const [deliveryMethods, setDeliveryMethods] = useState(
    JSON.parse(localStorage.getItem("tajwal_delivery_method"))
      ? JSON.parse(localStorage.getItem("tajwal_delivery_method"))
      : []
  );
  const [totalDeliveryPrice, setTotalDeliveryPrice] = useState(0);

  const [userAddress] = useState(
    localStorage.getItem("tajwalUserAddress")
      ? JSON.parse(localStorage.getItem("tajwalUserAddress"))
      : null
  );

  const [cart] = useState(
    localStorage.getItem("userCart")
      ? JSON.parse(localStorage.getItem("userCart"))
      : []
  );

  const [traders] = useState(
    localStorage.getItem("traderCart")
      ? JSON.parse(localStorage.getItem("traderCart"))
      : []
  );
  const [shippingCompany, setShippingCompany] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoCode, setPromoCode] = useState();
  const [hint, setHint] = useState({ isError: false, msg: "" });
  const [show, setShow] = useState(false);
  const [promoCodeSent, setPromoCodeSent] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderData, setOrderData] = useState();
  const router = useRouter();
  const btnOptions = {
    loop: true,
    autoplay: true,
    animationData: btnLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    console.log("totalDeliveryPriceHandel", totalDeliveryPrice);
  }, [totalDeliveryPrice]);

  useEffect(() => {
    if (!Object.keys(user).length) {
      router.replace("/Tajawal/login");
    }
  }, [lang, user]);

  const fetchShippingCompany = () => {
    axios
      .get(`${API_END_POINT}/shippingCompany`, {
        headers: { "Accept-Language": lang },
      })
      .then((res) => {
        setShippingCompany(res.data.data);
        console.log("shipping company", res.data.data);
      })
      .catch((error) => {
        console.log("error in shippingCompany", error.response);
      });
  };
  const HandleShipping = (shipping) => {
    localStorage.setItem("tajwal_delivery_method", JSON.stringify(shipping));
    console.log("shipping arr===>", shipping);
    const totalPricedeliv = shipping.reduce((accumulator, { price }) => {
      return accumulator + price;
    }, 0);
    console.log("shipping total===>", totalPricedeliv);
    setTotalDeliveryPrice(totalPricedeliv);
  };

  const calcTotalPrice = () => {
    const totalPriceProducts = cart.reduce(
      (accumulator, { price, offer, count }) => {
        if (offer) {
          return accumulator + (price - (offer * price) / 100) * count;
        } else return accumulator + price * count;
      },
      0
    );
    setTotalPrice(totalPriceProducts + totalDeliveryPrice);
  };

  const confirmPromoCode = () => {
    setLoading(true);
    if (promoCode) {
      axios
        .post(
          `${API_END_POINT}/promocode/confirmPromoCode`,
          { code: promoCode },
          {
            headers: {
              "Accept-Language": lang,
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);

          setPromoCodeSent(res.data);
          setHint({ isError: false, msg: strings.promoCodeSuccess });
          setShow(true);
          console.log("confirm promo code success", res.data);
        })
        .catch((error) => {
          console.log("log in confirm code", error.response);
          setPromoCodeSent("");
          setLoading(false);

          setHint({ isError: true, msg: error.response.errors });
          setShow(true);
        });
    } else {
      setHint({ isError: true, msg: strings.enterPromoCode });
      setShow(true);
    }
  };
  //
  const normalizeData = () => {
    if (deliveryMethods.length) {
      const normalizeOrderData = deliveryMethods.map((item) => {
        const traderObject = {
          trader: item.traderId,
          transportCompany: +item.companyId,
          products: [],
        };
        const traderProducts = cart.filter(
          (product) => product.trader.id === item.traderId
        );
        const productsData = traderProducts.map(({ count, id }) => ({
          product: id,
          quantity: count,
        }));
        traderObject.products = productsData;
        return traderObject;
      });

      setOrderData(normalizeOrderData);
      console.log("orderData", normalizeOrderData);
    }
  };

  const createOrder = () => {
    const userAddress = localStorage.getItem("tajwalUserAddress")
      ? JSON.parse(localStorage.getItem("tajwalUserAddress"))
      : null;
    const payMethod = paymentMethod === "1" ? "CASH" : "VISA";
    if (orderData && userAddress && user.phoneVerified) {
      const orderRequest = {
        traders: orderData,
        address: userAddress.id,
        paymentMethod: payMethod,
      };
      if (promoCodeSent) orderRequest.promoCode = promoCodeSent.id;

      setOrderLoading(true);
      axios
        .post(`${API_END_POINT}/order`, orderRequest, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": lang,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("create order success", res.data);
          setOrderLoading(false);

          router.replace({
            pathname: "/Tajawal/payment/confirm",
            query: { id: res.data.orderNumber },
          });
        })
        .catch((error) => {
          setOrderLoading(false);

          if (!error.response) {
            setHint({ isError: true, msg: "network Error" });
            return;
          } else if (error.response.status === 422) {
            setHint({ isError: true, msg: error.response.data.errors[0].msg });
          } else {
            setHint({ isError: true, msg: error.response.data.errors });
          }
          setShow(true);
        });
    } else {
      if (!userAddress) {
        setHint({ isError: true, msg: strings.addressError });
        setShow(true);
      } else if (!user.phoneVerified) {
        setHint({ isError: true, msg: strings.phoneVerifiedError });
        setShow(true);
        setTimeout(() => {
          router.push("/Tajawal/update-profile");
        }, 4000);
      }
    }
  };
  useEffect(() => {
    fetchShippingCompany();
  }, [lang]);

  useEffect(() => {
    if (!localStorage.getItem("tajwal_delivery_method")) {
      if (shippingCompany.length) {
        setDeliveryMethods(shippingCompany[0].id);
      }
    }
  }, [shippingCompany]);

  // calc total price with total delivery cost
  useEffect(() => {
    calcTotalPrice();
  }, [totalDeliveryPrice]);

  useEffect(() => {
    normalizeData();
  }, [totalPrice]);

  strings.setLanguage(lang);

  const OrangeRadio = withStyles({
    root: {
      "&$checked": {
        color: orange[900],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <div className={`container-fluid ${styles.payment_page} `}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={show}
        onClose={() => setShow(false)}
        message={hint.msg}
        className={hint.isError ? "alert__danger" : "alert__success"}
        autoHideDuration={4000}
      />
      {shippingCompany.length ? (
        <div className="row">
          <section className="col-12">path</section>
          <section
            className={`col-lg-6 col-md-9 ${styles.payment_methods_section}`}
          >
            <h6>{strings.address}</h6>
            <div className={styles.address_container}>
              {userAddress ? (
                <>
                  <i className="fas fa-map-marker-alt"></i>
                  <div className={styles.address_content}>
                    <p>
                      {" "}
                      {userAddress.street} {userAddress.region.name}{" "}
                      {userAddress.region.city.name}
                    </p>

                    <p>{userAddress.region.city.country.name}</p>
                    <small>{userAddress.user.phone}</small>
                  </div>
                  <div className={styles.address_action}>
                    <Link
                      href={{
                        pathname: "/Tajawal/myaddress/add",
                        query: { payment: true },
                      }}
                    >
                      <a className={styles.add_adrees_btn}>
                        {strings.newAddress}
                      </a>
                    </Link>
                    <Link
                      href={{
                        pathname: "/Tajawal/myaddress",
                        query: { payment: true },
                      }}
                    >
                      <a className={styles.address_list_btn}>
                        {strings.addressList}
                      </a>
                    </Link>
                  </div>
                </>
              ) : (
                <div
                  className={styles.add__newaddress}
                  role="button"
                  onClick={() =>
                    router.push({
                      pathname: "/Tajawal/myaddress",
                      query: { payment: true },
                    })
                  }
                >
                  {strings.addnewaddress}
                </div>
              )}
            </div>
            <h6>{strings.paymentWay}</h6>
            <div className={styles.payment_method_container}>
              <RadioGroup
                aria-label="payment-methods"
                name="payment-methods"
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  localStorage.setItem(
                    "tajwal_payment_method",
                    JSON.stringify(e.target.value)
                  );
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<OrangeRadio />}
                  label={
                    <span className={styles.label_style}>
                      <i
                        className="fas fa-money-bill"
                        style={{ color: "#28AF31" }}
                      ></i>
                      <p>{strings.cashOnDelivery}</p>
                    </span>
                  }
                />
                <FormControlLabel
                  value="2"
                  control={<OrangeRadio />}
                  disabled
                  label={
                    <span className={styles.label_style}>
                      <i
                        className="fab fa-cc-visa"
                        style={{ color: "#453F9E" }}
                      ></i>
                      <p>{strings.visacard}</p>
                      <small className={styles.avaibale_soon}>
                        {strings.availableSoon}
                      </small>
                    </span>
                  }
                />
              </RadioGroup>
            </div>
            <h6>{strings.deliveryMethod}</h6>
            {traders.length
              ? traders.map((traderId) => {
                  const product = cart.filter(
                    (el) => el.trader.id === traderId
                  );
                  if (product.length) {
                    return (
                      <ProductList
                        initialValue={deliveryMethods}
                        shippingCompany={shippingCompany}
                        product={product}
                        HandleShipping={HandleShipping}
                      />
                    );
                  }
                })
              : null}
          </section>
          <section
            className={`col-lg-3 col-md-3  col-sm-10 ${styles.product_info_section}`}
          >
            <div className={styles.product_info}>
              <p>
                {strings.numOfProducts} : {cart.length} {strings.Products}
              </p>
              <p>
                {strings.priceDelivery} : {totalDeliveryPrice}{" "}
                {strings.currency}
              </p>
            </div>
            <div className={styles.summation}>
              <p>{strings.total}</p>
              <big>
                {totalPrice} {strings.currency}
              </big>
              <br />
              <small>{strings.taxValue}</small>
            </div>
            <h6>{strings.discountCoupon}</h6>
            <div className={styles.discount_input}>
              <input
                type="text"
                className="form-control"
                aria-describedby="promoInput"
                disabled={promoCodeSent}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <span
                className={styles[`icon_success_${lang}`]}
                onClick={() => {
                  if (!promoCodeSent) confirmPromoCode();
                }}
              >
                {loading ? (
                  <Lottie
                    options={btnOptions}
                    height="35px"
                    width="47%"
                    style={{ marginLeft: "0px" }}
                  />
                ) : (
                  <i className={`fas fa-check-circle `}></i>
                )}
              </span>
              {promoCodeSent ? (
                <small>
                  {strings.discountValue} {promoCodeSent.discount}%{" "}
                  {strings.onOrder}
                </small>
              ) : null}
            </div>
            <div className={styles.total_container}>
              <p>{strings.theTotal}</p>
              <p>
                {promoCodeSent
                  ? Number(totalPrice) -
                    Number(promoCodeSent.discount * totalPrice) / 100
                  : totalPrice}{" "}
                {strings.currency}
              </p>
            </div>
            <button
              className={styles.confirm_btn}
              onClick={createOrder}
              disabled={orderLoading}
            >
              {orderLoading ? (
                <Lottie options={btnOptions} height="35px" width="80%" />
              ) : (
                strings.confirmOrder
              )}
            </button>
          </section>
          <section className={`col-lg-3 ${styles.ads_section}`}>
            <div className={styles.img_container}>
              <img src={adsImg1} alt="ads" />
            </div>
            <div className={styles.img_container}>
              <img src={adsImg2} alt="ads" />
            </div>
          </section>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Payment;
