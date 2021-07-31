import { useContext, useState } from "react";
import Link from "next/link";
import classes from "../../styles/shops.module.css";
import storeLogo from "../../Assets/Images/store/storeLogo.png";
import strings from "../../Assets/Local/Local";
import FavoriteStoreContext from "../../store/FavoriteStoreContext";
import FollowingStoreContext from "../../store/FollowingStoreContext";
import { API_END_POINT } from "../../components/appConfig/AppConfig";
import UserCtx from "../../store/UserContext";
import { useRouter } from "next/router";

function Shopcard(props) {
  const { token } = useContext(UserCtx);
  const router = useRouter();

  function loginFirst() {
    router.push({
      pathname: "/Tajawal/login",
    });
  }

  // Favorite Stores
  const favoriteCtx = useContext(FavoriteStoreContext);
  const storeIsFavorite = favoriteCtx.storeIsFavorite(
    props.storeData.id,
    props.favStoreState
  );

  function toggleStoreFavorite() {
    if (storeIsFavorite) {
      favoriteCtx.removeFavoriteStore(props.storeData.id);
      props.removeStoreFromFavorite(props.storeData.id);
    } else {
      props.favStoreState === true
        ? ""
        : props.addStoreToFavorite(props.storeData.id);
    }
  }

  // Following Stores
  const followCtx = useContext(FollowingStoreContext);
  const storeIsFollowing = followCtx.storeIsFollowing(
    props.storeData.id,
    props.followStoreState
  );

  function toggleStoreFollowing() {
    if (storeIsFollowing) {
      followCtx.removeFollowingStore(props.storeData.id);
      props.removeStoreFromFollowing(props.storeData.id);
    } else {
      followCtx.addFollowingStore(props.storeData);
      props.followStoreState === true
        ? ""
        : props.addStoreToFollowing(props.storeData.id);
    }
  }

  strings.setLanguage(props.lang);
  return (
    <div
      className={
        classes.shopCard +
        " d-flex justify-content-between align-items-center mb-4 py-3 px-2 bg-white shadow-sm rounded"
      }
    >
      <Link href={`/Tajawal/stores/${props.storeData.id}`}>
        <div className={classes.imgNameShop + " d-flex align-items-center"}>
          <div className={classes.logoShop}>
            <img
              src={
                props.storeData.slider && props.storeData.slider.length > 0
                  ? `${API_END_POINT}/${props.storeData.slider[0]}`
                  : storeLogo
              }
              alt="logo shop"
              className="img-fluid"
            />
          </div>
          <div
            className={
              classes.nameShop +
              ` ${props.lang == "ar" ? "mr-2 text-right" : "ml-2 text-left"}`
            }
          >
            <h5 className="text-truncate">{props.storeData.name}</h5>
            <h6>الكترونيات</h6>
            <span>
              <i className="fas fa-star"></i> {props.storeData.rate}
            </span>
          </div>
        </div>
      </Link>
      {props.favStoreState ? (
        <div
          onClick={
            Object.keys(token).length !== 0 ? toggleStoreFavorite : loginFirst
          }
          style={{
            backgroundColor: "#E7ECF6",
            color: storeIsFavorite ? "#F15A24" : "#9EA4AF",
          }}
          className={
            classes.followBtn +
            " " +
            classes.shopCardBTN +
            " px-2 py-1 border-0 rounded"
          }
        >
          <i className="fas fa-heart"></i>
        </div>
      ) : (
        <div className={classes.shopCardBTN}>
          <div
            onClick={
              Object.keys(token).length !== 0
                ? toggleStoreFollowing
                : loginFirst
            }
            className={
              `${storeIsFollowing ? classes.followingBtn : classes.followBtn}` +
              ` ${
                storeIsFollowing
                  ? "px-2 py-1 rounded "
                  : " px-2 py-1 rounded text-white "
              } `
            }
          >
            <i className="fas fa-star"></i>{" "}
            <span>
              {storeIsFollowing ? strings.followingBTN : strings.followBTN}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shopcard;
