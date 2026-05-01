// En src/main/controllers/ticketController.ts
import { Request, Response } from 'express';
import { TicketBuilder } from '../models/TicketBuilder.js';
import { ProcesadorDePagos } from '../services/pagos/ProcesadorDePagos.js';
import { MercadoPagoAdapter } from '../services/pagos/MercadoPagoAdapter.js';
import { ProcesarCompraCommand } from '../services/commands/ProcesarCompraCommand.js';
import { GestorDeTransacciones } from '../services/commands/GestorDeTransacciones.js';

// Instanciamos el gerente que manejará la cola de transacciones (podría ser Singleton también)
const gestor = new GestorDeTransacciones();

export const savePurchase = async (req: Request, res: Response): Promise<void> => {
    try {
        const datos = req.body; // { juego: "Elden Ring", comprador: "laena", precio: 60000 }

        // PATRÓN 1: BUILDER (Armamos el ticket)
        const ticket = new TicketBuilder()
            .conTransaccion("TX-" + Date.now())
            .paraElJuego(datos.juego)
            .compradoPor(datos.comprador)
            .porUnMontoDe(datos.precio)
            .build();

        // PATRÓN 2 y 3: STRATEGY + ADAPTER (Preparamos el cobro)
        const procesador = new ProcesadorDePagos(new MercadoPagoAdapter());

        // PATRÓN 4: COMMAND (Encapsulamos la orden)
        const comandoCompra = new ProcesarCompraCommand(ticket, procesador);

        // ¡Ejecutamos mediante el Gestor!
        const exito = await gestor.ejecutarOperacion(comandoCompra);

        if (exito) {
            res.status(201).json({ message: "Compra exitosa", ticket });
        } else {
            res.status(400).json({ error: "Pago rechazado" });
        }

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};