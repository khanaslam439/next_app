import { useContext, useState } from "react";
import Link from "next/link";
import strings from "../../../Assets/Local/Local";
import LangContext from "../../../store/LangContext";
import HeaderFilterContext from "../../../store/HeaderFilterContext";
import GeneralPathContext from "../../../store/GeneralPath";
import TempShareDataContext from "../../../store/TempShareData";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import styles from "../../../styles/Nav.module.css";

const Nav = () => {
  const { tempCities } = useContext(TempShareDataContext);
  const { lang } = useContext(LangContext);
  const { headerFilterHandel } = useContext(HeaderFilterContext);
  const { GoTo } = useContext(GeneralPathContext);
  const [cities, setCities] = useState(tempCities);

  strings.setLanguage(lang);
  return (
    <nav className={styles.nav_container}>
      <Link href="/Tajawal">
        <a
          onClick={() => {
            headerFilterHandel("city", -1);
            headerFilterHandel("region", -1);
            headerFilterHandel("market", -1);
            GoTo(1, -3);
          }}
        >
          {strings.all}
        </a>
      </Link>

      {cities.length
        ? cities
            .slice(0, 16)
            .map((city, index) => <DropdownMenu key={index} city={city} />)
        : null}
    </nav>
  );
};

export default Nav;
