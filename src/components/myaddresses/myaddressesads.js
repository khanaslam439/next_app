import { useContext, useEffect, useState } from "react";
import LangContext from "../../store/LangContext";
import storeAd from "../../Assets/Images/store/storeAd.png";
function MyAddressesads() {
  const { lang } = useContext(LangContext);

  return (
    <div>
      <div className={lang === "ar" ? "text-left" : "text-right"}>
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

export default MyAddressesads;
