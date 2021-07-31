import { useContext, useState, useEffect } from "react";
import Link from "next/link";

import strings from "../../../../Assets/Local/Local";
import LangContext from "../../../../store/LangContext";
import HeaderFilterContext from "../../../../store/HeaderFilterContext";
import GeneralPathContext from "../../../../store/GeneralPath";
import TempShareDataContext from "../../../../store/TempShareData";

import styles from "../../../../styles/Nav.module.css";
const DropdownMenu = ({ city }) => {
  const { tempMarkets, regionsFilterHandel, marketsFilterHandel } =
    useContext(TempShareDataContext);
  const { lang } = useContext(LangContext);
  const { headerFilterHandel } = useContext(HeaderFilterContext);
  const { GoTo } = useContext(GeneralPathContext);
  const [CurrentSelectedRegion, setCurrentSelectedRegion] = useState(null);
  const [districts, setDistricts] = useState(
    regionsFilterHandel(city.name[lang], lang)
  );
  const [markets, setMarkets] = useState([]);
  const [districtIsOpen, setDistrictIsOpen] = useState(false);
  const [marketsIsOpen, setMarketsIsOpen] = useState(false);

  const cityHandel = () => {
    headerFilterHandel("city", city.id);
    headerFilterHandel("region", -1);
    headerFilterHandel("market", -1);
    headerFilterHandel("activity", []);

    setDistrictIsOpen(false);
    setMarketsIsOpen(false);
    GoTo(2, city);
  };

  // console.log("district.name[lang]", districts);

  const regionHandel = (region) => {
    setDistrictIsOpen(false);
    setMarketsIsOpen(false);
    headerFilterHandel("city", city.id);
    headerFilterHandel("region", region.id);
    headerFilterHandel("market", -1);
    headerFilterHandel("activity", []);

    GoTo(3, region);
  };

  // useEffect(() => {
  //   let arr =
  //     CurrentSelectedRegion !== null
  //       ? tempMarkets.length > 0 &&
  //         tempMarkets.filter((item) => {
  //           return item.regionId === CurrentSelectedRegion;
  //         })
  //       : [];
  //   setMarkets(arr);
  // }, [CurrentSelectedRegion]);

  useEffect(() => {
  }, [markets]);

  strings.setLanguage(lang);
  return (
    <div className={styles.dropdown_container}>
      <div className={styles.dropdown_link}>
        <Link href="/Tajawal">
          <a onClick={cityHandel}>{city.name[lang]}</a>
        </Link>
        {districts.length ? <i className="fas fa-chevron-down"></i> : null}
        {districts.length ? (
          <div className={`${styles.district_dropdown} `}>
            {districts.map((district, index) => (
              <div className={styles.dictrict_link_wrapper} key={index}>
                <div
                  className={styles.region_content}
                  onMouseOver={() => {
                    setCurrentSelectedRegion(district.id);
                    setMarkets(marketsFilterHandel(district.id));
                  }}
                >
                  <Link href="/Tajawal">
                    <a
                      onClick={() => {
                        regionHandel(district);
                        console.log("district=>", district);
                      }}
                    >
                      {district.name[lang]}
                    </a>
                  </Link>

                  {lang === "ar" ? (
                    <i className="fas fa-chevron-left"></i>
                  ) : (
                    <i className="fas fa-chevron-right"></i>
                  )}
                </div>
                {markets.length ? (
                  <div
                    className={`${
                      styles[`markets_dropdown_container_${lang}`]
                    }`}
                  >
                    {markets.map((market, index) => (
                      <Link
                        href={{
                          pathname: `/Tajawal/stores`,
                          query: { id: market.id },
                        }}
                        key={index}
                      >
                        <a
                          className={styles.market_link}
                          onClick={() => {
                            setDistrictIsOpen((prevState) => !prevState);
                          }}
                        >
                          {market.username[lang]}
                        </a>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DropdownMenu;
