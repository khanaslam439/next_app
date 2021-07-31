import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import UserContext from "../../../store/UserContext";
import LangContext from "../../../store/LangContext";
import strings from "../../../Assets/Local/Local";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import Loading from "../../../components/Loading/Loading";
import ItemsNotFound from "../../../components/ItemsNotFound/ItemsNotFound";
import Productcard from "../../../components/Cards/productcard";

import styles from "../../../styles/search.module.css";
const search = () => {
  const { query } = useRouter();
  const { token } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const [products, setProducts] = useState();
  const fetchProducts = () => {
    const userToken = Object.keys(token).length ? `Bearer ${token}` : "";
    axios
      .get(`${API_END_POINT}/product?name=${query.name}`, {
        headers: {
          "Accept-Language": lang,
          Authorization: userToken ? userToken : null,
        },
      })
      .then((res) => {
        const products = res.data.data;
        const tradersId = products
          .map(({ trader }) => trader.id)
          .filter((item, index, array) => {
            return array.indexOf(item) === index;
          });
        console.log("tradersId", tradersId);

        const filterPrdoucts = tradersId.map((id) => {
          const filteredProduct = products.filter(
            ({ trader }) => trader.id === id
          );
          return filteredProduct;
        });

        console.log("filterPrdoucts", filterPrdoucts);
        setProducts(filterPrdoucts);
      })
      .catch((error) => {
        console.log("error when fetch products", error.response);
      });
  };
  function addFavoriteHandler(prodId) {
    let url = `${API_END_POINT}/favorites`;
    axios
      .post(
        url,
        { product: prodId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
        }
      )
      .then(() => {
        console.log("Success Request ADD: ");
      })
      .catch((error) => {
        console.log("Failed Request ADD: ", error.response);
      });
  }

  function removeFavoriteHandler(prodId) {
    let url = `${API_END_POINT}/favorites`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { product: prodId },
      })
      .then(() => {
        console.log("Success Request Remove: ");
      })
      .catch((error) => {
        console.log("Failed Request Remove: ", error.response);
      });
  }
  useEffect(() => {
    fetchProducts();
  }, [lang, token, query.name]);
  strings.setLanguage(lang);
  return (
    <div className={`container-fluid ${styles.search__page}`}>
      <div className="row">
        {products ? (
          products.length ? (
            products.map((product) => (
              <section className="col-12">
                <div className="row">
                  <div className={`col-12 ${styles.trader__header}`}>
                    <img
                      src={`${API_END_POINT}/${product[0].trader.image}`}
                      alt={product[0].trader.name}
                    />
                    <h3>{product[0].trader.name}</h3>
                  </div>
                  {product.map((item) => (
                    <div className="col-lg-3 col-md-4 col-xs-12" key={item.id}>
                      {console.log("search item: ", item)}
                      <Productcard
                        lang={lang}
                        favState={item.favorite}
                        prodData={item}
                        removeProductFromFavorite={removeFavoriteHandler}
                        addProductToFavorite={addFavoriteHandler}
                      />
                    </div>
                  ))}
                </div>
                {/*  */}
              </section>
            ))
          ) : (
            <ItemsNotFound
              elementClass={" col-12 items__notfound"}
              title={strings.noProducts}
            />
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default search;
