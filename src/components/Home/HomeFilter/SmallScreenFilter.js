import React, { useContext, useState } from "react";
import filterIcon from "../../../Assets/Images/filterIcon.png";
import LangContext from "../../../store/LangContext";
import { Modal } from "antd";
import "antd/dist/antd.css";
import styles from "../../../styles/Home.filter.module.css";

const SmallScreenFilter = () => {
  const { lang } = useContext(LangContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderFilterModal = () => {
    return (
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  };

  return (
    <div
      className={styles.SmallScreenFilterDiv}
      style={{
        left: lang === "ar" && "33px",
        right: lang === "en" && "33px",
      }}
    >
      <img src={filterIcon} style={{ width: "40px" }} onClick={showModal} />
      {isModalVisible && renderFilterModal()}
    </div>
  );
};

export default SmallScreenFilter;
