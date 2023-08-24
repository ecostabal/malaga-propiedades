import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa el módulo cors


dotenv.config();



const app = express();


// Configuración de opciones CORS
const allowedOrigins = ['http://localhost:5173/', 'https://malaga.pucho.dev/'];

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

// Log detallado para depuración
app.use((err, req, res, next) => {
  console.error('Internal error:', err.stack);
  res.status(500).send('Internal Server Error');
});

app.post('/api/propiedades', async (req, res) => {
  try {
    const apiBaseUrl = process.env.BASE_URL;
    const filters = req.body;
    console.log('Endpoint reached with data:', filters);

    const response = await axios.post(`${apiBaseUrl}/api/propiedades`, filters, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.data.responseCode !== 0) {
      throw new Error(response.data.ErrorMensaje);
    }

    const totalResults = Array.isArray(response.data.Lista) ? response.data.Lista.length : 0;

    const totalPages = Math.ceil(totalResults / 12);

    res.json({
      ...response.data,
      totalResults: totalResults,
      totalPages: totalPages
   });
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error from the API:', error.response.data);
    } else {
      console.error('Error fetching data:', error);
    }
    res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

console.log("Data returned from the API:", response.data);



