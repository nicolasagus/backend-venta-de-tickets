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

        // Ajustado para coincidir con las columnas de la tabla 'compras' en SQL
        const { data, error } = await supabase
            .from('compras')
            .insert([{
                nombre_apellido: purchaseData.nombre + ' ' + purchaseData.apellido,
                documento: purchaseData.documento,
                email: purchaseData.email,
                telefono: purchaseData.telefono,
                provincia: purchaseData.provincia,
                localidad: purchaseData.localidad,
                id_producto: purchaseData.idJuego,
                cantidad: purchaseData.cantidad,
                precio_final: purchaseData.precioFinal,
                estado: purchaseData.estado || 'pendiente',
                referencia_pago: purchaseData.referenciaPago,
                fecha_compra: purchaseData.fechaCompra || new Date().toISOString()
            }]);

        if (error) throw new Error(error.message);
        return data;
    }
}

export default new TicketRepository();