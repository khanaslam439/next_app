import Favproucts from "./favproducts";
import Favstores from "./favstores";
import { Tabs, Tab } from "react-bootstrap";
import strings from "../../Assets/Local/Local";
import ItemsNotFound from "../ItemsNotFound/ItemsNotFound";

function Favtabnav(props) {
  strings.setLanguage(props.lang);

  return (
    <div className="productDetailsTabNav favoriteTabnav">
      {console.log("props: ", props.allFavProducts, props.allFavStores)}
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3 border-0"
      >
        <Tab eventKey="home" title={strings.products}>
          {props.allFavProducts.length > 0 ? (
            <Favproucts
              lang={props.lang}
              allFavProducts={props.allFavProducts}
            />
          ) : (
            <ItemsNotFound
              elementClass={"items__notfound"}
              title={strings.noProducts}
            />
          )}
        </Tab>
        <Tab eventKey="profile" title={strings.stores}>
          {props.allFavStores.length > 0 ? (
            <Favstores lang={props.lang} allFavStores={props.allFavStores} />
          ) : (
            <ItemsNotFound
              elementClass={"items__notfound"}
              title={strings.nostores}
            />
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default Favtabnav;
