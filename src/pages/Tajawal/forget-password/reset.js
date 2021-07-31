import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";

import Fields from "../../../components/Fields/Fields";
import { config } from "../../../components/AuthConfig/resetPasswordConfig";
import { Inputs } from "../../../components/AuthConfig/resetPasswordInput";
import { Validation } from "../../../components/AuthConfig/resetPasswordValidation";

import LangCtx from "../../../store/LangContext";
import UserCtx from "../../../store/UserContext";

import strings from "../../../Assets/Local/Local";
import Logo from "../../../Assets/Images/logo.png";
import styles from "../../../styles/forgetPassword.module.css";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";

const Reset = () => {
  const { lang } = useContext(LangCtx);
  const { user } = useContext(UserCtx);
  const router = useRouter();
  const [hint, setHint] = useState("");
  const [show, setShow] = useState(false);
  const submitHandle = (values) => {
    axios
      .put(`${API_END_POINT}/phonePasswordChange`, {
        password: values.password,
        countryCode: "966",
        type: "CLIENT",
      })
      .then((res) => {
        console.log("change password success", res.data);
        router.replace("/Tajawal");
      })
      .catch((error) => {
        console.log("error in change password", error.response);
        if (error.response.data.errors) setHint(error.response.data.errors);
        setShow(true);
      });
  };
  useEffect(() => {
    if (Object.keys(user).length) {
      router.replace("/Tajawal");
    }
  }, [lang, user]);
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
            <h6>{strings.enterNewPassword}</h6>

            <div className="col-md-10 col-xs-12">
              <Fields
                inputs={Inputs}
                config={config}
                submitHandle={submitHandle}
                validation={Validation}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Reset;
