import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import LangContext from "../../../../store/LangContext";
import EditAddress from "../../../../components/myaddresses/editaddress/editaddress";
import MetaDecartor from "../../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../../Assets/Local/Local";
import { API_END_POINT } from "../../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../../store/UserContext";
import Loading from "../../../../components/Loading/Loading";

function index() {
  const { lang } = useContext(LangContext);
  const { token } = useContext(UserCtx);
  const [addressData, setAddressData] = useState("");
  const { query } = useRouter();
  function fetchAddressData(id) {
    let url = `${API_END_POINT}/address/${id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAddressData(response.data);
      });
  }

  useEffect(() => {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1);
    fetchAddressData(id);
  }, []);

  strings.setLanguage(lang);
  return (
    <div className="special-padding-pages w-100">
      <MetaDecartor title={strings.title} />
      {addressData ? (
        <EditAddress
          editData={addressData}
          isPayment={query.payment ? true : false}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default index;
