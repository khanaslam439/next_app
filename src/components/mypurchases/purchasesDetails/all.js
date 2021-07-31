import Storestatus from "./storestatus";
import Productcard from "./productcard";
import { Row, Col } from "react-bootstrap";

function All(props) {
  return (
    <Row>
      {props.orderData.map((order) => {
        return (
          <Col md="6">
            <Storestatus lang={props.lang} orderStatusData={order} />
            {order.products.map((product)=>{
                return(
                    <Productcard lang={props.lang} productStatusData={product} />
                )
            })}
          </Col>
        );
      })}
    </Row>
  );
}

export default All;
