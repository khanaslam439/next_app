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
const DefaultZoom = 100;
const DefaultLocation = {
  lat: 0,
  lng: 0,
};
function EditAddress({ editData, isPayment }) {
  const { lang } = useContext(LangContext);
  const { token } = useContext(UserCtx);
  const router = useRouter();
  const [cityVal, setCityVal] = useState(editData.region.city.id);
  const [blockVal, setBlockVal] = useState(editData.region.id);
  const [streetNumVal, setStreetValNum] = useState(editData.street);
  const [specialTagVal, setSpecialTagVal] = useState(editData.details);
  const [saveBTNVal, setsaveBTNVal] = useState(true);
  const [cities, setCities] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [defaultLocation, setDefaultLocation] = useState({
    lat: editData.lat,
    lng: editData.long,
  });
  const [location, setLocation] = useState({
    lat: editData.lat,
    lng: editData.long,
  });
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
      editAddress();
    }
  }

  function editAddress() {
    let url = `${API_END_POINT}/address/${editData.id}`;
    let reqBody = {
      region: blockVal,
      details: specialTagVal,
      street: streetNumVal,

      long: location.long,
      lat: location.lat,
      address: "Saudi",
    };
    axios
      .put(url, reqBody, {
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
  const handleSearchLocation = (lat, long) => {
    setLocation({ lat: lat, lng: long });
    setDefaultLocation({ lat: lat, lng: long });
  };
  useEffect(() => {
    fetchCities();
    fetchBlocks(editData.region.city.id);
  }, []);
  const handleChangeLocation = (lat, lng) => {
    setZoom(40);
    setLocation({ lat: lat, lng: lng });
  };
  const handleChangeZoom = (newZoom) => {
    setZoom(12);
  };
  strings.setLanguage(lang);
  console.log("Edit ", editData);
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
          </Col>
        </Row>
      </Container>
    </locationContext.Provider>
  );
}

export default EditAddress;
