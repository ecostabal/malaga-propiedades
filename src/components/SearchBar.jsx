import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [availableOperations, setAvailableOperations] = useState([]);
  const [operacion, setOperacion] = useState();
  const [tipoInmuebles, setTipoInmuebles] = useState([]);
  const [tipo, setTipo] = useState('');
  const [comuna, setComuna] = useState(-1);
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await fetch('/api/Operacion', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer GVGKC7YNNRZTX7Q3HJ69LEJ6MWKWYVPTI6FE',
            'Content-Type': 'application/json;charset=iso-8859-1',
          }
        });1
        const data = await response.json();
        if (data && data.responseCode === 0 && data.Operaciones) {
          setAvailableOperations(data.Operaciones);
        }
      } catch (error) {
        console.error('Error fetching operations:', error);
      }
    };

    fetchOperations();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/Categoria', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer GVGKC7YNNRZTX7Q3HJ69LEJ6MWKWYVPTI6FE',
            'Content-Type': 'application/json;charset=iso-8859-1',
          }
        });
        const data = await response.json();
        if (data && data.responseCode === 0 && data.TipoInmuebles) {
          setTipoInmuebles(data.TipoInmuebles);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchComunas = async () => {
      try {
        const response = await fetch('/api/Comuna', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer GVGKC7YNNRZTX7Q3HJ69LEJ6MWKWYVPTI6FE',
            'Content-Type': 'application/json;charset=iso-8859-1',
          }
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

        if (!data || !data.Comunas) {
          throw new Error('Error al obtener las comunas.');
        }

        setComunas(data.Comunas);
      } catch (error) {
        console.error('Error fetching comunas:', error);
        setComunas([]);
      }
    };

    fetchComunas();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'tipoInmueble') {
      setTipo(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ operacion, tipo, comuna });
  };

  return (
    <form className="mt-8 flex gap-12 mb-12 w-full" onSubmit={handleSubmit}>
      <select 
          name="operacionInmueble"
          value={operacion} 
          onChange={(e) => setOperacion(Number(e.target.value))}
          className="py-4 border-b border-gray-300 bg-white text-gray-700 flex-grow text-sm"
      >
          <option value={0}>Seleccione operación</option>
          {availableOperations.map(op => (
              <option key={op.Codigo} value={op.Codigo}>{op.Operacion}</option>
          ))}
      </select>

      <select 
          name="tipoInmueble" 
          value={tipo} 
          onChange={handleInputChange}
          className="py-4 border-b border-gray-300 bg-white text-gray-700 flex-grow text-sm"
      >
        <option value="">Seleccione Tipo</option>
        {tipoInmuebles.map(tipo => (
          <option key={tipo.Codigo} value={tipo.Codigo}>{tipo.Inmueble}</option>
        ))}
      </select>

      {comunas.length > 0 && (
        <select 
          name="comunaInmueble"
          value={comuna} 
          onChange={(e) => setComuna(e.target.value)}
          className='py-4 border-b border-gray-300 bg-white text-gray-700 flex-grow text-sm'
        >
          <option value="">Selecciona una comuna</option>
          {comunas.map(comuna => 
            <option key={comuna.Codigo} value={comuna.Codigo}>{comuna.Comuna}</option>
          )}
        </select>
      )}

      <button 
          name="nuevaBusqueda"
          type="submit" 
          onClick={() => console.log('Botón clickeado')}
          className="bg-gray-800 text-white px-8 py-2 rounded-md flex-shrink-0 text-sm"
      >
          Buscar Propiedades
      </button>
    </form>
  );
};

export default SearchBar;
