// const index = () => {
//   return <div>notifications</div>;
// };

// export default index;
import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import CityCard from "./HomeCards/CityCard";
import LangContext from "../../../../store/LangContext";
import strings from "../../../../Assets/Local/Local";
import Chat from "../../../../components/Chat/Chatt";
import styles from "../../../../styles/Notification.module.css";

export default function chat(props) {
  const { lang } = useContext(LangContext);
  console.log("Props in chat:", props);
  const path = {
    parent: { name: { ar: "الرئيسية", en: "Home" }, path: "" },
    children: [
      { name: { ar: "المحادثات", en: "Chat" }, path: "" },
      { name: { ar: "محلات المجد", en: "" }, path: "" },
    ],
  };

  strings.setLanguage(lang);

  return (
    <Container fluid>
      <Row className="my-3">
        <Col lg="12">
          <div
            className={
              lang === "ar" ? styles.arPath_container : styles.enPath_container
            }
          >
            <span>{path.parent.name[lang]}</span>
            {lang === "ar" ? ">" : "<"}
            {path.children.map((childreen, index) => {
              return (
                <span>
                  {childreen.name[lang]}
                  {index < path.children.length - 1
                    ? lang === "ar"
                      ? ">"
                      : "<"
                    : ""}
                </span>
              );
            })}
          </div>
        </Col>
      </Row>
      <Chat />
    </Container>
  );
}
