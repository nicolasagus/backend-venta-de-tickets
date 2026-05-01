import { Request, Response } from 'express';
import { CompraBuilder } from '../models/CompraBuilder.js';
import { ProcesadorDePagos } from '../services/pagos/ProcesadorDePagos.js';
import { MercadoPagoAdapter } from '../services/pagos/MercadoPagoAdapter.js';
import { ProcesarCompraCommand } from '../services/commands/ProcesarCompraCommand.js';
import { GestorDeTransacciones } from '../services/commands/GestorDeTransacciones.js';

// Instanciamos el gerente que manejará los comandos
const gestor = new GestorDeTransacciones();

export const realizarCompra = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Recibimos los datos que manda el usuario desde el Frontend (o Postman)
        const { nombreApellido, email, idJuego, precioFinal } = req.body;

        // 2. PATRÓN BUILDER: Armamos el objeto Compra paso a paso
        const nuevaCompra = new CompraBuilder()
            .conNombreYApellido(nombreApellido)
            .conEmail(email)
            .paraElJuego(idJuego)
            .porUnPrecioDe(precioFinal)
            .build();

        // 3. PATRÓN STRATEGY + ADAPTER: Preparamos a Mercado Pago
        const procesadorPagos = new ProcesadorDePagos(new MercadoPagoAdapter());

        // 4. PATRÓN COMMAND: Encapsulamos toda la orden
        const comandoCompra = new ProcesarCompraCommand(nuevaCompra, procesadorPagos);

        // 5. ¡Ejecutamos!
        const exito = await gestor.ejecutarOperacion(comandoCompra);

        if (exito) {
            // Respondemos al frontend que todo salió bien
            res.status(201).json({ 
                mensaje: "¡Compra exitosa!", 
                compra: nuevaCompra 
            });
        } else {
            res.status(400).json({ error: "El pago fue rechazado." });
        }

    } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json({ error: "Faltan datos obligatorios o hubo un error en el servidor." });
    }
};