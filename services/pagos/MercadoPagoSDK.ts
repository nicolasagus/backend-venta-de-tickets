import { MercadoPagoConfig, Preference } from 'mercadopago';

export class MercadoPagoSDK {
    private client: MercadoPagoConfig;

    constructor() {
        const token = process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-TOKEN';
        this.client = new MercadoPagoConfig({ accessToken: token });
    }

    async crearPreferencia(config: {
        total: number;
        currency: string;
        reference: string;
        itemTitle: string;
    }): Promise<{ status: string; id: string; init_point?: string }> {
        console.log(`[SDK] Creando preferencia en Mercado Pago...`);
        console.log(`[SDK] Monto: ${config.total} ${config.currency}, Referencia: ${config.reference}`);
        
        try {
            const preference = new Preference(this.client);
            
            const response = await preference.create({
                body: {
                    items: [
                        {
                            id: config.reference,
                            title: config.itemTitle,
                            quantity: 1,
                            unit_price: config.total,
                            currency_id: config.currency
                        }
                    ],
                    external_reference: config.reference,
                    // back_urls y auto_return se pueden configurar aquí
                }
            });

            return {
                status: 'approved', // Mantenemos la lógica de tu sistema
                id: response.id || `MP-${Date.now()}`,
                init_point: response.init_point
            };
        } catch (error) {
            console.error('[SDK] Error al crear la preferencia en Mercado Pago:', error);
            throw error;
        }
    }
}
