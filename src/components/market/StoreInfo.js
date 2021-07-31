import classes from "../../styles/storesDetails.module.css";
import strings from "../../Assets/Local/Local";
import { API_END_POINT } from "../../components/appConfig/AppConfig";

function StoreInfo(props) {

  return (
    <div className={classes.sliderInfo + " h-100"}>
      <div>
        <div>
          <div
            className={
              classes.storeLogoBtns +
              " d-flex justify-content-between align-items-center mt-lg-0 mt-3"
            }
          >
            <div className={classes.storeLogo}>
              <img
                src={`${API_END_POINT}/${props.storeData.image}`}
                alt="store Logo"
              />
            </div>
          </div>
          <h5 className="my-3">{props.storeData.username[props.lang]}</h5>
          <div>
            <div
              className={
                classes.storeLocation +
                " bg-white d-flex justify-content-between align-items-center rounded-lg mt-3"
              }
            >
              <p className="mb-0 px-3 py-1 text-truncate">
                {props.storeData.address},
                {props.storeData.region.name[props.lang]},
                {props.storeData.region.city.name[props.lang]}
              </p>
              <div className="py-1 px-3 text-white d-flex align-items-center">
                <a
                  rel="noopener noreferrer"
                  href={` https://www.google.com/maps/search/?api=1&query=${props.storeData.geoLocation.coordinates[1]},${props.storeData.geoLocation.coordinates[0]}`}
                  target="_blank"
                >
                  <i className="fas fa-map-marker-alt text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreInfo;
