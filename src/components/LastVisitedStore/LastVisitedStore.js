import React, { useState, useEffect, useContext } from "react";
import ReactImageFallback from "react-image-fallback";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LangContext from "../../store/LangContext";
import Link from "next/link";

import "antd/dist/antd.css";
import styles from "../../styles/LastVisitesStores.module.css";
import { API_END_POINT } from "../appConfig/AppConfig";

const LastVisitedStore = () => {
  const [lastVisitedCards, setLastVisited] = useState([]);
  const { lang } = useContext(LangContext);

  useEffect(() => {
    let lastVisitedStores = localStorage.getItem("lastVisitedStores")
      ? JSON.parse(localStorage.getItem("lastVisitedStores"))
      : [];
    setLastVisited(lastVisitedStores);
  }, []);

  const handleActiveCat = (index) => {};

  const SpecialsettingsCat = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: lastVisitedCards.length >= 4 ? 4 : lastVisitedCards.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow:
            lastVisitedCards.length >= 4 ? 3 : lastVisitedCards.length,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow:
            lastVisitedCards.length >= 4 ? 3 : lastVisitedCards.length,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow:
            lastVisitedCards.length > 3 ? 3 : lastVisitedCards.length,
          slidesToScroll: 1,
          // initialSlide: 2
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow:
            lastVisitedCards.length > 2 ? 2 : lastVisitedCards.length,
          slidesToScroll: 1,
          // initialSlide: 2
        },
      },
      {
        breakpoint: 411,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          //   initialSlide:
        },
      },
    ],
    rtl: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    // cssEase: "linear",
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={styles.configIconDiv} style={{ width: "95vw" }}>
      <Slider {...SpecialsettingsCat}>
        {lastVisitedCards.length > 0 &&
          lastVisitedCards.map((element, index) => {
            return (
              <div className="">
                <Link href={{ pathname: `/Tajawal/stores/${element.id}` }}>
                  <div
                    className="SingleCat"
                    onClick={() => {
                      handleActiveCat(index);
                    }}
                    style={{
                      cursor:'pointer',
                      background: `#fff`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      direction: lang === "ar" ? "rtl" : "ltr",
                      width: "90%",
                      margin: "0px auto",
                      padding: "11px 0",
                      borderRadius: "12px",
                      border: "2px solid #F15A24",
                    }}
                  >
                    <div style={{ width: "20%" }}>
                      <img
                        src={`${API_END_POINT}${element.image}`}
                        style={{ width: "70px", maxHeight: "100%" }}
                      />
                    </div>
                    <div style={{ width: "70%" }}>
                      <h6
                        style={{ textAlign: lang === "ar" ? "right" : "left" }}
                      >
                        {element.name}
                      </h6>
                      {element.subCategories.length > 0 && (
                        <p
                          style={{
                            textAlign: lang === "ar" ? "right" : "left",
                            color: "gray",
                          }}
                        >
                          {element.subCategories[0].name[lang]}
                        </p>
                      )}
                      <p
                        style={{
                          textAlign: lang === "ar" ? "right" : "left",
                          color: "#F15A24",
                        }}
                      >
                        <i className="fas fa-star"></i>{" "}
                        {element.rate.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default LastVisitedStore;
