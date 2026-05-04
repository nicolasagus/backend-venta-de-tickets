import { Juego } from '../models/Juego.js';
import { supabase } from '../main/supabaseClient.js';
import { Compra } from '../models/Compra.js';

class TicketRepository {
    async getAllProducts(): Promise<Juego[]> {
        if (!supabase) {
            throw new Error("Supabase no está configurado. Revisa SUPABASE_URL y SUPABASE_KEY en el .env.");
        }

        // Obtener juegos de la tabla 'productos'
        const { data, error } = await supabase
            .from('productos')
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

        // 1. Guardar o actualizar al comprador (Upsert basado en email)
        const { data: compradorData, error: compradorError } = await supabase
            .from('compradores')
            .upsert([{
                nombre_apellido: purchaseData.nombre + ' ' + purchaseData.apellido,
                documento: purchaseData.documento,
                email: purchaseData.email,
                telefono: purchaseData.telefono,
                provincia: purchaseData.provincia,
                localidad: purchaseData.localidad,
            }], { onConflict: 'email' })
            .select()
            .single();

        if (compradorError) {
            throw new Error("Error guardando el comprador: " + compradorError.message);
        }

        // 2. Crear el registro de la compra
        const { data: compraData, error: compraError } = await supabase
            .from('compras')
            .insert([{
                id_comprador: compradorData.id,
                id_producto: purchaseData.idProducto,
                cantidad: purchaseData.cantidad,
                precio_final: purchaseData.precioFinal,
                estado: purchaseData.estado || 'pendiente',
                referencia_pago: purchaseData.referenciaPago,
                payment_url: purchaseData.paymentUrl,
                fecha_compra: purchaseData.fechaCompra || new Date().toISOString()
            }]);

        if (compraError) {
            throw new Error("Error creando la compra: " + compraError.message);
        }

        return compraData;
    }
}

export default new TicketRepository();