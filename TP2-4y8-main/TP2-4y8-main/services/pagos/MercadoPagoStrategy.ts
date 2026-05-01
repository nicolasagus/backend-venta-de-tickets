import { IPagoStrategy } from './IPagoStrategy.js';

export class MercadoPagoStrategy implements IPagoStrategy {
    async procesarPago(monto: number, idTransaccion: string): Promise<boolean> {
        console.log(`[Mercado Pago] Iniciando conexión con la API...`);
        console.log(`[Mercado Pago] Procesando cobro de $${monto} para TX: ${idTransaccion}`);
        
        // Acá en el futuro meterías el SDK real de Mercado Pago.
        // Por ahora simulamos que el pago fue exitoso.
        return true; 
    }
}