// // this works if you can afford 300 bucks per month
// import { DirectionsRenderer } from "react-google-maps";
// import React, { useState, useEffect } from 'react';
// function MapDirection(props) {
//     const [directions, setDirections] = useState(null);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       const { places, travelMode } = props;
//       console.log(places);
//       const waypoints = places.map(p => (
//         {
//         location: { lat: p.latitude, lng: p.longitude },
//         stopover: true
//       }));
//       console.log(waypoints);
//       const origin = waypoints.shift().location;
//       const destination = waypoints.pop().location;
//       console.log(origin, destination);
  
//       const directionsService = new window.google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: origin,
//           destination: destination,
//           travelMode: travelMode
//         },
//         (result, status) => {
//           console.log(result)
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirections(result);
//           } else {
//             setError(result);
//           }
//         }
//       );
//     });
  
//     if (error) {
//       return <h1>{error}</h1>;
//     }
//     return (
//       directions && (
//         <DirectionsRenderer directions={directions} />
//       )
//     );
// }
// export default MapDirection;

