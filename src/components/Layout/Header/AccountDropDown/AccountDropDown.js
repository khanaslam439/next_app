import { useContext } from "react";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";

import strings from "../../../../Assets/Local/Local";
import LangContext from "../../../../store/LangContext";
import styles from "../../../../styles/Header.module.css";

const AccountDropDown = ({ logoutHandel }) => {
  const { lang } = useContext(LangContext);
  strings.setLanguage(lang);
  return (
    <Dropdown.Menu>
      <Dropdown.Item as="div">
        <Link href="/Tajawal/cart">
          <a>
            <i className="fas fa-shopping-cart"></i>
            <span>{strings.myCart}</span>
          </a>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item as="div">
        <Link href="/Tajawal/mypurchases">
          <a>
            <i className="fas fa-shopping-basket"></i>
            <span>{strings.Mypurchases}</span>
          </a>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item as="div">
        <Link href="/Tajawal/chat">
          <a>
            <i className="fas fa-comments"></i>
            <span>{strings.chats}</span>
          </a>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item as="div">
        <Link href="/Tajawal/favourite">
          <a>
            <i className="fas fa-heart"></i>
            <span>{strings.favourite}</span>
          </a>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item as="div">
        <Link href="/Tajawal/followmarkets">
          <a>
            <i className="fas fa-star"></i>
            <span>{strings.followMarkets}</span>
          </a>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item as="div">
        <Link href="/Tajawal/myaddress">
          <a>
            <i className="fas fa-map-marker-alt"></i>
            <span>{strings.myAddress}</span>
          </a>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item as="div">
        <Link href="/Tajawal/account-movements">
          <a>
            <i className="fas fa-sync-alt"></i>
            <span>{strings.accountMovements}</span>
          </a>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item as="div">
        <Link href="/Tajawal/update-profile">
          <a>
            <i className="fas fa-cog"></i>
            <span>{strings.accountSettings}</span>
          </a>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item
        as="div"
        className={styles.logout_btn}
        onClick={() => logoutHandel()}
      >
        <i className="fas fa-power-off"></i>
        <span>{strings.logout}</span>
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default AccountDropDown;
