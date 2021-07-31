import classes from "../../styles/subscrptions.module.css";
function subscriptionvideo() {
  return (
    <div className={classes.subscriptionVideo}>
      <video controls>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default subscriptionvideo;
