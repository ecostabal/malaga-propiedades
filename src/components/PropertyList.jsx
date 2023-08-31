import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import Pagination from './Pagination';
import { Waveform } from '@uiball/loaders';
import { RoutePaths } from '../general/RoutePaths';

const PropertyList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [noResultsMessage, setNoResultsMessage] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState(getSearchParamsFromURL());

  // Favorites handlers
  const [favoriteCount, setFavoriteCount] = useState(0);
  const incrementFavorite = useCallback(() => {
    setFavoriteCount(prevCount => prevCount + 1);
  }, []);

  const decrementFavorite = useCallback(() => {
    setFavoriteCount(prevCount => prevCount - 1);
  }, []);

  // Esta función ha sido movida dentro del componente
  const processData = (data) => {
    if (!data) throw new Error('Respuesta de la API es nula');

    if (data.responseCode !== undefined && data.responseCode !== 0) {
        if (data.responseCode === -1) {
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
  };

  function getSearchParamsFromURL() {
    const queryParams = new URLSearchParams(location.search);
    return {
      operacion: Number(queryParams.get('operacion') || 0),
      tipo: String(queryParams.get('tipo') || '-1'),
      comuna: Number(queryParams.get('comuna') || -1),
    };
  }

  // Fetch Data and Helpers
  
  const fetchData = useCallback(async (pageNum, searchParams) => {
    setIsLoading(true);
    setNoResultsMessage(null);
    setProperties([]);

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
      processData(data);
  } catch (error) {
      console.error('Error fetching or processing data:', error);
      setError(error);
  } finally {
      setIsLoading(false);
  }
}, [setIsLoading, setNoResultsMessage, setProperties, setError, processData]);

  // Effects
  useEffect(() => {
    setSearchParams(getSearchParamsFromURL());
  }, [location.search]);

  useEffect(() => {
    fetchData(currentPage, searchParams);
  }, [currentPage, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-24">
      {error && <p className="text-red-500 mt-4">{error.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-60">
            <Waveform size={40} color="#333" />
          </div>
        ) : noResultsMessage ? (
          <p className="text-center text-red-500 col-span-1 md:col-span-2 lg:col-span-3">{noResultsMessage}</p>
        ) : (
          properties.map(property => (
            <Link key={property.NroProp} to={`${RoutePaths.PROPERTY_DETAIL}/${property.NroProp}`}>
              <PropertyCard 
                property={property} 
                onIncrement={incrementFavorite} 
                onDecrement={decrementFavorite}
              />
            </Link>
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
