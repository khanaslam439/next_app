import { useContext } from "react";
import classes from '../../../styles/storesDetails.module.css'
import strings from "../../../Assets/Local/Local";
import Slider from "react-slick";
import Shopcard from '../../../components/Cards/shopcard'
import { Container, Row, Col } from 'react-bootstrap'
import { API_END_POINT } from "../../appConfig/AppConfig";
import axios from 'axios'
import UserCtx from "../../../store/UserContext";

function SimilarStores(props) {

  const { token } = useContext(UserCtx);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };

  function addFollowingHandler(storeId) {
    let url = `${API_END_POINT}/follow`
    axios.post(url, { trader: storeId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept-Language': props.lang
      }
    }).then(() => {
      console.log("Success Request ADD: ")
    }).catch((error) => { console.log("Failed Request ADD: ", error.response) })
  }

  function removeFollowingHandler(storeId) {
    let url = `${API_END_POINT}/follow`
    axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }, data: { trader: storeId }
    }).then(() => {
      console.log("Success Request Remove: ")
    }).catch((error) => { console.log("Failed Request Remove: ", error.response) })
  }

  strings.setLanguage(props.lang);

  return (
    <div className={classes.similarStores + `${props.lang === 'ar' ? " styleSimilarSlidersAR" : ""}`}>
      <h2>{strings.similarShops}</h2>
      <div className="styleSimilarProducts mt-5">
        <Slider {...settings}>
          <Container fluid>
            <Row>
              {props.similarStores.map((store) => {
                return (
                  <Col lg="3" md="4" sm="6">
                    <Shopcard
                      lang={props.lang}
                      storeData={store}
                      removeStoreFromFollowing={removeFollowingHandler}
                      addStoreToFollowing={addFollowingHandler}
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


export default SimilarStores
