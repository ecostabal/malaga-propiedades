import React, { useState, useEffect } from 'react';
import '../css/searchBar.css';

const SearchBar = ({ onSearch }) => {
  const [operacion, setOperacion] = useState(1);
  const [tipo, setTipo] = useState('-1');
  const [region, setRegion] = useState('-1');
  const [comuna, setComuna] = useState('');
  const [comunas, setComunas] = useState([]);

  const fetchComunasByRegion = async (regionId) => {
    try {
      const response = await fetch(`/api/comunas/${regionId}`); // Asumo que tienes una ruta así, ajusta según tu backend.
      if (!response.ok) {
        throw new Error('Error al obtener las comunas.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching comunas:', error);
      return []; // En caso de error, regresa un array vacío.
    }
  };

  useEffect(() => {
    let isMounted = true; // Para verificar si el componente todavía está montado cuando resuelve la promesa.

    if (region !== '-1') {
      fetchComunasByRegion(region).then(data => {
        if (isMounted) {
          setComunas(data);
        }
      });
    } else {
      setComunas([]);
      setComuna(''); // Resetear la comuna cuando no hay región seleccionada
    }

    return () => {
      isMounted = false; // Limpiar el efecto si el componente se desmonta.
    };
  }, [region]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit triggered'); // Add this
    onSearch({ operacion, tipo, region, comuna });
  };

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <select value={operacion} onChange={(e) => setOperacion(Number(e.target.value))}>
        <option value={1}>Venta</option>
        <option value={2}>Arriendo</option>
        {/* ... */}
      </select>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="-1">Todos los tipos</option>
        <option value="DE">Departamento</option>
        <option value="CA">Casa</option>
        {/* ... */}
      </select>
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="-1">Todas las regiones</option>
        <option value="1">Región Metropolitana</option>
        <option value="2">Región de Valparaíso</option>
        {/* ... */}
      </select>
      {comunas.length > 0 && (
        <select value={comuna} onChange={(e) => setComuna(e.target.value)}>
          <option value="">Selecciona una comuna</option>
          {comunas.map((c, index) => <option key={index} value={c}>{c}</option>)}
        </select>
      )}
      <button type="submit" onClick={() => console.log('Botón clickeado')}>Buscar Propiedades</button>
    </form>
);

};

export default SearchBar;
