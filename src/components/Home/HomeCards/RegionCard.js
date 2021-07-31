import React, { useContext, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import pinImg from "../../../Assets/Images/pin.png";
import LangContext from "../../../store/LangContext";
import GeneralPathContext from "../../../store/GeneralPath";
import TempShareDataContext from "../../../store/TempShareData";
import { Tooltip, Modal } from "antd";
import HeaderFilterContext from "../../../store/HeaderFilterContext";
import ReactImageFallback from "react-image-fallback";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import cityscape from "../../../Assets/Images/cityscape.png";
import { Carousel } from "react-responsive-carousel";
import Map from "./Map/Map";
import String from "../../../Assets/Local/Local";
import ItemsNotFound from "../../ItemsNotFound/ItemsNotFound";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import "antd/dist/antd.css";
import styles from "../../../styles/Home.module.css";

export default function RegionCard(props) {
  const { GeneralPath, handleGeneralPath } = useContext(GeneralPathContext);
  const { lang } = useContext(LangContext);
  const { tempRegions } = useContext(TempShareDataContext);
  const { headerFilterHandel } = useContext(HeaderFilterContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRegionModal, setCurrentRegionModal] = useState(null);
  const [regions, setregions] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    let NewRegions =
      tempRegions.length > 0 &&
      tempRegions.filter((item) => {
        return item.city.id === props.cityId;
      });
    setregions(NewRegions);
  }, [props]);

  const showModal = (region) => {
    setCurrentRegionModal(region);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentRegionModal(null);
  };

  const renderDetailsModal = () => {
    currentRegionModal.slider.push(currentRegionModal.image);

    return (
      <Modal
        title=""
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {currentRegionModal !== null && (
          <Container>
            <Row>
              {currentRegionModal.slider && (
                <Col lg={currentRegionModal.image ? "12" : "12"}>
                  <Carousel>
                    {currentRegionModal.slider.map((img, index) => {
                      return (
                        <div>
                          <ReactImageFallback
                            src={API_END_POINT + img}
                            fallbackImage={cityscape}
                            initialImage={cityscape}
                            alt={`product`}
                            style={{
                              minWidth: "200px",
                              maxWidth: "100%",
                              height: "200px",
                              borderRadius: "10px",
                            }}
                            className="avater"
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </Col>
              )}
              {currentRegionModal.name && (
                <h4
                  style={{
                    textAlign: lang === "en" ? "left" : "right",
                    width: "100%",
                    fontSize: "18px",
                    padding: "0 15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    direction: "rtl",
                  }}
                >
                  <span>
                    <span style={{ color: "#FF7247" }}>
                      {String.City}&nbsp;:&nbsp;
                    </span>
                    {currentRegionModal.name[lang]}
                  </span>
                  <span>
                    <a
                      target="_blank"
                      href={`https://www.google.com/maps/search/?api=1&query=${currentRegionModal.geoLocation.coordinates[0]},${currentRegionModal.geoLocation.coordinates[1]}`}
                    >
                      <i
                        class="fas fa-map-marker-alt"
                        style={{ color: "red", cursor: "pointer" }}
                      ></i>
                    </a>
                  </span>
                </h4>
              )}
              {currentRegionModal.description && (
                <Col lg="12">
                  <h4>
                    <span
                      style={{
                        color: "#FF7247",
                        width: "100%",
                        display: "block",
                        fontSize: "18px",
                        textAlign: lang === "ar" ? "right" : "left",
                      }}
                    >
                      {String.desc}
                    </span>
                  </h4>
                  <p style={{ textAlign: lang === "ar" ? "right" : "left" }}>
                    {currentRegionModal.description[lang]}
                  </p>
                </Col>
              )}
            </Row>
          </Container>
        )}
      </Modal>
    );
  };

  return (
    <Container>
      <Row>
        {regions.length > 0 ? (
          regions.map((Region, index) => {
            return (
              <Col lg="2" md="3" sm="3" xs="6" className="mb-3" key={index}>
                {Region.image ||
                Region.slider ||
                Region.geoLocation ||
                Region.description ? (
                  <span className={styles.infoIcon}>
                    <i
                      class="fas fa-exclamation-circle"
                      onClick={() => showModal(Region)}
                    ></i>
                  </span>
                ) : null}
                <Tooltip title={Region.name[lang]}>
                  <div
                    className={styles.cityCard}
                    onClick={() => {
                      handleGeneralPath(Region, "region");
                      headerFilterHandel("city", Region.city.id);
                      headerFilterHandel("region", Region.id);
                      headerFilterHandel("market", -1);
                      headerFilterHandel("activity", []);
                    }}
                  >
                    <div className={styles.imgPinDiv}>
                      <img
                        src={`${API_END_POINT}${Region.image}`}
                        className="cittyImgg"
                        style={{ maxWidth: "100%", height: "100px" }}
                      />
                    </div>
                    <h6 className={styles.text}>
                      <span>
                        {Region.name[lang].length > 10 ? (
                          <span>{Region.name[lang].substr(0, 10)} ...</span>
                        ) : (
                          Region.name[lang]
                        )}
                      </span>
                    </h6>
                  </div>
                </Tooltip>
              </Col>
            );
          })
        ) : (
          <ItemsNotFound elementClass="col-12" title={String.noregions} />
        )}
      </Row>
      {isModalVisible === true && renderDetailsModal()}{" "}
    </Container>
  );
}
