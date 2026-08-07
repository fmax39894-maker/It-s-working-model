"use strict";

/*=========================================
            SPECIAL PAGE
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initSpecial();

});

function initSpecial(){

    initVideo();

    initButton();

    initViewer();

}


/*=========================================
        VIDEO
=========================================*/

function initVideo(){

    const video=document.getElementById("specialVideo");

    if(!video) return;

    video.loop=true;

    video.muted=true;

    video.playsInline=true;

    video.play().catch(()=>{});

}


/*=========================================
        MAGIC BUTTON
=========================================*/

function initButton(){

    const btn=document.getElementById("magicBtn");

    if(!btn) return;

    btn.addEventListener("click",openViewer);

}


/*=========================================
        OPEN IMAGE
=========================================*/

function openViewer(){

    const viewer=document.getElementById("specialViewer");

    const logo=document.querySelector(".gallery-logo");

    const button=document.getElementById("magicBtn");

    viewer.classList.add("active");

    if(logo){

        logo.style.display="none";

    }

    if(button){

        button.style.display="none";

    }

}


/*=========================================
        VIEWER EVENTS
=========================================*/

function initViewer(){

    const close=document.getElementById("closeSpecial");

    const viewer=document.getElementById("specialViewer");

    if(close){

        close.addEventListener("click",closeViewer);

    }

    if(viewer){

        viewer.addEventListener("click",(e)=>{

            if(e.target===viewer){

                closeViewer();

            }

        });

    }

}

/*=========================================
        CLOSE VIEWER
=========================================*/

function closeViewer(){

    const viewer=document.getElementById("specialViewer");

    const logo=document.querySelector(".gallery-logo");

    const button=document.getElementById("magicBtn");

    viewer.classList.remove("active");

    if(logo){

        logo.style.display="block";

    }

    if(button){

        button.style.display="block";

    }

}


/*=========================================
        KEYBOARD
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeViewer();

    }

});


/*=========================================
        PREVENT IMAGE DRAG
=========================================*/

const specialImage=document.getElementById("specialImage");

if(specialImage){

    specialImage.addEventListener("dragstart",(e)=>{

        e.preventDefault();

    });

}


/*=========================================
        SWIPE DOWN TO CLOSE
=========================================*/

let startY=0;

document.addEventListener("touchstart",(e)=>{

    startY=e.touches[0].clientY;

},{passive:true});

document.addEventListener("touchend",(e)=>{

    const viewer=document.getElementById("specialViewer");

    if(!viewer.classList.contains("active")) return;

    const endY=e.changedTouches[0].clientY;

    if(endY-startY>120){

        closeViewer();

    }

},{passive:true});


/*=========================================
        PAGE READY
=========================================*/

window.addEventListener("load",()=>{

    console.log(

        "%cSpecial Page Ready",

        "color:#00d4ff;font-size:18px;font-weight:bold;"

    );

});


/*=========================================
        END OF special.js
=========================================*/