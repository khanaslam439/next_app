import React, { useState, useEffect, useRef, useContext } from "react";
import cookie from "react-cookies";
// import Zoom from "react-reveal/Zoom";

import LangContext from "../../store/LangContext";
import originallogo from "../../Assets/Images/logo.png";

import userImg from "../../Assets/Images/pin.png";
import sendIcon from "../../Assets/Images/send-button.png";
import styles from "../../styles/Chat.module.css";
import Moment from "react-moment";
// import { ChatConversation } from "../../App";
import string from "../../Assets/Local/Local";
import UserCtx from "../../store/UserContext";
import InputEmoji from "react-input-emoji";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { API_END_POINT } from "../../components/appConfig/AppConfig";
import { useRouter } from "next/router";
import Loading from "../../components/Loading/Loading";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesAutoScroll = useRef(null);
  const { lang } = useContext(LangContext);
  const { token, user } = useContext(UserCtx);
  const { query } = useRouter();

  const formData = new FormData();

  const data = [
    {
      sender: { type: "CLIENT", name: "ahmed" },
      message: { text: "Hi", createdAt: "25-6-2015 12pm" },
    },
    {
      sender: { type: "CLIENT", name: "ahmed" },
      message: {
        text: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها",
        createdAt: "25-6-2015 12pm",
      },
    },
    {
      sender: { type: "ADMIN", name: "ahmed" },
      message: {
        text: "Hi,how can i help you?",
        createdAt: "25-6-2015 12:15pm",
      },
    },
  ];
  function handleOnEnter(message) {
    console.log("enter", message);
  }
  // Get All Messages
  useEffect(() => {
    getUserChat();

    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
  }, []);

  useEffect(() => {
    if (!Object.keys(user).length) {
      router.replace("/Tajawal/login");
    } else if (user) {
      getUserChat();
    }
  }, []);
  // auto Scroll when typeing in chat
  useEffect(() => {
    if (messagesAutoScroll.current) {
      scrollToBottom();
    }
  }, [messagesAutoScroll, messages, message, imgUrl]);

  const scrollToBottom = () => {
    messagesAutoScroll.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  useEffect(() => {
    getUserChat();
  }, []);

  const getUserChat = () => {
    let friend = JSON.parse(query.friend);

    let url = `${API_END_POINT}/chat/history?friend=${friend}&user=${user.id}`;
    console.log("messages url: ", query, url);
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessages(response.data.data.reverse());
        console.log(
          "messages are: ",
          messages,
          response.data.data,
          response.data,
          token
        );
      })
      .catch((error) => console.log("Request errors: ", error));
  };
  const fileHandler = (e) => {
    if (e.target.files[0]) {
      setImgUrl({
        imgName: e.target.files[0].name,
        imgUrl: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    }
  };

  const handleMassageSubmit = (e) => {
    console.log("in message function", e, message, imgUrl);
    e.preventDefault();
    let friend = JSON.parse(query.friend);
    if (message || imgUrl) {
      if (message) formData.append("text", message);
      if (imgUrl) formData.append("file", imgUrl.file);
      formData.append("reciver", friend);
      axios
        .post(`${API_END_POINT}/chat`, formData, {
          headers: {
            "Accept-Language": lang,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("message response", res);
          let conversation = messages;
          conversation.push(res.data);
          setMessages(conversation);
          setMessage("");
          setImgUrl(null);
        })
        .catch((error) => console.log("message error", error.response));
    }
  };

  return (
    <section className={styles.chat} dir={lang === "ar" ? "rtl" : "ltr"}>
      {!user ? (
        <div
          className="text-center"
          style={{ textDecoration: "none", cursor: "pointer" }}
          onClick={() => {
            ToggleLoginForm();
          }}
        >
          <img
            src={originallogo}
            alt="Logo"
            style={{ width: "110px", marginTop: "5px" }}
          />
          <h4 className="Hint">{string.firstlogin}</h4>
        </div>
      ) : (
        <article className={styles.chat_content}>
          <div className={styles.chat_massages} id="Scrollbar">
            {messages && messages.length !== 0 ? (
              messages.map((message) =>
                message.reciver.user.id === user.id ? (
                  <div className={styles.client}>
                    {console.log(
                      "Messagessss in render:",
                      token,
                      user,
                      message.sender.id,
                      user.id,
                      messages,
                      messages && messages.length !== 0
                    )}
                    <div className={styles.msg_detial}>
                      <div className={styles.msg_detial_img}>
                        <img
                          src={userImg}
                          alt="user avatar"
                          style={
                            lang === "ar"
                              ? { marginLeft: "20px" }
                              : { marginRight: "20px" }
                          }
                        />
                        <span className="py-3">{message.sender.name}</span>
                      </div>
                      <span
                        className={styles.chat_date}
                        style={
                          lang === "ar"
                            ? { textAlign: "left" }
                            : { textAlign: "right" }
                        }
                      >
                        <Moment format="DD/MM/YYYY -  HH:MM:SS">
                          {message.createdAt}
                        </Moment>
                      </span>
                      <div className={styles.chat_msg_detial}>
                        {message.message.text ? (
                          <p
                            style={
                              lang === "ar"
                                ? { marginRight: "10" }
                                : { marginLeft: "10" }
                            }
                          >
                            {message.message.text}
                          </p>
                        ) : null}
                        {message.message.image ? (
                          <img
                            //   src={`${API_ENDPOINT}/${message.message.image}`}
                            src={API_END_POINT + message.message.image}
                            alt="sender"
                            className={styles.client__msg__img}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : (
                  // </Zoom>
                  // <Zoom cascade key={message.id}>
                  <div
                    className={styles.host}
                    style={
                      lang === "ar"
                        ? { textAlign: "-webkit-left" }
                        : { textAlign: "-webkit-right" }
                    }
                  >
                    <span
                      className={styles.chat_date}
                      style={
                        lang === "ar"
                          ? { textAlign: "left" }
                          : { textAlign: "right" }
                      }
                    >
                      <Moment format="DD/MM/YYYY -  HH:MM:SS">
                        {message.createdAt}
                      </Moment>
                    </span>
                    <div className={styles.chat_msg_detial}>
                      {message.message.text ? (
                        <p
                          style={
                            lang === "ar"
                              ? { textAlign: "left" }
                              : { textAlign: "right" }
                          }
                        >
                          {message.message.text}
                        </p>
                      ) : null}
                      {message.message.image ? (
                        <img
                          src={API_END_POINT + message.message.image}
                          alt="sender"
                          className={styles.host__msg__img}
                        />
                      ) : null}
                    </div>
                  </div>
                  // </Zoom>
                )
              )
            ) : (
              <Row className="textCenter">
                <Loading />
              </Row>

              //   <Lottie options={lottieChatOptions} height={250} width={250} />
            )}
            <div ref={messagesAutoScroll} />
          </div>
          <form className={styles.massages_field}>
            <div>
              <Row className={styles.massages_row}>
                <Col
                  lg="10"
                  style={{
                    paddingLeft: lang === "ar" ? "0" : "",
                    paddingRight: lang === "ar" ? "" : "0",
                  }}
                >
                  <InputEmoji
                    height={100}
                    name="message"
                    placeholder={
                      lang === "ar" ? "اكتب هنا ..." : "write here..."
                    }
                    className={styles.form_control + " form-control-lg"}
                    id={styles.emojiInput}
                    onChange={(e) => setMessage(e)}
                    value={message}
                    cleanOnEnter
                    style={
                      lang === "ar"
                        ? { textAlign: "right", direction: "rtl" }
                        : { textAlign: "left", direction: "ltr" }
                    }
                    height={200}
                    // onEnter={(e) => setMessage(e)}
                    onEnter={() => handleMassageSubmit}
                  />
                </Col>
                <Col lg="2" className="my-2" style={{ textAlign: "start" }}>
                  <label
                    htmlFor="uploadImg"
                    style={{
                      marginLeft: lang === "ar" ? "2.2rem" : "",
                      marginRight: lang === "ar" ? "" : " 2.2rem",
                    }}
                  >
                    <svg
                      width="2em"
                      height="2em"
                      viewBox="0 0 16 16"
                      // className="bi bi-camera-fill"
                      className={styles.bi_camera_fill + " bi"}
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "#9EA4AF", cursor: "pointer" }}
                    >
                      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path
                        fillRule="evenodd"
                        d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
                      />
                    </svg>
                  </label>
                  <input
                    type="file"
                    name="myImage"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="uploadImg"
                    onChange={fileHandler}
                  />
                  {imgUrl ? (
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        left: "62px",
                      }}
                    >
                      <img
                        src={imgUrl.imgUrl}
                        alt={imgUrl.imgName}
                        height="40vh"
                      />
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-x"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          position: "absolute",
                          top: "-4px",
                          left: "-1px",
                          color: "red",
                          padding: "1px",
                          fontSize: "20px",
                          backgroundColor: "#fff",
                          cursor: "pointer",
                        }}
                        onClick={() => setImgUrl(null)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </span>
                  ) : null}
                  {/* </Col> */}

                  {/* <Col lg="1" className="mb-2" style={{ textAlign: "start" ,marginTop:'.65rem'}}> */}
                  <Button
                    className={styles.sendBtn}
                    onClick={handleMassageSubmit}
                    // style={lang === "ar" ? { left: "3%" } : { right: "3%" }}
                  >
                    {string.sendBTN}
                  </Button>
                </Col>
              </Row>
            </div>
          </form>
        </article>
      )}
    </section>
  );
};

export default Chat;
