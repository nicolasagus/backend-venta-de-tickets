// src/main/services/commands/ProcesarCompraCommand.ts
import CompraRepository from '../../repositories/compraRepository.js';
import { ICommand } from './ICommand.js';
import { Ticket } from '../../models/Ticket.js';
import { ProcesadorDePagos } from '../pagos/ProcesadorDePagos.js';
import TicketRepository from '../../repositories/ticketRepository.js'; 

export class ProcesarCompraCommand implements ICommand {
    private ticket: Ticket;
    private procesadorPagos: ProcesadorDePagos;

    constructor(ticket: Ticket, procesadorPagos: ProcesadorDePagos) {
        this.ticket = ticket;
        this.procesadorPagos = procesadorPagos;
    }

    async ejecutar(): Promise<boolean> {
        console.log(`[Comando] Ejecutando orden de compra para: ${this.ticket.nombreJuego}`);
        
        // 1. Cobramos
        const pagoExitoso = await this.procesadorPagos.ejecutarCobro(
            this.ticket.precioTotal, 
            this.ticket.idTransaccion
        );

        if (!pagoExitoso) {
            console.log("[Comando] La compra falló en el pago.");
            this.ticket.estado = "rechazado";
            return false;
        }

        // 2. Guardamos en DB (Supabase/Mock)
        this.ticket.estado = "aprobado";
        await TicketRepository.createPurchase(this.ticket);
        
        console.log("[Comando] Compra completada y guardada.");
        return true;
    }

    async deshacer(): Promise<boolean> {
        console.log(`[Comando] ⚠️ Deshaciendo la compra: ${this.ticket.idTransaccion}`);
        this.ticket.estado = "rechazado";
        // Acá podrías llamar a la API para devolver la plata, etc.
        return true;
    }
}