import { useContext, useEffect, useState } from "react";
import All from "../../../../components/mypurchases/purchasesDetails/all";
import Orderinfo from "../../../../components/mypurchases/purchasesDetails/orderinfo";
import { Container, Row, Col } from "react-bootstrap";
import LangContext from "../../../../store/LangContext";
import MetaDecartor from "../../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../../Assets/Local/Local";
import { API_END_POINT } from "../../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../../store/UserContext";
import Loading from "../../../../components/Loading/Loading";

function index() {
  const { lang } = useContext(LangContext);
  const { token } = useContext(UserCtx);
  const [orderList, setOrderList] = useState();

  function fetchOrderDetails(id) {
    let url = `${API_END_POINT}/order/${id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("success fetch...: ", response.data);
        setOrderList(response.data);
      })
      .catch((error) => {
        console.log("errors is: ", error.response);
      });
  }

  useEffect(() => {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1);
    fetchOrderDetails(id);
  }, []);

  strings.setLanguage(lang);

  return (
    <div
      className={
        lang === "ar"
          ? "w-100 text-right special-padding-pages"
          : "w-100 text-left special-padding-pages"
      }
    >
      <MetaDecartor title={strings.title} />
      {orderList ? (
        <Container fluid>
          <Row>
            <Col lg="8">
              <All lang={lang} orderData={orderList.traders} />
            </Col>
            <Col lg="4">
              <Orderinfo lang={lang} orderData={orderList} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default index;
