import { useContext, useState } from "react";
import { useRouter } from "next/router";
import LangContext from "../../store/LangContext";
import classes from "../../styles/myAddresses.module.css";
import strings from "../../Assets/Local/Local";
import Link from "next/link";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { API_END_POINT } from "../../components/appConfig/AppConfig";
import deleteIcon from "../../Assets/Images/deleteIcon.png";
import UserCtx from "../../store/UserContext";

function AddressesList({ addressesData, isPayment }) {
  const { lang } = useContext(LangContext);
  const { token } = useContext(UserCtx);
  const [addressesList, setAddressesList] = useState(addressesData);
  const [show, setShow] = useState(false);
  const [addressId, setAddressId] = useState("");
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function deleteAddress() {
    let url = `${API_END_POINT}/address/${addressId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        let newArr = addressesList.filter(
          (address) => address.id !== addressId
        );
        setAddressesList(newArr);
        handleClose();
      })
      .catch(() => {});
  }

  strings.setLanguage(lang);

  return (
    <div>
      {console.log("allorders are: ", addressesList)}
      {addressesList.map((address) => {
        return (
          <div className={classes.addressesList} key={address.id}>
            <div
              className={classes.addressInfo}
              onClick={() => {
                if (isPayment) {
                  localStorage.setItem(
                    "tajwalUserAddress",
                    JSON.stringify(address)
                  );
                  router.push("/Tajawal/payment");
                }
              }}
              style={isPayment ? { cursor: "pointer" } : {}}
            >
              <div className={classes.addressIcon}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className={classes.addressName + " mx-3"}>
                <h5 style={{ color: "#061637" }}>
                  {address.street} {address.region.name}{" "}
                  {address.region.city.name}
                </h5>
                <h5 style={{ color: "#626D81" }}>
                  {address.region.city.country.name}
                </h5>
                <h5 style={{ color: "#9EA4AF" }}>{address.user.phone}</h5>
              </div>
            </div>
            <div className={classes.addressOptions}>
              <div className="mb-2">
                <Button>
                  <Link
                    href={{
                      pathname: `/Tajawal/myaddress/${address.id}`,
                      query: isPayment ? { payment: true } : {},
                    }}
                  >
                    {strings.editBTN}
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setAddressId(address.id);
                    handleShow();
                  }}
                  className={classes.deleteBTN}
                >
                  {strings.deleteBTN}
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      <Modal show={show} onHide={handleClose} className="deleteAddressModal">
        <Modal.Body className="text-center">
          <div className="imgDeleteModal mx-auto">
            <img src={deleteIcon} alt="deleteIcon" className="img-fluid" />
          </div>
          <p className="my-4">{strings.confirmDeleteAddress}</p>
          <Button
            variant="primary"
            className="btn-block"
            onClick={deleteAddress}
          >
            {strings.deleteBTN}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddressesList;
