import React, { useState, useEffect, useRef, useContext } from "react";
import cookie from "react-cookies";
import axios from "axios";
// import Zoom from "react-reveal/Zoom";
import Lottie from "react-lottie";
import chatAnimation from "../../Assets/lottieFiles/chatanimation.json";

import { LangContext } from "../../App";
import { API_ENDPOINT } from "../../AppConfig";
import originallogo from "../../Assets/Images/should.png";

import userImg from "../../Assets/Images/user.png";
import sendIcon from "../../Assets/Images/send-button.png";
import "./Chat.css";
import Moment from "react-moment";
import { ChatConversation, LoginFormContext } from "../../App";
import string from "../../Assets/Localization/Local";
import LoginForm from "../../Views/Auth/Login/Login";

const Chat = () => {
  const { chat } = useContext(ChatConversation);

  const currentUser_cookie = cookie.load("CatchItUser");
  const currentUser_session = JSON.parse(sessionStorage.getItem("CatchItUser"));
  const user = currentUser_session ? currentUser_session : currentUser_cookie;

  const token_cookie = cookie.load("CatchIt_token");
  const token_sessionStorage = sessionStorage.getItem("CatchIt_token");
  const token = `Bearer ${
    token_cookie ? token_cookie : JSON.parse(token_sessionStorage)
  }`;
  const { openLoginForm, ToggleLoginForm } = useContext(LoginFormContext);

  const [message, setMessage] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesAutoScroll = useRef(null);
  const { lang } = useContext(LangContext);
  const formData = new FormData();
  const lottieChatOptions = {
    loop: true,
    autoplay: true,
    animationData: chatAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // Get All Messages
  useEffect(() => {
    getUserChat();
    console.log("user", user);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);
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
    console.log("chat ==>", chat);
    if (chat) {
      // let conversation = messages;
      // conversation.push(chat);
      // console.log("conversation==>", conversation);
      // setMessages(conversation);
      getUserChat();
    }
  }, [chat]);

  const getUserChat = () => {
    axios
      .get(`${API_ENDPOINT}/chat`, {
        headers: {
          "Accept-Language": lang,
          Authorization: token,
        },
      })
      .then((response) => {
        setMessages(response.data.data.reverse());
        console.log("response.data.data", response.data.data);
      })
      .catch((error) => console.log("chat error", error));
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
    e.preventDefault();
    if (message || imgUrl) {
      if (message) formData.append("text", message);
      if (imgUrl) formData.append("file", imgUrl.file);
      axios
        .post(`${API_ENDPOINT}/chat`, formData, {
          headers: {
            "Accept-Language": lang,
            Authorization: token,
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
    <section className="chat" dir={lang === "ar" ? "rtl" : "ltr"}>
      <article className="chat_header">
        <h3>الدردشة</h3>
        <p>تحدث مع المسؤول</p>
      </article>
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
        <article className="chat_content">
          <div className="chat-massages">
            {messages && messages.length !== 0 ? (
              messages.map((message) =>
                message.sender.type === "CLIENT" ? (
                  // <Zoom cascade key={message.id}>
                    <div className="client">
                      {console.log(
                        "messages take place===>",
                        message,
                        message.createdAt
                      )}
                      <div className="msg_detial">
                        <img
                          src={userImg}
                          alt="user avatar"
                          style={
                            lang === "ar"
                              ? { marginLeft: "20px" }
                              : { marginRight: "20px" }
                          }
                        />
                        <div>
                          {message.message.text ? (
                            <p>{message.message.text}</p>
                          ) : null}
                          {message.message.image ? (
                            <img
                              src={`${API_ENDPOINT}/${message.message.image}`}
                              alt="sender"
                              className="client__msg__img"
                            />
                          ) : null}
                        </div>
                      </div>
                      <span
                        className="chat_date"
                        style={
                          lang === "ar"
                            ? { textAlign: "left" }
                            : { textAlign: "right" }
                        }
                      >
                        <Moment format="DD/MM/YYYY">{message.createdAt}</Moment>
                      </span>
                    </div>
                  // </Zoom>
                ) : (
                  // <Zoom cascade key={message.id}>
                    <div
                      className="host"
                      style={
                        lang === "ar"
                          ? { textAlign: "-webkit-left" }
                          : { textAlign: "-webkit-right" }
                      }
                    >
                      {console.log(
                        "messages take place===>Admin",
                        message,
                        message.createdAt
                      )}

                      <div className="msg_detial">
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
                            src={`${API_ENDPOINT}/${message.message.image}`}
                            alt="sender"
                            className="host__msg__img"
                          />
                        ) : null}
                      </div>

                      <span
                        className="chat_date"
                        style={
                          lang === "ar"
                            ? { textAlign: "left" }
                            : { textAlign: "right" }
                        }
                      >
                        <Moment format="DD/MM/YYYY">{message.createdAt}</Moment>
                      </span>
                    </div>
                  // </Zoom>
                )
              )
            ) : (
              <Lottie options={lottieChatOptions} height={250} width={250} />
            )}
            <div ref={messagesAutoScroll} />
          </div>
          <form className="massages_field">
            <div className="form-group  inputMsg">
              <textarea
                type="text"
                name="message"
                placeholder={lang === "ar" ? "اكتب هنا ..." : "write here..."}
                className="form-control  form-control-lg"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                style={
                  lang === "ar"
                    ? { textAlign: "right" }
                    : { textAlign: "left", direction: "ltr" }
                }
              />

              <label
                htmlFor="uploadImg"
                style={lang === "ar" ? { left: "2%" } : { right: "2%" }}
              >
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  className="bi bi-camera-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "#C11623", cursor: "pointer" }}
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
                  <img src={imgUrl.imgUrl} alt={imgUrl.imgName} height="40vh" />
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
            </div>

            <button
              onClick={handleMassageSubmit}
              style={
                lang === "en" ? { marginLeft: "15px" } : { marginRight: "15px" }
              }
            >
              <img
                src={sendIcon}
                alt="send icon"
                style={lang === "ar" ? {} : { transform: "rotate(180deg)" }}
              />
            </button>
          </form>
        </article>
      )}
      {openLoginForm && <LoginForm close={ToggleLoginForm} />}
    </section>
  );
};

export default Chat;
