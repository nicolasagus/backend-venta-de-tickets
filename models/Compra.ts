export class Compra {
    public idTransaccion?: string;
    public nombre: string = '';
    public apellido: string = '';
    public nombreApellido: string = '';
    public documento: string = '';
    public telefono: string = '';
    public provincia: string = '';
    public localidad: string = '';
    public cantidad: number = 1;
    public email: string = '';
    public idProducto: string = '';
    public nombreProducto: string = '';
    public precioUnitario: number = 0;
    public precioFinal: number = 0;
    public estado: string = 'pendiente'; // 'pendiente', 'confirmado', 'cancelado'
    public referenciaPago: string = '';
    public paymentUrl: string = '';
    public fechaCompra: string = '';
    public metodoPago?: string;

    constructor() {
        this.fechaCompra = new Date().toISOString();
    }

    public calcularTotal(): number {
        return this.precioUnitario * this.cantidad;
    }

    public validar(): boolean {
        return (
            !!this.nombre &&
            !!this.apellido &&
            !!this.documento &&
            !!this.email &&
            !!this.idProducto &&
            this.cantidad === 1 &&
            this.precioUnitario > 0
        );
    }
}
