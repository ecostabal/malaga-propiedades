import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

const __dirname = fileURLToPath(new URL('.', import.meta.url));

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

// Servir archivos estáticos
app.use(express.static('dist'));

// Manejo de rutas fallback
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Internal error:', err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
