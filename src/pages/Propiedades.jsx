import React from 'react';
import PropertyList from '../components/PropertyList'; // Ajusta la ruta según tu estructura de carpetas
import SearchBar from '../components/SearchBar';



const Propiedades = () => {

  return (
    <div className="App">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
        <SearchBar/>
      </div>
      <div className="px-4">
        <PropertyList/>
      </div>
    </div>
  );
  
};

export default Propiedades;
