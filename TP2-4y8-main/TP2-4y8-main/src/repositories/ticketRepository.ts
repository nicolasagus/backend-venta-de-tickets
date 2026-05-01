// Rutas corregidas:
import { Tienda } from '../services/Tienda.js';
import { Juego } from '../models/Juego.js';
import { supabase } from '../main/supabaseClient.js';

class TicketRepository {
    private tienda: Tienda;

    constructor() {
        this.tienda = new Tienda();
    }

    // Cambiamos el nombre para que coincida con el controlador
    async getAllTickets(): Promise<Juego[]> {
        const { data, error } = await supabase
            .from('productos')
            .select('*');
        
        if (error) throw new Error(error.message);

        // Mapeo: Transformamos datos de DB a objetos de la clase Juego del grupo
        return data.map((item: any) => new Juego(item.titulo, item.genero, item.precio));
    }

    async createPurchase(purchaseData: any): Promise<any> {
        const { data, error } = await supabase
            .from('compras')
            .insert([purchaseData]);

        if (error) throw new Error(error.message);
        return data;
    }
}

export default new TicketRepository();