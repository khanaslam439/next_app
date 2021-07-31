import { useContext, useState, useEffect } from "react";
import Followmarkets from "../../../components/followMarkets/followmarkets";
import Followmarketsads from "../../../components/followMarkets/followmarketsads";
import LangContext from "../../../store/LangContext";
import { Container, Row, Col } from "react-bootstrap";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../Assets/Local/Local";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../store/UserContext";
import Loading from "../../../components/Loading/Loading";
import ItemsNotFound from "../../../components/ItemsNotFound/ItemsNotFound";

function index() {
  const { lang } = useContext(LangContext);
  const { user } = useContext(UserCtx);
  const [followingStores, setFollowingStores] = useState([]);
  const [flag, setFlag] = useState(false);

  function fetchStoresFollowing() {
    let url = `${API_END_POINT}/follow?user=${user.id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setFlag(true);
        console.log("success fetch...");
        setFollowingStores(response.data.data);
      })
      .catch((error) => {
        console.log("errors is: ", error.response);
      });
  }

  useEffect(() => {
    fetchStoresFollowing();
  }, []);

  strings.setLanguage(lang);
  return (
    <>
      <MetaDecartor title={strings.title} />
      {flag ? (
        <Container
          fluid
          className={
            lang === "ar"
              ? "text-right special-padding-pages"
              : "text-left special-padding-pages"
          }
        >
          <Row>
            <Col md="9">
              {followingStores.length > 0 ? (
                <Followmarkets lang={lang} allFollowStores={followingStores} />
              ) : (
                <ItemsNotFound
                  elementClass={"items__notfound"}
                  title={strings.nostores}
                />
              )}
            </Col>
            <Col md="3" className="d-md-block d-lg-block d-none">
              <Followmarketsads lang={lang} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default index;
