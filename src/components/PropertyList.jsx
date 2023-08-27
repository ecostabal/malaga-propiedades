import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Waveform } from "@uiball/loaders";
import Pagination from './Pagination';
import SearchBar from "./SearchBar"
import { RoutePaths } from '../general/RoutePaths';



const PropertyList = () => {
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noResultsMessage, setNoResultsMessage] = useState(null); // Inicialmente sin mensaje
  const [searchParams, setSearchParams] = useState({
    operacion: 0,
    tipo: "-1",
    comuna: -1,
  });
  

  const handleSearch = (newCriteria) => {
    setNoResultsMessage(null); // Restablecer el mensaje de no resultados
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
        setProperties([]); // Limpiar los resultados anteriores antes de cargar nuevos datos

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
                  'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
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

            if (data) {
                if (data.responseCode !== undefined && data.responseCode !== 0) {
                    if (data.responseCode === -1) {
                        console.log(data.ErrorMensaje);
                        setNoResultsMessage(data.ErrorMensaje); 
                    } else {
                        throw new Error(data.ErrorMensaje || 'Respuesta no fue exitosa');
                    }
                } else if (Array.isArray(data.Lista)) {
                    if (data.Lista.length === 0) {
                        setNoResultsMessage("No se encontraron propiedades para los criterios seleccionados.");
                    } else {
                        setProperties(data.Lista);
                        setTotalResults(data.PropiedadesEncontradas || 0);
                    }
                } else {
                    throw new Error('La respuesta no es un array');
                }
            } else {
                throw new Error('Respuesta de la API es nula');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        } finally {
            setIsLoading(false);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-60">
            <Waveform size={40} color="#333" />
          </div>
        ) : noResultsMessage ? (
          <p className="text-center text-red-500 col-span-1 md:col-span-2 lg:col-span-3">{noResultsMessage}</p>
        ) : (
          properties.map(property => (
            <Link
            key={property.NroProp}
            to={`${RoutePaths.PROPERTY_DETAIL}/${property.NroProp}`} // Construye la URL para el detalle de propiedad
          >
            <PropertyCard property={property} />
          </Link>      ))
        )}
      </div>
      {!isLoading && (
        <Pagination totalResults={totalResults} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
    </div>
);

  
};

export default PropertyList;
