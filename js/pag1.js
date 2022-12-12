"use strict"

window.onload = ()=>{
    let vetBottoni = document.querySelectorAll("button");
    vetBottoni[0].addEventListener("click", muoviLumache3);
}

//SOLUZIONE SENZA POSITION.ABSOLUTE
function muoviLumache3(){
    let linea = document.querySelector("#contenitore > hr");
    //Per trovare la coordinata Y della linea posso usare position top o la seguente funzione
    let lineaY = linea.getBoundingClientRect().top;

    let lumache = document.querySelectorAll("#contenitore > div");
    let timer = [];
    let distanze = [];
    for(let j=0; j< lumache.length; j++){
        distanze[j] = 0;
        lumache[j].style.bottom = distanze[j] + "px";
        timer[j] = setInterval(function () {
            //Aggiorno la distanza
            distanze[j] += 50;
            lumache[j].style.bottom = distanze[j] + "px";
            //Controllo se ho raggiunto il traguardo e fermo il timer
            if((lumache[j].getBoundingClientRect().top-lineaY) <= 0){
                console.log(new Date());//In questo modo posso preparare una classifica
                clearInterval(timer[j]); //Fermo 1 timer
            }
        }, genera(50,500));
    }    
}


function genera(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}