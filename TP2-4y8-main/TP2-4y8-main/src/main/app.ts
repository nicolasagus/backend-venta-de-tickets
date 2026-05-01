import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Ruta corregida:
import { getTickets, savePurchase } from '../controllers/ticketController.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- RUTAS DE LA API ---
app.get('/api/tickets', getTickets);      // Para el Paso 1
app.post('/api/purchase', savePurchase);  // Para el Paso 2

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});