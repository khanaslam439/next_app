import { useState, useContext } from "react";
import Shopcard from "../Cards/shopcard";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { API_END_POINT } from "../appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../store/UserContext";
import deleteIcon from "../../Assets/Images/deleteIcon.png";
import strings from "../../Assets/Local/Local";
import ItemsNotFound from "../ItemsNotFound/ItemsNotFound";

function Favstores(props) {
  const [allStores, setAllStores] = useState(props.allFavStores);

  const { token } = useContext(UserCtx);
  const [storeId, setStoreId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getStoreId(storeId) {
    setStoreId(storeId);
    handleShow();
  }

  function removeStore(storeId) {
    return allStores.filter((store) => store.trader.id !== storeId);
  }

  function removeFavoriteHandler(storeId) {
    let url = `${API_END_POINT}/favorites/trader`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { trader: storeId },
      })
      .then(() => {
        let newArr = removeStore(storeId);
        setAllStores(newArr);
        console.log("Success Request: ");
        handleClose();
      })
      .catch((error) => {
        console.log("Failed Request: ", error.response);
      });
  }

  return (
    <div>
      {allStores.length > 0 ? (
        <Row>
          {allStores.map((store) => {
            return (
              <Col lg="4" md="6" sm="6" key={store.id}>
                <Shopcard
                  lang={props.lang}
                  favStoreState={true}
                  storeData={store.trader}
                  removeStoreFromFavorite={getStoreId}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <ItemsNotFound
          elementClass={"items__notfound"}
          title={strings.nostores}
        />
      )}
      <Modal show={show} onHide={handleClose} className="deleteAddressModal">
        <Modal.Body className="text-center">
          <div className="imgDeleteModal mx-auto">
            <img src={deleteIcon} alt="deleteIcon" className="img-fluid" />
          </div>
          <p className="my-4">{strings.confirmRemoveFav}</p>
          <Button
            variant="primary"
            className="btn-block"
            onClick={() => removeFavoriteHandler(storeId)}
          >
            {strings.deleteBTN}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Favstores;
