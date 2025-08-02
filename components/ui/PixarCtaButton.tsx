'use client';

import React from 'react';

export default function PixarCtaButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-medium"
    >
      Try Pixar Style Converter Now
    </button>
  );
} 