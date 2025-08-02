'use client';

import React from 'react';

export default function GhibliCtaButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-medium"
    >
      Try Studio Ghibli Style Converter Now
    </button>
  );
} 