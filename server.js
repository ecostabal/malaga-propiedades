import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

// Configurar CORS
const corsOptions = {
  origin: `http://localhost:${PORT}`, // Reemplaza con el origen correcto de tu aplicación React
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Registrar el origen de las solicitudes entrantes (para fines de depuración)
app.use((req, res, next) => {
  console.log('Request from:', req.get('origin'));
  next();
});

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

// Configuración del proxy inverso
app.use('/api', createProxyMiddleware({
  target: 'https://backoffice.urbx.io',
  changeOrigin: true,
  pathRewrite: {'^/api': ''},
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
