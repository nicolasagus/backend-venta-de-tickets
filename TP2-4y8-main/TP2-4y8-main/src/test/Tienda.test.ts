import {describe, test, expect} from "vitest";
import {Juego} from "../src/Juego";
import {Tienda} from "../src/Tienda";

describe ("Tienda", () => { // prueba para agregar un juego a la tienda/catalogo
    test("agregar juego a la tienda", () => {
    
        const tienda = new Tienda();
        const juego1 = new Juego("Avatar: Frontiers of Pandora", "Aventura", 23.99);
        
        tienda.agregarJuego(juego1); // agrega el juego al catalogo

        // busca el juego por nombre y compara el resultado con el juego agregado
        expect(tienda.buscarJuego("Avatar: Frontiers of Pandora")).toEqual([juego1]);
    });

});