import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import location from "../../../../Assets/Images/location.png";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={12  } defaultCenter={props.defaultCenter}>
      {console.log("marker take place", props.marker)}

      {props.marker.map((element, index) => {
        return (
          <Marker
            position={{ lat: element.lat, lng: element.Lng }}
            title={element.name}
            icon={location}
          />
        );
      })}
    </GoogleMap>
  ))
);

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bound: props.coordinates
        ? [{ lat: this.props.coordinates[0], Lng: this.props.coordinates[1] }]
        : [{ lat: 30.0596185, Lng: 31.1884236 }],
    };
  }
  handleMarkerClick = (path, id) => {
    console.log("handleMarkerClick", path, id);
    this.setState({ forwardmap: true, route: path, id: id });
  };
  render() {
    return (
      <div
        style={{
          direction: "ltr",
          marginTop: "45px",
          marginBottom: "15px",
          // padding: "0 50px",
        }}
        className="text-center py-1"
      >
        <MyMapComponent
          isMarkerShown
          onMarkerClick={this.handleMarkerClick}
          marker={this.state.bound}
          defaultCenter={
            this.props.coordinates
              ? { lat: this.props.coordinates[0], lng: this.props.coordinates[1] }
              : {
                  lat: 30.0596185,
                  lng: 31.1884236,
                }
          }
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHOldbL841fdZfoOxt8csv5a5jxRAct3Y&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `200px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
export default Map;
