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
import data from '../us_hd.json'; // Importing us_health_data.json

const MapComponent = () => {
  const mapRef = React.useRef(null);
  const [currentZoom, setCurrentZoom] = React.useState(5);
    const [hoveredEntry, setHoveredEntry] = React.useState(null);

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

  // Map Load Handler
  const onLoad = React.useCallback((mapInstance) => {
    mapRef.current = mapInstance;
  }, []);

  // Zoom Changed Handler
  const onZoomChanged = React.useCallback(() => {
    if (mapRef.current) {
      const zoomLevel = mapRef.current.getZoom();
      setCurrentZoom(zoomLevel);
      console.log('Current Zoom Level:', zoomLevel);
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          onLoad={(mapInstance) => (mapRef.current = mapInstance)}
          onZoomChanged={() => {
            if (mapRef.current) {
              const zoomLevel = mapRef.current.getZoom();
              setCurrentZoom(zoomLevel);
              console.log('Current Zoom Level:', zoomLevel);
            }
          }}
          mapContainerClassName="w-full h-full"
          center={center}
          zoom={zoom}
          options={options}
        >
          <MarkerClusterer
            options={{
              gridSize: 80,
              maxZoom: 12,
              minimumClusterSize: 5,

              calculator: function (markers, numStyles) {
                let index = 0;
                const count = markers.length;

                if (count < 16) {
                  index = 0; // Small cluster
                } else if (count >= 16 && count < 40) {
                  index = 1; // Medium cluster
                } else {
                  index = 2; // Large cluster
                }

                return {
                  text: count.toString(),
                  index: index + 1,
                  title: 'Cluster of ' + count + ' markers',
                };
              },
              styles: [
                {
                  url: '/yellow.png',
                  height: 40,
                  width: 40,
                  textColor: '#ffffff',
                  textSize: 14,
                },
                {
                  url: '/blue.png',
                  height: 60,
                  width: 60,
                  textColor: '#ffffff',
                  textSize: 16,
                },
                {
                  url: '/high.png',
                  height: 70,
                  width: 70,
                  textColor: '#ffffff',
                  textSize: 18,
                },
              ],
            }}
          >
     {(clusterer) =>
              window.google &&
              latestData.map((entry, index) => (
                <Marker
                  key={index}
                  position={{ lat: entry.lat, lng: entry.long }}
                  clusterer={clusterer}
                  onClick={() => setSelectedEntry(entry)}
                  onMouseOver={() => setHoveredEntry(entry)}
                  onMouseOut={() => setHoveredEntry(null)}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: Math.max(3, Math.log(entry.count) * 3), // Adjusted scale
                    fillColor: '#FF0000',
                    fillOpacity: 0.6,
                    strokeWeight: 0.4,
                  }}
                />
              ))
            }
          </MarkerClusterer>

          {/* InfoWindow for Clicked Marker */}
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

          {/* InfoWindow for Hovered Marker */}
          {hoveredEntry && (
            <InfoWindow
              position={{ lat: hoveredEntry.lat, lng: hoveredEntry.long }}
              options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
              onCloseClick={() => setHoveredEntry(null)}
              className='text-black'
            >
              <div>
                <h2 className="font-bold text-black">{hoveredEntry.state}</h2>
                <p       className='text-black'>Disease: {hoveredEntry.disease}</p>
                <p  className='text-black'>Cases: {hoveredEntry.count}</p>
                <p>
                  <em  className='text-black' >
                    {hoveredEntry.month} {hoveredEntry.year}
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