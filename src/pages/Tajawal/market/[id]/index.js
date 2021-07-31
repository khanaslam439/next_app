import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "../../../../components/Loading/Loading";
import MetaDecartor from "../../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../../Assets/Local/Local";
import { API_END_POINT } from "../../../../components/appConfig/AppConfig";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import StoreAds from "../../../../components/market/StoreAds";
import StoreInfo from "../../../../components/market/StoreInfo";
import StoreSlider from "../../../../components/market/StoreSlider";
import LangContext from "../../../../store/LangContext";

function index({}) {
  const { query } = useRouter();
  const { lang } = useContext(LangContext);
  const [storeData, setStoreData] = useState();

  function fetchStoreInfo() {
    // let url = `${API_END_POINT}/userInfo?userId=99`;
    let url = `${API_END_POINT}/userInfo?userId=${query.id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Testing...: ", response.data.user);
        setStoreData(response.data.user);
      });
  }

  useEffect(() => {
    fetchStoreInfo();
  }, []);

  strings.setLanguage(lang);

  return (
    // <div>
    //   <h1>market details page</h1>
    //   <Link href={{ pathname: `/Tajawal/stores`, query: { id: query.id } }}>

    //     show all stores in this market!
    //   </Link>
    // </div>

    <>
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
          <MetaDecartor title={`${strings.title}`} />{" "}
          <Row>
            <Col md="10">
              <div>
                <Row>
                  <Col lg="8">
                    <StoreSlider lang={lang} storeData={storeData} />
                  </Col>
                  <Col lg="4">
                    <StoreInfo lang={lang} storeData={storeData} />
                  </Col>
                  <Col lg="12">
                    <div className="mt-4 marketLinkBTN">
                      <Link
                        href={{
                          pathname: `/Tajawal/stores`,
                          query: { id: query.id },
                        }}
                      >
                        {strings.showAllStores}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="2" className="d-md-block d-lg-block d-none">
              <StoreAds lang={lang} />
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
