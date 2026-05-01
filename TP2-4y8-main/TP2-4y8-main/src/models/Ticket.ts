export class Ticket {
    public idTransaccion: string = "";
    public nombreJuego: string = "";
    public comprador: string = "";
    public precioTotal: number = 0;
    public metodoPago: string = "No definido";
    public tieneDescuento: boolean = false;

    // Podés agregar un método para ver cómo quedó
    public mostrarResumen(): string {
        return `Ticket [${this.idTransaccion}] - ${this.nombreJuego} comprado por ${this.comprador} a $${this.precioTotal} (${this.metodoPago})`;
    }
}