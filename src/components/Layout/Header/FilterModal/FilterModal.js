import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import LangContext from "../../../../store/LangContext";
import TempShareData from "../../../../store/TempShareData";
import SubCategory from "./SubCategory";

import styles from "../../../../styles/Header.module.css";
const FilterModal = ({ data, modelIsOpen, handleClose, filterHandel }) => {
  const { lang } = useContext(LangContext);
  // const { subCategoryFilter, findSubCategory } = useContext(TempShareData);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal
      show={modelIsOpen}
      onHide={handleClose}
      className={styles.header_filter_modal}
    >
      <Modal.Body className={styles.filter_body}>
        <div
          className="container"
          style={lang === "ar" ? { direction: "rtl" } : { direction: "ltr" }}
        >
          <div className="row">
            {data.map((item, index) => (
              <div className={`col-4 ${styles.filter_modal_items}`} key={index}>
                <SubCategory
                  item={item}
                  filterHandel={filterHandel}
                  handleClose={handleClose}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
