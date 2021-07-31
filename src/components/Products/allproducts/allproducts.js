import { useContext } from "react";
import Productcard from "../../../components/Cards/productcard";
import { Row, Col } from "react-bootstrap";
import productAd from "../../../Assets/Images/productAd.png";
import { API_END_POINT } from "../../appConfig/AppConfig";
import axios from 'axios'
import UserCtx from "../../../store/UserContext";

function Allproducts(props) {
  const { token } = useContext(UserCtx);

  function addFavoriteHandler(prodId) {
    let url = `${API_END_POINT}/favorites`
    axios.post(url, { product: prodId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept-Language': props.lang
      }
    }).then(() => {
      console.log("Success Request ADD: ")
    }).catch((error) => { console.log("Failed Request ADD: ", error.response) })
  }

  function removeFavoriteHandler(prodId) {
    let url = `${API_END_POINT}/favorites`
    axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }, data: { product: prodId }
    }).then(() => {
      console.log("Success Request Remove: ")
    }).catch((error) => { console.log("Failed Request Remove: ", error.response) })
  }

  return (
    <Row>
      {props.allProducts.map((prod) => {
        return (
          <Col xl="3" lg="4" md="4" sm="6" key={prod.id}>
            <Productcard
              lang={props.lang}
              favState={prod.favorite}
              prodData={prod}
              removeProductFromFavorite={removeFavoriteHandler}
              addProductToFavorite={addFavoriteHandler}
            />
          </Col>
        );
      })}

      <Col lg="12">
        <div className="">
          <img src={productAd} alt="product ad" className="w-100 my-4" />
        </div>
      </Col>
    </Row>
  );
}

export default Allproducts;
