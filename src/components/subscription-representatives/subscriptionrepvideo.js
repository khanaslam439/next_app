import classes from "../../styles/subscrptions.module.css";
import googleplay from "../../Assets/Images/googleplay.png";
import appstore from "../../Assets/Images/appstore.png";
import img2 from "../../Assets/Images/img2.png";
import img1 from "../../Assets/Images/img1.png";

function subscriptionvideo() {
  return (
    <div className={classes.subscriptionVideo}>
      <video controls>
        <source src='video.mp4' type="video/mp4" />
              Your browser does not support the video tag.
      </video>
      <div className={classes.subscriptionBG + ' mt-4 d-flex justify-content-around'}>
        <div className="d-flex justify-content-center align-items-center">
          <div className={classes.storeImg}>
            <a href="#" target="_blank">
              <img
                src={appstore}
                alt="subscription ad"
                className="img-fluid"
              />
            </a>
          </div>
          <div className={classes.storeImg + ' mx-2'}>
            <a href="#" target="_blank">
              <img
                src={googleplay}
                alt="subscription ad"
                className="img-fluid"
              />
            </a>
          </div>
        </div>
        <div className="d-flex align-items-end justify-content-center h-100">
          <div className={classes.storePhoto}>
            <img
              src={img1}
              alt="subscription ad"
              className="img-fluid"
            />
          </div>
          <div className={classes.storePhoto}>
            <img
              src={img2}
              alt="subscription ad"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default subscriptionvideo;
