import { useContext } from "react";
import Link from "next/link";
import strings from "../../Assets/Local/Local";
import LangContext from "../../store/LangContext";
import styles from "../../styles/Footer.module.css";
const LoginFooter = () => {
  const { lang } = useContext(LangContext);
  strings.setLanguage(lang);
  return (
    <footer className={styles.footer_login_section}>
      <div className={` ${styles.footer_links}`}>
        <Link href="/Tajawal/aboutus">
          <a>{strings.aboutus}</a>
        </Link>
        <Link href="/Tajawal/jobs">
          <a>{strings.jobs}</a>
        </Link>
        <Link href="/Tajawal/privacy">
          <a>{strings.tajwalprivacy}</a>
        </Link>
        <Link href="/Tajawal/siteUseAgreement">
          <a>{strings.siteUseAgreement}</a>
        </Link>
      </div>
      <div className={` ${styles.footerCopyright} py-2`}>
        &copy; 2021, All Rights Reserved OTS
      </div>
    </footer>
  );
};

export default LoginFooter;
