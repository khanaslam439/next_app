import { useState, useContext } from "react";
import TempShareData from "../../../../store/TempShareData";
import LangContext from "../../../../store/LangContext";

import styles from "../../../../styles/Header.module.css";

const SubCategory = ({ filterHandel, handleClose, item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { subCategoryFilter, findSubCategory } = useContext(TempShareData);
  const { lang } = useContext(LangContext);

  return (
    <>
      <div>
        <span
          onClick={() => {
            filterHandel(item);
            handleClose();
          }}
        >
          {item.name[lang]}
        </span>
        {findSubCategory(item.name[lang], lang) ? (
          <span onClick={() => setIsOpen((prevState) => !prevState)}>
            {isOpen ? (
              <i className="fas fa-chevron-down"></i>
            ) : lang === "ar" ? (
              <i className="fas fa-chevron-left"></i>
            ) : (
              <i className="fas fa-chevron-right"></i>
            )}
          </span>
        ) : null}
      </div>
      {findSubCategory(item.name[lang], lang) ? (
        <div
          className={`${styles.subcategory_container} ${
            isOpen ? styles.show_subCategory : ""
          }`}
        >
          {subCategoryFilter(item.name[lang], lang).map((element, id) => (
            <p
              key={id}
              onClick={() => {
                filterHandel(item);
                handleClose();
              }}
            >
              {element.name[lang]}
            </p>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SubCategory;
