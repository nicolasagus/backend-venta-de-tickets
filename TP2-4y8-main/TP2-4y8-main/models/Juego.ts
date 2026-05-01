import { Producto } from "./Producto";
import { IComprar } from "./IComprar";

// juego hereda de producto e implementa comprar
export class Juego extends Producto implements IComprar {

    // atributo propio de juego
    private genero: string;

    constructor(titulo: string, genero: string, precio: number){
        super(titulo, precio); //llama al constructor de Producto
        this.genero = genero;
    }

    public getGenero(): string {
        return this.genero;
    }

    public comprar(): string{
        return "Juego Comprado";
    }

    // muestra los datos del juego
    public mostrarDatos(): string {
        return this.getTitulo() + " - " + this.genero + " - " + this.getPrecio();
    }
}