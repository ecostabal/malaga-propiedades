import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { Ping } from "@uiball/loaders";
import Pagination from './Pagination';
import SearchBar from "./SearchBar"

const PropertyList = () => {
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noResultsMessage, setNoResultsMessage] = useState(null); // Mueve esta línea aquí
  const [searchParams, setSearchParams] = useState({
    operacion: 0,
    tipo: "-1",
    comuna: -1,
  });
  

  const handleSearch = (newCriteria) => {
    setNoResultsMessage(null); // Añade esta línea
    setSearchParams({
      operacion: Number(newCriteria.operacion),
      tipo: String(newCriteria.tipo),
      comuna: Number(newCriteria.comuna),
    });
    setCurrentPage(1);
  };
  
  

  useEffect(() => {
    const fetchData = async (pageNum, searchParams) => {
      setIsLoading(true);

      const body = {
        "Operacion": searchParams.operacion,
        "Region": -1,
        "Tipo": searchParams.tipo,
        "Comuna": searchParams.comuna,
        "TipoMoneda": 1,
        "ValorDesde": 0,
        "ValorHasta": 0,
        "SupDesde": 0,
        "SupHasta": 0,
        "DormDesde": 0,
        "DormHasta": 0,
        "Condominio": -1,
        "Ordenamiento": "Reciente",
        "RegPag": 12,
        "NumPag": pageNum
      };

      try {
        const response = await fetch("/api/propiedades", {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer GVGKC7YNNRZTX7Q3HJ69LEJ6MWKWYVPTI6FE',
            'Content-Type': 'application/json;charset=iso-8859-1',
          },
          body: JSON.stringify(body),
        });
        
        const blobData = await response.blob();
        const textData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsText(blobData, 'ISO-8859-1');
        });
        const data = JSON.parse(textData);
        

        console.log(data) // este console log dice que no hay propiedades desde ofinet
        if (data) {
          if (data.responseCode !== undefined && data.responseCode !== 0) {
              if (data.responseCode === -1) {
                  // Aquí manejamos el caso específico
                  console.log(data.ErrorMensaje);
                  setProperties([]); // Limpiar la lista de propiedades
                  setNoResultsMessage(data.ErrorMensaje); // Establecer el mensaje de no resultados
              } else {
                  throw new Error(data.ErrorMensaje || 'Respuesta no fue exitosa');
              }
          } else if (Array.isArray(data.Lista)) {
              setProperties(data.Lista);
              setTotalResults(data.PropiedadesEncontradas || 0);
              
          } else {
              throw new Error('La respuesta no es un array');
          }
      } else {
          throw new Error('Respuesta de la API es nula');
      }
      
        
      
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error); // Aunque no lo usamos en el renderizado, es buena práctica tener un manejo de error
      } finally {
        setIsLoading(false); // Garantizamos que siempre se detenga el indicador de carga
      }
      
    };

    fetchData(currentPage, searchParams);
  }, [currentPage, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-24">
      <SearchBar onSearch={handleSearch} />
      
      {error && <p className="text-red-500 mt-4">{error.message}</p>}  {/* Aquí está el mensaje de error */}

      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Propiedades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-60">
            <Ping size={40} color="#333" />
          </div>
        ) : noResultsMessage ? (
          <p className="text-center text-red-500 col-span-1 md:col-span-2 lg:col-span-3">{noResultsMessage}</p>
        ) : (
          properties.map(property => (
            <PropertyCard key={property.NroProp} property={property} />
          ))
        )}
      </div>
      {!isLoading && (
        <Pagination totalResults={totalResults} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
    </div>
);

  
};

export default PropertyList;
