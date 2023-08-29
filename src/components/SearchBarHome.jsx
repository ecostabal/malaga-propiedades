import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Selector from "./Selector"

const SearchBarHome = ({ onSearch }) => {
  const navigate = useNavigate();
  const [availableOperations, setAvailableOperations] = useState([]);
  const [tipoInmuebles, setTipoInmuebles] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState({ Codigo: 0, Operacion: '' });
  const [selectedTipo, setSelectedTipo] = useState({ Codigo: "-1", Tipo: '' });
  const [selectedComuna, setSelectedComuna] = useState({ Codigo: -1, Comuna: '' });
  
  const handleOperationChange = (newOption) => {
    console.log('Selected Operation:', newOption);
    setSelectedOperation(newOption);
  };

  const handleTipoChange = (newOption) => {
    console.log('Selected Tipo:', newOption);
    setSelectedTipo(newOption);
  };

  const handleComunaChange = (newOption) => {
    console.log('Selected Comuna:', newOption);
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
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("handleSubmit triggered");
  
    const selectedOperacion = selectedOperation.Codigo;
    const selectedTipoInmueble = selectedTipo.Codigo;
    const selectedComunaCodigo = selectedComuna.Codigo;
  
    console.log("Selected values:", selectedOperacion, selectedTipoInmueble, selectedComunaCodigo);
  
    let queryParams = [];
  
    if (selectedOperacion !== 0) {
      queryParams.push(`operacion=${encodeURIComponent(selectedOperacion)}`);
    }
  
    if (selectedTipoInmueble !== "-1") {
      queryParams.push(`tipo=${encodeURIComponent(selectedTipoInmueble)}`);
    }
  
    if (selectedComunaCodigo !== -1) {
      queryParams.push(`comuna=${encodeURIComponent(selectedComunaCodigo)}`);
    }
  
    let queryString = queryParams.join('&');
  
    console.log("Attempting to navigate with query:", queryString);
    
    navigate(`/propiedades?${queryString}`);
  };
  
  
  

  return (
    <form className="mt-6 gap-6 grid md:grid-cols-4 mb-8" onSubmit={handleSubmit}>
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
        <div className="col-span-1">
          <Selector 
            options={comunas} 
            selectedOption={selectedComuna} 
            setSelectedOption={handleComunaChange}
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
      className="bg-gray-800 hover:bg-black text-white px-8 py-4 rounded-md text-sm mx-auto w-full mt-8"
    >
      Buscar Propiedades
    </button>

  </form>
  );
};

export default SearchBarHome;
