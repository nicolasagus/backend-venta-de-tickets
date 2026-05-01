// src/main/services/pagos/MercadoPagoAdapter.ts
import { IPagoStrategy } from './IPagoStrategy.js';
import { MercadoPagoSDK } from './MercadoPagoSDK.js';

export class MercadoPagoAdapter implements IPagoStrategy {
    private sdkExterno: MercadoPagoSDK;

    constructor() {
        this.sdkExterno = new MercadoPagoSDK();
    }

    // Cumplimos con la regla de tu sistema
    async procesarPago(monto: number, idTransaccion: string): Promise<boolean> {
        console.log("[Adapter] Adaptando los datos de tu compra al formato de Mercado Pago...");
        
        try {
            // Traducimos los datos para que el SDK externo los acepte
            const respuestaExterna = await this.sdkExterno.crearPreferencia({
                total: monto,
                currency: "ARS", // Dato duro que exige MP
                reference: idTransaccion
            });

            // Traducimos la respuesta de MP a un simple true/false para tu sistema
            if (respuestaExterna.status === "approved") {
                console.log(`[Adapter] Pago aprobado con éxito. ID: ${respuestaExterna.id}`);
                return true;
            }
            return false;

        } catch (error) {
            console.error("[Adapter] Fallo en la comunicación con Mercado Pago", error);
            return false;
        }
    }
}