import { Juego} from "./Juego";
import { Usuario} from "./Usuario";

export class orden{ 

    private juego: Juego; 
    private usuario: Usuario;
    private cantidad: number;
    private total: number; 

    constructor(juego:Juego, usuario:Usuario, cantidad: number, total:number){
        this.juego=juego;
        this.usuario= usuario;
        this.cantidad = this.validarCantidad(cantidad);
        this.total= this.calcularTotal(juego ,this.cantidad);
    }

    private validarCantidad (cantidad:number):number {
        while (cantidad<1 || cantidad>6){

            throw new Error("Solo se puede seleccionar hasta 6 unidades" + cantidad);
        
        }
           return cantidad;
    }

    private calcularTotal(juego: Juego, cantidad: number): number{
        return juego.getPrecio()*cantidad;
    }

    public getCantidad(): number{
        return this.cantidad;
    }
 
    public getTotal(): number{
        return this.total; 
    }


    public resumenCompra(): string{
        return "=== RESUMEN DE COMPRA ===" + "\n" +
               "Juego: "      + this.juego.getTitulo()        + "\n" +
               "Comprador: "  + this.usuario.getNombre()    + "\n" +
               "Cantidad: "   + this.cantidad                 + "\n" +
               "Total: $"     + this.total;

    }
}