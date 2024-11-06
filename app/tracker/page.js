"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import Tracker from '@/components/Tracker';

const MapComponent = dynamic(() => import('../../components/MapComponent'), {
  ssr: false,
});

const TrackerPage = () => {
  return (
    <div className="w-full h-screen">
      <Tracker />
    </div>
  );
};

export default TrackerPage;