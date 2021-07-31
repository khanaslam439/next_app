import classes from "../../styles/mypurchases.module.css";
import { Container, Row, Col } from "react-bootstrap";
import strings from "../../Assets/Local/Local";
import Moment from "react-moment";
import Link from "next/link";

function OrderCard(props) {
  strings.setLanguage(props.lang);
  return (
    <Container>
      <Row>
        <Col lg="6">
          <div
            className={
              classes.orderCard +
              ` ${
                props.lang === "ar"
                  ? "text-right bg-white mb-4"
                  : "text-left bg-white mb-4"
              }`
            }
          >
            <Row>
              <Col sm="8">
                <Link href="/Tajawal/mypurchases/1">
                  <div className={classes.orderInfo + " mb-4"}>
                    <h5 style={{ color: "#061637" }}>
                      {strings.orderNumber} : 56455241
                    </h5>
                    <h5 style={{ color: "#9EA4AF" }}>
                      <Moment format="hh:mm - DD/MM/YYYY">
                        1976-04-19T12:59-0500
                      </Moment>
                    </h5>
                    <h5 style={{ color: "#626D81" }}>
                      {strings.numOfStores} : 3 {strings.storeOrder}
                    </h5>
                    <h5 style={{ color: "#626D81" }}>
                      {strings.numOfProducts} : 3 {strings.productsOrder}
                    </h5>
                    <h5 style={{ color: "#F15A24" }}>
                      {strings.totalAmount} : 6000 {strings.currency}
                    </h5>
                  </div>
                </Link>
              </Col>
              <Col sm="4">
                <h5
                  className={
                    classes.cancelOrderBTN + " text-white py-2 text-center my-4"
                  }
                >
                  {strings.cancelOrder}
                </h5>
              </Col>
              <Col lg="12">
                <Link href="/Tajawal/mypurchases/1">
                  <div className={classes.orderState}>
                    <div className={classes.waitingState}>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                    </div>
                    <div className={classes.waitingState + " mt-3"}>
                      <div className={classes.orderStateText}>
                        {strings.waitingState}
                      </div>
                      <div className={classes.orderStateText}>
                        {strings.chargingState}
                      </div>
                      <div className={classes.orderStateText}>
                        {strings.deliveredState}
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg="6">
          <div
            className={
              classes.orderCard +
              ` ${
                props.lang === "ar"
                  ? "text-right bg-white mb-4"
                  : "text-left bg-white mb-4"
              }`
            }
          >
            <Row>
              <Col sm="8">
                <Link href="/Tajawal/mypurchases/1">
                  <div className={classes.orderInfo + " mb-4"}>
                    <h5 style={{ color: "#061637" }}>
                      {strings.orderNumber} : 56455241
                    </h5>
                    <h5 style={{ color: "#9EA4AF" }}>Order Time</h5>
                    <h5 style={{ color: "#626D81" }}>
                      {strings.numOfStores} : 3 {strings.storeOrder}
                    </h5>
                    <h5 style={{ color: "#626D81" }}>
                      {strings.numOfProducts} : 3 {strings.productsOrder}
                    </h5>
                    <h5 style={{ color: "#F15A24" }}>
                      {strings.totalAmount} : 6000 {strings.currency}
                    </h5>
                  </div>
                </Link>
              </Col>
              <Col sm="4">
                {/* <h5 className={classes.cancelOrderBTN + ' text-white py-2 text-center my-4'}>{strings.cancelOrder}</h5> */}
              </Col>
              <Col lg="12">
                <Link href="/Tajawal/mypurchases/1">
                  <div className={classes.orderState}>
                    <div className={classes.chargingState}>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                    </div>
                    <div className={classes.chargingState + " mt-3"}>
                      <div className={classes.orderStateText}>
                        {strings.waitingState}
                      </div>
                      <div className={classes.orderStateText}>
                        {strings.chargingState}
                      </div>
                      <div className={classes.orderStateText}>
                        {strings.deliveredState}
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg="6">
          <div
            className={
              classes.orderCard +
              ` ${
                props.lang === "ar"
                  ? "text-right bg-white mb-4"
                  : "text-left bg-white mb-4"
              }`
            }
          >
            <Row>
              <Col sm="8">
                <Link href="/Tajawal/mypurchases/1">
                  <div className={classes.orderInfo + " mb-4"}>
                    <h5 style={{ color: "#061637" }}>
                      {strings.orderNumber} : 56455241
                    </h5>
                    <h5 style={{ color: "#9EA4AF" }}>Order Time</h5>
                    <h5 style={{ color: "#626D81" }}>
                      {strings.numOfStores} : 3 {strings.storeOrder}
                    </h5>
                    <h5 style={{ color: "#626D81" }}>
                      {strings.numOfProducts} : 3 {strings.productsOrder}
                    </h5>
                    <h5 style={{ color: "#F15A24" }}>
                      {strings.totalAmount} : 6000 {strings.currency}
                    </h5>
                  </div>
                </Link>
              </Col>
              <Col sm="4">
                {/* <h5 className={classes.cancelOrderBTN + ' text-white py-2 text-center my-4'}>{strings.cancelOrder}</h5> */}
              </Col>
              <Col lg="12">
                <Link href="/Tajawal/mypurchases/1">
                  <div className={classes.orderState}>
                    <div className={classes.deliveredState}>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                    </div>
                    <div className={classes.deliveredState + " mt-3"}>
                      <div className={classes.orderStateText}>
                        {strings.waitingState}
                      </div>
                      <div className={classes.orderStateText}>
                        {strings.chargingState}
                      </div>
                      <div className={classes.orderStateText}>
                        {strings.deliveredState}
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg="6">
          <div
            className={
              classes.orderCard +
              ` ${
                props.lang === "ar"
                  ? "text-right bg-white mb-4"
                  : "text-left bg-white mb-4"
              }`
            }
          >
            <Row>
              <Col sm="8">
                <Link href="/Tajawal/mypurchases/1">
                  <div className={classes.orderInfo + " mb-4"}>
                    <h5 style={{ color: "#061637" }}>
                      {strings.orderNumber} : 56455241
                    </h5>
                    <h5 style={{ color: "#9EA4AF" }}>Order Time</h5>
                    <h5 style={{ color: "#626D81" }}>
                      {strings.numOfStores} : 3 {strings.storeOrder}
                    </h5>
                    <h5 style={{ color: "#626D81" }}>
                      {strings.numOfProducts} : 3 {strings.productsOrder}
                    </h5>
                    <h5 style={{ color: "#F15A24" }}>
                      {strings.totalAmount} : 6000 {strings.currency}
                    </h5>
                  </div>
                </Link>
              </Col>
              <Col sm="4">
                {/* <h5 className={classes.cancelOrderBTN + ' text-white py-2 text-center my-4'}>{strings.cancelOrder}</h5> */}
              </Col>
              <Col lg="12">
                <Link href="/Tajawal/mypurchases/1">
                  <div className={classes.orderState}>
                    <div className={classes.canceledState}>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-check"></i>
                      </div>
                      <div className={classes.orderStateIcon}>
                        <i className="fas fa-times"></i>
                      </div>
                    </div>
                    <div className={classes.canceledState + " mt-3"}>
                      <div className={classes.orderStateText}>
                        {strings.waitingState}
                      </div>
                      <div className={classes.orderStateText}>
                        {strings.chargingState}
                      </div>
                      <div className={classes.orderStateText}>
                        {strings.canceledState}
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderCard;
