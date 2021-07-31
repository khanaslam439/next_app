import { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductAds from "../../../../components/Products/productDetails/ProductAds";
import ProductComDesc from "../../../../components/Products/productDetails/ProductComDesc";
import ProductImgs from "../../../../components/Products/productDetails/ProductImgs";
import ProductInfo from "../../../../components/Products/productDetails/ProductInfo";
import SimilarProducts from "../../../../components/Products/productDetails/SimilarProducts";
import LangContext from "../../../../store/LangContext";
import ProductImgsResponsive from "../../../../components/Products/productDetails/ProductImgsResponsive";
import classes from "../../../../styles/productDetails.module.css";
import MetaDecartor from "../../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../../Assets/Local/Local";
import { API_END_POINT } from "../../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../../store/UserContext";
import Loading from "../../../../components/Loading/Loading";

function index() {
  const { user, token } = useContext(UserCtx);
  const { lang } = useContext(LangContext);
  const [productData, setProductData] = useState();
  const [comments, setComments] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [productRate, setProductRate] = useState("");
  const [advs, setAdvs] = useState([]);

  function ratingProduct(rate) {
    setProductRate(rate.data.rate);
  }

  function fetchProductInfo(id) {
    let url;
    if (Object.keys(token).length !== 0) {
      url = `${API_END_POINT}/product/${id}?userId=${user.id}`;
    } else {
      url = `${API_END_POINT}/product/${id}`;
    }
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductData(response.data);
      });
  }

  function fetchComments(id) {
    let url = `${API_END_POINT}/comments?product=${id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setComments(response.data.data);
      });
  }

  function fetchSimilarProducts(id) {
    let url = `${API_END_POINT}/product?similar=${id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setSimilarProducts(response.data.data);
      });
  }

  function fetchAdvs() {
    let url = `${API_END_POINT}/advertisments?type=PRODUCT_PAGE`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setAdvs(response.data.data);
      });
  }

  useEffect(() => {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1);
    fetchProductInfo(id);
    fetchComments(id);
    fetchSimilarProducts(id);
    fetchAdvs();
  }, [productRate]);

  strings.setLanguage(lang);
  return (
    <>
      <MetaDecartor title={`${strings.title}`} />
      {productData ? (
        <Container
          fluid
          className={
            lang === "ar"
              ? "text-right special-padding-pages"
              : "text-left special-padding-pages"
          }
        >
          <MetaDecartor
            title={`${productData.name} - ${strings.title}`}
            description={`${productData.description} - ${strings.title}`}
            imgUrl={`${API_END_POINT}/${productData.slider[0]}`}
            imgAlt={`${productData.name} - ${strings.title}`}
          />{" "}
          <Row>
            <Col md="10">
              <div>
                <Row>
                  <Col lg="8">
                    <ProductImgs lang={lang} productData={productData} />
                    <ProductImgsResponsive
                      lang={lang}
                      productData={productData}
                    />
                  </Col>
                  <Col lg="4">
                    <ProductInfo
                      lang={lang}
                      productData={productData}
                      ratingProduct={ratingProduct}
                      productId={productData.id}
                    />
                  </Col>
                  <Col lg="12">
                    <ProductComDesc
                      lang={lang}
                      productData={productData}
                      commentsData={comments}
                      productId={productData.id}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="2" className="d-md-block d-lg-block d-none">
              <ProductAds lang={lang} />
            </Col>
            <Col lg="12">
              <div className={classes.storeColAd + " mt-4 mb-5"}>
                <img src={`${API_END_POINT}${advs[0].image}`} alt="store Ad" />
              </div>
            </Col>
            <Col lg="12">
              <SimilarProducts lang={lang} similarProducts={similarProducts} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default index;
