import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [operacion, setOperacion] = useState(1);
  const [tipo, setTipo] = useState('-1');
  const [comuna, setComuna] = useState(-1);
  const [comunas, setComunas] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ operacion, tipo, comuna });
  };

  return (
    <form className="mt-8 flex gap-12 mb-12 w-full" onSubmit={handleSubmit}>
      <select 
          value={operacion} 
          onChange={(e) => setOperacion(Number(e.target.value))}
          className="py-4 border-b border-gray-300 bg-white text-gray-700 flex-grow text-sm"
      >
          <option value={0}>Seleccione operación</option>
          <option value={1}>Venta</option>
          <option value={2}>Arriendo</option>
          {/* ... */}
      </select>
      <select 
          value={tipo} 
          onChange={(e) => setTipo(e.target.value)}
          className="py-4 border-b border-gray-300 bg-white text-gray-700 flex-grow text-sm"
      >
          <option value="-1">Todos los tipos</option>
          <option value="DE">Departamento</option>
          <option value="CA">Casa</option>
          {/* ... */}
      </select>
      {comunas.length > 0 && (
      <select 
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
