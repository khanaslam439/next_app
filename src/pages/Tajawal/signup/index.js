import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

import Fields from "../../../components/Fields/Fields";
import { config } from "../../../components/AuthConfig/SignupConfig";
import { Inputs } from "../../../components/AuthConfig/SignupInput";
import { Validation } from "../../../components/AuthConfig/SignupValidations";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";

import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import strings from "../../../Assets/Local/Local";
import LangContext from "../../../store/LangContext";
import UserContext from "../../../store/UserContext";

import logo from "../../../Assets/Images/logo.png";

import styles from "../../../styles/Signup.module.css";
import ConfirmCode from "../../../components/ConfirmCode/ConfirmCode";
const Signup = () => {
  const { lang } = useContext(LangContext);
  const { cookieUserHandel, user } = useContext(UserContext);
  const router = useRouter();
  const [hint, setHint] = useState("");
  const [show, setShow] = useState(false);

  const [activePage, setActivePage] = useState(false);
  const [pinInput, setPinInput] = useState();
  const [phone, setPhone] = useState();
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length) {
      router.replace("/Tajawal");
    }
  }, [lang, user]);

  // active phone
  const pinInputHandel = (code) => {
    console.log("pin input", code);
    setPinInput(code);
  };
  const resendCodeHandel = () => {
    axios
      .post(
        `${API_END_POINT}/resend-code`,
        { phone },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
        }
      )
      .then((response) => {
        console.log("send code success", response);
      })
      .catch((error) => {
        console.log("error in reset password", error.response);
        if (error.response.data.errors) setHint(error.response.data.errors);
        setShow(true);
      });
  };
  const submitConfirmCode = () => {
    if (pinInput) {
      setLoadingBtn(true);
      axios
        .put(
          `${API_END_POINT}/verify-phone`,
          { phone, code: pinInput },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("pin success", res.data);
          cookieUserHandel(res.data.user, res.data.token);
          console.log("user saved in cookie", res.data);
          router.replace("/Tajawal");
          setLoadingBtn(false);
        })
        .catch((error) => {
          setLoadingBtn(false);
          console.log("error in pin code", error.response);
          if (error.response.data.errors) setHint(error.response.data.errors);
          setShow(true);
        });
    }
  };
  const submitHandle = (values) => {
    setPhone(values.phone);
    axios
      .post(`${API_END_POINT}/signup`, {
        ...values,
        countryKey: "EG",
        countryCode: 20,
        type: "CLIENT",
      })
      .then((response) => {
        setActivePage(true);
      })
      .catch((error) => {
        console.log("error in login response", error.response);

        if (!error.response) {
          setHint(strings.interneterror);
        } else if (error.response.status === 422) {
          setHint(error.response.data.errors[0].msg);
        } else {
          setHint(error.response.data.errors);
        }
        setShow(true);
      });
  };
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

      <div className={`container-fluid ${styles.signup_section}`}>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8 col-xs-10">
            <div className={`row ${styles.signup_container}`}>
              <div className={`col-12 ${styles.logo_container}`}>
                <img src={logo} alt="tajawal logo" />
              </div>
              {!activePage ? (
                <div className="col-12">
                  <Fields
                    inputs={Inputs}
                    config={config}
                    validation={Validation}
                    submitHandle={submitHandle}
                  />
                </div>
              ) : (
                <section className={styles.acitve_section}>
                  <ConfirmCode
                    pinInputHandel={pinInputHandel}
                    resendCodeHandel={resendCodeHandel}
                    submitConfirmCode={submitConfirmCode}
                    loadingBtn={loadingBtn}
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
