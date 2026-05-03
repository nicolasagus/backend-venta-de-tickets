export class MercadoPagoSDK {
    private apiKey: string;

    constructor() {
        this.apiKey = process.env.MERCADOPAGO_KEY || 'APP_KEY_SANDBOX';
    }

    async crearPreferencia(config: {
        total: number;
        currency: string;
        reference: string;
    }): Promise<{ status: string; id: string }> {
        console.log(`[SDK] Creando preferencia en Mercado Pago...`);
        console.log(`[SDK] Monto: ${config.total} ${config.currency}, Referencia: ${config.reference}`);
        
        // Simulamos la respuesta de Mercado Pago
        // En un caso real aquí iría la llamada HTTP real a la API de MP
        return {
            status: 'approved',
            id: `MP-${Date.now()}`
        };
    }
}
