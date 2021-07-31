import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

import Fields from "../../../components/Fields/Fields";
import { config } from "../../../components/AuthConfig/loginconfig";
import { Inputs } from "../../../components/AuthConfig/loginInput";
import { Validation } from "../../../components/AuthConfig/loginvalidation";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";

import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import strings from "../../../Assets/Local/Local";
import LangContext from "../../../store/LangContext";
import UserContext from "../../../store/UserContext";

import logo from "../../../Assets/Images/logo.png";
import FbIcon from "../../../components/Icons/FbIcon";
import GoogleIcon from "../../../components/Icons/GoogleIcon";

import styles from "../../../styles/Login.module.css";

const Login = () => {
  const { lang } = useContext(LangContext);
  const { cookieUserHandel, userSessionHandel, user } = useContext(UserContext);
  const router = useRouter();
  const [hint, setHint] = useState("");
  const [show, setShow] = useState(false);

  console.log("user", user);
  useEffect(() => {
    if (Object.keys(user).length) {
      router.replace("/Tajawal");
    }
  }, [lang, user]);

  const submitHandle = (values) => {
    axios
      .post(
        `${API_END_POINT}/signin`,
        {
          phone: values.phone,
          password: values.password,
          type: "CLIENT",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
        }
      )
      .then((response) => {
        if (values.rememberMe) {
          cookieUserHandel(response.data.user, response.data.token);
          console.log("user saved in cookie");
          router.replace("/Tajawal");
        } else {
          userSessionHandel(response.data.user, response.data.token);
          console.log("user saved in session");
          router.replace("/Tajawal");
        }
      })
      .catch((error) => {
        console.log("error in login response", error.response);

        if (!error.response) {
          setHint(strings.interneterror);
        } else if (error.response.status === 422) {
          setHint(error.response.data.errors[0].message[lang]);
        } else {
          setHint(error.response.data.errors);
        }
        setShow(true);
      });
  };
  const loginWithSocial = (userData) => {
    axios
      .post(`${API_END_POINT}/socialMedia`, userData, {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      })
      .then((res) => {
        console.log("social response", res.data);
        cookieUserHandel(res.data.user, res.data.token);
        router.replace("/Tajawal");
      })
      .catch((error) => {
        if (!error.response) {
          setHint(strings.interneterror);
        } else if (error.response.status === 422) {
          setHint(error.response.data.errors[0].message[lang]);
        } else {
          setHint(error.response.data.errors);
        }
        setShow(true);
      });
  };
  const responseFacebook = (response) => {
    let facebookUser = {
      name: `${response.first_name} ${response.last_name}`,
      email: response.email,
      socialId: response.id,
      socialMediaType: "FACEBOOK",
    };
    console.log("facebook response", response);
    console.log(" facebookUser", facebookUser);
    if (response.email) {
      loginWithSocial(facebookUser);
    } else {
      setHint(strings.facebookError);
      setShow(true);
    }

    // AuthPostAxios(obj);
  };
  const facebookFailureHandel = (error) => {
    console.log("error in facebook login", error);
  };

  const responseGoogleError = (error) => {
    console.log("error in google login", error);
  };

  const responseGoogle = (response) => {
    let googleUser = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      socialId: response.profileObj.googleId,
      socialMediaType: "GOOGLE",
    };
    console.log("google response=>", response);
    console.log("google response=>", googleUser);
    loginWithSocial(googleUser);
  };
  strings.setLanguage(lang);

  return (
    <>
      <MetaDecartor title={strings.title} />
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

      <div className={`container-fluid ${styles.login_section}`}>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8 col-xs-10">
            <div className={`row ${styles.login_container}`}>
              <div className={`col-12 ${styles.logo_container}`}>
                <img src={logo} alt="tajawal logo" />
              </div>
              <div className="col-12">
                <Fields
                  inputs={Inputs}
                  config={config}
                  submitHandle={submitHandle}
                  validation={Validation}
                />
              </div>
              <Link href="/Tajawal/forget-password">
                <a className={`col-12 ${styles.forget_link}`}>
                  {strings.forgetPassword}
                </a>
              </Link>
              <p className={`col-12 mt-3 text-center`}>{strings.loginVia}</p>

              <div className={`col-4 ${styles.fb_login}`}>
                <FacebookLogin
                  appId="931276831002839"
                  fields="email,first_name,last_name,picture.type(large)"
                  callback={responseFacebook}
                  textButton=""
                  cssClass={styles.facebook_btn}
                  icon={<FbIcon />}
                  onFailure={facebookFailureHandel}
                />
              </div>
              <div className={`col-4 ${styles.go_login}`} role="button">
                <GoogleLogin
                  clientId="1082916417981-qq0k8b07p146ts8tvs59ubmd19rcu1cv.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogleError}
                  icon={<GoogleIcon />}
                  className={styles.google_btn}
                  buttonText=""
                />
              </div>
              <div
                className="col-12 d-flex justify-content-center mt-2"
                role="button"
              >
                <Link href="/Tajawal/signup">
                  <a className={`${styles.newRegister}`}>
                    {strings.newRegister}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
