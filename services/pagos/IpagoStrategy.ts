export interface PagoResultData {
    success: boolean;
    paymentId?: string;
    redirectUrl?: string;
}

export interface IPagoStrategy {
    procesarPago(monto: number, idTransaccion: string): Promise<PagoResultData>;
}