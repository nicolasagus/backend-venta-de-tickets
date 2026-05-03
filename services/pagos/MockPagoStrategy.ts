import { IPagoStrategy, PagoResultData } from './IpagoStrategy.js';

export class MockPagoStrategy implements IPagoStrategy {
    async procesarPago(monto: number, idTransaccion: string): Promise<PagoResultData> {
        console.log(`[Mock Testing] Simulando pago instantáneo de $${monto} sin internet.`);
        return {
            success: true,
            paymentId: `MOCK-${idTransaccion}`,
            redirectUrl: `https://sandbox.mercadopago.com/checkout/mock/${idTransaccion}`
        }; 
    }
}