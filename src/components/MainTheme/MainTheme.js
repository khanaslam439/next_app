import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../Layout/Layout";
import LoginFooter from "../LoginFooter/LoginFooter";
import LangContext from "../../store/LangContext";
import TempShareData from "../../store/TempShareData";
import { API_END_POINT } from "../appConfig/AppConfig";
import Preloading from "./preloadding";
import gsap from "gsap";
import styles from "../../styles/preloadding.module.css";

const MainTheme = ({ Component, pageProps }) => {
  const { lang } = useContext(LangContext);
  const [flag, setFlag] = useState(false);
  const {
    handelActivity,
    handelCities,
    handelMarkets,
    handelRegions,
    handelSubCategory,
  } = useContext(TempShareData);
  console.log("lang in header=>", lang);
  const { pathname } = useRouter();

  useEffect(() => {
    setFlag(false);
    const city = `${API_END_POINT}/city?removeLanguage=true&all=true`;
    const region = `${API_END_POINT}/region?removeLanguage=true&all=true`;
    const market = `${API_END_POINT}/allUsers?type=MARKET&removeLanguage=true`;
    const activity = `${API_END_POINT}/category?removeLanguage=true&all=true`;
    const subCategory = `${API_END_POINT}/sub-category?all=true&removeLanguage=true`;
    axios
      .all([
        axios.get(city),
        axios.get(region),
        axios.get(market),
        axios.get(activity),
        axios.get(subCategory),
      ])
      .then(
        axios.spread((city, region, market, activity, subCategory) => {
          console.log(
            "All axios Data ===>",
            city,
            region,
            market,
            activity,
            subCategory
          );
          handelCities(city.data.data);
          handelActivity(activity.data.data);
          handelMarkets(market.data.data);
          handelRegions(region.data.data);
          handelSubCategory(subCategory.data.data);
          setFlag(true);
        })
      )
      .catch((error) => {
        console.log("All axios Error");
      });

    let tl = gsap.timeline();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="تجول - شراء منتجات - شراء اونلاين " />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/logo.png" type="image/x-icon" />
        <title>Tajwal</title>
      </Head>
      {flag ? (
        <div dir={lang === "ar" ? "rtl" : "ltr"}>
          {pathname === "/Tajawal/login" ||
          pathname === "/Tajawal/signup" ||
          pathname.includes("/Tajawal/forget-password") ? (
            <>
              <Component {...pageProps} />
              <LoginFooter />
            </>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </div>
      ) : (
        <Preloading />
      )}
    </>
  );
};

export default MainTheme;
