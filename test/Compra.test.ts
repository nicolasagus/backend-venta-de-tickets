import { describe, it, expect, beforeEach } from 'vitest';
import { Compra } from '../models/Compra.js';
import { CompraBuilder } from '../models/TicketBuilder.js';

describe('Compra Model', () => {
    let compra: Compra;

    beforeEach(() => {
        compra = new Compra();
    });

    it('should create a Compra instance', () => {
        expect(compra).toBeDefined();
        expect(compra.estado).toBe('pendiente');
    });

    it('should calculate final price correctly', () => {
        compra.precioUnitario = 100;
        compra.cantidad = 3;
        expect(compra.calcularPrecioFinal()).toBe(300);
    });

    it('should validate a complete compra', () => {
        compra.nombre = 'Juan';
        compra.apellido = 'Pérez';
        compra.documento = '12345678';
        compra.email = 'juan@example.com';
        compra.idJuego = 'game-1';
        compra.cantidad = 2;
        compra.precioUnitario = 50;

        expect(compra.validar()).toBe(true);
    });

    it('should fail validation with missing fields', () => {
        expect(compra.validar()).toBe(false);
    });

    it('should fail validation with invalid quantity', () => {
        compra.nombre = 'Juan';
        compra.apellido = 'Pérez';
        compra.documento = '12345678';
        compra.email = 'juan@example.com';
        compra.idJuego = 'game-1';
        compra.cantidad = 10; // Mayor a 6
        compra.precioUnitario = 50;

        expect(compra.validar()).toBe(false);
    });

    it('should fail validation with invalid price', () => {
        compra.nombre = 'Juan';
        compra.apellido = 'Pérez';
        compra.documento = '12345678';
        compra.email = 'juan@example.com';
        compra.idJuego = 'game-1';
        compra.cantidad = 2;
        compra.precioUnitario = -50; // Precio negativo

        expect(compra.validar()).toBe(false);
    });
});

describe('CompraBuilder', () => {
    it('should build a complete compra using builder pattern', () => {
        const compra = new CompraBuilder()
            .conNombre('Juan')
            .conApellido('Pérez')
            .conDocumento('12345678')
            .conTelefono('1234567890')
            .conProvincia('Buenos Aires')
            .conLocalidad('CABA')
            .conCantidad(2)
            .conEmail('juan@example.com')
            .paraElJuego('game-1', 'Super Mario')
            .conPrecioUnitario(100)
            .porUnPrecioDe(200)
            .build();

        expect(compra.nombre).toBe('Juan');
        expect(compra.apellido).toBe('Pérez');
        expect(compra.nombreApellido).toBe('Juan Pérez');
        expect(compra.nombreJuego).toBe('Super Mario');
        expect(compra.precioFinal).toBe(200);
        expect(compra.estado).toBe('pendiente');
    });

    it('should throw error when building incomplete compra', () => {
        expect(() => {
            new CompraBuilder().build();
        }).toThrow();
    });
});
