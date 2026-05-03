import { IPagoStrategy, PagoResultData } from './IpagoStrategy.js';
import { MercadoPagoSDK } from './MercadoPagoSDK.js';

export class MercadoPagoAdapter implements IPagoStrategy {
    private sdkExterno: MercadoPagoSDK;

    constructor() {
        this.sdkExterno = new MercadoPagoSDK();
    }

    async procesarPago(monto: number, idTransaccion: string): Promise<PagoResultData> {
        console.log("[Adapter] Adaptando los datos de tu compra al formato de Mercado Pago...");
        
        try {
            const respuestaExterna = await this.sdkExterno.crearPreferencia({
                total: monto,
                currency: "ARS",
                reference: idTransaccion,
                itemTitle: "Compra de Tickets"
            });

            if (respuestaExterna.status === "approved" || respuestaExterna.init_point) {
                console.log(`[Adapter] Preferencia creada con éxito. ID: ${respuestaExterna.id}`);
                return {
                    success: true,
                    paymentId: respuestaExterna.id,
                    redirectUrl: respuestaExterna.init_point
                };
            }
            
            return { success: false };

        } catch (error) {
            console.error("[Adapter] Fallo en la comunicación con Mercado Pago", error);
            return { success: false };
        }
    }
}