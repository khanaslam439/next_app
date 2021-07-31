import { useContext, useEffect, useState } from "react";
import OrderCard from "../../../components/mypurchases/orderCard";
import LangContext from "../../../store/LangContext";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../Assets/Local/Local";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../store/UserContext";
import Loading from "../../../components/Loading/Loading";
import ItemsNotFound from "../../../components/ItemsNotFound/ItemsNotFound";

function index() {
  const { lang } = useContext(LangContext);
  const { user, token } = useContext(UserCtx);
  const [ordersList, setOrdersList] = useState([]);
  const [flag, setFlag] = useState(false);

  function fetchOrders() {
    let url = `${API_END_POINT}/order?user=${user.id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFlag(true);
        setOrdersList(response.data.data);
      })
      .catch((error) => {
        console.log("errors is: ", error.response);
      });
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  strings.setLanguage(lang);

  return (
    <div className="w-100 special-padding-pages">
      <MetaDecartor title={strings.title} />
      {flag ? (
        <div>
          {ordersList.length > 0 ? (
            <OrderCard lang={lang} ordersList={ordersList} />
          ) : (
            <ItemsNotFound
              elementClass={"items__notfound"}
              title={strings.noOrders}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default index;
