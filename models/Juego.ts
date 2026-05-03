import { Producto } from './Producto.js';
import { IComprar } from './IComprar.js';

// Juego hereda de producto e implementa comprar
export class Juego extends Producto implements IComprar {

    // atributo propio de juego original
    private genero: string;
    
    // NUEVOS atributos pedidos por tu grupo para la Base de Datos
    public id?: string;
    public descripcion: string;
    public imagen: string;
    public habilitado: boolean;

    // Actualizamos el constructor para recibir los datos nuevos
    constructor(titulo: string, genero: string, precio: number, descripcion: string = "", imagen: string = "") {
        super(titulo, precio); // llama al constructor de Producto
        this.genero = genero;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.habilitado = true; // Por defecto lo dejamos habilitado al crearlo
    }

    public getGenero(): string {
        return this.genero;
    }

    public comprar(): string {
        return "Juego Comprado";
    }

    // muestra los datos del juego
    public mostrarDatos(): string {
        return this.getTitulo() + " - " + this.genero + " - " + this.getPrecio();
    }
}