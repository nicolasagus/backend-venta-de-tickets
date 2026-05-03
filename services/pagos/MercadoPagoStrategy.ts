import { IPagoStrategy, PagoResultData } from './IpagoStrategy.js';

export class MercadoPagoStrategy implements IPagoStrategy {
    async procesarPago(monto: number, idTransaccion: string): Promise<PagoResultData> {
        console.log(`[Mercado Pago] Iniciando conexión con la API...`);
        console.log(`[Mercado Pago] Procesando cobro de $${monto} para TX: ${idTransaccion}`);
        
        return { success: true }; 
    }
}