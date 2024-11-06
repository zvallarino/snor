'use client';

import React, { useMemo } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from '@react-google-maps/api';
import LeftBox from './LeftBox';
import RightBox from './RightBox';
import data from '../us_health_data.json'; // Importing us_health_data.json

const MapComponent = () => {
  const mapRef = React.useRef(null);
  const [currentZoom, setCurrentZoom] = React.useState(5);
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
  

  // Data Processing
  const monthToNumber = (month) => {
    return new Date(`${month} 1, 2020`).getMonth() + 1;
  };

  const getLatestDate = (data) => {
    let latestYear = -Infinity;
    let latestMonth = -Infinity;

    data.forEach((entry) => {
      const { month, year } = entry;
      if (year > latestYear) {
        latestYear = year;
        latestMonth = monthToNumber(month);
      } else if (year === latestYear) {
        const currentMonth = monthToNumber(month);
        if (currentMonth > latestMonth) {
          latestMonth = currentMonth;
        }
      }
    });

    const latestMonthName = new Date(
      2020,
      latestMonth - 1,
      1
    ).toLocaleString('default', { month: 'long' });

    return { month: latestMonthName, year: latestYear };
  };

  const latestDate = useMemo(() => getLatestDate(data), [data]);

  // Filter data for the latest month and year
  const latestData = useMemo(
    () =>
      data.filter(
        (entry) =>
          entry.month === latestDate.month && entry.year === latestDate.year
      ),
    [data, latestDate]
  );

  // State for managing InfoWindow
  const [selectedEntry, setSelectedEntry] = React.useState(null);

  return (
    <div className="relative w-full h-screen">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          ref={mapRef}
          mapContainerClassName="w-full h-full"
          center={center}
          zoom={zoom}
          options={options}
          onZoomChanged={() => {
            const zoomLevel = mapRef.current?.getZoom();
            setCurrentZoom(zoomLevel);
            console.log('Current Zoom Level:', zoomLevel);
          }}
        >
          {/* Use MarkerClustererF to cluster markers */}
          <MarkerClusterer
            options={{
              gridSize: 80,
              maxZoom: 12,
              styles: [
                {
                  url: '/yellow.png',
                  height: 20,
                  width: 20,
                  textColor: '#ffffff',
                  textSize: 14,
                },
                {
                  url: '/p.png',
                  height: 50,
                  width: 50,
                  textColor: '#ffffff',
                  textSize: 16,
                },
                {
                  url: '/reddot-hi.png',
                  height: 60,
                  width: 60,
                  textColor: '#ffffff',
                  textSize: 18,
                },
              ],
            }}
          >
            {(clusterer) =>
              latestData.map((entry, index) => (
                <Marker
                  key={index}
                  position={{ lat: entry.lat, lng: entry.long }}
                  clusterer={clusterer}
                  onClick={() => setSelectedEntry(entry)}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: Math.log(entry.count) * 5, // Adjust marker size based on count
                    fillColor: '#FF0000',
                    fillOpacity: 0.6,
                    strokeWeight: 0.4,
                  }}
                />
              ))
            }
          </MarkerClusterer>

          {/* InfoWindow */}
          {selectedEntry && (
            <InfoWindow
              position={{ lat: selectedEntry.lat, lng: selectedEntry.long }}
              onCloseClick={() => setSelectedEntry(null)}
            >
              <div>
                <h2 className="font-bold">{selectedEntry.state}</h2>
                <p>Disease: {selectedEntry.disease}</p>
                <p>Cases: {selectedEntry.count}</p>
                <p>
                  <em>
                    {selectedEntry.month} {selectedEntry.year}
                  </em>
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      {/* Left and Right Boxes */}
      <LeftBox />
      <RightBox />
    </div>
  );
};

export default React.memo(MapComponent);
