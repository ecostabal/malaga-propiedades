import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Selector from "./Selector";

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [availableOperations, setAvailableOperations] = useState([]);
  const [tipoInmuebles, setTipoInmuebles] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState({ Codigo: -1, Operacion: '' });
  const [selectedTipo, setSelectedTipo] = useState({ Codigo: "-1", Tipo: '' });
  const [selectedComuna, setSelectedComuna] = useState({ Codigo: -1, Comuna: '' });  

  useEffect(() => {
    setValuesFromURL();
  }, [location.search, availableOperations, tipoInmuebles, comunas]);

  useEffect(() => {
    fetchOperations();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchComunas();
  }, [location]);

  const setValuesFromURL = () => {
    const params = new URLSearchParams(location.search);
    setSelectedOperation(findMatchingValue(availableOperations, params.get("operacion"), { Codigo: -1, Operacion: '' }));
    setSelectedTipo(findMatchingValue(tipoInmuebles, params.get("tipo"), { Codigo: "-1", Tipo: '' }));
    setSelectedComuna(findMatchingValue(comunas, params.get("comuna"), { Codigo: -1, Comuna: '' }));
  };

  const findMatchingValue = (array, code, defaultValue) => {
    return array.find(item => item.Codigo == code) || defaultValue;
  };

  const fetchOperations = async () => {
    const data = await fetchData('/api/Operacion');
    if (data && data.responseCode === 0 && data.Operaciones) {
      setAvailableOperations(data.Operaciones);
    }
  };

  const fetchCategories = async () => {
    const data = await fetchData('/api/Categoria');
    if (data && data.responseCode === 0 && data.TipoInmuebles) {
      setTipoInmuebles(data.TipoInmuebles);
    }
  };

  const fetchComunas = async () => {
    const data = await fetchData('/api/Comuna', true);
    if (data && data.Comunas) {
      setComunas(data.Comunas);
    } else {
      setComunas([]);
    }
  };

  const fetchData = async (endpoint, isBlob = false) => {
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
          'Content-Type': 'application/json;charset=iso-8859-1',
        }
      });
      
      if (isBlob) {
        const blobData = await response.blob();
        const textData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsText(blobData, 'ISO-8859-1');
        });
        return JSON.parse(textData);
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error(`Error fetching data from ${endpoint} :`, error);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateToProperties();
  };

  const navigateToProperties = () => {
    const selectedOperacion = selectedOperation.Codigo;
    const selectedTipoInmueble = selectedTipo.Codigo;
    const selectedComunaCodigo = selectedComuna.Codigo;

    if (selectedOperacion !== 0 || selectedTipoInmueble !== "-1" || selectedComunaCodigo !== -1) {
      navigate(`/propiedades?operacion=${encodeURIComponent(selectedOperacion)}&tipo=${encodeURIComponent(selectedTipoInmueble)}&comuna=${encodeURIComponent(selectedComunaCodigo)}`, { replace: true });
    }
  };

  return (
    <form className="mt-8 gap-8 grid md:grid-cols-4 mb-12" onSubmit={handleSubmit}>
      <SelectorComponent options={availableOperations} selectedOption={selectedOperation} setSelectedOption={setSelectedOperation} displayProperty="Operacion" label="Operación" idKey="Codigo" nameKey="Operacion" />
      <SelectorComponent options={tipoInmuebles} selectedOption={selectedTipo} setSelectedOption={setSelectedTipo} displayProperty="Tipo" label="Tipo" idKey="Codigo" nameKey="Inmueble" />

      {comunas.length > 0 && (
        <SelectorComponent options={comunas} selectedOption={selectedComuna} setSelectedOption={setSelectedComuna} displayProperty="Comuna" label="Comuna" idKey="Codigo" nameKey="Comuna" />
      )}

      <button name="nuevaBusqueda" type="submit" className="bg-gray-800 hover:bg-black text-white px-8 py-4 rounded-md text-sm mx-auto w-full mt-8">
        Buscar Propiedades
      </button>
    </form>
  );
};

const SelectorComponent = ({ options, selectedOption, setSelectedOption, displayProperty, label, idKey, nameKey }) => (
  <div className="col-span-1 w-full">
    <Selector 
      options={options} 
      selectedOption={selectedOption} 
      setSelectedOption={(newOption) => setSelectedOption(newOption)}
      displayProperty={displayProperty}
      label={label} 
      idKey={idKey} 
      nameKey={nameKey}
      className="mx-auto"
    />
  </div>
);

export default SearchBar;
