import express from 'express';
// Ajustá la ruta del import si tu controlador se llama distinto o está en otra carpeta
import { realizarCompra, listarProductos } from './controllers/ticketController.js';

const app = express();

// Middleware fundamental para que Express entienda los datos en formato JSON que le mandamos
app.use(express.json());

// --- RUTAS DE NUESTRA API ---
// Listar todos los productos/juegos disponibles
app.get('/api/productos', listarProductos);

// Cuando alguien haga un POST a "http://localhost:3000/api/comprar", se ejecuta tu Controlador
app.post('/api/comprar', realizarCompra);

// --- ARRANQUE DEL SERVIDOR ---
// Leemos el puerto desde tu archivo .env, o usamos el 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo a toda velocidad en http://localhost:${PORT}`);
    console.log(`📚 GET http://localhost:${PORT}/api/productos - Listar juegos disponibles`);
    console.log(`🛒 POST http://localhost:${PORT}/api/comprar - Realizar compra`);
});