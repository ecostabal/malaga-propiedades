import React from 'react';
import PropertyList from '../components/PropertyList'; // Ajusta la ruta según tu estructura de carpetas
import SearchBar from '../components/SearchBar';



const Propiedades = () => {

  return (
    <div className="App">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <SearchBar/>
      </div>
      <PropertyList/>
    </div>
  );
  
};

export default Propiedades;
