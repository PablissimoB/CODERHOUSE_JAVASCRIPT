function calcularMedia(tamanio){
    let resultado =0;
    
    //calculo sumatoria de valores
    for(i=0; i <tamanio; i++){
        resultado = resultado + Number(prompt("ingrese el valor n° " + (i+1)));
    }

    //calculo media
    return resultado / tamanio;
}

function mostrarArreglo(tamanio){
    
    let stringValores ="";
    
    //almaceno valores en un string separado por comas
    for(i=0; i <tamanio; i++){
        let valor = Number(prompt("ingrese el valor n° "+(i+1)));
        stringValores = stringValores + valor + "," ;
        
    }
        return stringValores;
}

function desviacionEstandar(tamanio){
    
    //como todavia no vimos arrays limito calculo de la desviacion estandar a solo 1 cifra
    let resultado =0;
    let sumatoria =0;
    let media = 0;
    let stringValores ="";
    
    //calculo media - guardo valores
    for(i=0; i <tamanio; i++){
        let valor = Number(prompt(`ingrese el valor n° ${(i+1)} de 1 cifra`));
        stringValores = stringValores + valor;
        resultado = resultado + valor;
    }
    
    media = resultado / tamanio;

    //calculo sumatoria de la diferencia entre los valores y la media
    for(x = 0; x < stringValores.length; x++){
        
        let aux = stringValores.substr(x,1);
        sumatoria = sumatoria + ( (aux-media) * (aux-media) );
    }

    //calculo la varianza
    resultado = sumatoria / media;

    //retorno calculo desviación estandar (raiz de la varianza)
    return resultado = Math.sqrt(resultado);
}

function programa(){
    
    let operacion = Number(prompt("ingrese 1 para calcular la media, 2 para mostrar arreglo, 3 desviacion estandar de 1 cifra y 0 o vacio para salir"));

    do{
        //al hacer un do...while primero verifico si la opcion es 0 para, en caso de serlo, salir del loop
        if(operacion ==0){
            break;
        }

         //verifico si operacion es opcion correcta        
         while(operacion>4){
            alert ("El dígito ingresado no se corresponde con ninguna opción");
            operacion = Number(prompt("ingrese 1 para calcular la media, 2 para mostrar arreglo, 3 desviacion estandar de 1 cifra y 0 o vacio para salir"));
         }
         let n;
         n = Number(prompt("ingrese la cantidad de números con el que va a operar (n)"));

         //verifico si n es menor o igual a 0
         while(n<=0){
             alert("El tamaño de la muestra debe ser mayor a 0");
             n = Number(prompt("ingrese la cantidad de números con el que va a operar (n)"));
         }

         //dependiendo de operacion muestro el resultado
         switch (operacion) {
             case 1: alert( "La media es " + calcularMedia(n));
                 break;
             case 2: alert("El arreglo es : " + mostrarArreglo(n));
                 break;
             case 3: alert("La desviación estándar es : " + desviacionEstandar(n));
                 break;
             }
        
        //vuelvo a consultar por otra operación
        operacion = Number(prompt("ingrese 1 para calcular la media, 2 para mostrar arreglo, 3 desviacion estandar de 1 cifra o 0 para salir"));
    }
    while(operacion !=0)
    
    //Sale del loop y muestra mensaje de saludo
    alert("Hasta luego");
}

programa();