import { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import productAd from "../../../Assets/Images/productAd.png";
import Allshops from "../../../components/stores/allshops/allshops";
import Filtershops from "../../../components/stores/allshops/filtershops";
import LangContext from "../../../store/LangContext";
import storeAd from "../../../Assets/Images/store/storeAd.png";
import axios from "axios";
import GeneralPathContext from "../../../store/GeneralPath";
import styles from "../../../styles/Home.module.css";
import strings from "../../../Assets/Local/Local";
import Link from "next/link";
import FilterResponsive from "../../../components/stores/allshops/responsivefilter";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import UserCtx from "../../../store/UserContext";
import Loading from "../../../components/Loading/Loading";
import ItemsNotFound from "../../../components/ItemsNotFound/ItemsNotFound";
import HeaderFilterContext from "../../../store/HeaderFilterContext";

function index({ activities, categories, blocks }) {
  const { lang } = useContext(LangContext);
  const { user, token } = useContext(UserCtx);
  const { filter } = useContext(HeaderFilterContext);
  const { GeneralPath, GoTo_backward } = useContext(GeneralPathContext);
  const { query } = useRouter();
  const [stateActivities, setStateActivities] = useState([]);
  const [stateCategories, setStateCategories] = useState([]);
  const [stateBlocks, setStateBlocks] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [flag, setFlag] = useState(false);

  console.log("id filter=>", filter);

  const getAllStores = () => {
    const shopType = filter.find((item) => item.name === "market_Type");
    let userToken;
    let url = `${API_END_POINT}/allUsers?type=TRADER&market=${query.id}&&shopType=${shopType.id}`;

    setFlag(false);
    if (Object.keys(token).length !== 0) {
      if (stateCategories.length > 0) {
        // الفئات
        url += `&${stateCategories}`;
      }
      if (stateActivities.length > 0) {
        // الانشطة
        url += `&${stateActivities}`;
      }
      if (stateBlocks.length > 0) {
        // الاحياء
        url += `&${stateBlocks}`;
      }
      url += `&userId=${user.id}`;
      userToken = `Bearer ${token}`;
    } else {
      if (stateCategories.length > 0) {
        // الفئات
        url += `&${stateCategories}`;
      }
      if (stateActivities.length > 0) {
        // الانشطة
        url += `&${stateActivities}`;
      }
      if (stateBlocks.length > 0) {
        // الاحياء
        url += `&${stateBlocks}`;
      }
    }
    console.log("storesssss urll=>", url);
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          "Content-Type": "application/json",
          Authorization: userToken !== undefined ? userToken : "",
        },
      })
      .then((response) => {
        setFlag(true);
        setAllStores(response.data.data);
      });
  };

  const filterActivities = (newArray) => {
    let stores = "";
    for (let i = 0; i < newArray.length; i++) {
      if (i + 1 < newArray.length) {
        stores += `category=${newArray[i]}&`;
      } else {
        stores += `category=${newArray[i]}`;
      }
    }
    setStateActivities(stores);
  };

  const filterCategories = (newArray) => {
    let stores = "";
    for (let i = 0; i < newArray.length; i++) {
      if (i + 1 < newArray.length) {
        stores += `subCategory=${newArray[i]}&`;
      } else {
        stores += `subCategory=${newArray[i]}`;
      }
    }
    setStateCategories(stores);
  };

  const filterBlocks = (newArray) => {
    let stores = "";
    for (let i = 0; i < newArray.length; i++) {
      if (i + 1 < newArray.length) {
        stores += `tradersByRegion=${newArray[i]}&`;
      } else {
        stores += `tradersByRegion=${newArray[i]}`;
      }
    }
    setStateBlocks(stores);
  };

  useEffect(() => {
    getAllStores();
  }, [stateCategories, stateActivities, stateBlocks]);

  const isNotLastIndex = (currentIndex) => {
    let restOfPath = GeneralPath.slice(currentIndex + 1, GeneralPath.length);

    let checkVar = restOfPath.filter((item, ind) => {
      return item.id !== -1;
    });

    if (checkVar.length > 0) return true;
    return false;
  };

  strings.setLanguage(lang);

  return (
    <div className="special-padding-pages">
      <MetaDecartor title={strings.title} />
      {flag ? (
        <Container fluid>
          <Row>
            <Col
              lg="12"
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
                        <Link
                          key={index}
                          href="/Tajawal"
                          // href={
                          //   index !== GeneralPath.length - 1 &&
                          //   isNotLastIndex(index) &&
                          //   "/"
                          // }
                          // onClick={() => {
                          //   if (
                          //     index !== GeneralPath.length - 1 &&
                          //     isNotLastIndex(index)
                          //   ) {
                          //     GoTo_backward(index, path);
                          //   }
                          // }}
                        >
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
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            key={index}
                          >
                            {index !== 0 && path.name && strings.pathSeperate}
                            <p style={{ padding: "0 9px" }}>
                              {path.name && path.name[lang]}
                            </p>
                          </span>
                        </Link>
                      )
                    );
                  })}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div className="">
                <img src={productAd} alt="product ad" className="w-100 my-4" />
              </div>
            </Col>
            <Col lg="3">
              <Filtershops
                lang={lang}
                getFilteredActivities={filterActivities}
                activitiesFilters={activities}
                getFilteredCategories={filterCategories}
                categoriesFilters={categories}
                getFilteredBlocks={filterBlocks}
                blocksFilters={blocks}
              />
              <div
                className={
                  lang === "ar"
                    ? "text-right d-lg-block d-none"
                    : "text-left d-lg-block d-none"
                }
              >
                <img src={storeAd} alt="store ad" className="w-100 mt-3" />
              </div>
            </Col>
            <Col lg="9">
              {allStores.length > 0 ? (
                <Allshops lang={lang} allStores={allStores} />
              ) : (
                <ItemsNotFound
                  elementClass={" items__notfound"}
                  title={strings.nostores}
                />
              )}
            </Col>
            <FilterResponsive
              lang={lang}
              lang={lang}
              getFilteredActivities={filterActivities}
              activitiesFilters={activities}
              getFilteredCategories={filterCategories}
              categoriesFilters={categories}
              getFilteredBlocks={filterBlocks}
              blocksFilters={blocks}
            />
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export const getStaticProps = async (context) => {
  // Activities
  const acts = await fetch(`${API_END_POINT}/category?`, {
    headers: {
      // "Accept-Language": lang,
    },
  });
  const { data: activities } = await acts.json();

  // Categories
  const cats = await fetch(`${API_END_POINT}/sub-category?`, {
    headers: {
      // "Accept-Language": lang,
    },
  });
  const { data: categories } = await cats.json();

  // Blocks
  const bls = await fetch(`${API_END_POINT}/region?`, {
    headers: {
      // "Accept-Language": lang,
    },
  });
  const { data: blocks } = await bls.json();

  return {
    props: {
      activities,
      categories,
      blocks,
    },
  };
};

export default index;
