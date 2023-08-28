import React, { useState } from 'react';
import { ArrowLongRightIcon, ArrowLongLeftIcon } from '@heroicons/react/24/outline';

const Slider = ({ images = [] }) => { // Añadimos un valor por defecto por si no se pasa la prop images
  const [current, setCurrent] = useState(0);

  const goPrev = () => setCurrent((oldCurrent) => (oldCurrent === 0 ? images.length - 1 : oldCurrent - 1));
  const goNext = () => setCurrent((oldCurrent) => (oldCurrent === images.length - 1 ? 0 : oldCurrent + 1));

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative h-80 overflow-hidden rounded-md shadow-xl">
      {images.map((img, index) => (
        <img
          key={img}
          src={img}
          alt={`Slide ${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${current === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <button onClick={goPrev} className="bg-white/80 backdrop-blur-sm rounded-full p-4 absolute top-1/2 left-8 transform -translate-y-1/2 z-10">
        <ArrowLongLeftIcon className="h-4 w-4 text-gray-800" />
      </button>
      <button onClick={goNext} className="bg-white/80 backdrop-blur-sm rounded-full p-4 absolute top-1/2 right-8 transform -translate-y-1/2 z-10">
        <ArrowLongRightIcon className="h-4 w-4 text-gray-800" />
      </button>
    </div>
  );
};

export default Slider;
