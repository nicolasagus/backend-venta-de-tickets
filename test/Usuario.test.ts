import { describe, test, expect } from "vitest";
import { Usuario } from "../models/Usuario.js";
import { Juego } from "../models/Juego.js";

describe ("Usuario", () => { 
    
    // prueba para agregar un juego a la biblioteca
    test("agregar un juego a la biblioteca del usuario", () => {
        const usuario = new Usuario("Aylen");
        const juego1 = new Juego("Avatar: Frontiers of Pandora", "Aventura", 23.99);
        
        usuario.agregarJuego(juego1);

        // espera que el juego agregado sea igual a juego1
        expect(usuario.verJuegosComprados()).toEqual([juego1]);
    });

    // agregar varios juegos a la biblioteca
    test("agregar dos juegos a la biblioteca del usuario", () => {
        const usuario = new Usuario("Aylen");

        const juego2 = new Juego("Red Dead Redemption 2", "Accion", 59.99);
        const juego3 = new Juego("Cyberpunk 2077", "RPG", 44.99);

        usuario.agregarJuego([juego2, juego3]); // agrega los juegos 
        
        // espera que los juegos agregados sean iguales a juego2 y juego3
        expect(usuario.verJuegosComprados()).toEqual([juego2, juego3]);
    });
    
});