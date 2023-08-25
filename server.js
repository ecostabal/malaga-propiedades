import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors'; // Importa el módulo cors


dotenv.config();



const app = express();
app.use(express.json());



// Configuración de opciones CORS
const allowedOrigins = ['http://localhost:5173', 'https://malaga.pucho.dev', 'https://malaga-propiedades.vercel.app'];

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

app.post('/api/propiedades', async (req, res) => {
  try {
    const apiBaseUrl = process.env.BASE_URL;
    const filters = req.body;
    console.log('Endpoint reached with data:', filters);

    const body = {
    "operacion": Number(filters.operacion),
    "tipo": String(filters.tipo),
    "comuna": Number(filters.comuna),
    };

    const response = await axios.post(`${apiBaseUrl}/api/propiedades`, body, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json;charset=iso-8859-1',
      },
    });    

    console.log('Response from /api/propiedades:', response.data);

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

app.get('/api/Operacion', async (req, res) => {
  try {
      const apiBaseUrl = process.env.BASE_URL;

      const response = await axios.get(`${apiBaseUrl}/api/Operacion`, {
          headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
              'Content-Type': 'application/json;charset=iso-8859-1',
          },
      });

      console.log('Response from /api/Operacion:', response.data);

      if (response.data.responseCode !== 0) {
          throw new Error(response.data.ErrorMensaje);
      }

      res.json(response.data);
  } catch (error) {
      if (error.response && error.response.data) {
          console.error('Error from the API:', error.response.data);
      } else {
          console.error('Error fetching data:', error);
      }
      res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

app.get('/api/Categoria', async (req, res) => {
  try {
      const apiBaseUrl = process.env.BASE_URL;

      const response = await axios.get(`${apiBaseUrl}/api/Categoria`, {
          headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
              'Content-Type': 'application/json;charset=iso-8859-1',
          },
      });

      console.log('Response from /api/Categoria:', response.data);

      if (response.data.responseCode !== 0) {
          throw new Error(response.data.ErrorMensaje);
      }

      res.json(response.data);
  } catch (error) {
      if (error.response && error.response.data) {
          console.error('Error from the API:', error.response.data);
      } else {
          console.error('Error fetching data:', error);
      }
      res.status(500).json({ error: 'Error fetching data from the API' });
  }
});


app.get('/api/Comuna', async (req, res) => {
  try {
      const apiBaseUrl = process.env.BASE_URL;

      const response = await axios.get(`${apiBaseUrl}/api/Comuna`, {
          headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
              'Content-Type': 'application/json;charset=iso-8859-1',
          },
      });

      console.log('Response from /api/Comuna:', response.data);

      if (response.data.responseCode !== 0) {
          throw new Error(response.data.ErrorMensaje);
      }

      res.json(response.data);
  } catch (error) {
      if (error.response && error.response.data) {
          console.error('Error from the API:', error.response.data);
      } else {
          console.error('Error fetching data:', error);
      }
      res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

// Log detallado para depuración
app.use((err, req, res, next) => {
  console.error('Internal error:', err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
