import React, { useContext, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import pinImg from "../../../Assets/Images/pin.png";
import GeneralPathContext from "../../../store/GeneralPath";
import TempShareDataContext from "../../../store/TempShareData";
import LangContext from "../../../store/LangContext";
import ReactImageFallback from "react-image-fallback";
import { Tooltip, Modal } from "antd";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import cityscape from "../../../Assets/Images/cityscape.png";
import { Carousel } from "react-responsive-carousel";
import Map from "./Map/Map";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "antd/dist/antd.css";
import String from "../../../Assets/Local/Local";
import styles from "../../../styles/Home.module.css";
import ItemsNotFound from "../../ItemsNotFound/ItemsNotFound";

export default function CityCard() {
  const { GeneralPath, handleGeneralPath } = useContext(GeneralPathContext);
  const { tempCities } = useContext(TempShareDataContext);
  const { lang } = useContext(LangContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCityModal, setCurrentCityModal] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const showModal = (city) => {
    setCurrentCityModal(city);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentCityModal(null);
  };

  const renderDetailsModal = () => {
    currentCityModal.slider.push(currentCityModal.image);
    return (
      <Modal
        title=""
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {currentCityModal !== null && (
          <Container>
            <Row>
              {currentCityModal.slider && (
                <Col lg={currentCityModal.image ? "12" : "12"}>
                  <Carousel>
                    {currentCityModal.slider.map((img, index) => {
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
              {currentCityModal.name && (
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
                    {currentCityModal.name[lang]}
                  </span>
                  <span>
                    <a
                      target="_blank"
                      href={`https://www.google.com/maps/search/?api=1&query=${currentCityModal.geoLocation.coordinates[0]},${currentCityModal.geoLocation.coordinates[1]}`}
                    >
                      <i
                        class="fas fa-map-marker-alt"
                        style={{ color: "red", cursor: "pointer" }}
                      ></i>
                    </a>
                  </span>
                </h4>
              )}
              {currentCityModal.description && (
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
                    {currentCityModal.description[lang]}
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
      <Row className={styles.scrollbarWidth}>
        {tempCities.length > 0 ? (
          tempCities.map((city, index) => {
            return (
              <Col lg="2" md="3" sm="3" xs="6" className="mb-3" key={index}>
                {city.image ||
                city.slider ||
                city.geoLocation ||
                city.description ? (
                  <span className={styles.infoIcon}>
                    <i
                      class="fas fa-exclamation-circle"
                      onClick={() => showModal(city)}
                    ></i>
                  </span>
                ) : null}
                <Tooltip title={city.name[lang]}>
                  <div
                    className={styles.cityCard}
                    onClick={() => {
                      handleGeneralPath(city, "city");
                    }}
                  >
                    <div className={styles.imgPinDiv}>
                      <img
                        src={`${API_END_POINT}${city.image}`}
                        className="cittyImgg"
                        style={{ maxWidth: "100%", height: "100px" }}
                      />
                    </div>
                    <h6 className={styles.text}>
                      <span>
                        {city.name[lang].length > 10 ? (
                          <span>{city.name[lang].substr(0, 10)} ...</span>
                        ) : (
                          city.name[lang]
                        )}
                      </span>
                    </h6>
                  </div>
                </Tooltip>
              </Col>
            );
          })
        ) : (
          <ItemsNotFound elementClass="col-12" title={String.nocities} />
        )}
      </Row>
      {isModalVisible === true && renderDetailsModal()}
    </Container>
  );
}
