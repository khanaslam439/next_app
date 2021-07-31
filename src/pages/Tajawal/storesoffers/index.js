import { useContext, useEffect, useState } from "react";
import Allproducts from "../../../components/Products/allproducts/allproducts";
import Filterproducts from "../../../components/Products/allproducts/filterproducts";
import LangContext from "../../../store/LangContext";
import { Container, Row, Col } from "react-bootstrap";
import Productsads from "../../../components/Products/allproducts/productsads";
import Storetitle from "../../../components/Products/allproducts/storetitle";
import FilterResponsive from "../../../components/Products/allproducts/responsivefilter";
import productAd from "../../../Assets/Images/productAd.png";
import axios from "axios";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../Assets/Local/Local";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import UserCtx from "../../../store/UserContext";
import Loading from "../../../components/Loading/Loading";
import ItemsNotFound from "../../../components/ItemsNotFound/ItemsNotFound";

function index({ categories }) {
  const { lang } = useContext(LangContext);
  const { user, token } = useContext(UserCtx);
  const [allProducts, setAllProducts] = useState([]);

  const [filterProducts, setFilterProducts] = useState([]);
  const [filterOrdering, setFilterOrdering] = useState("");
  const [flag, setFlag] = useState(false);

  const getAllProducts = () => {
    let userToken;
    let url = `${API_END_POINT}/product?lastOffers=true`;
    setFlag(false);
    if (Object.keys(token).length !== 0) {
      if (filterOrdering !== "") {
        url += `${filterOrdering}&`;
      }
      if (filterProducts.length > 0) {
        url += `${filterProducts}`;
      }
      url += `&userId=${user.id}`;
      userToken = `Bearer ${token}`;
    } else {
      if (filterOrdering !== "") {
        url += `${filterOrdering}&`;
      }
      if (filterProducts.length > 0) {
        url += `${filterProducts}`;
      }
    }
    console.log("url is: ", url);
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          Authorization: userToken !== undefined ? userToken : "",
        },
      })
      .then((response) => {
        setAllProducts(response.data.data);
        setFlag(true);
      });
  };
  const filterProductsCategories = (newArray) => {
    let cats = "";
    for (let i = 0; i < newArray.length; i++) {
      if (i + 1 < newArray.length) {
        cats += `category=${newArray[i]}&`;
      } else {
        cats += `category=${newArray[i]}`;
      }
    }
    setFilterProducts(cats);
  };
  const filterProductsOrdering = (newArray) => {
    let filterVal;
    if (newArray === "allO") {
      filterVal = "";
    } else if (newArray === "lessPrice") {
      filterVal = "sortByPrice=1";
    } else if (newArray === "highPrice") {
      filterVal = "sortByPrice=-1";
    } else if (newArray === "highRate") {
      filterVal = "mostRated=true";
    } else if (newArray === "addedNewly") {
      filterVal = "lastProducts=true";
    }
    setFilterOrdering(filterVal);
    console.log("newArray Ordering: ", filterVal);
  };
  useEffect(() => {
    getAllProducts();
  }, [filterProducts, filterOrdering]);
  strings.setLanguage(lang);

  return (
    <>
      <MetaDecartor title={strings.title} />
      <div className="special-padding-pages">
        {flag ? (
          <Container fluid>
            <Row>
              <Col lg="12">
                <div className="">
                  <img
                    src={productAd}
                    alt="product ad"
                    className="w-100 my-4"
                  />
                </div>
              </Col>
              <Col lg="3">
                <Filterproducts
                  lang={lang}
                  getFilteredCategories={filterProductsCategories}
                  categoriesFilters={categories}
                  getFilteredOrdering={filterProductsOrdering}
                />
                <Productsads lang={lang} />
              </Col>
              <Col lg="9">
                {allProducts.length > 0 ? (
                  <>
                    <Col lg="12">
                      <Storetitle lang={lang} allProducts={allProducts} />
                    </Col>
                    <Allproducts lang={lang} allProducts={allProducts} />
                  </>
                ) : (
                  <ItemsNotFound
                    elementClass={"items__notfound"}
                    title={strings.noProducts}
                  />
                )}
              </Col>
            </Row>
            <FilterResponsive
              lang={lang}
              getFilteredCategories={filterProductsCategories}
              categoriesFilters={categories}
              getFilteredOrdering={filterProductsOrdering}
            />
          </Container>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export const getStaticProps = async (context) => {
  // Categories
  const cats = await fetch(`${API_END_POINT}/category?`, {
    headers: {
      // "Accept-Language": lang,
    },
  });
  const { data: categories } = await cats.json();
  return {
    props: {
      categories,
    },
  };
};

export default index;
