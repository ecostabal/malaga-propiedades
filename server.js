import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa el módulo cors


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configuración de opciones CORS
const corsOptions = {
  origin: 'http://localhost:5173/',
  methods: ['GET', 'POST'],  // <-- Añadiendo POST
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

    // Suponiendo que muestras 12 resultados por página
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



