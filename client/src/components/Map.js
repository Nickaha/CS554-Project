// // this works if you can afford 300 bucks per month
// import { withScriptjs,
//     withGoogleMap,
//     GoogleMap,
//     Marker, } from 'react-google-maps';
// import MapDirection from './MapDirection';
// import React from 'react'
// const keyAPI = "AIzaSyDrrkl8oZ6kRZ_PyZ57IlT1gXMvSIg8xTw";

// const MyMap = withScriptjs(
//     withGoogleMap(props => (
//       <GoogleMap
//         defaultCenter={props.defaultCenter}
//         defaultZoom={props.defaultZoom}
//       >
//         {props.places.map((marker, index) => {
//           const position = {lat: marker.latitude, lng: marker.longitude};
//           return <Marker key={index} position={position}/>;
//         })}
//         <MapDirection places={props.places} travelMode={window.google.maps.TravelMode.DRIVING} />
//       </GoogleMap>
//     ))
//   );

// function Map (){

//     let places = [];
//     let defaultCenter= undefined;
//     const showPosition = (position) =>{
//         places.push({latitude:position.coords.latitude, longitude:position.coords.longitude});
//         defaultCenter = {lat:position.coords.latitude, lng:position.coords.longitude}
//     }
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
    
    
//     places.push({latitude:40.7469, longitude:-74.0258});
//   return (
//     <MyMap
//       googleMapURL={
//         'https://maps.googleapis.com/maps/api/js?key=' +
//         keyAPI +
//         '&v=3.exp&libraries=geometry,drawing,places'
//       }
//       places={places}
//       loadingElement={<div style={{height: `100%`}}/>}
//       containerElement={<div style={{height: "80vh"}}/>}
//       mapElement={<div style={{height: `100%`}}/>}
//       defaultCenter={defaultCenter || {lat: 25.798939, lng: -80.291409}}
//       defaultZoom={11}
//     />
//   );
// }

// export default Map;

//Using Mapbox API
import '../App.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState,useEffect, useRef } from 'react';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' // Updating node module will keep css up to date.

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

function Map(){
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [center,setCenter] = useState(null);
  
  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1Ijoid2VlYm95IiwiYSI6ImNrbWN3c3VoajAwdWkycW5wdzVudDVoaDYifQ.ztbmAWJiW4XybhyUQ5fDdA";
    //console.log(center);
    const initializeMap = ({ setMap, mapContainer }) => {
      //console.log(center);
      let showPosition = (position) =>{
        setCenter([position.coords.longitude, position.coords.latitude]);
        console.log(center);
      }
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(showPosition);
      }
      console.log(center);
      if(center){
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
          center: center,
          zoom: 12
        });
        const marker = new mapboxgl.Marker()
        .setLngLat(center)
        .addTo(map);
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving'
        });
        map.addControl(directions, 'top-left');
        directions.setOrigin([-74.0258,40.7469]);
        directions.setDestination(center);
        map.on("load", () => {
          setMap(map);
          map.resize();
        });
      }
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map,center]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
}

export default Map;