import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

import Fields from "../../../components/Fields/Fields";
import { config } from "../../../components/AuthConfig/forgetPasswordConfig";
import { Inputs } from "../../../components/AuthConfig/forgetPasswordInput";
import { Validation } from "../../../components/AuthConfig/forgetPasswordValidation";
import ConfirmCode from "../../../components/ConfirmCode/ConfirmCode";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import LangCtx from "../../../store/LangContext";
import UserCtx from "../../../store/UserContext";
import strings from "../../../Assets/Local/Local";

import Logo from "../../../Assets/Images/logo.png";
import styles from "../../../styles/forgetPassword.module.css";
const ForgetPassword = () => {
  const { lang } = useContext(LangCtx);
  const { user } = useContext(UserCtx);
  const router = useRouter();
  const [hint, setHint] = useState("");
  const [show, setShow] = useState(false);
  const [sendCode, setSendCode] = useState(false);
  const [pinInput, setPinInput] = useState();
  const [phone, setPhone] = useState();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const submitHandle = (values) => {
    setPhone(values.phone);
    axios
      .post(
        `${API_END_POINT}/phoneForgetPassword`,
        { ...values, countryCode: "966", type: "CLIENT" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("send code success", response);
        setSendCode(true);
        // router.push("/Tajawal/forget-password/confirm-code");
      })
      .catch((error) => {
        console.log("error in reset password", error.response);
        if (error.response.data.errors) setHint(error.response.data.errors);
        setShow(true);
      });
  };
  useEffect(() => {
    if (Object.keys(user).length) {
      router.replace("/Tajawal");
    }
  }, [lang, user]);

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
        setSendCode(true);
        // router.push("/Tajawal/forget-password/confirm-code");
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
          `${API_END_POINT}/phoneConfirmationCode`,
          { phone, code: pinInput },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("pin success", res.data);
          setLoadingBtn(false);
          router.push("/Tajawal/forget-password/reset");
        })
        .catch((error) => {
          setLoadingBtn(false);
          console.log("error in pin code", error.response);
          if (error.response.data.errors) setHint(error.response.data.errors);
          setShow(true);
        });
    }
  };
  strings.setLanguage(lang);
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
      <div
        className="container-fluid"
        style={{ backgroundColor: "#F5F8FF", minHeight: "calc(100vh - 100px)" }}
      >
        <div className="row justify-content-center align-items-center">
          <section
            className={`col-md-5 col-xs-12 ${styles.reset_form_section}  `}
          >
            <div className={`col-12 ${styles.img_container}`}>
              <img src={Logo} alt="Tajawel" />
            </div>
            <h6>{sendCode ? strings.enterCode : strings.sendResetCode}</h6>
            {!sendCode ? (
              <div className="col-md-10 col-xs-12">
                <Fields
                  inputs={Inputs}
                  config={config}
                  submitHandle={submitHandle}
                  validation={Validation}
                />
              </div>
            ) : (
              <ConfirmCode
                pinInputHandel={pinInputHandel}
                resendCodeHandel={resendCodeHandel}
                submitConfirmCode={submitConfirmCode}
                loadingBtn={loadingBtn}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
