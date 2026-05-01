import { IPagoStrategy } from './IPagoStrategy.js';

export class ProcesadorDePagos {
    private estrategia: IPagoStrategy;

    // Al nacer, le decimos qué método de pago va a usar
    constructor(estrategia: IPagoStrategy) {
        this.estrategia = estrategia;
    }

    // Permite cambiar el método en caliente (en tiempo de ejecución)
    public setEstrategia(estrategia: IPagoStrategy): void {
        this.estrategia = estrategia;
    }

    public async ejecutarCobro(monto: number, idTransaccion: string): Promise<boolean> {
        // Delega la responsabilidad a la estrategia elegida
        return await this.estrategia.procesarPago(monto, idTransaccion);
    }
}