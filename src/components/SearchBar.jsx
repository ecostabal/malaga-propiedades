import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Selector from "./Selector";
import useHistoryState from 'use-history-state';

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [availableOperations, setAvailableOperations] = useState([]);
  const [tipoInmuebles, setTipoInmuebles] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [selectedOperation, setSelectedOperation] = useHistoryState({ Codigo: -1, Operacion: '' }, "operacion");
  const [selectedTipo, setSelectedTipo] = useHistoryState({ Codigo: "-1", Tipo: '' }, "tipo");
  const [selectedComuna, setSelectedComuna] = useHistoryState({ Codigo: -1, Comuna: '' }, "comuna");

  const handleOperationChange = (newOption) => {
    setSelectedOperation(newOption);
  };

  const handleTipoChange = (newOption) => {
    setSelectedTipo(newOption);
  };

  const handleComunaChange = (newOption) => {
    setSelectedComuna(newOption);
  };

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await fetch('/api/Operacion', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
            'Content-Type': 'application/json;charset=iso-8859-1',
          }
        })
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
            'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
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
            'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
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
  }, [location]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("handleSubmit triggered"); // Confirmar que se invoca esta función


    const selectedOperacion = selectedOperation.Codigo;
    const selectedTipoInmueble = selectedTipo.Codigo;
    const selectedComunaCodigo = selectedComuna.Codigo;
  
    console.log("Selected values:", selectedOperacion, selectedTipoInmueble, selectedComunaCodigo); // Verificar los valores seleccionados

    // Si deseas comprobar que no son valores por defecto, podrías hacerlo así:
    if (selectedOperacion !== 0 || selectedTipoInmueble !== "-1" || selectedComunaCodigo !== -1) {
      console.log("Attempting to navigate"); // Confirmar que entra a este bloque
      navigate(`/propiedades?operacion=${encodeURIComponent(selectedOperacion)}&tipo=${encodeURIComponent(selectedTipoInmueble)}&comuna=${encodeURIComponent(selectedComunaCodigo)}`, { replace: true });
    } else {
      console.log("Navigation conditions not met"); // Ver si no cumple las condiciones
    }
  };
  

  return (
    <form className="mt-8 gap-8 grid md:grid-cols-4 mb-12" onSubmit={handleSubmit}>
      <div className="col-span-1 w-full">
        <Selector 
          options={availableOperations} 
          selectedOption={selectedOperation} 
          setSelectedOption={handleOperationChange}  // Usar la función de cambio
          displayProperty="Operacion"
          label="Operación" 
          idKey="Codigo" 
          nameKey="Operacion"
          className="mx-auto"
        />
      </div>

      <div className="col-span-1 w-full">
        <Selector 
          options={tipoInmuebles} 
          selectedOption={selectedTipo} 
          setSelectedOption={handleTipoChange} 
          displayProperty="Tipo"
          label="Tipo" 
          idKey="Codigo" 
          nameKey="Inmueble"
          className="mx-auto"
        />
      </div>

      {comunas.length > 0 && (
        <div className="col-span-1 w-full">
          <Selector 
            options={comunas} 
            selectedOption={selectedComuna} 
            setSelectedOption={handleComunaChange}  // Usar la función de cambio
            displayProperty="Comuna"
            label="Comuna" 
            idKey="Codigo" 
            nameKey="Comuna"
            className="mx-auto"
          />
        </div>
    )}
    <button 
      name="nuevaBusqueda"
      type="submit" 
      onClick={() => console.log('Botón clickeado')}
      className="bg-gray-800 hover:bg-black text-white px-8 py-2 rounded-md text-sm mx-auto w-full mt-8"
    >
      Buscar Propiedades
    </button>

  </form>
  );
};

export default SearchBar;
