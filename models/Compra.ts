export class Compra {
    public id?: string;
    public nombre: string = '';
    public apellido: string = '';
    public nombreApellido: string = '';
    public documento: string = '';
    public telefono: string = '';
    public provincia: string = '';
    public localidad: string = '';
    public cantidad: number = 1;
    public email: string = '';
    public idJuego: string = '';
    public nombreJuego: string = '';
    public precioUnitario: number = 0;
    public precioFinal: number = 0;
    public estado: string = 'pendiente'; // 'pendiente', 'confirmado', 'cancelado'
    public referenciaPago: string = '';
    public paymentUrl: string = '';
    public fechaCompra: string = '';
    public idTransaccion?: string;
    public metodoPago?: string;

    constructor() {
        this.fechaCompra = new Date().toISOString();
    }

    public calcularPrecioFinal(): number {
        return this.precioUnitario * this.cantidad;
    }

    public validar(): boolean {
        return (
            !!this.nombre &&
            !!this.apellido &&
            !!this.documento &&
            !!this.email &&
            !!this.idJuego &&
            this.cantidad > 0 &&
            this.cantidad <= 6 &&
            this.precioUnitario > 0
        );
    }
}
