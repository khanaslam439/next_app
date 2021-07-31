import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Input from "@material-ui/core/Input";
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";

import ActiveLink from "../../ActiveLink/ActiveLink";
import AccountDropDown from "./AccountDropDown/AccountDropDown";
import Nav from "../Nav/Nav";
import MarketAutoSuggest from "./MarketAutoSuggest";
import ActivitiesAutoSuggest from "./ActivitiesAutoSuggest";
import FilterModal from "./FilterModal/FilterModal";
import strings from "../../../Assets/Local/Local";

import LangContext from "../../../store/LangContext";
import UserContext from "../../../store/UserContext";
import HeaderFilterContext from "../../../store/HeaderFilterContext";
import TempShareDataContext from "../../../store/TempShareData";
import logo from "../../../Assets/Images/logo.png";
import arabicFlag from "../../../Assets/Images/arabicflag.png";
import EnFlag from "../../Icons/EnFlag";

import styles from "../../../styles/Header.module.css";
import { API_END_POINT } from "../../appConfig/AppConfig";

const Header = () => {
  const { lang, handelLang } = useContext(LangContext);
  useContext;
  const { filter, headerFilterHandel, activiytHandel } =
    useContext(HeaderFilterContext);
  const { user, clearUser, token } = useContext(UserContext);
  const { activities, subCategory } = useContext(TempShareDataContext);
  const router = useRouter();

  const [markets, setMarkets] = useState([]);
  const [searchByType, setSearchByType] = useState();
  const [activitySelected, setActivitySelected] = useState();
  const [marketSelected, setMarketSelected] = useState();
  // for onChange value in auto suggest
  const [activityValue, setActivityValue] = useState("");
  const [marketValue, setMarketValue] = useState("");
  //
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [modalValue, setModalValue] = useState();

  const [show, setShow] = useState(false);
  const [hint, setHint] = useState("");
  //
  const [removeMarketValue, setRemoveMarketValue] = useState(false);
  const [removeActivityValue, setRemoveActivityValue] = useState(false);

  const newLang = lang === "ar" ? "en" : "ar";

  console.log("activities", activities);
  console.log("subCategory", subCategory);

  strings.setLanguage(lang);

  const searchByTypeHandle = () => {
    if (searchByType) {
      router.push({
        pathname: "/Tajawal/search",
        query: { name: searchByType },
      });
      setSearchByType("");
    }
  };
  // modal functions
  const closeModal = () => {
    setFilterModalIsOpen(false);
  };

  const filterModalHandel = (item) => {
    console.log("activity  ", item);
    setModalValue(item.name[lang]);
    setActivitySelected(item);
  };
  // end

  // get autoComplete value
  const selectedActiviyHandel = (value) => {
    setActivitySelected(value);
  };
  const selectedMarketHandel = (value) => {
    setMarketSelected(value);
  };
  // end
  const logoutHandel = () => {
    console.log("clicked");
    axios
      .post(
        `${API_END_POINT}/logout`,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${token}`,
          },
        }
      )
      .then((res) => {
        clearUser();
        router.reload();
      })
      .catch((error) => {
        console.log("error in logout", error.response);
        setHint("error in logout");
        setShow(true);
      });
  };
  const fetchMarkets = (url) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMarkets(res.data.data);
      })
      .catch((error) => {
        console.log("error in market", error.response);
      });
  };
  useEffect(() => {
    let url;
    if (filter[1].id === -1) {
      console.log("fetch markets id 1");
      url = `${API_END_POINT}/allUsers?all=true&removeLanguage=true&type=MARKET`;
      fetchMarkets(url);
    } else if (filter[1].id !== -1) {
      console.log("fetch markets id 2");

      url = `${API_END_POINT}/allUsers?all=true&removeLanguage=true&region=${filter[1].id}&type=MARKET`;
      fetchMarkets(url);
    }
  }, [filter[1].id]);
  useEffect(() => {
    console.log("markets", markets);
  }, [markets]);
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
      <header
        className={
          styles.header_container +
          ` ${lang === "ar" ? "headerFormControlAR" : "headerFormControlEN"}`
        }
      >
        <Link href="/Tajawal">
          <a className={styles.img_wrapper}>
            <img src={logo} alt="Tajwal logo" />
          </a>
        </Link>
        <div className={`${styles.search_type}`}>
          <Input
            placeholder={strings.searchBytype}
            className={styles.search_input}
            onChange={(e) => setSearchByType(e.target.value)}
            value={searchByType}
          />
          <button className={styles.search_btn} onClick={searchByTypeHandle}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className={styles.search_market}>
          <MarketAutoSuggest
            suggestData={markets}
            placeholder={strings.searchBymarket}
            selectedValueHandel={selectedMarketHandel}
            inpuChangeHandel={(inputValue) => setMarketValue(inputValue)}
            removeValue={removeMarketValue}
          />
          {/*  */}
          <button
            className={styles.search_btn}
            onClick={() => {
              if (marketSelected) {
                headerFilterHandel("market", marketSelected.id);
                router.push(`/Tajawal/market/${marketSelected.id}`);
                setRemoveMarketValue(true);
              } else if (marketValue) {
                setHint(strings.markerNotFound);
                setShow(true);
              }
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className={styles.search_activity}>
          <ActivitiesAutoSuggest
            suggestData={activities}
            placeholder={strings.searchByactivity}
            selectedValueHandel={selectedActiviyHandel}
            modalValue={modalValue}
            inpuChangeHandel={(inputValue) => setActivityValue(inputValue)}
            removeValue={removeActivityValue}
          />

          <button
            className={styles.search_btn}
            onClick={() => {
              if (activitySelected) {
                activiytHandel(activitySelected.id);
                setRemoveActivityValue(true);
              } else if (activityValue) {
                setHint(strings.activityNotfound);
                setShow(true);
              }
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button
          className={styles.filer_btn}
          onClick={() => setFilterModalIsOpen(true)}
        >
          <i className="fas fa-filter"></i>
        </button>
        <div className={styles[`user_wrapper__${lang}`]}>
          <div className={`form-group ${styles.select_container}`}>
            <select
              className="form-control"
              defaultValue={
                filter.find((item) => item.name === "market_Type").id
              }
              onChange={(e) =>
                headerFilterHandel("market_Type", e.target.value)
              }
            >
              <option value="WHOLESALE">{strings.lump}</option>
              <option value="RETAIL">{strings.sectoral}</option>
            </select>
          </div>
          <div className={styles.fav_noti_container}>
            <ActiveLink
              activeClassName="active_Link"
              href={
                !Object.keys(user).length
                  ? "/Tajawal/login"
                  : "/Tajawal/favourite"
              }
            >
              <a>
                <i className="fas fa-heart"></i>
              </a>
            </ActiveLink>

            <ActiveLink
              activeClassName="active_Link"
              href={
                !Object.keys(user).length
                  ? "/Tajawal/login"
                  : "/Tajawal/notifications"
              }
            >
              <a>
                <i className="fas fa-bell"></i>
                {/* <span className={styles[`fav_count_${lang}`]}>4</span> */}
              </a>
            </ActiveLink>
          </div>
          {Object.keys(user).length ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="Secondary"
                className={styles.my_account}
              >
                <i className="fas fa-user"></i>
                <p>
                  <span>{user.name ? user.name : "username"}</span>
                  <br />
                  {strings.myAccount}
                </p>
              </Dropdown.Toggle>

              <AccountDropDown logoutHandel={logoutHandel} />
            </Dropdown>
          ) : (
            <Link href="/Tajawal/login">
              <a className={styles.login_btn}>
                <i className="fas fa-user"></i>
                <span>{strings.login}</span>
              </a>
            </Link>
          )}

          <button
            className={styles.lang_btn}
            onClick={() => handelLang(newLang)}
          >
            {lang === "en" ? <img src={arabicFlag} alt="arabic" /> : <EnFlag />}
          </button>
        </div>
        <div className={styles.user_actions_responsive}>
          <ActiveLink
            activeClassName="active_Link"
            href={
              !Object.keys(user).length
                ? "/Tajawal/login"
                : "/Tajawal/favourite"
            }
          >
            <a className={styles.favourite_page}>
              <i className="fas fa-heart"></i>
            </a>
          </ActiveLink>

          <ActiveLink
            activeClassName="active_Link"
            href={
              !Object.keys(user).length
                ? "/Tajawal/login"
                : "/Tajawal/notifications"
            }
          >
            <a className={styles.notifications_page}>
              <i className="fas fa-bell"></i>
              <span className={styles[`fav_count_${lang}`]}>4</span>
            </a>
          </ActiveLink>
          <button
            className={styles.lang_btn}
            onClick={() => handelLang(newLang)}
          >
            {lang === "en" ? <img src={arabicFlag} alt="arabic" /> : <EnFlag />}
          </button>
          {Object.keys(user).length ? (
            <Dropdown>
              <Dropdown.Toggle
                variant="Secondary"
                className={styles.my_account}
              >
                <i className="fas fa-bars"></i>
              </Dropdown.Toggle>
              <AccountDropDown logoutHandel={logoutHandel} />
            </Dropdown>
          ) : (
            <Link href="/Tajawal/login">
              <a className={styles.login_btn}>
                <i className="fas fa-user"></i>
                <span>{strings.login}</span>
              </a>
            </Link>
          )}
        </div>
        <FilterModal
          data={activities}
          handleClose={closeModal}
          filterHandel={filterModalHandel}
          modelIsOpen={filterModalIsOpen}
        />
      </header>
      <Nav />
    </>
  );
};

export default Header;
