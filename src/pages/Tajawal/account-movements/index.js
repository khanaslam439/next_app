import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Moment from "react-moment";
import Lottie from "react-lottie";

import animationData from "../../../Assets/Lottie/empty-logs.json";
import Loading from "../../../components/Loading/Loading";

import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import UserContext from "../../../store/UserContext";
import LangContext from "../../../store/LangContext";
import strings from "../../../Assets/Local/Local";

import adsImg1 from "../../../Assets/Images/ads3.png";
import adsImg2 from "../../../Assets/Images/ads4.png";

import styles from "../../../styles/AccountMovements.module.css";
const AccountMovements = () => {
  const { user, token } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const [accountActions, setAccountActions] = useState([]);
  const [logs, setLogs] = useState();
  const router = useRouter();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchUserMovements = () => {
    axios
      .get(`${API_END_POINT}/account-actions`, {
        headers: { Authorization: `Bearer ${token}`, "Accept-Language": lang },
      })
      .then(({ data }) => {
        console.log("finishedOrders=>", data);
        setLogs({
          finishedOrders: data.data.finishedOrders,
          followedTraders: data.data.followedTraders,
          unFinishedOrders: data.data.unFinishedOrders,
          totalPayment: data.data.totalPayment,
        });
        setAccountActions(data.data.accountActiones);
      })
      .catch((error) => {
        console.log("error when fetch data==>", error.response);
      });
  };
  useEffect(() => {
    if (!Object.keys(user).length) {
      router.replace("/Tajawal/login");
    }
  }, [lang, user]);
  useEffect(() => {
    fetchUserMovements();
  }, [lang]);
  strings.setLanguage(lang);
  return (
    <div className={`container-fluid ${styles.account__movements__page}`}>
      {accountActions ? (
        <div className="row">
          {accountActions.length ? (
            <section
              className={`col-lg-9 col-md-12 ${styles.details__wrapper}`}
            >
              {logs ? (
                <div className={styles.user__logs}>
                  <div>
                    <p className={styles.completed__orderd}>
                      {strings.totalFininshedOrders}: {logs.finishedOrders}
                    </p>
                    <p className={styles.following__markets}>
                      {strings.followedTraders}: {logs.followedTraders}
                    </p>
                    <p className={styles.uncompleted__order}>
                      {strings.unFinishedOrders}: {logs.unFinishedOrders}
                    </p>
                  </div>
                  <h3>
                    <span>{strings.TotaAmountPaid}</span>
                    <strong>
                      {logs.totalPayment} {strings.currency}
                    </strong>
                  </h3>
                </div>
              ) : null}

              <div className={`table-responsive ${styles.user__table_logs}`}>
                <table className={`${styles.table} table`}>
                  <thead>
                    <tr>
                      <th>{strings.date}</th>
                      <th>{strings.logDescriptions}</th>
                      <th>{strings.price}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountActions.length
                      ? accountActions.map((item) => (
                          <tr
                            key={item.id}
                            className={styles[`data__row__${lang}`]}
                          >
                            <td>
                              <div className={styles.date}>
                                <Moment
                                  date={item.createdAt}
                                  locale={lang}
                                  format="DD"
                                />
                                <Moment
                                  date={item.createdAt}
                                  locale={lang}
                                  format="MMM YYYY"
                                />
                              </div>
                            </td>
                            <td>
                              {item.trader?.name ? (
                                <strong>{item.trader.name}</strong>
                              ) : null}

                              <p>{item.description}</p>
                              {item.product?.name ? (
                                <p>{item.product.name}</p>
                              ) : null}
                            </td>
                            <td></td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <div className="col-9">
              <Lottie options={defaultOptions} height="50" width="50%" />
              <p className={styles.no__logs}>{strings.noLogs}</p>
            </div>
          )}

          <section className={`col-lg-3 ${styles.ads_section}`}>
            <div className={styles.img_container}>
              <img src={adsImg1} alt="ads" />
            </div>
            <div className={styles.img_container}>
              <img src={adsImg2} alt="ads" />
            </div>
          </section>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AccountMovements;
