import { useContext } from "react";
import Shopcard from '../../Cards/shopcard'
import { Row, Col } from 'react-bootstrap'
import productAd from '../../../Assets/Images/productAd.png'
import { API_END_POINT } from "../../appConfig/AppConfig";
import UserCtx from "../../../store/UserContext";
import axios from 'axios'

function Allshops(props) {

    const { token } = useContext(UserCtx);

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

    return (
        <div>
            <Row>
                {props.allStores.map((store) => {
                    return (
                        <Col lg="4" md="6" sm="6" key={store.id}>
                            <Shopcard
                                lang={props.lang}
                                storeData={store}
                                followStoreState={store.follow}
                                removeStoreFromFollowing={removeFollowingHandler}
                                addStoreToFollowing={addFollowingHandler}
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
        </div>
    )
}

export default Allshops
