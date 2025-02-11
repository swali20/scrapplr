import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import LocationMarker from "./LocationMarker";

const key = process.env.REACT_APP_GOOGLE_API_KEY;
export const GoogleMap = (props) => {
  const mapStyles = {
    width: "50%",
    height: "50%",
  };
  return (
    <div>
      {props.allLocations.length && (
        <Map
          google={props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: props.allLocations[0].coordinates._lat,
            lng: props.allLocations[0].coordinates._long,
          }}
        >
          {props.allLocations.length &&
            props.allLocations.map(
              (location) => {
                return (
                <LocationMarker
                location={location} />)

                // <Marker
                //   key={location.Name}
                //   title={location.Name}
                //   name={location.Name}
                //   position={{
                //     lat: location.coordinates._lat,
                //     lng: location.coordinates._long,
                //   }}
                // />
                }

              //  <LocationMarker location={location} key={location.Name} />
            )}
        </Map>
      )}
    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: key,
})(GoogleMap);
