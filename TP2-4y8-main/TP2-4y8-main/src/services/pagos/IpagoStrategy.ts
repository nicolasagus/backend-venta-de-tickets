export interface IPagoStrategy {
    procesarPago(monto: number, idTransaccion: string): Promise<boolean>;
}