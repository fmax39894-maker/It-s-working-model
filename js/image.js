"use strict";

/*=========================================
        IMAGE GALLERY
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initImageGallery();

});


function initImageGallery(){

    bindImageCards();

    bindImageViewer();

}


/*=========================================
        IMAGE CARDS
=========================================*/

function bindImageCards(){

    const cards=document.querySelectorAll(".image-card");

    cards.forEach(card=>{

        card.addEventListener("click",()=>{

            const image=card.querySelector("img");

            if(!image) return;

            openImage(image.src);

        });

    });

}


/*=========================================
        OPEN IMAGE
=========================================*/

function openImage(src){

    const viewer=document.getElementById("imageViewer");

    const image=document.getElementById("viewerImage");

    const download=document.getElementById("downloadImage");

    if(!viewer || !image) return;


    image.src=src;


    if(download){

        download.href=src;

    }


    viewer.classList.add("active");


    /* Hide logo */

    const logo=document.querySelector(".gallery-header .logo");

    if(logo){

        logo.style.display="none";

    }


    /* Hide navigation */

    const nav=document.querySelector(".bottom-nav");

    if(nav){

        nav.style.display="none";

    }

}


/*=========================================
        VIEWER
=========================================*/

function bindImageViewer(){

    const viewer=document.getElementById("imageViewer");

    const close=document.querySelector(".close-viewer");


    if(!viewer || !close) return;


    close.addEventListener("click",()=>{

        closeImage();

    });


    viewer.addEventListener("click",(e)=>{

        if(e.target===viewer){

            closeImage();

        }

    });

}


/*=========================================
        CLOSE IMAGE
=========================================*/

function closeImage(){

    const viewer=document.getElementById("imageViewer");

    const image=document.getElementById("viewerImage");


    if(!viewer) return;


    viewer.classList.remove("active");


    if(image){

        image.src="";

    }


    /* Restore logo */

    const logo=document.querySelector(".gallery-header .logo");

    if(logo){

        logo.style.display="block";

    }


    /* Restore navigation */

    const nav=document.querySelector(".bottom-nav");

    if(nav){

        nav.style.display="flex";

    }

}


/*=========================================
        SWIPE DOWN
=========================================*/

let startY=0;


document.addEventListener("touchstart",(e)=>{

    if(e.touches.length){

        startY=e.touches[0].clientY;

    }

},{passive:true});


document.addEventListener("touchend",(e)=>{

    if(e.changedTouches.length){

        const endY=e.changedTouches[0].clientY;

        if(endY-startY>120){

            const viewer=document.getElementById("imageViewer");

            if(
                viewer &&
                viewer.classList.contains("active")
            ){

                closeImage();

            }

        }

    }

},{passive:true});


/*=========================================
        ESCAPE KEY
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key!=="Escape") return;


    const viewer=document.getElementById("imageViewer");


    if(
        viewer &&
        viewer.classList.contains("active")
    ){

        closeImage();

    }

});


/*=========================================
        READY
=========================================*/

console.log(

"%cImage Gallery Ready",

"color:#00d4ff;font-size:18px;font-weight:bold;"

);