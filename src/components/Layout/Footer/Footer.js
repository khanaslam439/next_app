import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

import logo from "../../../Assets/Images/logo.png";
import chatIcon from "../../../Assets/Images/footer/chatIcon.png";
import faceIcon from "../../../Assets/Images/footer/faceIcon.png";
import whatsIcon from "../../../Assets/Images/footer/whatsIcon.png";
import twitterIcon from "../../../Assets/Images/footer/twitterIcon.png";
import gmailIcon from "../../../Assets/Images/footer/gmailIcon.png";
import instaIcon from "../../../Assets/Images/footer/instaIcon.png";
import snapIcon from "../../../Assets/Images/footer/snapIcon.png";
import AppStore from "../../../Assets/Images/footer/AppStore.png";
import GooglePlay from "../../../Assets/Images/footer/GooglePlay.png";
import strings from "../../../Assets/Local/Local";
import UserCtx from "./../../../store/UserContext";

import LangContext from "../../../store/LangContext";
import { API_END_POINT } from "../../appConfig/AppConfig";

import classes from "../../../styles/Footer.module.css";

const Footer = () => {
  const { lang } = useContext(LangContext);
  const { user } = useContext(UserCtx);
  const [companies, setCompanies] = useState();
  const [socials, setSocials] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isUser, setIsUser] = useState(true);

  function fetchCompanies() {
    let url = `${API_END_POINT}/companies`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setFlag(true);
        console.log("Success fetch: ", response.data.data[0]);
        setCompanies(response.data.data[0]);
        setSocials(response.data.data[0].socialLinks);
      });
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (!Object.keys(user).length) {
      setIsUser(false);
    }
  }, [lang, user]);

  return (
    <footer
      className={
        classes.footer +
        ` ${
          lang === "ar" ? "text-right pt-4 bg-white" : "text-left pt-4 bg-white"
        } `
      }
    >
      {companies && (
        <Container fluid>
          <Row>
            <Col lg="3" md="12">
              <div className={classes.footerLogo + " pt-lg-5 pt-md-0"}>
                <Link href="/Tajawal">
                  <img src={logo} alt="logo" />
                </Link>
                <p className="mt-4">{strings.appCollect}</p>
                <div
                  className={
                    classes.footerStores +
                    " align-items-center d-none d-lg-flex"
                  }
                >
                  <a
                    href={`${companies.androidUrl}`}
                    target="_blank"
                    className={lang === "ar" ? "ml-2" : "mr-2"}
                  >
                    <img
                      src={GooglePlay}
                      alt="GooglePlay"
                      className="img-fluid"
                    />
                  </a>
                  <a href={`${companies.iosUrl}`} target="_blank">
                    <img src={AppStore} alt="AppStore" className="img-fluid" />
                  </a>
                </div>
              </div>
            </Col>
            <Col lg="2" md="4" sm="6">
              <div className={classes.footerLinks}>
                <h5>{strings.mostSearched}</h5>
                <h6>
                  <Link href="/Tajawal">الكترونيات</Link>
                </h6>
                <h6>
                  <Link href="/Tajawal">رجالي</Link>
                </h6>
                <h6>
                  <Link href="/Tajawal">الجمال و العطور</Link>
                </h6>
                <h6>
                  <Link href="/Tajawal">نسائي</Link>
                </h6>
                <h6>
                  <Link href="/Tajawal">الكترونيات</Link>
                </h6>
                <div className="d-lg-none d-block">
                  <h5>{strings.intellectualProperty}</h5>
                  <h6>
                    <Link href="/Tajawal">{strings.tradeMarkCopyrights}</Link>
                  </h6>
                </div>
              </div>
            </Col>
            <Col lg="2" md="4" sm="6">
              <div className={classes.footerLinks}>
                <h5>{strings.myAccount}</h5>
                <h6>
                  <Link href="/Tajawal/login">{strings.loginSingup}</Link>
                </h6>
                <h6>
                  <Link
                    href={isUser ? "/Tajawal/mypurchases" : "/Tajawal/login"}
                  >
                    {strings.Mypurchases}
                  </Link>
                </h6>
                <h6>
                  <Link href="/Tajawal/cart">{strings.myCart}</Link>
                </h6>
                <h6>
                  <Link href={isUser ? "/Tajawal/chat" : "/Tajawal/login"}>
                    {strings.conversationBTN}
                  </Link>
                </h6>
                <h6>
                  <Link href={isUser ? "/Tajawal/myaddress" : "/Tajawal/login"}>
                    {strings.myAddress}
                  </Link>
                </h6>
                <h6>
                  <Link
                    href={isUser ? "/Tajawal/followmarkets" : "/Tajawal/login"}
                  >
                    {strings.followMarkets}
                  </Link>
                </h6>
                <h6>
                  <Link href={isUser ? "/Tajawal/favourite" : "/Tajawal/login"}>
                    {strings.favourite}
                  </Link>
                </h6>
                <h6>
                  <Link
                    href={isUser ? "/Tajawal/update-profile" : "/Tajawal/login"}
                  >
                    {strings.accountSettings}
                  </Link>
                </h6>
                <h6>
                  <Link
                    href={
                      isUser ? "/Tajawal/account-movements" : "/Tajawal/login"
                    }
                  >
                    {strings.accountMovements}
                  </Link>
                </h6>
              </div>
            </Col>
            <Col lg="2" md="4" sm="12">
              <div className={classes.footerLinks}>
                <div className="d-lg-block d-none">
                  <h5>{strings.intellectualProperty}</h5>
                  <h6>
                    <Link href="/Tajawal">{strings.tradeMarkCopyrights}</Link>
                  </h6>
                </div>
                <h5>{strings.annotations}</h5>
                <h6>
                  <Link href="/Tajawal/subscription-user">
                    {strings.subscriptionUser}
                  </Link>
                </h6>
                <h6>
                  <Link href="/Tajawal/subscription-store">
                    {strings.subscriptionStore}
                  </Link>
                </h6>
                <h6>
                  <Link href="/Tajawal/subscription-representatives">
                    {strings.subscriptionRepresent}
                  </Link>
                </h6>
                <h6>
                  <Link href="/Tajawal">{strings.conditionsAndRules}</Link>
                </h6>
                <h6>
                  <Link href="/Tajawal">{strings.howToPurchase}</Link>
                </h6>
                <h6>
                  <Link href="/Tajawal">{strings.commonQuestions}</Link>
                </h6>
              </div>
            </Col>
            <Col lg="3" md="12" className="pt-lg-5 pt-md-0">
              <div className="my-lg-0 my-3">
                <Link href="/Tajawal/chat">
                  <div
                    className={
                      classes.footerChat +
                      " d-flex align-items-center p-3 rounded mb-3"
                    }
                  >
                    <div className={classes.footerChatImg}>
                      <img
                        src={chatIcon}
                        alt="chat icon"
                        className="img-fluid"
                      />
                    </div>
                    <div
                      className={
                        classes.footerChatcontent +
                        ` ${lang === "ar" ? "mr-3" : "ml-3"}`
                      }
                    >
                      <h5 className="m-0 mb-1">{strings.centerOfSupport}</h5>
                      <p className="mb-0">
                        {strings.haveAQuestion}
                        <br /> {strings.hereToHelp}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className={classes.socialIcons}>
                  <h5>{strings.followUs}</h5>
                  {socials.length > 0 &&
                  socials.filter((social) => social.key === "WHATSAPP")
                    .length ? (
                    <a
                      href={
                        socials.filter((social) => social.key === "WHATSAPP")[0]
                          .value
                      }
                      target="_blank"
                      className={lang === "ar" ? "ml-3" : "mr-3"}
                    >
                      <img
                        src={whatsIcon}
                        alt="whats icon"
                        className="img-fluid"
                      />
                    </a>
                  ) : null}
                  {socials.length > 0 &&
                  socials.filter((social) => social.key === "GMAIL").length ? (
                    <a
                      href={
                        socials.filter((social) => social.key === "GMAIL")[0]
                          .value
                      }
                      target="_blank"
                      className={lang === "ar" ? "ml-3" : "mr-3"}
                    >
                      <img
                        src={gmailIcon}
                        alt=" gmail icon"
                        className="img-fluid"
                      />
                    </a>
                  ) : null}
                  {socials.length > 0 &&
                  socials.filter((social) => social.key === "TWITTER")
                    .length ? (
                    <a
                      href={
                        socials.filter((social) => social.key === "TWITTER")[0]
                          .value
                      }
                      target="_blank"
                      className={lang === "ar" ? "ml-3" : "mr-3"}
                    >
                      <img
                        src={twitterIcon}
                        alt="twitter icon"
                        className="img-fluid"
                      />
                    </a>
                  ) : null}
                  {socials.length > 0 &&
                  socials.filter((social) => social.key === "INSTAGRAM")
                    .length ? (
                    <a
                      href={
                        socials.filter(
                          (social) => social.key === "INSTAGRAM"
                        )[0].value
                      }
                      target="_blank"
                      className={lang === "ar" ? "ml-3" : "mr-3"}
                    >
                      <img
                        src={instaIcon}
                        alt="instagram icon"
                        className="img-fluid"
                      />
                    </a>
                  ) : null}
                  {socials.length > 0 &&
                  socials.filter((social) => social.key === "SNAPCHAT")
                    .length ? (
                    <a
                      href={
                        socials.filter((social) => social.key === "SNAPCHAT")[0]
                          .value
                      }
                      target="_blank"
                      className={lang === "ar" ? "ml-3" : "mr-3"}
                    >
                      <img
                        src={snapIcon}
                        alt="snapchat icon"
                        className="img-fluid"
                      />
                    </a>
                  ) : null}
                  {socials.length > 0 &&
                  socials.filter((social) => social.key === "FACEBOOK")
                    .length ? (
                    <a
                      href={
                        socials.filter((social) => social.key === "FACEBOOK")[0]
                          .value
                      }
                      target="_blank"
                    >
                      <img
                        src={faceIcon}
                        alt="facebook icon"
                        className="img-fluid"
                      />
                    </a>
                  ) : null}
                </div>
              </div>
            </Col>
            <Col lg="10" md="6" sm="6" className="mx-lg-auto mx-0">
              <div
                className={classes.websiteLinks + " py-lg-3 py-0 mt-lg-5 mt-0"}
              >
                <Link href="/Tajawal">
                  <a className={lang === "ar" ? "ml-4" : "mr-4"}>
                    {strings.aboutSite}
                  </a>
                </Link>
                <Link href="/Tajawal">
                  <a className={lang === "ar" ? "ml-4" : "mr-4"}>
                    {strings.jobs}
                  </a>
                </Link>
                <Link href="/Tajawal">
                  <a className={lang === "ar" ? "ml-4" : "mr-4"}>
                    {strings.tajwalprivacy}
                  </a>
                </Link>
                <Link href="/Tajawal">{strings.siteAgreement}</Link>
              </div>
            </Col>
            <Col md="6" sm="6" className="d-lg-none d-block">
              <div
                className={
                  classes.footerStores +
                  ` ${lang === "ar" ? "text-left" : "text-right"}`
                }
              >
                <div className="mb-3">
                  <a href={`${companies.androidUrl}`} target="_blank">
                    <img
                      src={GooglePlay}
                      alt="GooglePlay"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div>
                  <a href={`${companies.iosUrl}`} target="_blank">
                    <img src={AppStore} alt="AppStore" className="img-fluid" />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <div className={classes.footerCopyright + " py-2 text-white text-center"}>
        &copy; 2021, All Rights Reserved OTS
      </div>
    </footer>
  );
};

export default Footer;
