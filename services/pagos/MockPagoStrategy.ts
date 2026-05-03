import { IPagoStrategy } from './IpagoStrategy.js';

export class MockPagoStrategy implements IPagoStrategy {
    async procesarPago(monto: number, idTransaccion: string): Promise<boolean> {
        console.log(`[Mock Testing] Simulando pago instantáneo de $${monto} sin internet.`);
        return true; 
    }
}