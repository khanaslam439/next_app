import classes from "../../../styles/mypurchasesDetails.module.css";
import styles from "../../../styles/mypurchases.module.css";
import strings from "../../../Assets/Local/Local";
import Link from "next/link";

function Storestatus(props) {
  strings.setLanguage(props.lang);

  return (
    <div>
      {console.log("orderStatusData: ", props.orderStatusData.status)}
      <div className={classes.storeName + " p-2"}>
        <p className="mb-0" style={{ color: "#9EA4AF" }}>
          <span>{strings.store}</span> :{" "}
          <span style={{ color: "#F15A24" }}>
            {props.orderStatusData.trader.name}
          </span>
        </p>
        <div className="d-flex">
          <Link href="/Tajawal/chat">
            <div
              className={
                classes.chat +
                " text-white rounded p-2 mx-2 d-flex justify-content-center align-items-center"
              }
            >
              <i className="fas fa-comment-alt"></i>
            </div>
          </Link>
          {props.orderStatusData.status === "WAITING" && (
            <h6
              className={
                styles.cancelOrderBTN +
                " rounded text-white p-2 text-center mb-0 d-flex justify-content-center align-items-center"
              }
            >
              {strings.cancelOrder}
            </h6>
          )}
        </div>
      </div>
      <div className={styles.orderState + " my-3"}>
        <div
          className={
            props.orderStatusData.status === "WAITING"
              ? ""
              : props.orderStatusData.status === "ACCEPTED"
                ? styles.waitingState
                : props.orderStatusData.status === "SHIPPED"
                  ? styles.chargingState
                  : props.orderStatusData.status === "DELIVERED"
                    ? styles.deliveredState
                    : props.orderStatusData.status === "CANCELED" ? styles.canceledState : ""
          }
        >
          <div className={styles.orderStateIcon}>
            <i className="fas fa-check"></i>
          </div>
          <div className={styles.orderStateIcon}>
            <i className="fas fa-check"></i>
          </div>
          <div className={styles.orderStateIcon}>
            <i className="fas fa-check"></i>
          </div>
        </div>
        <div
          className={
            props.orderStatusData.status === "WAITING"
              ? ""
              : props.orderStatusData.status === "ACCEPTED"
                ? styles.waitingState
                : props.orderStatusData.status === "SHIPPED"
                  ? styles.chargingState
                  : props.orderStatusData.status === "DELIVERED"
                    ? styles.deliveredState
                    : props.orderStatusData.status === "CANCELED" ? styles.canceledState : ""
          }
        >
          <div className={styles.orderStateText}>
            {props.orderStatusData.status === "WAITING"
              ? strings.waitingState
              : strings.acceptState}
          </div>
          <div className={styles.orderStateText}>{strings.chargingState}</div>
          <div className={styles.orderStateText}>
            {props.orderStatusData.status === "CANCELED"
              ? strings.canceledState
              : strings.deliveredState}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Storestatus;
