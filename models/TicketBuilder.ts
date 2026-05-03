import { Compra } from './Compra.js';

export class CompraBuilder {
    private compra: Compra;

    constructor() {
        this.compra = new Compra();
    }

    public conNombre(nombre: string): this {
        this.compra.nombre = nombre;
        return this;
    }

    public conApellido(apellido: string): this {
        this.compra.apellido = apellido;
        this.compra.nombreApellido = `${this.compra.nombre} ${apellido}`;
        return this;
    }

    public conDocumento(documento: string): this {
        this.compra.documento = documento;
        return this;
    }

    public conTelefono(telefono: string): this {
        this.compra.telefono = telefono;
        return this;
    }

    public conProvincia(provincia: string): this {
        this.compra.provincia = provincia;
        return this;
    }

    public conLocalidad(localidad: string): this {
        this.compra.localidad = localidad;
        return this;
    }

    public conCantidad(cantidad: number): this {
        this.compra.cantidad = cantidad;
        return this;
    }

    public conEmail(email: string): this {
        this.compra.email = email;
        return this;
    }

    public paraElJuego(idJuego: string, nombreJuego: string): this {
        this.compra.idJuego = idJuego;
        this.compra.nombreJuego = nombreJuego;
        return this;
    }

    public conPrecioUnitario(precio: number): this {
        this.compra.precioUnitario = precio;
        return this;
    }

    public porUnPrecioDe(precioFinal: number): this {
        this.compra.precioFinal = precioFinal;
        return this;
    }

    public build(): Compra {
        if (!this.compra.validar()) {
            throw new Error("La compra no es válida. Faltan datos obligatorios.");
        }
        return this.compra;
    }
}

// Mantener TicketBuilder para compatibilidad
export class TicketBuilder {
    private builder: CompraBuilder;

    constructor() {
        this.builder = new CompraBuilder();
    }

    public conNombre(nombre: string): this {
        this.builder.conNombre(nombre);
        return this;
    }

    public conApellido(apellido: string): this {
        this.builder.conApellido(apellido);
        return this;
    }

    public conDocumento(documento: string): this {
        this.builder.conDocumento(documento);
        return this;
    }

    public conTelefono(telefono: string): this {
        this.builder.conTelefono(telefono);
        return this;
    }

    public conProvincia(provincia: string): this {
        this.builder.conProvincia(provincia);
        return this;
    }

    public conLocalidad(localidad: string): this {
        this.builder.conLocalidad(localidad);
        return this;
    }

    public conCantidad(cantidad: number): this {
        this.builder.conCantidad(cantidad);
        return this;
    }

    public conEmail(email: string): this {
        this.builder.conEmail(email);
        return this;
    }

    public paraElJuego(idJuego: string, nombreJuego: string): this {
        this.builder.paraElJuego(idJuego, nombreJuego);
        return this;
    }

    public conPrecioUnitario(precio: number): this {
        this.builder.conPrecioUnitario(precio);
        return this;
    }

    public porUnPrecioDe(precioFinal: number): this {
        this.builder.porUnPrecioDe(precioFinal);
        return this;
    }

    public build(): Compra {
        return this.builder.build();
    }
}