import classes from '../../../styles/mypurchasesDetails.module.css'
import strings from '../../../Assets/Local/Local'
import { API_END_POINT } from '../../appConfig/AppConfig';

function Productcard(props) {

    strings.setLanguage(props.lang)

    return (
        <div className={classes.orderProductCard + ' bg-white p-3 d-flex rounded mb-3'}>
            <div className={classes.orderProductCardImg}>
                <img src={`${API_END_POINT}${props.productStatusData.product.slider[0]}`} alt="product img" className="img-fluid" />
            </div>
            <div className={classes.orderProductCardInfo + ' mx-3'}>
                <h5 style={{ color: "#061637" }} className="text-truncate">{props.productStatusData.product.name}</h5>
                <p style={{ color: "#F15A24" }} className="mb-2">{props.productStatusData.price} <span className="mx-2">{strings.currency}</span></p>
                <p style={{ color: "#626D81" }} className="mb-0">{strings.amount} : {props.productStatusData.quantity}</p>
            </div>
        </div>
    )
}

export default Productcard
