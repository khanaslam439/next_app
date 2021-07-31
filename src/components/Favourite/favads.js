import storeAd from "../../Assets/Images/store/storeAd.png";
function Favads(props) {
  return (
    <div>
      <div className={props.lang === "ar" ? "text-left" : "text-right"}>
        <div>
          <img src={storeAd} alt="store ad" className="img-fluid mb-3" />
        </div>
        <div>
          <img src={storeAd} alt="store ad" className="img-fluid mb-3" />
        </div>
      </div>
    </div>
  );
}

export default Favads;
