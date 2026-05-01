// sirve como clase padre para los productos que se van a vender
export abstract class Producto{
    
    // todos los productos tienen un titulo y un precio
    // encapsulamiento
    private titulo: string;
    private precio: number;

    constructor(titulo: string, precio: number){
        this.titulo = titulo;
        this.precio = precio;
    }

    // doble encapsulamiento
    public getTitulo(): string{
        return this.titulo;
    }

    public getPrecio(): number{
        return this.precio;
    }

    public abstract mostrarDatos(): string;

}