import React, { useContext, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import LangContext from "../../../store/LangContext";
import GeneralPathContext from "../../../store/GeneralPath";
import TempShareDataContext from "../../../store/TempShareData";
// import animationEmptyMarket from "../../../Assets/Lottie/emptymarkets.json";
// import Lottie from "react-lottie";
import Link from "next/link";
import { API_END_POINT } from "../../appConfig/AppConfig";
import "antd/dist/antd.css";
import { Tooltip } from "antd";
import styles from "../../../styles/Home.module.css";
import String from "../../../Assets/Local/Local";
import ItemsNotFound from "../../ItemsNotFound/ItemsNotFound";

export default function MarketCard(props) {
  const { GeneralPath, handleGeneralPath } = useContext(GeneralPathContext);
  const { lang } = useContext(LangContext);
  const { tempMarkets } = useContext(TempShareDataContext);
  const [markets, setmarkets] = useState([]);

  useEffect(() => {
    console.log("hello from market card");
    prepareData();
  }, [props]);

  const prepareData = () => {
    let currentMarkets = [];

    console.log("prepare", tempMarkets);
    console.log("market props", props);

    if (tempMarkets.length > 0) {
      //handle All activities case with specific region
      if (
        props.regionId !== -1 &&
        props.activityIds &&
        props.activityIds.length > 0 &&
        props.activityIds.includes(0)
      ) {
        console.log("filter by region and all activity");
        currentMarkets = tempMarkets.filter((item) => {
          return item.region.id === props.regionId;
        });
      }
      //handle All case
      else if (
        props.activityIds &&
        props.activityIds.length > 0 &&
        props.activityIds.includes(0)
      ) {
        console.log("case All", tempMarkets);
        currentMarkets = tempMarkets;
      }
      //handle case (filter by region and activity together)
      else if (
        props.regionId !== -1 &&
        props.activityIds &&
        props.activityIds.length > 0
      ) {
        console.log("hellooooooo");
        let temp__market = [];
        for (let k = 0; k < props.activityIds.length; k++) {
          currentMarkets = tempMarkets.filter((item) => {
            if (item.categories.length > 0) {
              item.categories.filter((cat, indxCat) => {
                console.log("dddd-- > ", cat.id, props.activityIds[k]);
                if (cat.id === props.activityIds[k]) {
                  // if (inNotContain(temp__market, item.id))
                    temp__market.push(item);
                  return;
                }
              });
            }
            return;
          });
        }

        if (temp__market.length > 0) {
          currentMarkets = temp__market.filter((item) => {
            return item.region.id === props.regionId;
          });
        } else {
          currentMarkets = tempMarkets.filter((item) => {
            return item.region.id === props.regionId;
          });
        }
      }
      // handle case (filter by activity only from header)
      else if (props.activityIds && props.activityIds.length > 0) {
        console.log("filter by activity only from header", props.activityIds);
        let temp__market = [];
        for (let k = 0; k < props.activityIds.length; k++) {
          currentMarkets = tempMarkets.filter((item) => {
            if (item.categories.length > 0) {
              item.categories.filter((cat, indxCat) => {
                console.log("dddd-- > ", cat.id, props.activityIds[k]);
                if (cat.id === props.activityIds[k]) {
                  // if (inNotContain(temp__market, item.id)) 
                    temp__market.push(item);
                  
                  return;
                }
              });
            }
            return;
          });
        }

        currentMarkets = temp__market; // da for test
      }
      // handle case (filter by region only from sub header)
      else if (props.regionId !== -1) {
        currentMarkets = tempMarkets.filter((item, index) => {
          console.log("temp mark===> ", item);
          return item.region.id === props.regionId;
        });
      } else {
        currentMarkets = tempMarkets;
      }
      console.log("currentMarkets----,>  ", currentMarkets);

      setmarkets(currentMarkets);
    }
  };

  const inNotContain = (arr, id) => {
    let flag = false;
    arr.filter((item, indx) => {
      if (item.id === id) flag = false;
      else {
        flag = true;
      }
    });

    console.log("inNotContain==> ", flag);
    return flag;
  };
  return (
    <Container>
      <Row>
        {markets.length > 0 ? (
          markets.map((market, index) => {
            return (
              <Col lg="3" md="4" sm="6" xs="12" className="mb-3" key={index}>
                <span className={styles.infoIcon}>
                  <Link
                    href={{
                      pathname: `/Tajawal/market/[id]`,
                      query: { id: market.id },
                    }}
                  >
                    <i class="fas fa-exclamation-circle"></i>
                  </Link>
                </span>
                <Link
                  href={{
                    pathname: "/Tajawal/stores",
                    query: { id: market.id },
                  }}
                >
                  <Tooltip title={market.username[lang]}>
                    <div
                      className={styles.marketCard}
                      onClick={() => {
                        console.log("market selected---> ", market);
                        handleGeneralPath(market, "market");
                      }}
                    >
                      <div
                        className={styles.imgPinDiv}
                        style={{
                          backgroundImage: `url(${API_END_POINT}${market.image})`,
                        }}
                      ></div>
                      <h6 className={styles.text}>
                        <span>
                          {market.username[lang].length > 15 ? (
                            <span>
                              {market.username[lang].substr(0, 15)} ...
                            </span>
                          ) : (
                            market.username[lang]
                          )}
                        </span>
                      </h6>
                    </div>
                  </Tooltip>
                </Link>
              </Col>
            );
          })
        ) : (
          <ItemsNotFound elementClass="col-12" title={String.noMarkets} />
        )}
      </Row>
    </Container>
  );
}
