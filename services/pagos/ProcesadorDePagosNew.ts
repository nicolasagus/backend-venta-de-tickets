import { IPagoStrategy } from './IpagoStrategy.js';

export interface PagoResult {
    success: boolean;
    paymentId: string;
    redirectUrl: string;
}

export class ProcesadorDePagos {
    private strategy: IPagoStrategy;

    constructor(strategy: IPagoStrategy) {
        this.strategy = strategy;
    }

    async ejecutarCobro(monto: number, idTransaccion: string): Promise<PagoResult> {
        console.log(`[Procesador] Iniciando pago de $${monto} para TX: ${idTransaccion}`);
        
        const pagoExitoso = await this.strategy.procesarPago(monto, idTransaccion);
        
        if (!pagoExitoso) {
            return {
                success: false,
                paymentId: '',
                redirectUrl: ''
            };
        }

        // Simulamos respuesta de Mercado Pago
        return {
            success: true,
            paymentId: `MP-${idTransaccion}`,
            redirectUrl: `https://sandbox.mercadopago.com/checkout/pay/${idTransaccion}`
        };
    }

    setStrategy(strategy: IPagoStrategy): void {
        this.strategy = strategy;
    }
}
