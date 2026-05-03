// src/main/services/commands/GestorDeTransacciones.ts
import { ICommand } from './Icommand.js';

export class GestorDeTransacciones {
    private historial: ICommand[] = [];

    // Recibe cualquier comando (compra, cancelación, etc.) y lo ejecuta
    public async ejecutarOperacion(comando: ICommand): Promise<boolean> {
        try {
            const exito = await comando.ejecutar();
            
            if (exito) {
                // Guardamos en el historial solo si funcionó
                this.historial.push(comando);
            }
            return exito;
            
        } catch (error) {
            console.error("Error al ejecutar el comando:", error);
            return false;
        }
    }

    public getHistorial() {
        return this.historial;
    }
}