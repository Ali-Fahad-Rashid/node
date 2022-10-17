import { useHistory } from "react-router-dom";


import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "./data/skateboard-parks.json";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [selected, setSelected] = useState(false);


/*   useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []); */

  const history = useHistory();

  const handleClick = () => {

      history.push('/create');
    
  }


  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
    >
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park);
            setSelected(true);

            console.log('===================================================='+selectedPark);
          }}
          icon={{
            url: park.geometry.image,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selected ? (
        <InfoWindow 
          onCloseClick={() => {
           setSelected(false);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <button onClick={handleClick} >{selectedPark.properties.DESCRIPTIO}</button>
          </div>
        </InfoWindow>
      ): <div></div>}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAV5QfNBt-QBuEGBGyMBT1QPzLzEmlR1vk`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
