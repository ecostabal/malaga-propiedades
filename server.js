import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(express.json());

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Registrar el origen de las solicitudes entrantes (para fines de depuración)
app.use((req, res, next) => {
  console.log('Request from:', req.get('origin'));
  next();
});

// Configuración de opciones CORS
const allowedOrigins = ['http://backoffice.urbx.io http://localhost:5173', 'https://malaga.pucho.dev', 'https://malaga-propiedades.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST'],
  credentials: false,
  optionsSuccessStatus: 204
};

// Usa el middleware CORS con las opciones especificadas
app.use(cors(corsOptions));

// Establece el tipo MIME correcto para los scripts .js
app.get('/assets/*.js', (req, res, next) => {
  res.type('application/javascript');
  next();
});

// Servir archivos estáticos
app.use(express.static('dist'));

// Manejo de rutas fallback
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  if (err instanceof cors.CorsError) {
    console.error('CORS error:', err);
    res.status(400).send('CORS Error');
    return;
  }
  console.error('Internal error:', err.stack);
  res.status(500).send('Internal Server Error');
});

// Rutas para las APIs
app.post('/api/propiedades', async (req, res) => {
  try {
    const response = await fetch(`${process.env.VITE_REACT_APP_BASE_URL}/api/propiedades`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
        'Content-Type': 'application/json;charset=iso-8859-1',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    res.status(500).send('Error fetching from backend');
  }
});

app.get('/api/Operacion', async (req, res) => {
  try {
    const response = await fetch(`${process.env.VITE_REACT_APP_BASE_URL}/api/Operacion`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
        'Content-Type': 'application/json;charset=iso-8859-1',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    res.status(500).send('Error fetching from backend');
  }
});

app.get('/api/Categoria', async (req, res) => {
  try {
    const response = await fetch(`${process.env.VITE_REACT_APP_BASE_URL}/api/Categoria`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
        'Content-Type': 'application/json;charset=iso-8859-1',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    res.status(500).send('Error fetching from backend');
  }
});

app.get('/api/Comuna', async (req, res) => {
  try {
    const response = await fetch(`${process.env.VITE_REACT_APP_BASE_URL}/api/Comuna`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`,
        'Content-Type': 'application/json;charset=iso-8859-1',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    res.status(500).send('Error fetching from backend');
  }
});



const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
