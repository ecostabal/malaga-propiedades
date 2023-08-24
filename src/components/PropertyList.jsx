import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { Ping } from "@uiball/loaders";
import Pagination from './Pagination';

const PropertyList = () => {
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchData = async (pageNum) => {
      try {
        const response = await fetch("/api/propiedades", {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer GVGKC7YNNRZTX7Q3HJ69LEJ6MWKWYVPTI6FE',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "Operacion": 1,
            "Region": -1,
            "Tipo": "-1",
            "Comuna": -1,
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
          })
        });

        if (!response.ok) {
          console.error('Response Headers:', response.headers);
          console.error('Response Status:', response.status);
          console.error('Response Status Text:', response.statusText);
          const responseBody = await response.text();
          console.error('Response Body:', responseBody);
          throw new Error('Respuesta no fue exitosa');
        }

        const data = await response.json();

        if (data && data.responseCode !== 0) {
          throw new Error(data.ErrorMensaje);
        } else if (Array.isArray(data.Lista)) {
          setProperties(data.Lista);

          // Asumo que la propiedad que almacena el total de resultados se llama "PropiedadesEncontradas"
          setTotalResults(data.PropiedadesEncontradas);
          
          // Cálculo de las páginas totales
          const pageSize = 12; // Suponiendo que esto es constante
          const calculatedTotalPages = Math.ceil(data.PropiedadesEncontradas / pageSize);
          setTotalPages(calculatedTotalPages);

        } else {
          throw new Error('La respuesta no es un array');
        }

        setIsLoading(false);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData(currentPage); // Aquí llamamos a la función con el argumento currentPage
  }, [currentPage]); // Y aquí ajustamos la dependencia del useEffect a currentPage

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  return (
    <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mt-8 mb-4">Listado de Propiedades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-60">
            <Ping size={40} color="#333" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 col-span-1 md:col-span-2 lg:col-span-3">Ha ocurrido un error: {error.message}</p>
        ) : (
          properties.map(property => (
            <PropertyCard key={property.NroProp} property={property} />
          ))
        )}
      </div>
      {!isLoading && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalResults={totalResults} totalPages={totalPages}/>}
    </div>
);
};

export default PropertyList;
