import { Juego } from '../models/Juego.js';
import { supabase } from '../main/supabaseClient.js';
import { Compra } from '../models/Compra.js';

class TicketRepository {
    async getAllProducts(): Promise<Juego[]> {
        if (!supabase) {
            throw new Error("Supabase no está configurado. Revisa SUPABASE_URL y SUPABASE_KEY en el .env.");
        }

        // Obtener juegos de la tabla 'juegos'
        const { data, error } = await supabase
            .from('juegos')
            .select('*')
            .eq('habilitado', true);

        if (error) throw new Error(error.message);

        return data.map((item: any) => {
            const juego = new Juego(
                item.nombre,
                item.genero,
                Number(item.precio),
                item.descripcion ?? '',
                item.imagen ?? '',
            );
            juego.id = item.id;
            return juego;
        });
    }

    async createPurchase(purchaseData: Compra): Promise<any> {
        if (!supabase) {
            throw new Error("Supabase no está configurado. Revisa SUPABASE_URL y SUPABASE_KEY en el .env.");
        }

        // Ajustado para coincidir con las columnas de la tabla 'compras' en SQL
        const { data, error } = await supabase
            .from('compras')
            .insert([{
                nombre: purchaseData.nombre,
                apellido: purchaseData.apellido,
                nombre_apellido: purchaseData.nombreApellido,
                documento: purchaseData.documento,
                email: purchaseData.email,
                telefono: purchaseData.telefono,
                provincia: purchaseData.provincia,
                localidad: purchaseData.localidad,
                id_juego: purchaseData.idJuego,
                nombre_juego: purchaseData.nombreJuego,
                cantidad: purchaseData.cantidad,
                precio_unitario: purchaseData.precioUnitario,
                precio_final: purchaseData.precioFinal,
                estado: purchaseData.estado || 'pendiente',
                referencia_pago: purchaseData.referenciaPago,
                payment_url: purchaseData.paymentUrl,
                fecha_compra: purchaseData.fechaCompra || new Date().toISOString()
            }]);

        if (error) throw new Error(error.message);
        return data;
    }
}

export default new TicketRepository();