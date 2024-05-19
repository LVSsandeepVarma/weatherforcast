import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({coords}) => {
    console.log(coords)
  const [center, setCenter] = useState([51.505, -0.09]); // London coordinates (example)
  const [zoom, setZoom] = useState(13);

useEffect(()=>{
    setCenter([coords?.lat, coords?.lon])
},[coords])



  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '400px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/3/0/7.png"
      />
      <LayersControl position="topright">
      <LayersControl.BaseLayer name="Temperature">
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=99851da71194301dce52552c49f9b3f6`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
          
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Precipitation">
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=99851da71194301dce52552c49f9b3f6`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Wind">
          <TileLayer
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=99851da71194301dce52552c49f9b3f6`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Clear Map" checked="Clear Map">
          <TileLayer
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          />
          </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
