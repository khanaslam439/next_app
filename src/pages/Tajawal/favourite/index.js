import { useContext, useState, useEffect } from "react";
import Favtabnav from "../../../components/Favourite/favtabnav";
import Favads from "../../../components/Favourite/favads";
import LangContext from "../../../store/LangContext";
import { Container, Row, Col } from "react-bootstrap";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../Assets/Local/Local";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../store/UserContext";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading/Loading";

function index() {
  const { lang } = useContext(LangContext);
  const { user, token } = useContext(UserCtx);
  const [favProducts, setFavProducts] = useState([]);
  const [favStores, setFavStores] = useState([]);
  const [flag, setFlag] = useState(false);
  const router = useRouter();

  function fetchFavProducts() {
    let url = `${API_END_POINT}/favorites?user=${user.id}&productsOnly=true`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setFlag(true);
        console.log("success fetch...");
        setFavProducts(response.data.data);
      })
      .catch((error) => {
        console.log("errors is: ", error.response);
      });
  }

  function fetchFavStores() {
    let url = `${API_END_POINT}/favorites?user=${user.id}&tardersOnly=true`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setFlag(true);
        console.log("success fetch...");
        setFavStores(response.data.data);
      })
      .catch((error) => {
        console.log("errors is: ", error.response);
      });
  }

  useEffect(() => {
    if (!Object.keys(user).length) {
      router.replace("/Tajawal/login");
    }
    fetchFavProducts();
    fetchFavStores();
  }, []);

  strings.setLanguage(lang);
  return (
    <>
      <MetaDecartor title={strings.favouriteTitle} />
      {flag ? (
        <Container
          fluid
          className={
            lang === "ar"
              ? "text-right special-padding-pages"
              : "text-left special-padding-pages"
          }
        >
          <Row>
            <Col md="9">
              <Favtabnav
                lang={lang}
                allFavProducts={favProducts}
                allFavStores={favStores}
              />
            </Col>
            <Col md="3" className="d-md-block d-lg-block d-none">
              <Favads lang={lang} />
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
