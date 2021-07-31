import { useContext, useState, useEffect, createContext } from "react";
import LangContext from "../../../store/LangContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import classes from "../../../styles/myAddresses.module.css";
import axios from "axios";
import { API_END_POINT } from "../../appConfig/AppConfig";
import { useRouter } from "next/router";
import UserCtx from "../../../store/UserContext";
import strings from "../../../Assets/Local/Local";
import PlacesAutocomplete from "./placesautocompleteAdd";
import MapPicker from "react-google-map-picker";
export const locationContext = createContext();

const DefaultLocation = {
  lat: 0,
  lng: 0,
};
const DefaultZoom = 100;

function AddAddress({ isPayment }) {
  const { lang } = useContext(LangContext);
  const { token } = useContext(UserCtx);
  const router = useRouter();
  const [cityVal, setCityVal] = useState("");
  const [blockVal, setBlockVal] = useState("");
  const [streetNumVal, setStreetValNum] = useState("");
  const [specialTagVal, setSpecialTagVal] = useState("");
  const [saveBTNVal, setsaveBTNVal] = useState(false);
  const [cities, setCities] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleCityValue(e) {
    setCityVal(e.target.value);
    fetchBlocks(e.target.value);
  }
  function handleBlockValue(e) {
    setBlockVal(e.target.value);
  }
  function handleStreetNumberValue(e) {
    setStreetValNum(e.target.value);
  }
  function handleSpecialTagValue(e) {
    setSpecialTagVal(e.target.value);
  }
  const getcurrentLocation = () => {
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        });
      });
    }
    return {
      lat: 0,
      lng: 0,
    };
  };
  useEffect(() => {
    async function fetchAPI() {
      const { lat, lng } = await getcurrentLocation();
      console.log("items===>", lat, lng);
      setLocation({ lat: lat, lng: lng });
    }

    fetchAPI();
  }, []);
  function validateForm() {
    if (
      cityVal === "" ||
      blockVal === "" ||
      streetNumVal === "" ||
      specialTagVal === ""
    ) {
      setsaveBTNVal(true);
    } else {
      setsaveBTNVal(false);
      addNewAddress();
    }
  }

  function addNewAddress() {
    let url = `${API_END_POINT}/address`;
    let reqBody = {
      region: blockVal,
      details: specialTagVal,
      street: streetNumVal,

      long: location.long,
      lat: location.lat,
      address: "Saudi",
    };
    axios
      .post(url, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": lang,
        },
      })
      .then(() => {
        console.log("Success Request");
        router.push({
          pathname: "/Tajawal/myaddress",
          query: isPayment ? { payment: true } : {},
        });
      })
      .catch((error) => console.log("Error Request: ", error.response));
  }

  function fetchCities() {
    let url = `${API_END_POINT}/city?removeLanguage=true`;
    axios.get(url).then((response) => {
      setCities(response.data.data);
    });
  }

  function fetchBlocks(cityId) {
    let url = `${API_END_POINT}/region?city=${cityId}&removeLanguage=true`;
    axios.get(url).then((response) => {
      setBlocks(response.data.data);
    });
  }
  const handleChangeLocation = (lat, lng) => {
    setZoom(40);
    setLocation({ lat: lat, lng: lng });
  };

  const handleChangeZoom = (newZoom) => {
    setZoom(12);
  };

  const handleSearchLocation = (lat, long) => {
    setZoom(40);
    setLocation({ lat: lat, lng: long });
    setDefaultLocation({ lat: lat, lng: long });
  };
  useEffect(() => {
    fetchCities();
  }, []);

  strings.setLanguage(lang);

  return (
    <locationContext.Provider
      value={{ handleSearchLocation: handleSearchLocation }}
    >
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="5">
            <div className="addressMap">
              <PlacesAutocomplete />
              <MapPicker
                defaultLocation={location}
                zoom={Number(zoom)}
                style={{ height: "100%" }}
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey="AIzaSyCHOldbL841fdZfoOxt8csv5a5jxRAct3Y"
              />
            </div>
          </Col>
          <Col md="5">
            {cities.length > 0 && (
              <div>
                <div className={classes.addAddressBox + " addAddressForm mb-3"}>
                  <Form.Group
                    controlId="cityId"
                    className={lang === "ar" ? "text-right" : ""}
                  >
                    <Form.Label>{strings.city}</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={handleCityValue}
                      value={cityVal}
                    >
                      <option selected>{strings.selectCity}</option>
                      {cities.map((city) => {
                        return (
                          <option value={city.id} key={city.id}>
                            {city.name[lang]}
                          </option>
                        );
                      })}
                    </Form.Control>
                    {saveBTNVal && cityVal === "" && (
                      <Form.Text>{strings.cityError}</Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group
                    controlId="blockId"
                    className={lang === "ar" ? "text-right" : ""}
                  >
                    <Form.Label>{strings.block}</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={handleBlockValue}
                      value={blockVal}
                    >
                      <option selected>{strings.selectBlock}</option>
                      {blocks.map((block) => {
                        return (
                          <option value={block.id} key={block.id}>
                            {block.name[lang]}
                          </option>
                        );
                      })}
                    </Form.Control>
                    {saveBTNVal && blockVal === "" && (
                      <Form.Text>{strings.blockError}</Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group
                    controlId="streetNumId"
                    className={lang === "ar" ? "text-right" : ""}
                  >
                    <Form.Label>{strings.streetNumber}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={strings.writeStreetNumber}
                      onChange={handleStreetNumberValue}
                      value={streetNumVal}
                    />
                    {saveBTNVal && streetNumVal === "" && (
                      <Form.Text>{strings.streetNumberError}</Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group
                    controlId="specialTagId"
                    className={lang === "ar" ? "text-right mb-0" : "mb-0"}
                  >
                    <Form.Label>{strings.specialTag}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={strings.writeSpecialTag}
                      onChange={handleSpecialTagValue}
                      value={specialTagVal}
                    />
                    {saveBTNVal && specialTagVal === "" && (
                      <Form.Text>{strings.specialTagError}</Form.Text>
                    )}
                  </Form.Group>
                </div>
                <Button
                  onClick={validateForm}
                  className={classes.saveFormBTN + " btn-block border-0"}
                >
                  {strings.saveBtn}
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </locationContext.Provider>
  );
}

export default AddAddress;
