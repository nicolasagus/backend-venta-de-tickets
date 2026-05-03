import { describe, it, expect, beforeEach } from 'vitest';
import { GestorDeTransacciones } from '../services/commands/GestorDeTransacciones.js';
import { MockPagoStrategy } from '../services/pagos/MockPagoStrategy.js';
import { ProcesadorDePagos } from '../services/pagos/ProcesadordePagos.js';
import { ProcesarCompraCommand } from '../services/commands/ProcesarCompraCommand.js';
import { Compra } from '../models/Compra.js';

describe('GestorDeTransacciones', () => {
    let gestor: GestorDeTransacciones;
    let procesadorPagos: ProcesadorDePagos;
    let compra: Compra;

    beforeEach(() => {
        gestor = new GestorDeTransacciones();
        procesadorPagos = new ProcesadorDePagos(new MockPagoStrategy());
        
        compra = new Compra();
        compra.nombre = 'Juan';
        compra.apellido = 'Pérez';
        compra.documento = '12345678';
        compra.email = 'juan@example.com';
        compra.idJuego = 'game-1';
        compra.nombreJuego = 'Super Mario';
        compra.cantidad = 2;
        compra.precioUnitario = 100;
        compra.precioFinal = 200;
    });

    it('should execute a command successfully', async () => {
        const comando = new ProcesarCompraCommand(compra, procesadorPagos);
        const resultado = await gestor.ejecutarOperacion(comando);
        
        expect(resultado).toBe(true);
        expect(gestor.getHistorial().length).toBe(1);
    });

    it('should store successful commands in history', async () => {
        const comando1 = new ProcesarCompraCommand(compra, procesadorPagos);
        
        const compra2 = new Compra();
        compra2.nombre = 'María';
        compra2.apellido = 'García';
        compra2.documento = '87654321';
        compra2.email = 'maria@example.com';
        compra2.idJuego = 'game-2';
        compra2.nombreJuego = 'Zelda';
        compra2.cantidad = 1;
        compra2.precioUnitario = 150;
        compra2.precioFinal = 150;
        
        const comando2 = new ProcesarCompraCommand(compra2, procesadorPagos);
        
        await gestor.ejecutarOperacion(comando1);
        await gestor.ejecutarOperacion(comando2);
        
        expect(gestor.getHistorial().length).toBe(2);
    });

    it('should return false when command fails', async () => {
        const failingProcesador = new ProcesadorDePagos({
            procesarPago: async () => false
        } as any);
        
        const comando = new ProcesarCompraCommand(compra, failingProcesador);
        const resultado = await gestor.ejecutarOperacion(comando);
        
        expect(resultado).toBe(false);
        expect(gestor.getHistorial().length).toBe(0); // No se agrega al historial si falla
    });

    it('should handle errors gracefully', async () => {
        const errorProcesador = new ProcesadorDePagos({
            procesarPago: async () => {
                throw new Error('Connection error');
            }
        } as any);
        
        const comando = new ProcesarCompraCommand(compra, errorProcesador);
        const resultado = await gestor.ejecutarOperacion(comando);
        
        expect(resultado).toBe(false);
    });
});
