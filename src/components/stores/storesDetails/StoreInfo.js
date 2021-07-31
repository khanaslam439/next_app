import { useContext, useState, useEffect } from "react";
import faceIcon from "../../../Assets/Images/store/faceIcon.png";
import whatsIcon from "../../../Assets/Images/store/whatsIcon.png";
import twitterIcon from "../../../Assets/Images/store/twitterIcon.png";
import gmailIcon from "../../../Assets/Images/store/gmailIcon.png";
import instaIcon from "../../../Assets/Images/store/instaIcon.png";
import snapIcon from "../../../Assets/Images/store/snapIcon.png";
import classes from "../../../styles/storesDetails.module.css";
import ReactStars from "react-rating-stars-component";
import strings from "../../../Assets/Local/Local";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../store/UserContext";
import { useRouter } from "next/router";

function StoreInfo(props) {
  const { token } = useContext(UserCtx);
  const [isFavorite, setIsFavorite] = useState(props.storeData.favorite);
  const [isFollowing, setIsFollowing] = useState(props.storeData.follow);

  const router = useRouter();

  function loginFirst() {
    router.push({
      pathname: "/Tajawal/login",
    });
  }

  // handle favorite
  function addToFavorite() {
    let url = `${API_END_POINT}/favorites/trader`;
    let dataBody = {
      trader: props.storeData.id,
    };
    axios
      .post(url, dataBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": props.lang,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("success Request");
        setIsFavorite(true);
      })
      .catch((error) => console.log("failed request: ", error.response));
  }
  function removeFromFavorite() {
    let url = `${API_END_POINT}/favorites/trader`;
    let dataBody = {
      trader: props.storeData.id,
    };
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: dataBody,
      })
      .then(() => {
        setIsFavorite(false);
      });
  }
  // handle favorite

  // handle following
  function addToFollowing() {
    let url = `${API_END_POINT}/follow`;
    let dataBody = {
      trader: props.storeData.id,
    };
    axios
      .post(url, dataBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": props.lang,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("success Request");
        setIsFollowing(true);
      })
      .catch((error) => console.log("failed request: ", error.response));
  }
  function removeFromFollowing() {
    let url = `${API_END_POINT}/follow`;
    let dataBody = {
      trader: props.storeData.id,
    };
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: dataBody,
      })
      .then(() => {
        console.log("success Request remove");
        setIsFollowing(false);
      })
      .catch((error) => console.log("failed request remove: ", error.response));
  }
  // handle following

  strings.setLanguage(props.lang);

  const ratingChanged = (newRating) => {
    if (Object.keys(token).length !== 0) {
      addRate(newRating);
    } else {
      loginFirst();
    }
  };

  function addRate(rate) {
    let url = `${API_END_POINT}/rate/trader`;
    let dataBody = {
      rate: rate,
      trader: props.storeData.id,
    };
    axios
      .post(url, dataBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": props.lang,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        props.ratingStroe(response);
      });
  }

  let allowProperties = props.storeData.subscription.allowProperties;
  return (
    <div className={classes.sliderInfo + " h-100"}>
      <div>
        <div>
          <div
            className={
              classes.storeLogoBtns +
              " d-flex justify-content-between align-items-center mt-lg-0 mt-3"
            }
          >
            <div className={classes.storeLogo}>
              <img
                src={`${API_END_POINT}/${props.storeData.image}`}
                alt="store Logo"
              />
            </div>
            <div className="d-flex flex-wrap">
              <div
                onClick={
                  Object.keys(token).length !== 0
                    ? isFavorite
                      ? removeFromFavorite
                      : addToFavorite
                    : loginFirst
                }
                className={
                  classes.storeFav + " pt-1 px-2 border rounded bg-white"
                }
                style={{ color: isFavorite ? "#f15a24" : "#9ea4af" }}
              >
                <i className="fas fa-heart"></i>
              </div>
              {(allowProperties.includes("SOCIAL_MEDIA") ||
                allowProperties.includes("ALL")) && (
                <div
                  className={
                    `${
                      isFollowing ? classes.followingState : classes.following
                    }` +
                    " mx-sm-2 mx-1 py-1 border rounded text-white text-center"
                  }
                  onClick={
                    Object.keys(token).length !== 0
                      ? isFollowing
                        ? removeFromFollowing
                        : addToFollowing
                      : loginFirst
                  }
                >
                  <span className={classes.followingSpan}>
                    <i className={classes.followingIcon + " fas fa-star"}></i>{" "}
                    {strings.followingBTN}
                  </span>
                  <span className={classes.followSpan}>
                    <i className={classes.followingIcon + " fas fa-star"}></i>{" "}
                    {strings.followBTN}
                  </span>
                </div>
              )}
              {console.log(
                "ooof===> ",
                allowProperties,
                allowProperties.includes("SOCIAL_MEDIA")
              )}
              {(allowProperties.includes("SOCIAL_MEDIA") ||
                allowProperties.includes("ALL")) && (
                <div
                  className={classes.chat + " pt-1 border rounded text-white"}
                >
                  <i className="fas fa-comment-alt"></i>{" "}
                  <span>{strings.conversationBTN}</span>
                </div>
              )}
            </div>
          </div>
          <h5 className="my-3">{props.storeData.name}</h5>
          {/* <h6 className={classes.storeCat}>{props.storeData}</h6> */}
          {props.storeData.rate !== 0 && (
            <span className={classes.storeRate}>
              <i className="fas fa-star"></i> {props.storeData.rate.toFixed(1)}
            </span>
          )}
          <div>
            <div
              className={
                classes.storeLocation +
                " bg-white d-flex justify-content-between align-items-center rounded-lg mt-3"
              }
            >
              <p className="mb-0 px-3 py-1 text-truncate">
                {props.storeData.address},
                {props.storeData.region.name[props.lang]},
                {props.storeData.region.city.name[props.lang]}
              </p>
              <div className="py-1 px-3 text-white d-flex align-items-center">
                <a
                  rel="noopener noreferrer"
                  href={` https://www.google.com/maps/search/?api=1&query=${props.storeData.geoLocation.coordinates[1]},${props.storeData.geoLocation.coordinates[0]}`}
                  target="_blank"
                >
                  <i className="fas fa-map-marker-alt text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            classes.workDates +
            `${
              props.lang === "ar"
                ? " border-bottom border-top py-2 my-2 ml-sm-3 ml-0"
                : " border-bottom border-top py-2 my-2 mr-sm-3 mr-0"
            }`
          }
        >
          <h6>{strings.workTimes}</h6>
          <pre className="text-muted mb-2">{props.storeData.workTimes}</pre>
        </div>
        {(allowProperties.includes("SOCIAL_MEDIA") ||
          allowProperties.includes("ALL")) && (
          <div
            className={
              classes.storeSocials +
              ` ${
                props.lang === "ar"
                  ? " border-bottom pb-2 mb-3 ml-sm-3 ml-0"
                  : " border-bottom pb-2 mb-3 mr-sm-3 mr-0"
              }`
            }
          >
            {props.storeData.socialLinks.filter(
              (social) => social.key === "WHATSAPP"
            ).length ? (
              <a
                href={
                  props.storeData.socialLinks.filter(
                    (social) => social.key === "WHATSAPP"
                  )[0].value
                }
                target="_blank"
                className={props.lang === "ar" ? "ml-2" : "mr-2"}
              >
                <img src={whatsIcon} alt=" whats icon" className="img-fluid" />
              </a>
            ) : null}
            {props.storeData.socialLinks.filter(
              (social) => social.key === "GMAIL"
            ).length ? (
              <a
                href={
                  props.storeData.socialLinks.filter(
                    (social) => social.key === "GMAIL"
                  )[0].value
                }
                target="_blank"
                className={props.lang === "ar" ? "ml-2" : "mr-2"}
              >
                <img src={gmailIcon} alt="gmail icon" className="img-fluid" />
              </a>
            ) : null}
            {props.storeData.socialLinks.filter(
              (social) => social.key === "TWITTER"
            ).length ? (
              <a
                href={
                  props.storeData.socialLinks.filter(
                    (social) => social.key === "TWITTER"
                  )[0].value
                }
                target="_blank"
                className={props.lang === "ar" ? "ml-2" : "mr-2"}
              >
                <img
                  src={twitterIcon}
                  alt="twitter icon"
                  className="img-fluid"
                />
              </a>
            ) : null}
            {props.storeData.socialLinks.filter(
              (social) => social.key === "INSTAGRAM"
            ).length ? (
              <a
                href={
                  props.storeData.socialLinks.filter(
                    (social) => social.key === "INSTAGRAM"
                  )[0].value
                }
                target="_blank"
                className={props.lang === "ar" ? "ml-2" : "mr-2"}
              >
                <img
                  src={instaIcon}
                  alt="instagram icon"
                  className="img-fluid"
                />
              </a>
            ) : null}
            {props.storeData.socialLinks.filter(
              (social) => social.key === "SNAPCHAT"
            ).length ? (
              <a
                href={
                  props.storeData.socialLinks.filter(
                    (social) => social.key === "SNAPCHAT"
                  )[0].value
                }
                target="_blank"
                className={props.lang === "ar" ? "ml-2" : "mr-2"}
              >
                <img src={snapIcon} alt="snapchat icon" className="img-fluid" />
              </a>
            ) : null}
            {props.storeData.socialLinks.filter(
              (social) => social.key === "FACEBOOK"
            ).length ? (
              <a
                href={
                  props.storeData.socialLinks.filter(
                    (social) => social.key === "FACEBOOK"
                  )[0].value
                }
                target="_blank"
                className={props.lang === "ar" ? "ml-2" : "mr-2"}
              >
                <img src={faceIcon} alt="facebook icon" className="img-fluid" />
              </a>
            ) : null}
          </div>
        )}
        <div
          className={
            classes.storeAdRate +
            " bg-white py-2 d-flex justify-content-between align-items-center shadow-sm"
          }
        >
          <span className="px-2">{strings.addYourRate}</span>
          <div className={classes.rating + " px-2"}>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={22}
              activeColor="#F15A24"
              value="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreInfo;
