//---------------Zona Variables globales---------------
let arreglo = [];
let llave = localStorage.length;


//---------------Zona html---------------
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
        Swal.fire({
            icon: 'error',
            background: 'black',
            text: "No ha introducido un numero",
            confirmButtonColor: 'red'
        });
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

    //recorro localStorage
    for (let i = 1; i < localStorage.length + 1; i++) {
        //agrego cada elemento de localStorage al array temporal con boton para restaurar
        arregloMostrar.push(localStorage.getItem(i), "<button type='button' class='btn btn-primary' onclick='restaurar(" + i + ");'>Restore</button>");
    }
    //muestro en previous el arreglo separado por espacios
    document.getElementById("previous").innerHTML = arregloMostrar.join("<br>");
    //borro resultados

}

function restaurar(valor) {
    //reemplazo arreglo 
    arreglo = localStorage.getItem(valor).split(",");
    mostrarSerie();
    document.getElementById("results").innerHTML = "";
}

function vaciarCaja() {
    document.getElementById("addValues").value = "";
}

function resetearArreglo() {
    llave++;
    localStorage.setItem(llave, arreglo)
    arreglo = [];
    document.getElementById("results").innerHTML = "";
}

function resetearUltimo() {
    arreglo.pop();
    document.getElementById("results").innerHTML = "";
}

function cambiarRadio() {
    let tipoPoblacion = document.getElementById("poblacion").checked;
    if (tipoPoblacion) {
        document.getElementById("labelDinamica").innerHTML = "Infinite Population";
        document.getElementById("populationSize").style.display = 'none';
    }
    else {
        document.getElementById("labelDinamica").innerHTML = "Finite Population";
        document.getElementById("populationSize").style.display = 'flex';
    }

}

function mostrarGrafico(x, limI, limS, a, laterality) {

    //dependiendo de lateralidad se definen valores de y
    let yValues2;
    if (laterality == "Bilateral") {
        yValues2 = [NaN, NaN, Math.round((a / 2 * 100)), 50, Math.round((a / 2 * 100)), NaN, NaN];
    }
    else if (laterality == "Derecha") {
        yValues2 = [10, 25, Math.round((a / 2 * 100), -2), 50, Math.round((a / 2 * 100)), NaN, NaN];
    }
    else {
        yValues2 = [NaN, NaN, Math.round((a / 2 * 100)), 50, Math.round((a / 2 * 100)), 25, 10];
    }


    //calculo 1 deciles, 1 cuartil, limite inferior, media, limite superior, 3 cuartil y 9 decil
    let xValues1 = [x / 10, x / 2, Math.round(limI * 100) / 100, x, Math.round(limS * 100) / 100, (Number(x) + Number(x / 2)), (Number(x) + Number((x / 10) * 4))];

    //calculo valores de Y (frecuencias absolutas) para las medidas de x
    let yValues1 = [10, 25, Math.round((a / 2 * 100)), 50, Math.round((a / 2 * 100)), 25, 10];

    //uso de libreria chart
    let chartInferential = new Chart("chartInferential", {
        type: "line",
        data: {
            labels: xValues1,
            datasets: [
                {
                    data: yValues2,
                    borderColor: "blue",
                    backgroundColor: "blue",
                    fill: true,
                    label: 'Acceptance',

                }
                ,
                {
                    data: yValues1,
                    borderColor: "blue",
                    fill: false,
                    label: 'Reject',
                }
            ]

        },

        options: {
            legend: { display: true },
            tooltips: { enabled: false }
        }
    });
}


//---------------Zona funciones estadistica descriptiva---------------
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

//---------------Zona funciones estadistica inferencial---------------
function ejecutarInferencia() {

    //obtengo valor de los elementos HTML
    let radio = document.getElementsByName("level");
    let n = document.getElementById("nI").value;
    let x = document.getElementById("xI").value;
    let s = document.getElementById("sI").value;
    let np = document.getElementById("nP").value;
    let population = document.getElementById("poblacion").checked;
    let radio2 = document.getElementsByName("lateral");
    let laterality;
    let a;

    if (x.isNaN || x == "" || n.isNaN || n == "" || s.isNaN || s == "") {
        Swal.fire({
            icon: 'error',
            background: 'black',
            text: "No ha introducido los valores necesarios",
            confirmButtonColor: 'red'
        });
    }
    else {
        //recorro grupo de radio para ver cual es el valor de a
        for (i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                a = radio[i].value;
            }
        }

        //Veo lateralidad
        for (i = 0; i < radio2.length; i++) {
            if (radio2[i].checked) {
                laterality = radio2[i].value;
            }
        }

        //Aplico fetch
        fetch('./confidenceLevel.json')
            .then(r1 => r1.json())

            //llamo a funcion de calcularInferencia2 y le paso como parametro el array encontrado
            .then(arregloZ => calcularInferencia2((arregloZ.filter(res => res.a === a)), n, x, s, population, np, laterality))
            .catch("error");
    }



}

//Hace los calculos propiamente dichos
function calcularInferencia2(arr, n, x, s, population, np, laterality) {

    //valor z
    let z = arr[0].z;
    let a = arr[0].a;
    let errorStandard;
    let limiteInferior;
    let limiteSuperior;

    //verifico si es poblacion finita o infinita

    if (population) {
        let correccion;
        //calculo error standard
        errorStandard = s / Math.sqrt(n);

        //calculo correccion
        correccion = errorStandard * z;

        limiteInferior = x - correccion;
        limiteSuperior = Number(x) + Number(correccion);

    }
    else {
        let correccion;
        //calculo error standard
        errorStandard = (s / Math.sqrt(n)) * (Math.sqrt((np - n) / (np - 1)));

        //calculo correccion
        correccion = errorStandard * z

        limiteInferior = x - correccion;
        limiteSuperior = Number(x) + Number(correccion);

    }

    //muestra resultados y da posibilidad de analizar si un valor esta en la zona de aceptación

    //genero grafico
    mostrarGrafico(x, limiteInferior, limiteSuperior, a, laterality);

    //informo limite segun lateralidad
    switch (laterality) {
        case "Derecha": limiteInferior = 0;
            break;
        case "Izquierda": limiteSuperior = 0;
            break;
    }
    limiteInferior = limiteInferior > 0 ? limiteInferior : "no tiene limite inferior";
    limiteSuperior = limiteSuperior > 0 ? limiteSuperior : "no tiene limite superior";

    document.getElementById("resultsI").innerHTML =
        //muestro limites
        "<h2> Zona de Aceptacion </h2>" +
        "<br>" +
        "Limite Inferior: " + limiteInferior +
        "<br>" +
        " Limite Superior: " + limiteSuperior;

}

mostrarArreglosPrevios();