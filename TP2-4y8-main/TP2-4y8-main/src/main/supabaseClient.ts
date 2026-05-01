import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Cargamos las variables de entorno
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

// Pequeña validación para evitar que el servidor crashee sin avisar
if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Faltan las credenciales de Supabase en el archivo .env");
}

// Exportamos la constante directamente
export const supabase = createClient(supabaseUrl, supabaseKey);