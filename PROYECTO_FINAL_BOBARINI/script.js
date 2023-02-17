//Zona Variables globales
let arreglo = [];
let llave = sessionStorage.length;


//Zona html
function mostrarOpcion(opcion) {
    if (opcion === "descriptive") {
        document.getElementById("descriptive").style.display = 'flex';
        document.getElementById("inferential").style.display = 'none';
    }
    else if (opcion === "inferential") {
        document.getElementById("descriptive").style.display = 'none';
        document.getElementById("inferential").style.display = 'flex';
    }
}

function agregarElementoArreglo() {
    const valor = document.getElementById("addValues").value;
    if (valor.isNaN || valor == "") {
        alert("no ha introducido un numero");
    }
    else {
        arreglo.push(valor);
    }
}

function mostrarSerie() {
    document.getElementById("values").innerHTML = arreglo;
}

function mostrarArreglosPrevios() {
    //creo array para almacenar temporalmente arreglos previos
    let arregloMostrar = [];

    //recorro sessionStorage
    for (let i = 1; i < sessionStorage.length + 1; i++) {
        //agrego cada elemento de sessionStorage al array temporal con boton para restaurar
        arregloMostrar.push(sessionStorage.getItem(i), "<button type='button' class='btn btn-primary' onclick='restaurar(" + i + ");'>Restore</button>");
    }
    //muestro en previous el arreglo separado por espacios
    document.getElementById("previous").innerHTML = arregloMostrar.join("<br>");
    //borro resultados

}

function restaurar(valor) {
    //reemplazo arreglo 
    arreglo = sessionStorage.getItem(valor).split(",");
    mostrarSerie();
    document.getElementById("results").innerHTML = "";
}

function vaciarCaja() {
    document.getElementById("addValues").value = "";
}

function resetearArreglo() {
    llave++;
    sessionStorage.setItem(llave, arreglo)
    arreglo = [];
    document.getElementById("results").innerHTML = "";
}

function resetearUltimo() {
    arreglo.pop();
    document.getElementById("results").innerHTML = "";
}

//Zona funciones estadisticas
function mostrarArreglo() {
    //retorno arreglo ordenado de menor a mayor
    return arreglo.sort((a, b) => a - b);
}

function calcularMedia() {
    let resultado = 0;
    //calculo sumatoria de valores 
    for (let valor of arreglo) {

        resultado = resultado + Number(valor);
    }
    //divido sumatoria por el tamaño del arreglo
    return resultado / arreglo.length;
}

function calcularModa() {
    //creo array de objetos vacio
    const arrayObjetos = {}

    //pueblo objetos con array filtrado. Toma el valor del array y la cantidad de ocurrencias
    arreglo.map(
        (valor) => {
            //uso operador ternario
            arrayObjetos[valor] ? arrayObjetos[valor]++ : arrayObjetos[valor] = 1;
        }
    )
    //guardo en constante los objetos ordenados de mayor a menor por cantidad de ocurrencias
    const arrayFinal = Object.entries(arrayObjetos).sort((a, b) => b[1] - a[1]);

    //guardo en constante la cantidad de ocurrencias máxima
    const nRepeticiones = Number(arrayFinal[0][1]);
    let resultado = [];

    //recorro array en caso de series multimodales y guardo las mismas en resultado
    for (elemento of arrayFinal) {
        //uso AND
        elemento[1] == nRepeticiones && resultado.push(elemento[0]);
    }
    //retorno modas
    if (nRepeticiones == 1) {
        return "No existe moda.";
    }
    else if (resultado.length == 1) {
        return "La moda es " + resultado + ", que se repite " + nRepeticiones + " veces";
    }
    else {
        return "Las modas son " + resultado + ", que se repiten " + nRepeticiones + " veces";
    }
}

function calcularMediana() {
    let resultado = 0;

    //ordeno serie de menor a mayor
    arreglo.sort((a, b) => a - b);

    //verifico si n de serie es impar
    if (arreglo.length % 2 != 0) {
        //en caso retorno el valor del largo de la serie menos 0.5
        resultado = Number(arreglo[arreglo.length / 2 - 0.5]);
        return (resultado);
    }
    else if (arreglo.length == 2) {
        resultado = Number(arreglo[0]) + Number(arreglo[1]);
        return (resultado / 2);
    }
    else {
        //en caso de ser la serie par el valor de retorno es la media entre el valor medio de la serie y el siguiente
        resultado = Number(arreglo[arreglo.length / 2]) + Number(arreglo[(arreglo.length / 2) + 1]);
        return (resultado / 2);
    }
}

function calcularVarianza() {
    //guardo media en variable
    const media = calcularMedia(arreglo);
    let acumulado = 0;

    //calculo sumatoria de la diferencia entre los valores y la media
    for (valor of arreglo) {
        acumulado = acumulado + ((Number(valor) - media) * (Number(valor) - media));
    }

    //calculo la varianza
    return acumulado / media;
}

function desviacionEstandar() {
    //retorno calculo desviación estandar (raiz de la varianza)
    return Math.sqrt(calcularVarianza());
}

function calcular() {

    let resultado = "";
    if (arreglo.length == 0) {
        resultado = "No ingreso ningun valor.";
    }
    else {
        let media = document.getElementById("media").checked;
        let mediana = document.getElementById("mediana").checked;
        let moda = document.getElementById("moda").checked;
        let desviacion = document.getElementById("desviacion").checked;
        let varianza = document.getElementById("varianza").checked;
        let ordenada = document.getElementById("ordenada").checked;


        media ? resultado = resultado + "Media: " + calcularMedia() + "<br>" : resultado = resultado;
        mediana ? resultado = resultado + "Mediana: " + calcularMediana() + "<br>" : resultado = resultado;
        moda ? resultado = resultado + calcularModa() + "<br>" : resultado = resultado;
        varianza ? resultado = resultado + "Varianza: " + calcularVarianza() + "<br>" : resultado = resultado;
        desviacion ? resultado = resultado + "Desviacion: " + desviacionEstandar() + "<br>" : resultado = resultado;
        ordenada ? resultado = resultado + "Serie Ordenada: " + mostrarArreglo() + "<br>" : resultado = resultado;

        if (!media && !mediana && !moda && !varianza && !desviacion && !ordenada) {
            resultado = "No selecciono ninguna medida.";
        }

    }






    document.getElementById("results").innerHTML = resultado;

}

mostrarArreglosPrevios();