import React from 'react';
import PropertyList from '../components/PropertyList'; // Ajusta la ruta según tu estructura de carpetas
import SearchBar from '../components/SearchBar';



const Propiedades = () => {

  return (
    <div className="App">
      <SearchBar/>
      <PropertyList/>
    </div>
  );
};

export default Propiedades;
