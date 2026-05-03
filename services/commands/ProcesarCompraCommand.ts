// src/main/services/commands/ProcesarCompraCommand.ts
import { ICommand } from './Icommand.js';
import { Compra } from '../../models/Compra.js';
import { ProcesadorDePagos } from '../pagos/ProcesadordePagos.js';
import TicketRepository from '../../repositories/ticketRepository.js'; 

export class ProcesarCompraCommand implements ICommand {
    private compra: Compra;
    private procesadorPagos: ProcesadorDePagos;

    constructor(compra: Compra, procesadorPagos: ProcesadorDePagos) {
        this.compra = compra;
        this.procesadorPagos = procesadorPagos;
    }

    async ejecutar(): Promise<boolean> {
        console.log(`[Comando] Ejecutando orden de compra para: ${this.compra.nombreJuego}`);
        
        const idTransaccion = this.compra.idTransaccion || `TX-${Date.now()}`;
        this.compra.idTransaccion = idTransaccion;

        // 1. Cobramos
        const resultadoPago = await this.procesadorPagos.ejecutarCobro(
            this.compra.precioFinal, 
            idTransaccion
        );

        if (!resultadoPago.success) {
            console.log("[Comando] La compra falló en el pago.");
            this.compra.estado = "cancelado";
            return false;
        }

        // 2. Guardamos en DB (Supabase/Mock)
        this.compra.estado = "confirmado";
        this.compra.metodoPago = 'Mercado Pago';
        this.compra.referenciaPago = resultadoPago.paymentId;
        this.compra.paymentUrl = resultadoPago.redirectUrl;
        
        await TicketRepository.createPurchase(this.compra);
        
        console.log("[Comando] Compra completada y guardada.");
        return true;
    }

    async deshacer(): Promise<boolean> {
        console.log(`[Comando] ⚠️ Deshaciendo la compra: ${this.compra.idTransaccion}`);
        this.compra.estado = "cancelado";
        // Acá podrías llamar a la API para devolver la plata, etc.
        return true;
    }
}