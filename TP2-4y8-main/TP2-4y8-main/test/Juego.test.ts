import {describe, test, expect} from "vitest";
import { Juego } from "../src/Juego";

// prueba para mostrar los datos del juego
describe("Juego", () => {
    
    test("mostrar datos del juego", () => { // verificar que mostrarDatos devuelve el formato correcto
        const juego = new Juego("Red Dead Redemption 2", "Accion", 59.99);
        
        // compara el resultado de mostrarDatos con el texto exacto
        expect (juego.mostrarDatos()).toBe("Red Dead Redemption 2 - Accion - 59.99");
    });

});