import { withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker, } from 'react-google-maps';
import MapDirection from './MapDirection';
import React from 'react'
const keyAPI = "AIzaSyDrrkl8oZ6kRZ_PyZ57IlT1gXMvSIg8xTw";

const MyMap = withScriptjs(
    withGoogleMap(props => (
      <GoogleMap
        defaultCenter={props.defaultCenter}
        defaultZoom={props.defaultZoom}
      >
        {props.places.map((marker, index) => {
          const position = {lat: marker.latitude, lng: marker.longitude};
          return <Marker key={index} position={position}/>;
        })}
        <MapDirection places={props.places} travelMode={window.google.maps.TravelMode.DRIVING} />
      </GoogleMap>
    ))
  );

function Map (){

    let places = [];
    let defaultCenter= undefined;
    const showPosition = (position) =>{
        places.push({latitude:position.coords.latitude, longitude:position.coords.longitude});
        defaultCenter = {lat:position.coords.latitude, lng:position.coords.longitude}
    }
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    
    
    places.push({latitude:40.7469, longitude:-74.0258});
  return (
    <MyMap
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        keyAPI +
        '&v=3.exp&libraries=geometry,drawing,places'
      }
      places={places}
      loadingElement={<div style={{height: `100%`}}/>}
      containerElement={<div style={{height: "80vh"}}/>}
      mapElement={<div style={{height: `100%`}}/>}
      defaultCenter={defaultCenter || {lat: 25.798939, lng: -80.291409}}
      defaultZoom={11}
    />
  );
}

export default Map;