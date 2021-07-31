import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Lottie from "react-lottie";
import Snackbar from "@material-ui/core/Snackbar";

import {
  Validation,
  PasswordValidations,
} from "../../../components/AuthConfig/EditProfileValidation";
import strings from "../../../Assets/Local/Local";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import LangContext from "../../../store/LangContext";
import UserCtx from "../../../store/UserContext";
import btnLottie from "../../../Assets/Lottie/loading.json";
import adsImg1 from "../../../Assets/Images/ads3.png";

import styles from "../../../styles/updateProfile.module.css";
import axios from "axios";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";

const updateProfile = () => {
  const { lang } = useContext(LangContext);
  const { user, token, updateUserHandel } = useContext(UserCtx);
  const [loading, setLoading] = useState({ user: false, password: false });
  const [hint, setHint] = useState({ isError: false, msg: "" });
  const [show, setShow] = useState(false);

  const router = useRouter();
  const oldUserData = { name: user.name, phone: user.phone, email: user.email };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Validation),
    mode: "all",
    defaultValues: oldUserData,
  });

  const {
    register: passwordRegister,
    handleSubmit: passwordSubmit,
    formState: { errors: passwordErrors },
    reset,
  } = useForm({
    resolver: yupResolver(PasswordValidations),
    mode: "all",
  });
  const btnOptions = {
    loop: true,
    autoplay: true,
    animationData: btnLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handelUserData = (values) => {
    console.log("user data", values);
    setLoading((prevState) => ({ ...prevState, user: true }));
    axios
      .put(`${API_END_POINT}/user/updateInfo`, values, {
        headers: { Authorization: `Bearer ${token}`, "Accept-Language": lang },
      })
      .then((res) => {
        setLoading((prevState) => ({ ...prevState, user: false }));

        console.log("success change user data", res.data);
        setHint({ isError: false, msg: strings.changeUserSuccess });
        setShow(true);
        updateUserHandel(res.data);
      })
      .catch((error) => {
        console.log("erron when change user data", error.response);
        setLoading((prevState) => ({ ...prevState, user: false }));

        if (!error.response) {
          setHint({ isError: true, msg: "network Error" });
          return;
        } else if (error.response.status === 422) {
          setHint({ isError: true, msg: error.response.data.errors[0].msg });
        } else {
          setHint({ isError: true, msg: error.response.data.errors });
        }
        setShow(true);
      });
  };
  const handelUserPassword = (values) => {
    setLoading((prevState) => ({ ...prevState, password: true }));

    axios
      .put(`${API_END_POINT}/user/updateInfo`, values, {
        headers: { Authorization: `Bearer ${token}`, "Accept-Language": lang },
      })
      .then((res) => {
        setLoading((prevState) => ({ ...prevState, password: false }));

        reset();
        console.log("success change  password", res.data);
        setHint({ isError: false, msg: strings.changePasswordSuccess });
        setShow(true);
      })
      .catch((error) => {
        setLoading((prevState) => ({ ...prevState, password: false }));

        console.log("erron when change password", error.response);
        if (!error.response) {
          setHint({ isError: true, msg: "network Error" });
          return;
        } else if (error.response.status === 422) {
          setHint({ isError: true, msg: error.response.data.errors[0].msg });
        } else {
          setHint({ isError: true, msg: error.response.data.errors });
        }
        setShow(true);
      });
  };

  useEffect(() => {
    if (!Object.keys(user).length) {
      router.replace("/Tajawal");
    }
  }, [lang, user]);

  strings.setLanguage(lang);
  return (
    <>
      <MetaDecartor title={strings.editProfileTitle} />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={show}
        onClose={() => setShow(false)}
        message={hint.msg}
        className={hint.isError ? "alert__danger" : "alert__success"}
        autoHideDuration={4000}
      />
      <div className={`container-fluid ${styles.edit_profile_page}`}>
        <div className="row">
          <section className={`col-lg-5 col-md-6`}>
            <h3>{strings.basicInfo}</h3>
            <form
              className={styles.inputs__container}
              onSubmit={handleSubmit(handelUserData)}
            >
              <div className="form-group">
                <label for="fullName">{strings.fullName}</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  aria-describedby="fullNameHelp"
                  {...register("name")}
                />
                {errors.name && (
                  <p className={`${styles.ErrorStyle} px-3`}>
                    {errors.name.message[lang]}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label for="phone">{strings.phone}</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  aria-describedby="phoneHelp"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className={`${styles.ErrorStyle} px-3`}>
                    {errors.phone.message[lang]}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label for="email">{strings.email}</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  {...register("email")}
                />
                {errors.email && (
                  <p className={`${styles.ErrorStyle} px-3`}>
                    {errors.email.message[lang]}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={styles.confirm_btn}
                disabled={loading.user}
              >
                {loading.user ? (
                  <Lottie options={btnOptions} height={50} width={50} />
                ) : (
                  strings.saveBtn
                )}
              </button>
            </form>
          </section>
          <section className={`col-lg-5 col-md-6`}>
            <h3>{strings.changePassword}</h3>
            <form
              className={styles.inputs__container}
              onSubmit={passwordSubmit(handelUserPassword)}
            >
              <div className="form-group">
                <label for="currentPassword">{strings.currentPassword}</label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  aria-describedby="currentPasswordHelp"
                  placeholder="********"
                  {...passwordRegister("currentPassword")}
                />
                {passwordErrors.currentPassword && (
                  <p className={`${styles.ErrorStyle} px-3`}>
                    {passwordErrors.currentPassword.message[lang]}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label for="newPassword">{strings.newPassword}</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  aria-describedby="newPasswordHelp"
                  placeholder="********"
                  {...passwordRegister("newPassword")}
                />
                {passwordErrors.newPassword && (
                  <p className={`${styles.ErrorStyle} px-3`}>
                    {passwordErrors.newPassword.message[lang]}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label for="Confirmpassword">{strings.Confirmpassword}</label>
                <input
                  type="password"
                  className="form-control"
                  id="Confirmpassword"
                  aria-describedby="ConfirmpasswordHelp"
                  placeholder="********"
                  {...passwordRegister("Confirmpassword")}
                />
                {passwordErrors.Confirmpassword && (
                  <p className={`${styles.ErrorStyle} px-3`}>
                    {passwordErrors.Confirmpassword.message[lang]}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={styles.confirm_btn}
                disabled={loading.password}
              >
                {loading.password ? (
                  <Lottie options={btnOptions} height={50} width={50} />
                ) : (
                  strings.saveBtn
                )}
              </button>
            </form>
          </section>
          <section className={`col-lg-2  ${styles.ads_container}`}>
            <div className={styles.img_container}>
              <img src={adsImg1} alt="ads" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default updateProfile;
