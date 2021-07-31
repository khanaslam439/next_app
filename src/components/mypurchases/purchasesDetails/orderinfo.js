import { useState, useEffect } from "react";
import classes from "../../../styles/mypurchasesDetails.module.css";
import strings from "../../../Assets/Local/Local";
import cashIcon from "../../../Assets/Images/cashIcon.png";
import Moment from "react-moment";

function Orderinfo(props) {
  const [productsLength, setProductsLength] = useState();

  function getOrderLength() {
    let count = 0;
    props.orderData.traders.map((order) => {
      count += order.products.length;
      setProductsLength(count);
      console.log("length is: ", order);
    });
  }
  useEffect(() => {
    getOrderLength();
  }, []);

  strings.setLanguage(props.lang);

  return (
    <div className={classes.orderInfo + " mt-lg-0 mt-4"}>
      <div className={classes.orderDetails + " bg-white mb-3 p-3 rounded"}>
        <div>
          <h6 style={{ color: "#626D81" }}>
            {strings.orderNumber} : {props.orderData.orderNumber}
          </h6>
          <h6 style={{ color: "#9EA4AF" }}>
            <Moment format="hh:mm - DD/MM/YYYY">
              {props.orderData.createdAt}
            </Moment>
          </h6>
          <h6 style={{ color: "#626D81" }}>
            {strings.numOfStores} : {props.orderData.traders.length}{" "}
            {strings.storeOrder}
          </h6>
          <h6 style={{ color: "#626D81" }}>
            {strings.numOfProducts} : {productsLength} {strings.productsOrder}
          </h6>

          <h6 style={{ color: "#626D81" }}>
            {strings.priceDelivery} : 3 {strings.currency}
          </h6>
          <h6 style={{ color: "#061637" }}>
            {strings.total} : {props.orderData.price} {strings.currency}
          </h6>
          {props.orderData.promoCode && (
            <h6 style={{ color: "#F15A24" }}>
              {strings.discountPercentage} :{" "}
              {props.orderData.promoCode.discount}{" "}
              <span className="mx-2">%</span>
            </h6>
          )}
        </div>
        <div>
          <h6
            className={
              classes.cancelOrderBTN + " text-white py-2 text-center my-4"
            }
          >
            {strings.cancelOrder}
          </h6>
        </div>
      </div>
      <div className={classes.totalAmount + " bg-white mb-3 p-3 rounded"}>
        <h6 style={{ color: "#061637" }}>{strings.totalAmount}</h6>
        <p className={classes.price + " mb-2"} style={{ color: "#F15A24" }}>
          {" "}
          {props.orderData.totalPrice}{" "}
          <span className="mx-2">{strings.currency}</span>{" "}
        </p>
        <p className="mb-0" style={{ color: "#9EA4AF" }}>
          {strings.priceInVAT}
        </p>
      </div>
      <h6 className="mb-3">{strings.paymentWay}</h6>
      <div className={classes.paymentWay + " bg-white p-3 rounded"}>
        <p className="mb-0" style={{ color: "#061637" }}>
          {" "}
          <img src={cashIcon} alt="cashIcon" className="img-fluid" />{" "}
          <span className="mx-2">
            {props.orderData.paymentMethod === "CASH"
              ? strings.cashOnDelivery
              : strings.creditOnDelivery}
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default Orderinfo;
