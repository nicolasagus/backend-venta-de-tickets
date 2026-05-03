import { Juego } from "./Juego.js";

export class Usuario {

    // el usuario tiene un nombre y una lista de juegos comprados (biblioteca)
    // encapsulamiento
    private nombre: string;
    private juegosComprados: Juego[];

    constructor(nombre: string){
        this.nombre = nombre;
        this.juegosComprados = []; // crea biblioteca vacia
    }

    public getNombre(): string {
        return this.nombre;
    }
    // sobrecarga para agregar un juego o màs juegos a la biblioteca
    public agregarJuego(juego: Juego): void;
    public agregarJuego(juego: Juego[]): void;

    // implementacion de la sobrecarga
    public agregarJuego(juego: Juego | Juego[]): void {
        // UN SOLO JUEGO
        if (juego instanceof Juego) {
            this.juegosComprados.push(juego);
        }
        else { // VARIOS JUEGOS
            let i = 0;
            while (i < juego.length) {
                this.juegosComprados.push(juego[i]);
                                // push igual a add en java
                i = i + 1;
            }
        }
    }
    // muestra los juegos comprados
    public verJuegosComprados(): Juego[] {
        return this.juegosComprados;
    }

}