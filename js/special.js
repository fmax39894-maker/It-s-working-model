"use strict";

/*=========================================
        SPECIAL PAGE
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initSpecial();

});


/*=========================================
        INITIALIZE
=========================================*/

function initSpecial(){

    const button=
    document.getElementById("getSpecialBtn");

    if(!button) return;


    button.addEventListener("click",()=>{

        showSpecial();

    });

}


/*=========================================
        SHOW SPECIAL
=========================================*/

function showSpecial(){

    const result=
    document.getElementById("specialResult");

    if(!result) return;


    result.innerHTML=`

        <div class="special-popup">

            <button
            class="special-close"
            type="button">

                ✕

            </button>


            <div class="special-popup-icon">

                ✨

            </div>


            <h2>

                Special Content

            </h2>


            <p>

                Your special content will appear here.

            </p>

        </div>

    `;


    result.style.display="flex";


    const close=
    result.querySelector(".special-close");


    if(close){

        close.addEventListener("click",()=>{

            closeSpecial();

        });

    }

}


/*=========================================
        CLOSE SPECIAL
=========================================*/

function closeSpecial(){

    const result=
    document.getElementById("specialResult");

    if(!result) return;


    result.style.display="none";

    result.innerHTML="";

}


/*=========================================
        CLICK OUTSIDE
=========================================*/

document.addEventListener("click",(e)=>{

    const result=
    document.getElementById("specialResult");


    if(!result) return;


    if(
        result.style.display==="flex" &&
        e.target===result
    ){

        closeSpecial();

    }

});


/*=========================================
        ESCAPE
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeSpecial();

    }

});


/*=========================================
        READY
=========================================*/

console.log(

"%cSpecial Page Ready",

"color:#00d4ff;font-size:18px;font-weight:bold;"

);