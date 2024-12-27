import React from 'react';

export default function HeroImage() {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80"
          alt="Stylish fashion collection"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>
    </>
  );
}