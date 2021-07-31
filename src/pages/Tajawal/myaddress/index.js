import { useContext, useState, useEffect } from "react";
import LangContext from "../../../store/LangContext";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

import strings from "../../../Assets/Local/Local";
import MetaDecartor from "../../../components/MetaDecrator/MetaDecrator";
import classes from "../../../styles/myAddresses.module.css";
import MyAddressesads from "../../../components/myaddresses/myaddressesads";
import AddressesList from "../../../components/myaddresses/addresseslist";
import Link from "next/link";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";
import axios from "axios";
import UserCtx from "../../../store/UserContext";
import Loading from "../../../components/Loading/Loading";
import ItemsNotFound from "../../../components/ItemsNotFound/ItemsNotFound";

function index() {
  const { lang } = useContext(LangContext);
  const { user, token } = useContext(UserCtx);
  const [addresseslist, setAddresseslist] = useState([]);
  const [flag, setFlag] = useState(false);
  const { query } = useRouter();
  console.log("query", query);
  function fetchAddresses() {
    let url = `${API_END_POINT}/address?user=${user.id}`;
    axios
      .get(url, {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((response) => {
        setFlag(true);
        console.log("success fetch...");
        setAddresseslist(response.data.data);
      })
      .catch((error) => {
        console.log("errors is: ", error.response);
      });
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  strings.setLanguage(lang);

  return (
    <>
      <MetaDecartor title={strings.title} />
      <div className="special-padding-pages w-100">
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
                {Object.keys(token).length !== 0 ? (
                  <Row>
                    <Col md="8" sm="8">
                      {addresseslist.length > 0 ? (
                        <AddressesList
                          addressesData={addresseslist}
                          isPayment={query.payment ? true : false}
                        />
                      ) : (
                        <ItemsNotFound
                          elementClass={" items__notfound"}
                          title={strings.noAddress}
                        />
                      )}
                    </Col>
                    <Col
                      md="4"
                      sm="4"
                      className="d-flex align-items-start justify-content-end"
                    >
                      <div className={classes.addNewAddress}>
                        <i className="fas fa-plus"></i>{" "}
                        <Link
                          href={{
                            pathname: "/Tajawal/myaddress/add",
                            query: query.payment
                              ? { query: { payment: true } }
                              : {},
                          }}
                          className={lang === "ar" ? "mr-1" : "ml-1"}
                        >
                          {strings.addNewAddress}
                        </Link>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <h2>login first</h2>
                )}
              </Col>
              <Col md="3" className="d-md-block d-lg-block d-none">
                <MyAddressesads />
              </Col>
            </Row>
          </Container>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default index;
