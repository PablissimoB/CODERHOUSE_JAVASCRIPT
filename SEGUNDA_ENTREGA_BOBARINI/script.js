function calcularMedia(arreglo){
    let resultado =0;
    //calculo sumatoria de valores 
    for (let valor of arreglo){
        resultado = resultado + valor;
    }
    //divido sumatoria por el tamaño del arreglo
    return resultado / arreglo.length;
}

function mostrarArreglo(arreglo){
    //retorno arreglo ordenado de menor a mayor
    return arreglo.sort((a,b) => a -b);
}

function calcularModa(arreglo){
    //creo array de objetos vacio
    const arrayObjetos = {}

    //pueblo objetos con array filtrado. Toma el valor del array y la cantidad de ocurrencias
    arreglo.map(
        (valor) => {
            if(arrayObjetos [valor]){
                arrayObjetos [valor] ++;
            }
            else{
                arrayObjetos [valor] =1;
            }
        }
    )

    //guardo en constante los objetos ordenados de mayor a menor por cantidad de ocurrencias
    const arrayFinal = Object.entries(arrayObjetos).sort((a,b) => b[1] -a[1]);

    //guardo en constante la cantidad de ocurrencias máxima
    const nRepeticiones = Number(arrayFinal[0][1] );
    
    let resultado = [];

    //recorro array en caso de series multimodales y guardo las mismas en resultado
    for(elemento of arrayFinal){
        if(elemento [1] == nRepeticiones){
            resultado.push(elemento [0]);
        }
    }

    //retorno modas
    if(nRepeticiones ==1){
        return "No existe moda.";    
    }
    else if (resultado.length ==1){
        return "La moda es " + resultado + ", que se repite " + nRepeticiones + " veces";
    }
    else{
        return "Las modas son " +   resultado   + ", que se repiten " + nRepeticiones + " veces";
    }
}

function calcularMediana(arreglo){
    let resultado =0;

    //ordeno serie de menor a mayor
    arreglo.sort((a,b) => a -b);

    //verifico si n de serie es impar
    if(arreglo.length %2 != 0){
        //en caso retorno el valor del largo de la serie menos 0.5
        resultado = arreglo[arreglo.length/2-0.5];
        return (resultado);
    }
    else{
        //en caso de ser la serie par el valor de retorno es la media entre el valor medio de la serie y el siguiente
        resultado = arreglo[arreglo.length/2]+arreglo[(arreglo.length/2)+1];
        return (resultado/2);
    }
}

function resetearArreglo(){
    let agregar = 0
    let i = 0;
    let arreglo = [];

    //mientras la opción sea 1 pide un nuevo valor para la serie
    do{
        let valor = Number(prompt("ingrese el valor n° " + (i+1)));
        arreglo.push(valor)
        agregar = Number(prompt("Desea agregar otro valor (0 no 1 si)" ));
        i++;
        while(agregar != 0 && agregar !=1){
            agregar = Number(prompt("Opción incorrecta. Desea agregar otro valor (0 no 1 si)" ));
        }
    }    
    while(agregar)
    return arreglo;
}


function desviacionEstandar(arreglo){
    
    //guardo media en variable
    const media = calcularMedia(arreglo);
    let acumulado = 0;

    //calculo sumatoria de la diferencia entre los valores y la media
    for(valor of arreglo){
        acumulado = acumulado + ((valor - media) * (valor - media));
    }

    //calculo la varianza
    let varianza = acumulado / media;

    //retorno calculo desviación estandar (raiz de la varianza)
    return Math.sqrt(varianza);
}

function programa(){
    
    let agregar = 0
    let i = 0;
    let arreglo = [];

    //mientras la opción sea 1 pide un nuevo valor para la serie
    do{
        let valor = Number(prompt("ingrese el valor n° " + (i+1)));
        arreglo.push(valor)
        agregar = Number(prompt("Desea agregar otro valor (0 no 1 si)" ));
        i++;
        //verifico si la opción es correcta
        while(agregar != 0 && agregar !=1){
            agregar = Number(prompt("Opción incorrecta. Desea agregar otro valor (0 no 1 si)" ));
        }
    }    
    while(agregar)

    let operacion = Number(prompt("ingrese 1 para calcular la media, 2 para mostrar arreglo ordenado, 3 calcular moda, 4 calcular mediana, 5 desviacion estandar, 6 resetear arreglo, 0 o vacio para salir"));

    do{
        //al hacer un do...while primero verifico si la opcion es 0 para, en caso de serlo, salir del loop
        if(operacion ==0){
            break;
        }

         //verifico si operacion es opcion correcta        
         while(operacion>8){
            alert ("El dígito ingresado no se corresponde con ninguna opción");
            operacion = Number(prompt("ingrese 1 para calcular la media, 2 para mostrar arreglo ordenado, 3 calcular moda, 4 calcular mediana, 5 desviacion estandar, 6 resetear arreglo, 0 o vacio para salir"));
         }
         

         //dependiendo de operacion muestro el resultado
         switch (operacion) {
             case 1: alert( "La media es " + calcularMedia(arreglo));
                 break;
             case 2: alert("El arreglo ordenado de menor a mayor es : " + mostrarArreglo(arreglo));
                 break;
             case 3: alert(calcularModa(arreglo));
                 break;
             case 4: alert("La Mediana es: " + calcularMediana(arreglo));
                 break;
             case 5: alert("La desviación estándar es : " + desviacionEstandar(arreglo));
                 break;
             case 6: arreglo = resetearArreglo();
                 break;
             }
        
        //vuelvo a consultar por otra operación
        operacion = Number(prompt("ingrese 1 para calcular la media, 2 para mostrar arreglo ordenado, 3 calcular moda, 4 calcular mediana, 5 desviacion estandar, 6 resetear arreglo, 0 o vacio para salir"));
    }
    while(operacion !=0)
    
    //Sale del loop y muestra mensaje de saludo
    alert("Hasta luego");
}

programa();