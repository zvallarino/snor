"use client"

import React from 'react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../../components/MapComponent'), {
  ssr: false,
});

const MapPage = () => {
  return (
    <div className="w-full h-screen">
      <MapComponent />
    </div>
  );
};

export default MapPage;