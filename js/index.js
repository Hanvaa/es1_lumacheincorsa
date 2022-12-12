"use strict"

window.onload = ()=>{
    let vetBottoni = document.querySelectorAll("button");

    vetBottoni[0].addEventListener("click", muoviLumache);
    vetBottoni[1].addEventListener("click", muoviLumache2);
    vetBottoni[2].addEventListener("click", muoviLumache3);
    vetBottoni[3].addEventListener("click", muoviLumache4);
}

//SOLUZIONE CON PROMISE
function muoviLumache4(){
    let linea = document.querySelector("#contenitore > hr");
    //Per trovare la coordinata Y della linea posso usare position top o la seguente funzione
    let lineaY = linea.getBoundingClientRect().top;

    let lumache = document.querySelectorAll("#contenitore > img");
    let distanze = [];
    for(let j=0; j< lumache.length; j++){
        distanze[j] = 0;
        lumache[j].style.marginBottom = distanze[j] + "px";
        while((lumache[j].getBoundingClientRect().top-lineaY) > 0){
            //sposto la lumaca
            distanze[j] += 50;
            lumache[j].style.marginBottom = distanze[j] + "px";
            //wait genera(50,500)
            //Grazie alla promise, il codice verrà bloccato alla riga 31
            //fino alla terminazione della funzione richiamata dentro la Promise
            let wait = new Promise(function(resolve){
                //Richiamo la funzione in modo asincrono
                setTimeout(function(){
                    resolve();//Rilascio il semaforo definito dalla Promise
                },genera(50,500));
            });
        }
        console.log("Lumaca " + j + " è arrivata al traguardo");
    } 
}


//SOLUZIONE CON POSITION.ABSOLUTE
function muoviLumache3(){
    window.location = "pag1.html";
}

//SOLUZIONE SENZA POSITION.ABSOLUTE
function muoviLumache2(){
    let linea = document.querySelector("#contenitore > hr");
    //Per trovare la coordinata Y della linea posso usare position top o la seguente funzione
    let lineaY = linea.getBoundingClientRect().top;

    let lumache = document.querySelectorAll("#contenitore > img");
    let timer = [];
    let distanze = [];
    for(let j=0; j< lumache.length; j++){
        distanze[j] = 0;
        lumache[j].style.marginBottom = distanze[j] + "px";
        timer[j] = setInterval(function () {
            //Aggiorno la distanza
            distanze[j] += 50;
            lumache[j].style.marginBottom = distanze[j] + "px";
            //Controllo se ho raggiunto il traguardo e fermo il timer
            if((lumache[j].getBoundingClientRect().top-lineaY) <= 0){
                console.log(new Date());//In questo modo posso preparare una classifica
                clearInterval(timer[j]); //Fermo 1 timer
            }
        }, genera(50,500));
    }    
}

//SOLUZIONE DI DOCI modificata (gestione del TRAGUARDO e TERMINAZIONE setInterval)
function muoviLumache(){
    let linea = document.querySelector("#contenitore > hr");
    //Per trovare la coordinata Y della linea posso usare position top o la seguente funzione
    let lineaY = linea.getBoundingClientRect().top;
    let i=0;

    let imma = document.querySelectorAll("#contenitore > img");
    let t1 = genera(1,10)*10;
    let t2 = genera(1,10)*10;
    let t3 = genera(1,10)*10;
    let t4 = genera(1,10)*10;
    let t5 = genera(1,10)*10;

    /* DIVERSAMENTE DA setTimeout, setInterval riavvia il timer  
        allo scadere del tempo dopo l'esecuzione della funzione associata 
        DEVE PERCIO' ESSERE FERMATA AD UN CERTO PUTNO   */
    let timer = setInterval(function () {
        imma[0].style.marginBottom=t1 +"px";
        imma[1].style.marginBottom=t2 +"px";
        imma[2].style.marginBottom=t3 +"px";
        imma[3].style.marginBottom=t4 +"px";
        imma[4].style.marginBottom=t5 +"px";

        //Controllo se ho superato il traguardo
        i=0;
        while(i<imma.length && (imma[i].getBoundingClientRect().top-lineaY) > 0){
            i++;
        }
        if(i<imma.length)
            clearInterval(timer);

        //Aggiorna lo spazio percorso
        t1*=2
        t2*=2
        t3*=2
        t4*=2
        t5*=2
    }, 700);
}


function genera(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}