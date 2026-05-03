import { describe, it, expect, beforeEach } from 'vitest';
import { MercadoPagoStrategy } from '../services/pagos/MercadoPagoStrategy.js';
import { MockPagoStrategy } from '../services/pagos/MockPagoStrategy.js';
import { ProcesadorDePagos } from '../services/pagos/ProcesadordePagos.js';

describe('Estrategias de Pago', () => {
    describe('MockPagoStrategy', () => {
        it('should process payment successfully', async () => {
            const strategy = new MockPagoStrategy();
            const result = await strategy.procesarPago(100, 'TX-123');
            expect(result.success).toBe(true);
        });

        it('should process payment for any amount', async () => {
            const strategy = new MockPagoStrategy();
            
            const result1 = await strategy.procesarPago(50, 'TX-1');
            const result2 = await strategy.procesarPago(1000, 'TX-2');
            
            expect(result1.success).toBe(true);
            expect(result2.success).toBe(true);
        });
    });

    describe('MercadoPagoStrategy', () => {
        it('should process payment through SDK', async () => {
            const strategy = new MercadoPagoStrategy();
            const result = await strategy.procesarPago(100, 'TX-123');
            expect(result.success).toBe(true);
        });
    });

    describe('ProcesadorDePagos', () => {
        let procesador: ProcesadorDePagos;

        beforeEach(() => {
            const mockStrategy = new MockPagoStrategy();
            procesador = new ProcesadorDePagos(mockStrategy);
        });

        it('should return success result when payment succeeds', async () => {
            const result = await procesador.ejecutarCobro(100, 'TX-123');
            
            expect(result.success).toBe(true);
            expect(result.paymentId).toContain('MOCK-');
            expect(result.redirectUrl).toContain('sandbox.mercadopago.com/checkout/mock');
        });

        it('should switch strategies', async () => {
            const mercadoStrategy = new MercadoPagoStrategy();
            procesador.setStrategy(mercadoStrategy);
            
            const result = await procesador.ejecutarCobro(200, 'TX-456');
            expect(result.success).toBe(true);
        });

        it('should handle payment failures', async () => {
            // Crear una estrategia que siempre falla
            const failingStrategy = {
                procesarPago: async () => ({ success: false })
            };
            
            procesador.setStrategy(failingStrategy as any);
            const result = await procesador.ejecutarCobro(100, 'TX-fail');
            
            expect(result.success).toBe(false);
            expect(result.paymentId).toBe('');
        });
    });
});
