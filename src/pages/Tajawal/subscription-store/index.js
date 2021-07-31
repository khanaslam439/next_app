import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LangContext from "../../../store/LangContext";
import Subscriptionads from "../../../components/subscription-store/subscriptionstoreads";
import Subscriptiontext from "../../../components/subscription-store/subscriptionstoretext";
import Subscriptionvideo from "../../../components/subscription-store/subscriptionstorevideo";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../Assets/Local/Local";

function index() {
  const { lang } = useContext(LangContext);

  return (
    <Container
      fluid
      className={
        lang === "ar"
          ? "text-right special-padding-pages"
          : "text-left special-padding-pages"
      }
    >
      <MetaDecartor title={strings.title} />
      <Row>
        <Col md="9">
          <Subscriptiontext lang={lang} />
          <Subscriptionvideo lang={lang} />
        </Col>

        <Col md="3" className="d-md-block d-lg-block d-none">
          <Subscriptionads lang={lang} />
        </Col>
      </Row>
    </Container>
  );
}

export default index;
