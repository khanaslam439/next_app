import { useState, useContext } from "react";
import Productcard from "../Cards/productcard";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { API_END_POINT } from "../appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../store/UserContext";
import deleteIcon from "../../Assets/Images/deleteIcon.png";
import strings from "../../Assets/Local/Local";
import ItemsNotFound from "../ItemsNotFound/ItemsNotFound";

function Favproucts(props) {
  const [allProducts, setAllProducts] = useState(props.allFavProducts);
  const { token } = useContext(UserCtx);
  const [productId, setProductId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getProductId(prodId) {
    setProductId(prodId);
    handleShow();
  }

  function removeProduct(prodId) {
    return allProducts.filter((prod) => prod.product.id !== prodId);
  }

  function removeFavoriteHandler(prodId) {
    let url = `${API_END_POINT}/favorites`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { product: prodId },
      })
      .then(() => {
        let newArr = removeProduct(prodId);
        setAllProducts(newArr);
        console.log("Success Request: ");
        handleClose();
      })
      .catch((error) => {
        console.log("Failed Request: ", error.response);
      });
  }

  return (
    <div>
      {allProducts.length > 0 ? (
        <Row>
          {allProducts.map((prod) => {
            return (
              <Col xl="3" lg="4" md="6" sm="6" key={prod.id}>
                <Productcard
                  lang={props.lang}
                  prodData={prod.product}
                  favState={true}
                  removeProductFromFavorite={getProductId}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <ItemsNotFound
          elementClass={" items__notfound"}
          title={strings.noProducts}
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
            onClick={() => removeFavoriteHandler(productId)}
          >
            {strings.deleteBTN}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Favproucts;
