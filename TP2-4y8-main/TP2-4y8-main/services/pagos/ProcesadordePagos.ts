import { ICommand } from './ICommand.js';
import { Compra } from '../../models/Compra.js';
import { ProcesadorDePagos } from '../pagos/ProcesadorDePagos.js';
// import CompraRepository from '../../repositories/compraRepository.js'; // Lo usaremos más adelante

export class ProcesarCompraCommand implements ICommand {
    private compra: Compra;
    private procesadorPagos: ProcesadorDePagos;

    constructor(compra: Compra, procesadorPagos: ProcesadorDePagos) {
        this.compra = compra;
        this.procesadorPagos = procesadorPagos;
    }

    async ejecutar(): Promise<boolean> {
        console.log(`[Comando] Ejecutando orden de compra para el juego ID: ${this.compra.idJuego}`);
        
        // Simulamos un ID de transacción temporal para Mercado Pago
        const idTransaccion = "TX-" + Date.now();

        // 1. Cobramos usando el Strategy
        const pagoExitoso = await this.procesadorPagos.ejecutarCobro(
            this.compra.precioFinal, 
            idTransaccion
        );

        if (!pagoExitoso) {
            console.log("[Comando] La compra falló en el pago.");
            this.compra.estado = "cancelado";
            return false;
        }

        // 2. Aprobamos la compra
        this.compra.estado = "confirmado";
        
        // Acá iría el guardado en base de datos: 
        // await CompraRepository.guardar(this.compra);
        
        console.log("[Comando] Compra completada exitosamente.");
        return true;
    }

    async deshacer(): Promise<boolean> {
        this.compra.estado = "cancelado";
        return true;
    }
}