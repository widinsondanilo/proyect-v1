class Egreso extends Dato {
    constructor(descripcion, valor, fecha, nombre) {
        super(descripcion, valor, fecha);
        this._nombre = nombre;
    }

    get nombre() {
        return this._nombre;
    }
}