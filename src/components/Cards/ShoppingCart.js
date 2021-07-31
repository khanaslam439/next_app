import { useContext } from "react";

import LangCtx from "../../store/LangContext";
import strings from "../../Assets/Local/Local";
import { API_END_POINT } from "../appConfig/AppConfig";

import styles from "../../styles/shoppingCart.module.css";
const ShoppingCart = ({ product, deleteProductHandel, countHandel }) => {
  const { lang } = useContext(LangCtx);
  strings.setLanguage(lang);
  console.log("product in shoppingCart==>", product);
  return (
    <section className={styles.product_container}>
      <div className={styles.img_container}>
        <img src={`${API_END_POINT}${product.image}`} alt={product.name} />
        <div className={styles.count}>
          <i
            className="fas fa-plus"
            onClick={() => countHandel(product.id, "add")}
          ></i>
          <span>{product.count}</span>
          <i
            className="fas fa-minus"
            onClick={() => countHandel(product.id, "remove", product.trader.id)}
          ></i>
        </div>
      </div>
      <div className={`${styles.product_content}`}>
        <h4>{product.name}</h4>
        <p>{`${product.price}  ${strings.currency}`}</p>
        <p>{`${strings.productState} : ${
          product.useStatus === "NEW" ? strings.new : strings.used
        }`}</p>
        <h6>{`${strings.theSeller} : ${product.trader.name}`}</h6>
        <i
          className={`fas fa-trash ${styles[`delete_icon_${lang}`]}`}
          onClick={() => deleteProductHandel(product.id, product.trader.id)}
        ></i>
      </div>
    </section>
  );
};

export default ShoppingCart;
