import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import homeBaner from "../../Assets/Images/homeBaner.png";
import { Container, Row, Col } from "react-bootstrap";
import CityCard from "./HomeCards/CityCard";
import RegionCard from "./HomeCards/RegionCard";
import MarketCard from "./HomeCards/MarketCard";
import CityFilter from "./HomeFilter/CityFilter";
import RegionFilter from "./HomeFilter/RegionFilter";
import MarketFilter from "./HomeFilter/MarketFilter";
import GeneralPathContext from "../../store/GeneralPath";
import HeaderFilterContext from "../../store/HeaderFilterContext";
import LangContext from "../../store/LangContext";
import add1 from "../../Assets/Images/adds1.png";
import add2 from "../../Assets/Images/adds2.png";
import strings from "../../Assets/Local/Local";
import logo from "../../Assets/Images/logo.png";
import AppStore from "../../Assets/Images/footer/AppStore.png";
import GooglePlay from "../../Assets/Images/footer/GooglePlay.png";
import SmallScreenFilter from "./HomeFilter/SmallScreenFilter";
import phonesHome from "../../Assets/Images/phonesHome.png";
import LastVisitedStore from "../LastVisitedStore/LastVisitedStore";
import styles from "../../styles/Home.module.css";
import stylesLast from "../../styles/LastVisitesStores.module.css";

export default function Home() {
  const { GeneralPath, GoTo_backward } = useContext(GeneralPathContext);
  const { filter, headerFilterHandel, clearFilter } =
    useContext(HeaderFilterContext);
  const router = useRouter();

  const { lang } = useContext(LangContext);
  const [showDivlastVisit, setshowDivlastVisit] = useState(false);
  const [lastVisitedCards, setLastVisited] = useState([]);

  strings.setLanguage(lang);

  const isNotLastIndex = (currentIndex) => {
    let restOfPath = GeneralPath.slice(currentIndex + 1, GeneralPath.length);

    let checkVar = restOfPath.filter((item, ind) => {
      return item.id !== -1;
    });
    console.log("restOfPath==", currentIndex, checkVar, restOfPath);

    if (checkVar.length > 0) return true;
    return false;
  };
  const showModalLastVisit = () => {
    let lastVisitedStores = localStorage.getItem("lastVisitedStores")
      ? JSON.parse(localStorage.getItem("lastVisitedStores"))
      : [];
    setLastVisited(lastVisitedStores);
    setshowDivlastVisit(!showDivlastVisit);
  };

  return (
    <Container fluid className={styles.home_container}>
      <Row>
        <Col lg="12">
          <Row>
            <Col lg="1" xs="1">
              <div
                className={stylesLast.configIconDiv}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  className={stylesLast.ICOn + " fas fa-history "}
                  onClick={() => {
                    showModalLastVisit();
                  }}
                ></i>
              </div>
            </Col>
            <Col lg="11" xs="11">
              <Row>
                <Col
                  lg="6"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className={
                      lang === "ar" ? styles.arTextPath : styles.enTextPath
                    }
                  >
                    {GeneralPath.length > 0 &&
                      GeneralPath.map((path, index) => {
                        return (
                          path.id !== -1 && (
                            <span
                              onClick={() => {
                                if (
                                  index !== GeneralPath.length - 1 &&
                                  isNotLastIndex(index)
                                ) {
                                  GoTo_backward(index, path);
                                }
                              }}
                              style={{
                                // display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                display: path.id === -3 ? "none" : "flex",
                              }}
                              key={index}
                            >
                              {index !== 0 && path.name && strings.pathSeperate}
                              <p style={{ padding: "0 9px" }}>
                                {path.name && path.name[lang]}
                              </p>
                            </span>
                          )
                        );
                      })}
                  </div>
                </Col>

                <Col lg="6">
                  <Row>
                    <Col
                      lg="4"
                      md="4"
                      sm="4"
                      xs="4"
                      onClick={() => router.push("/Tajawal/dealofday")}
                    >
                      <div className={styles.todayDeals}>
                        <i className="fas fa-thumbs-up mx-2"></i>
                        {strings.todayDeals}
                      </div>
                    </Col>

                    <Col
                      lg="4"
                      md="4"
                      sm="4"
                      xs="4"
                      onClick={() => router.push("/Tajawal/storesoffers")}
                    >
                      <div className={styles.shopOffers}>
                        <i className="fas fa-store mx-2"></i>
                        {strings.shopOffers}
                      </div>
                    </Col>
                    <Col
                      lg="4"
                      md="4"
                      sm="4"
                      xs="4"
                      onClick={() => router.push("/Tajawal/askstore")}
                    >
                      <div className={styles.askShops}>
                        <i className="fas fa-question mx-2"></i>
                        {strings.AskShops}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {showDivlastVisit === true && (
          <Col lg="12" style={{ direction: "ltr" }}>
            <LastVisitedStore />
          </Col>
        )}
        <Col lg="12">
          <div>
            <img src={homeBaner} alt="home banner" className={styles.banner} />
          </div>
        </Col>
      </Row>

      <Row className={styles.main_home}>
        <Col lg="3" mg="3" className={styles.home_filter_content}>
          {GeneralPath.length > 0 ? (
            GeneralPath[3].id !== -1 || filter[3].id.length > 0 ? (
              <MarketFilter />
            ) : GeneralPath[2].id !== -1 || filter[1].id !== -1 ? (
              <RegionFilter />
            ) : (
              <CityFilter />
            )
          ) : null}
        </Col>

        <Col lg="9" md="12" xs="12" className={styles.home_content}>
          {GeneralPath.length > 0 ? (
            GeneralPath[3].id !== -1 || filter[3].id.length > 0 ? (
              <MarketCard
                regionId={
                  filter[1].id !== -1 ? filter[1].id : GeneralPath[3].id
                }
                activityIds={filter[3].id}
              />
            ) : GeneralPath[2].id !== -1 || filter[1].id !== -1 ? (
              <RegionCard cityId={GeneralPath[2].id} />
            ) : (
              <CityCard />
            )
          ) : null}
        </Col>
      </Row>

      <Row className={styles.padding_50}>
        {/* adds  */}

        <Col lg="6" md="6" sm="12" className="mb-4">
          <div className={styles.addImg}>
            <img src={add1} />
          </div>
        </Col>
        <Col lg="6" md="6" sm="12" className="mb-4">
          <div className={styles.addImg}>
            <img src={add2} />
          </div>
        </Col>
      </Row>
      {/* download app large screen */}
      <Row className={styles.downloadSection} style={{ direction: "rtl" }}>
        <Col
          lg="6"
          md="6"
          sm="12"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "cennter",
          }}
        >
          <img
            src={phonesHome}
            style={{ maxHeight: "654px", maxWidth: "676px" }}
          />
        </Col>
        <Col
          lg="6"
          md="6"
          sm="12"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div>
            <div>
              <img src={logo} alt="logo" />
            </div>
            <p className={styles.text1}>{strings.appCollect}</p>
            <div className={styles.seperate}></div>
            <p className={styles.text2}>{strings.downloadNow}</p>
            <div className={styles.flex_align}>
              <div className={styles.downloadLink}>
                <a href="#" target="_blank">
                  <img
                    src={GooglePlay}
                    alt="GooglePlay"
                    className="img-fluid"
                  />
                </a>
              </div>
              <div>
                <a href="#" target="_blank">
                  <img src={AppStore} alt="AppStore" className="img-fluid" />
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <SmallScreenFilter />
    </Container>
  );
}
