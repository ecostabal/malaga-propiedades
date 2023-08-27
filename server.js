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

// Log detallado para depuración
app.use((err, req, res, next) => {
  console.error('Internal error:', err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
