"use client"

import React from 'react';
import dynamic from 'next/dynamic';

const MainGraphComponent = dynamic(() => import('../../components/MainGraphComponent.jsx'), {
  ssr: false,
});

const MapPage = () => {
  return (
    <div className="flex w-screen h-screen">
      <MainGraphComponent />
    </div>
  );
};

export default MapPage;