import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import CityCard from "./HomeCards/CityCard";
import LangContext from "../../../store/LangContext";
import strings from "../../../Assets/Local/Local";
import styles from "../../../styles/Notification.module.css";
import pinImg from "../../../Assets/Images/store/storeAd.png";
import logo from "./Icons/logo.png";
import Link from "next/link";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../store/UserContext";
import Moment from "react-moment";
import ItemsNotFound from "../../../components/ItemsNotFound/ItemsNotFound";
import Loading from "../../../components/Loading/Loading";

export default function chat() {
  const { lang } = useContext(LangContext);
  const { token, user } = useContext(UserCtx);
  const [chatData, setChatData] = useState();

  useEffect(() => {
    if (!Object.keys(user).length) {
      router.replace("/Tajawal/login");
    } else if (user) {
      getUserChat();
    }
  }, []);

  const getUserChat = () => {
    let url = `${API_END_POINT}/chat`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setChatData(response.data.data);
        console.log(
          "Chat are: ",
          chatData,
          response.data.data,
          response.data,
          token
        );
      })
      .catch((error) => console.log("Request errors: ", error));
  };
  strings.setLanguage(lang);

  return (
    <>
      <MetaDecartor title={strings.chatsTitle} />
      <Container fluid>
        <Row className={styles.main_notification}>
          {chatData ? (
            chatData.length ? (
              <Col lg="5">
                {chatData.map((item, index) => {
                  return (
                    <Row className="my-3" style={{ cursor: "pointer" }}>
                      {console.log(
                        "Chat in render: ",
                        user.id,
                        item.message.reciver.user.id,
                        item.message.sender.id
                      )}
                      <Link
                        href={{
                          pathname: `/Tajawal/chat/chat`,
                          query: {
                            friend:
                              item.message.reciver.user.id === user.id
                                ? item.message.sender.id
                                : item.message.reciver.user.id,
                          },
                        }}
                      >
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
                              <Moment format="DD/MM/YYYY">
                                {item.message.createdAt}
                              </Moment>
                            </span>
                            <Row>
                              <Col lg="2">
                                <div
                                  className={
                                    lang === "ar"
                                      ? styles.iconar
                                      : styles.iconen
                                  }
                                >
                                  {console.log("sender:", item)}
                                  <img
                                    src={
                                      item.message.sender.image
                                        ? API_END_POINT +
                                          item.message.sender.image
                                        : logo
                                    }
                                  />
                                </div>
                              </Col>
                              <Col
                                lg="10"
                                className={
                                  lang === "ar"
                                    ? styles.titlear
                                    : styles.titleen
                                }
                              >
                                <span
                                  className={
                                    lang === "ar" ? "ml-3 pt-2" : "mr-3 pt-2"
                                  }
                                >
                                  {item.message.sender.name}
                                </span>
                                {item.count > 0 && (
                                  <span className={styles.count_container}>
                                    {item.message.count}
                                  </span>
                                )}
                              </Col>
                            </Row>
                            <Row
                              className={
                                lang === "ar" ? styles.textar : styles.texten
                              }
                            >
                              <Col lg="10" className="my-2">
                                <span>{item.message.message.text}</span>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Link>
                    </Row>
                  );
                })}
              </Col>
            ) : (
              <ItemsNotFound
                elementClass={"col-9 items__notfound"}
                title={strings.noChats}
              />
            )
          ) : (
            <Loading />
          )}
          <Col lg="3">
            <div>
              <img src={pinImg} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
