import { Ticket } from './Ticket.js';

export class TicketBuilder {
    private ticket: Ticket;

    constructor() {
        // Al instanciar el Builder, creamos un ticket en blanco
        this.ticket = new Ticket();
    }

    public setTransaccion(id: string): this {
        this.ticket.idTransaccion = id;
        return this; // Retornamos 'this' para poder encadenar métodos
    }

    public setJuego(nombreJuego: string): this {
        this.ticket.nombreJuego = nombreJuego;
        return this;
    }

    public setComprador(comprador: string): this {
        this.ticket.comprador = comprador;
        return this;
    }

    public setPrecio(precio: number): this {
        this.ticket.precioTotal = precio;
        return this;
    }

    public setMetodoPago(metodo: string): this {
        this.ticket.metodoPago = metodo;
        return this;
    }

    public aplicarDescuento(aplicar: boolean): this {
        this.ticket.tieneDescuento = aplicar;
        return this;
    }

    // El método final que devuelve el objeto terminado
    public build(): Ticket {
        // Acá podrías poner validaciones antes de devolverlo
        if (!this.ticket.nombreJuego || !this.ticket.comprador) {
            throw new Error("El ticket no se puede crear: Faltan el juego o el comprador.");
        }
        return this.ticket;
    }
}