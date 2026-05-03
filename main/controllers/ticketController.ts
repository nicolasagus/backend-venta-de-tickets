import { Request, Response } from 'express';
import TicketRepository from '../../repositories/ticketRepository.js';
import { CompraBuilder } from '../../models/TicketBuilder.js';
import { ProcesadorDePagos } from '../../services/pagos/ProcesadordePagos.js';
import { MercadoPagoAdapter } from '../../services/pagos/MercadoPagoAdapter.js';
import { ProcesarCompraCommand } from '../../services/commands/ProcesarCompraCommand.js';
import { GestorDeTransacciones } from '../../services/commands/GestorDeTransacciones.js';

// Instanciamos el gerente que manejará los comandos
const gestor = new GestorDeTransacciones();

export const listarProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos = await TicketRepository.getAllProducts();
        res.status(200).json(productos);
    } catch (error) {
        console.error('[Controlador] Error al listar productos:', error);
        res.status(500).json({ error: 'No se pudieron cargar los productos. Intente nuevamente.' });
    }
};

export const realizarCompra = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            nombre,
            apellido,
            documento,
            telefono,
            provincia,
            localidad,
            cantidad,
            email,
            idJuego,
            nombreJuego,
            precioUnitario
        } = req.body;

        if (
            !nombre ||
            !apellido ||
            !documento ||
            !telefono ||
            !provincia ||
            !localidad ||
            !cantidad ||
            !email ||
            !idJuego ||
            !nombreJuego ||
            !precioUnitario
        ) {
            res.status(400).json({ error: 'Faltan campos obligatorios para procesar la compra.' });
            return;
        }

        const cantidadNumero = Number(cantidad);
        const precioUnitarioNumero = Number(precioUnitario);

        if (!Number.isInteger(cantidadNumero) || cantidadNumero < 1 || cantidadNumero > 6) {
            res.status(400).json({ error: 'La cantidad debe ser un número entero entre 1 y 6.' });
            return;
        }

        if (precioUnitarioNumero <= 0) {
            res.status(400).json({ error: 'El precio unitario debe ser un valor mayor que cero.' });
            return;
        }

        const precioFinal = precioUnitarioNumero * cantidadNumero;

        const nuevaCompra = new CompraBuilder()
            .conNombre(nombre)
            .conApellido(apellido)
            .conDocumento(documento)
            .conTelefono(telefono)
            .conProvincia(provincia)
            .conLocalidad(localidad)
            .conCantidad(cantidadNumero)
            .conEmail(email)
            .paraElJuego(idJuego, nombreJuego)
            .conPrecioUnitario(precioUnitarioNumero)
            .porUnPrecioDe(precioFinal)
            .build();

        const procesadorPagos = new ProcesadorDePagos(new MercadoPagoAdapter());
        const comandoCompra = new ProcesarCompraCommand(nuevaCompra, procesadorPagos);
        const exito = await gestor.ejecutarOperacion(comandoCompra);

        if (exito) {
            res.status(201).json({
                mensaje: '¡Compra exitosa!',
                compra: nuevaCompra,
                pago: {
                    referencia: nuevaCompra.referenciaPago,
                    url: nuevaCompra.paymentUrl
                }
            });
        } else {
            res.status(400).json({ error: 'El pago fue rechazado o no se pudo procesar la compra.' });
        }
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.status(500).json({ error: 'Hubo un error en el servidor al procesar la compra.' });
    }
};