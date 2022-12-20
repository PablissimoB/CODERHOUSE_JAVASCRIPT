function calcularMedia(tamanio){
    let resultado =0;
    
    //calculo sumatoria de valores
    for(i=0; i <tamanio; i++){
        resultado = resultado + Number(prompt("ingrese el valor " + (i+1)));
    }

    //calculo media
    return resultado / tamanio;
}

function mostrarArreglo(tamanio){
    
    let stringValores ="";
    
    for(i=0; i <tamanio; i++){
        let valor = Number(prompt("ingrese el valor "+(i+1)));
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
        let valor = Number(prompt("ingrese el valor de 1 cifra " + (i+1)));
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

    //retorno calculo desviación estandar

    return resultado = Math.sqrt(resultado);
}

function programa(){
    
    let operacion = Number(prompt("ingrese 1 para calcular la media, 2 para mostrar arreglo, 3 desviacion estandar de 1 cifra y 0 o vacio para salir"));

    do{
        let n;

         //verifico si operacion es opcion correcta        
         while(operacion>4){
            alert ("El dígito ingresado no se corresponde con ninguna opción");
            operacion = Number(prompt("ingrese 1 para calcular la media, 2 para mostrar arreglo, 3 desviacion estandar de 1 cifra y 0 o vacio para salir"));
         }

         n = Number(prompt("ingrese la cantidad de números con el que va a operar (n)"));

         while(n==0){
             alert("El tamaño de la muestra debe ser mayor a 0");
             n = Number(prompt("ingrese la cantidad de números con el que va a operar (n)"));
         }

         switch (operacion) {
             case 1: alert( "La media es " + calcularMedia(n));
                 break;
             case 2: alert("El arreglo es : " + mostrarArreglo(n));
                 break;
             case 3: alert("La desviación estándar es : " + desviacionEstandar(n));
                 break;
             }
        operacion = Number(prompt("ingrese 1 para calcular la media, 2 para mostrar arreglo, 3 desviacion estandar de 1 cifra o 0 para salir"));
    }
    while(operacion !=0)
        
    alert("Hasta luego");
}



programa();