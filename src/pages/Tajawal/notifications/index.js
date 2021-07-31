import React, { useContext, useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Overlay } from "react-bootstrap";
import copy from "copy-to-clipboard";
import Snackbar from "@material-ui/core/Snackbar";

// import CityCard from "./HomeCards/CityCard";
import LangContext from "../../../store/LangContext";
import strings from "../../../Assets/Local/Local";
import styles from "../../../styles/Notification.module.css";
import pinImg from "../../../Assets/Images/store/storeAd.png";
import discount from "../../../components/Icons/discount.png";
import order from "../../../components/Icons/order.png";
import question from "../../../components/Icons/question.png";
import logo from "../../../components/Icons/logo.png";
import location from "../../../components/Icons/location.png";
import copyIcon from "../../../components/Icons/copy.png";
import UserCtx from "../../../store/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import axios from "axios";
import Moment from "react-moment";
import ItemsNotFound from "../../../components/ItemsNotFound/ItemsNotFound";
import Loading from "../../../components/Loading/Loading";

export default function Notifica() {
  const { lang } = useContext(LangContext);
  const { token, user } = useContext(UserCtx);
  const [hint, setHint] = useState({ isError: false, msg: "" });
  const [show, setShow] = useState(false);
  const [notificationData, setNotificationData] = useState();
  const router = useRouter();
  strings.setLanguage(lang);

  const getNotification = () => {
    let url = `${API_END_POINT}/notif`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNotificationData(response.data.data);
        console.log("Notification are: ", response.data, token);
      })
      .catch((error) => console.log("Request errors: ", error));
  };

  useEffect(() => {
    console.log("user useruser:", user);
    if (!Object.keys(user).length) {
      router.replace("/Tajawal/login");
    } else if (user) {
      getNotification();
    }
  }, []);
  function copyToClipboard(e, msg) {
    copy(msg);
    setHint({ isError: false, msg: strings.copySuccess });
    setShow(true);
  }

  const localize = (subjectType) => {
    if (lang === "ar") {
      if (subjectType === "USER") {
        return "مستخدم";
      } else if (subjectType === "CONTACTUS") {
        return "تواصل معنا";
      } else if (subjectType === "ADMIN") {
        return "الإدارة";
      } else if (subjectType === "ORDER") {
        return "طلب";
      } else if (subjectType === "CHANGE_ORDER_STATUS") {
        return "تغير حالة الطلب";
      } else if (subjectType === "PROMOCODE") {
        return "كود خصم جديد";
      } else if (subjectType === "PRODUCT") {
        return "منتج جديد";
      } else if (subjectType === "TRADER") {
        return "تاجر";
      } else if (subjectType === "ASK_STORE") {
        return "اسأل المحلات";
      }
    } else {
      if (subjectType === "USER") {
        return "User";
      } else if (subjectType === "CONTACTUS") {
        return "Contact US";
      } else if (subjectType === "ADMIN") {
        return "Admin";
      } else if (subjectType === "ORDER") {
        return "Order";
      } else if (subjectType === "CHANGE_ORDER_STATUS") {
        return "Order status changed";
      } else if (subjectType === "PROMOCODE") {
        return "New Promo Code";
      } else if (subjectType === "PRODUCT") {
        return "Product";
      } else if (subjectType === "TRADER") {
        return "Trader";
      } else if (subjectType === "ASK_STORE") {
        return "Ask Store";
      }
    }
  };
  console.log("lang in Notif== > ", lang);

  return (
    <Container fluid>
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
      <Row className={styles.main_notification}>
        {notificationData ? (
          notificationData.length ? (
            <Col lg="5">
              {console.log("notificationData", notificationData)}
              {notificationData.map((item, index) => {
                return (
                  <Row className="my-3">
                    <Col lg="12">
                      <div
                        className={
                          lang === "ar"
                            ? styles.arcontent_container
                            : styles.encontent_container
                        }
                      >
                        <span
                          className={
                            lang === "ar" ? styles.datear : styles.dateen
                          }
                        >
                          <Moment
                            format={
                              lang === "ar"
                                ? "HH:MM:SS DD/MM/YYYY"
                                : "DD/MM/YYYY HH:MM:SS"
                            }
                          >
                            {item.createdAt}
                          </Moment>
                          {/* {item.description} */}
                        </span>
                        <Row>
                          <Col lg="2">
                            <div
                              className={
                                lang === "ar" ? styles.iconar : styles.iconen
                              }
                            >
                              {item.subjectType === "OFFER" ||
                              item.subjectType === "PROMOCODE" ? (
                                <img src={discount} />
                              ) : item.subjectType === "ORDER" ? (
                                <img src={order} />
                              ) : item.subjectType === "ADMIN" ? (
                                <img src={location} />
                              ) : item.subjectType === "ASK_STORE" ? (
                                <img src={question} />
                              ) : item.subjectType === "TRADER" ? (
                                <img
                                  src={
                                    item.resource.image
                                      ? API_END_POINT + item.resource.image
                                      : logo
                                  }
                                />
                              ) : (
                                <img src={logo} />
                              )}
                            </div>
                          </Col>
                          <Col
                            lg="10"
                            className={
                              lang === "ar"
                                ? styles.titlear + "  pt-2"
                                : styles.titleen + "  pt-2"
                            }
                          >
                            <span
                              style={{
                                color:
                                  item.type === "OFFER"
                                    ? "#F15A24"
                                    : item.type === "QUESTION"
                                    ? "#F15A24"
                                    : "",
                              }}
                            >
                              {localize(item.subjectType)}
                            </span>
                          </Col>
                        </Row>
                        <Row
                          className={
                            lang === "ar" ? styles.textar : styles.texten
                          }
                        >
                          <Col lg="10" className="py-2">
                            <span>{item.description}</span>
                          </Col>
                          <Col
                            lg="2"
                            onClick={(e) =>
                              copyToClipboard(e, item.promoCode.code)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {item.subjectType === "PROMOCODE" && (
                              <div className={styles.copyIcon_container}>
                                {" "}
                                <img src={copyIcon} id={item.id} />
                              </div>
                            )}
                          </Col>
                          {/* {item.subjectType === "PROMOCODE" && (
                            <Col lg="10">
                              <span>
                                <textarea
                                  rows={1}
                                  className={styles.codetextArea}
                                  id={item.id}
                                >
                                  {item.promoCode.code}
                                </textarea>
                              </span>
                            </Col>
                          )} */}
                        </Row>

                        {item.type === "ORDER" && (
                          <Row
                            className={
                              lang === "ar" ? styles.statusar : styles.statusen
                            }
                          >
                            <Col lg="12">
                              <span> {item.status}</span>
                            </Col>
                            <Col lg="12" className="my-2">
                              <Link href={`/Tajawal/mypurchases/${item.id}`}>
                                <Button className={styles.details_btn}>
                                  {strings.orderDetails}
                                </Button>
                              </Link>
                            </Col>
                          </Row>
                        )}
                        {item.type === "QUESTION" && (
                          <Row
                            className={
                              lang === "ar" ? styles.statusar : styles.statusen
                            }
                          >
                            <Col lg="12" className="my-2">
                              <Button className={styles.details_btn}>
                                {" "}
                                {strings.contactwithTrader}
                              </Button>
                            </Col>
                          </Row>
                        )}
                      </div>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          ) : (
            <ItemsNotFound
              elementClass={"col-9 items__notfound"}
              title={strings.noNotifications}
            />
          )
        ) : (
          <div className="col-9">
            <Loading />
          </div>
        )}
        <Col lg="3">
          <div className={styles.img__container}>
            <img src={pinImg} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
