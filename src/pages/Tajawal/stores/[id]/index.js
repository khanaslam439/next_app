import { useContext, useState, useEffect } from "react";
import classes from "../../../../styles/storesDetails.module.css";
import { Container, Row, Col } from "react-bootstrap";
import StoreSlider from "../../../../components/stores/storesDetails/StoreSlider";
import StoreInfo from "../../../../components/stores/storesDetails/StoreInfo";
import StoreComments from "../../../../components/stores/storesDetails/StoreComments";
import StoreCategories from "../../../../components/stores/storesDetails/StoreCategories";
import StoreAds from "../../../../components/stores/storesDetails/StoreAds";
import SimilarStores from "../../../../components/stores/storesDetails/SimilarStores";
import LangContext from "../../../../store/LangContext";
import MetaDecartor from "../../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../../Assets/Local/Local";
import { API_END_POINT } from "../../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../../store/UserContext";
import Loading from "../../../../components/Loading/Loading";
import Snackbar from "@material-ui/core/Snackbar";

function index({props}) {
  const { user, token } = useContext(UserCtx);
  const { lang } = useContext(LangContext);
  const [storeData, setStoreData] = useState(null);
  const [storeRate, setStoreRate] = useState("");
  const [comments, setComments] = useState([]);
  const [similarTraders, setSimilarTraders] = useState([]);
  const [advs, setAdvs] = useState([]);
  const [urlId, setUrlId] = useState("");
  const [hint, setHint] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    // localStorage.setItem("traderCart", JSON.stringify(TraderArray));
    // JSON.parse(localStorage.getItem("traderCart"))
  }, []);

  useEffect(() => {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1);
    setUrlId(id);
    fetchStoreInfo(id);
    fetchComments(id);
    fetchSimilarStores(id);
    fetchAdvs();
  }, [storeRate]);

  function ratingStroe(rate) {
    setStoreRate(rate.data.rate);
  }

  function fetchStoreInfo(id) {
    let url;
    if (Object.keys(token).length !== 0) {
      url = `${API_END_POINT}/userInfo?userId=${id}&currentUser=${user.id}`;
    } else {
      url = `${API_END_POINT}/userInfo?userId=${id}`;
    }
    console.log("storess uri==> ", url);
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("storees==> ", response);
        setStoreData(response.data.user);
        prepareLastVisitedStores(response.data.user);
      })
      .catch((error) => {
        console.log("err fetch store==> ", error.response);
        console.log("err fetch store1==> ", error);
        setHint(strings.thisStoreIsNotExist);
        setShow(true);
      });
  }

  function prepareLastVisitedStores(obj) {
    console.log("enter new store !");
    let lastVisitedStores = localStorage.getItem("lastVisitedStores")
      ? JSON.parse(localStorage.getItem("lastVisitedStores"))
      : [];

    let isExist = lastVisitedStores.some((el) => el.id === obj.id);

    if (!isExist) {
      if (lastVisitedStores.length === 5) {
        lastVisitedStores.splice(0, 1);
        lastVisitedStores.push(obj);
        localStorage.setItem(
          "lastVisitedStores",
          JSON.stringify(lastVisitedStores)
        );
      } else {
        lastVisitedStores.push(obj);
      }

      localStorage.setItem(
        "lastVisitedStores",
        JSON.stringify(lastVisitedStores)
      );
    }
  }

  function fetchComments(id) {
    let url = `${API_END_POINT}/comments?trader=${id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setComments(response.data.data);
      });
  }

  function fetchSimilarStores(id) {
    let url = `${API_END_POINT}/allUsers?type=TRADER&similarTraders=${id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setSimilarTraders(response.data.data);
      });
  }

  function fetchAdvs() {
    let url = `${API_END_POINT}/advertisments?type=TRADER_PAGE`;
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

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={show}
        onClose={() => setShow(false)}
        message={hint}
        className={"alert__danger"}
        autoHideDuration={4000}
      />
      <MetaDecartor title={`${strings.title}`} />
      {storeData ? (
        <Container
          fluid
          className={
            lang === "ar"
              ? "text-right special-padding-pages"
              : "text-left special-padding-pages"
          }
        >
          <MetaDecartor title={`${storeData.name} - ${strings.title}`} />
          <Row>
            <Col md="10">
              <div>
                <Row>
                  <Col lg="8">
                    <StoreSlider lang={lang} storeData={storeData} />
                  </Col>
                  <Col lg="4">
                    <StoreInfo
                      lang={lang}
                      storeData={storeData}
                      ratingStroe={ratingStroe}
                    />
                  </Col>
                  <Col lg="12">
                    <StoreCategories lang={lang} storeData={storeData} />
                  </Col>
                  <Col lg="12">
                    <StoreComments lang={lang} traderId={urlId} />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="2" className="d-md-block d-lg-block d-none">
              <StoreAds lang={lang} />
            </Col>
            <Col lg="12">
              <div className={classes.storeColAd + " mt-4 mb-5"}>
                <img src={`${API_END_POINT}${advs[0].image}`} alt="store Ad" />
              </div>
            </Col>
            <Col lg="12">
              <SimilarStores lang={lang} similarStores={similarTraders} />
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
