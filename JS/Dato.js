class Dato {
    constructor(descripcion, valor, fecha) {
        this._descripcion = descripcion;
        this._valor = valor;
        this._fecha = fecha || new Date(); 
    }

    get descripcion() {
        return this._descripcion;
    }

    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }

    get valor() {
        return this._valor;
    }

    set valor(valor) {
        this._valor = valor;
    }

    get fecha() {
        return this._fecha;
    }

    set fecha(fecha) {
        this._fecha = fecha;
    }
}



function createFamily() {
    const familyName = document.getElementById('family-name').value;
    const familyMembers = parseInt(document.getElementById('family-members').value, 10);

    if (!familyName || isNaN(familyMembers) || familyMembers < 1) {
        alert('Por favor, completa todos los campos de la familia.');
        return;
    }

    const family = {
        name: familyName,
        members: familyMembers
    };

    alert(`Familia "${family.name}" creada con éxito. aga click en inciar secion con su usurio y contraseña para ingresar al sistema`);
}