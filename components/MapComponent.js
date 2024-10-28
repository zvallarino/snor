'use client';

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import LeftBox from './LeftBox';
import RightBox from './RightBox';

const MapComponent = () => {
  const center = {
    lat: 39.8283,
    lng: -98.5795,
  };

  const zoom = 5;

  const mapStyles = [
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#00BFFF' }],
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#FF4500' }, { weight: 1.5 }],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry.fill',
      stylers: [{ color: '#F5F5DC' }],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
  ];

  const options = {
    styles: mapStyles,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: true,
    fullscreenControl: false,
  };

  return (
    <div className="relative w-full h-screen">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={center}
          zoom={zoom}
          options={options}
        ></GoogleMap>
      </LoadScript>
      {/* Left and Right Boxes */}
      <LeftBox />
      <RightBox />
    </div>
  );
};

export default React.memo(MapComponent);
