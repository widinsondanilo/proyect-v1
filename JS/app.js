const ingresos = [
    

];

const egresos = [
   

];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
    generarGraficos(obtenerDatosGrafico());
}

let obtenerDatosGrafico = () => {
    let totalIngresosValor = totalIngresos();
    let totalEgresosValor = totalEgresos();

    return {
        labels: ['Ingresos', 'Egresos'],
        datos: [totalIngresosValor, totalEgresosValor],
    };
};

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
};


const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString("en-US", {style:"percent", minimumFractionDigits: 2});
}

const cargarIngresos = ()=>{
    let ingresosHTML = "";
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
    generarGraficos(obtenerDatosGrafico());
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div><br>
            <div class="elemento_nombre">${ingreso.nombre}</div> 
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_fecha">${formatoFecha(ingreso.fecha)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
    return ingresoHTML;
};

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = ()=>{
    let egresosHTML = "";
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
    generarGraficos(obtenerDatosGrafico());
    
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div><br>
        <div class="elemento_nombre">${egreso.nombre}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
            <div class="elemento_fecha">${formatoFecha(egreso.fecha)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
`;
return egresoHTML;
};

let eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}
let agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let nombre = forma["nombre"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];

    let fechaActual = new Date();

    if (nombre.value.trim() !== "" && descripcion.value.trim() !== "" && !isNaN(valor.value) && valor.value > 0) {
        if (tipo.value === "ingreso") {
            ingresos.push(new Ingreso(descripcion.value, +valor.value, fechaActual, nombre.value));
            cargarCabecero();
            cargarIngresos();
            generarGraficos(obtenerDatosGrafico());
        } else if (tipo.value === "egreso") {
            egresos.push(new Egreso(descripcion.value, +valor.value, fechaActual, nombre.value));
            cargarCabecero();
            cargarEgresos();
            generarGraficos(obtenerDatosGrafico());
        }
    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
}
const formatoFecha = (fecha) => {
    const opcionesFecha = { year: 'numeric', month: 'short', day: 'numeric' };
    return fecha.toLocaleDateString('es-GT', opcionesFecha);
};
let mostrarEstadisticas = () => {
    let totalIngresosValor = totalIngresos();
    let totalEgresosValor = totalEgresos();
    let presupuesto = totalIngresosValor - totalEgresosValor;
    let porcentajeEgreso = totalEgresosValor / totalIngresosValor;

    document.getElementById("totalIngresos").innerHTML = formatoMoneda(totalIngresosValor);
    document.getElementById("totalEgresos").innerHTML = formatoMoneda(totalEgresosValor);
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
};
let generarGraficos = (datos) => {
    
    let contexto = document.getElementById('graficoIngresosEgresos').getContext('2d');

   
    if (window.grafico) {
       
        window.grafico.data.labels = datos.labels;
        window.grafico.data.datasets[0].data = datos.datos;
        window.grafico.update(); 
    } else {
      
        window.grafico = new Chart(contexto, {
            type: 'pie',
            data: {
                labels: datos.labels,
                datasets: [{
                    label: 'Ingresos y Egresos',
                    data: datos.datos,
                    backgroundColor: ['green', 'red'],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });
    }
};