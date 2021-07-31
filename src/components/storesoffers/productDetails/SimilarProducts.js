import { useContext } from "react";
import classes from '../../../styles/productDetails.module.css'
import strings from "../../../Assets/Local/Local";
import Slider from "react-slick";
import Productcard from "../../../components/Cards/productcard";
import { Container, Row, Col } from 'react-bootstrap'
import { API_END_POINT } from "../../appConfig/AppConfig";
import axios from 'axios'
import UserCtx from "../../../store/UserContext";

function SimilarProducts(props) {

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

  strings.setLanguage(props.lang);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 4,
    initialSlide: 0,
  };

  return (
    <div className={classes.similarProducts + `${props.lang === 'ar' ? " styleSimilarSlidersAR" : ""}`}>
      <h2>{strings.similarProducts}</h2>
      <div className="styleSimilarProducts mt-5">
        <Slider {...settings}>
          <Container fluid>
            <Row>
              {props.similarProducts.map((prod) => {
                return (
                  <Col lg="3" md="4" sm="6">
                    <Productcard
                      lang={props.lang}
                      favState={prod.favorite}
                      prodData={prod}
                      removeProductFromFavorite={removeFavoriteHandler}
                      addProductToFavorite={addFavoriteHandler}
                    />
                  </Col>
                )
              })}
            </Row>
          </Container>
        </Slider>
      </div>
    </div>
  )
}

export default SimilarProducts
