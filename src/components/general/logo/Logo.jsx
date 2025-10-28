import React from 'react';

function Logo() {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      <img src="/images/logo.webp" alt="" className="max-w-10" />
      <span className="text-2xl font-bold text-gray-900 md:text-3xl">MedTrack</span>
    </div>
  );
}

export default Logo;
