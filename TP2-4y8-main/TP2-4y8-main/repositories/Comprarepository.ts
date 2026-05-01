import { SupabaseSingleton } from '../supabaseClient.js';
import { Compra } from '../models/Compra.js';

const supabase = SupabaseSingleton.getInstance();

class CompraRepository {
    async guardar(compra: Compra): Promise<boolean> {
        // Validación de seguridad por si tu grupo aún no puso las claves reales en el .env
        if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === "Aca_va_la_url_de_tu_proyecto") {
            console.warn("⚠️ [Aviso] Faltan las credenciales reales de Supabase en el .env.");
            console.log("💾 [Mock] Simulando que la compra se guardó en la base de datos.");
            return true; 
        }

        try {
            console.log("[Repository] Guardando compra en Supabase...");

            // 1. Insertamos en la tabla 'compras'
            const { data: dataCompra, error: errorCompra } = await supabase
                .from('compras')
                .insert([{
                    nombre_apellido: compra.nombreApellido,
                    email: compra.email,
                    id_juego: compra.idJuego,
                    precio_final: compra.precioFinal,
                    estado: compra.estado
                }])
                .select() // Esto nos devuelve el ID que generó la base de datos
                .single();

            if (errorCompra) throw new Error("Error al guardar en compras: " + errorCompra.message);

            // 2. Si se confirmó el pago, cumplimos el requerimiento del grupo y lo mandamos a 'biblioteca'
            if (compra.estado === "confirmado") {
                const { error: errorBiblio } = await supabase
                    .from('biblioteca')
                    .insert([{
                        email: compra.email,
                        id_juego: compra.idJuego,
                        id_compra: dataCompra.id // Conectamos con la compra recién hecha
                    }]);
                
                if (errorBiblio) throw new Error("Error al guardar en biblioteca: " + errorBiblio.message);
                console.log("📚 [Repository] Juego agregado a la biblioteca del usuario.");
            }

            return true;

        } catch (error) {
            console.error("[Repository] Falló el guardado en la BD:", error);
            return false;
        }
    }
}

export default new CompraRepository();