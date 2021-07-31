import { useContext, useState, useRef, useEffect } from "react";
import Lottie from "react-lottie";
import PinInput from "react-pin-input";

import btnLottie from "../../Assets/Lottie/loading.json";
import LangCtx from "../../store/LangContext";
import strings from "../../Assets/Local/Local";
import styles from "../../styles/forgetPassword.module.css";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ConfirmCode = ({
  pinInputHandel,
  resendCodeHandel,
  submitConfirmCode,
  loadingBtn,
}) => {
  const { lang } = useContext(LangCtx);
  const [count, setCount] = useState(0);
  const [variable, setVariable] = useState();
  const btnOptions = {
    loop: true,
    autoplay: true,
    animationData: btnLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useInterval(() => {
    if (count !== 60) {
      let variable = count + 1 < 10 ? `00:0${count + 1}` : `00:${count + 1}`;
      setCount(count + 1);
      setVariable(variable);
    }
  }, 1000);
  strings.setLanguage(lang);
  return (
    <div className={`col-md-6 col-xs-12 ${styles.pin_input_container}`}>
      <PinInput
        length={4}
        focus
        type="numeric"
        onChange={pinInputHandel}
        initialValue="0000"
      />
      <button className={styles.confirm_btn} onClick={submitConfirmCode}>
        {loadingBtn ? (
          <Lottie options={btnOptions} height="20px" width="80%" />
        ) : (
          strings.confirm
        )}
      </button>
      {count === 60 && (
        <span
          style={{
            color: "#f15a24",
            fontSize: "14px",
            textDecoration: "underline",
            cursor: "pointer",
            display: "inline-block",
            width: "100%",
            textAlign: "center",
          }}
          onClick={() => {
            resendCodeHandel();
            setCount(0);
          }}
        >
          {strings.resendcode}
        </span>
      )}
      {count !== 60 && (
        <span
          style={{
            color: "#aaa",
            fontSize: "16px",
            display: "inline-block",
            width: "100%",
            textAlign: "center",
          }}
        >
          {variable}
        </span>
      )}
    </div>
  );
};

export default ConfirmCode;
