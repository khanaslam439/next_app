import { useState, useContext, useEffect } from "react";
import classes from "../../styles/mypurchases.module.css";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import strings from "../../Assets/Local/Local";
import Moment from "react-moment";
import Link from "next/link";
import deleteIcon from "../../Assets/Images/deleteIcon.png";
import UserCtx from "../../store/UserContext";
import axios from "axios";
import { API_END_POINT } from "../../components/appConfig/AppConfig";

function OrderCard(props) {
  const { token } = useContext(UserCtx);

  const [allOrders, setAllOrders] = useState(props.ordersList);
  const [orderId, setOrderId] = useState("");
  const [productsLength, setProductsLength] = useState();
  const [show, setShow] = useState(false);
  const [flag, setflag] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function deleteOrder() {
    let url = `${API_END_POINT}/order/${orderId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": props.lang,
        },
      })
      .then(() => {
        let newArr = allOrders.filter((order) => order.id !== orderId);
        setAllOrders(newArr);
        handleClose();
        console.log("success delete...");
      })
      .catch(() => {});
  }

  function getOrderLength() {
    let newArr = [];
    props.ordersList.map((order) => {
      let count = 0;
      order.traders.map((item) => {
        count += item.products.length;
      });
      newArr.push(count);
      setProductsLength(newArr);
    });
    setflag(true);
  }

  useEffect(() => {
    console.log("length is: ", props.ordersList);
    if (props.ordersList.length > 0) {
      getOrderLength();
    }
  }, []);

  strings.setLanguage(props.lang);
  return (
    <Container>
      {flag && (
        <Row>
          {allOrders.map((order, index) => {
            return (
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
                    <Col sm={order.status === "WAITING" ? "8" : "12"}>
                      <Link href={`/Tajawal/mypurchases/${order.id}`}>
                        <div className={classes.orderInfo + " mb-4"}>
                          <h5 style={{ color: "#061637" }}>
                            {strings.orderNumber} : {order.orderNumber}
                          </h5>
                          <h5 style={{ color: "#9EA4AF" }}>
                            <Moment format="hh:mm - DD/MM/YYYY">
                              {order.createdAt}
                            </Moment>
                          </h5>
                          <h5 style={{ color: "#626D81" }}>
                            {strings.numOfStores} : {order.traders.length}{" "}
                            {strings.storeOrder}
                          </h5>
                          <h5 style={{ color: "#626D81" }}>
                            {strings.numOfProducts} : {productsLength[index]}{" "}
                            {strings.productsOrder}
                          </h5>
                          <h5 style={{ color: "#F15A24" }}>
                            {strings.totalAmount} : {order.totalPrice}{" "}
                            {strings.currency}
                          </h5>
                        </div>
                      </Link>
                    </Col>
                    {order.status === "WAITING" && (
                      <Col sm="4">
                        <h5
                          onClick={() => {
                            handleShow();
                            setOrderId(2);
                          }}
                          className={
                            classes.cancelOrderBTN +
                            " text-white py-2 text-center my-4"
                          }
                        >
                          {strings.cancelOrder}
                        </h5>
                      </Col>
                    )}
                    <Col lg="12">
                      <Link href="/Tajawal/mypurchases/1">
                        <div className={classes.orderState}>
                          <div
                            className={
                              order.status === "WAITING"
                                ? ""
                                : order.status === "ACCEPTED"
                                ? classes.waitingState
                                : order.status === "SHIPPED"
                                ? classes.chargingState
                                : order.status === "DELIVERED"
                                ? classes.deliveredState
                                : order.status === "CANCELED"
                                ? classes.canceledState
                                : ""
                            }
                          >
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
                          <div
                            className={
                              order.status === "WAITING"
                                ? ""
                                : order.status === "ACCEPTED"
                                ? classes.waitingState
                                : order.status === "SHIPPED"
                                ? classes.chargingState
                                : order.status === "DELIVERED"
                                ? classes.deliveredState
                                : order.status === "CANCELED"
                                ? classes.canceledState
                                : ""
                            }
                          >
                            {order.status === "WAITING" ? (
                              <div className={classes.orderStateText}>
                                {strings.waitingState}
                              </div>
                            ) : (
                              <div className={classes.orderStateText}>
                                {strings.acceptState}
                              </div>
                            )}
                            <div className={classes.orderStateText}>
                              {strings.chargingState}
                            </div>
                            <div className={classes.orderStateText}>
                              {order.status === "CANCELED"
                                ? strings.canceledState
                                : strings.deliveredState}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
      <Modal show={show} onHide={handleClose} className="deleteAddressModal">
        <Modal.Body className="text-center">
          <div className="imgDeleteModal mx-auto">
            <img src={deleteIcon} alt="deleteIcon" className="img-fluid" />
          </div>
          <p className="my-4">{strings.confirmDeleteOrder}</p>
          <Button variant="primary" className="btn-block" onClick={deleteOrder}>
            {strings.deleteBTN}
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default OrderCard;
