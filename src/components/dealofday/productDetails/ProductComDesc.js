import { useContext, useState, useEffect } from "react";
import ProductComments from "./ProductComments";
import ProductDesc from "./ProductDesc";
import { Tabs, Tab } from "react-bootstrap";
import strings from "../../../Assets/Local/Local";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import axios from "axios";

function ProductComDesc(props) {
  strings.setLanguage(props.lang);

  return (
    <div className="mt-4 productDetailsTabNav py-4 px-3">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3 border-0"
      >
        <Tab eventKey="home" title={strings.description}>
          <ProductDesc lang={props.lang} />
        </Tab>
        <Tab eventKey="profile" title={strings.rates}>
          <ProductComments
            lang={props.lang}
            productId={props.productId}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ProductComDesc;
