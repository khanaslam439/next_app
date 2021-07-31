import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import LangCtx from "../../../store/LangContext";
import UserCtx from "../../../store/UserContext";

import strings from "../../../Assets/Local/Local";

import styles from "../../../styles/payment.module.css";
const confirm = () => {
  const { lang } = useContext(LangCtx);
  const { query } = useRouter();
  const { user } = useContext(UserCtx);

  useEffect(() => {
    if (!Object.keys(user).length) {
      router.replace("/Tajawal");
    }
  }, [lang, user]);

  useEffect(() => {
    localStorage.removeItem("tajwalUserAddress");
    localStorage.removeItem("userCart");
    localStorage.removeItem("traderCart");
    localStorage.removeItem("tajwal_delivery_method");
  }, [lang]);

  strings.setLanguage(lang);
  return (
    <div className={styles.confirm_page}>
      <i className="fas fa-check-circle"></i>
      <h6>{strings.confirmOrderSuccess}</h6>
      <p>
        {strings.orderNumber}: {query.id ? query.id : null}
      </p>
      <Link href="/Tajawal/mypurchases">
        <a className={styles.confirm_btn}>{strings.followOrder}</a>
      </Link>
    </div>
  );
};

export default confirm;
