"use strict";

/*=========================================
        IMAGE GALLERY
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initImageGallery();

});


function initImageGallery(){

    setupImageCards();

    setupImageViewer();

}


/*=========================================
        IMAGE CARDS
=========================================*/

function setupImageCards(){

    const cards=document.querySelectorAll(".image-card");


    cards.forEach(card=>{

        card.addEventListener("click",()=>{

            const image=card.dataset.image;

            openImage(image);

        });

    });

}


/*=========================================
        OPEN IMAGE
=========================================*/

function openImage(file){

    const viewer=document.getElementById("imageViewer");

    const image=document.getElementById("viewerImage");

    const download=document.getElementById("downloadImage");


    if(!viewer || !image) return;


    image.src=file;


    if(download){

        download.href=file;

    }


    viewer.classList.add("active");


    const logo=document.querySelector(".logo");

    if(logo){

        logo.style.display="none";

    }


    const nav=document.querySelector(".bottom-nav");

    if(nav){

        nav.style.display="none";

    }

}

/*=========================================
        IMAGE VIEWER
=========================================*/

function setupImageViewer(){

    const viewer=document.getElementById("imageViewer");

    const image=document.getElementById("viewerImage");

    const close=document.querySelector(".close-viewer");


    if(!viewer || !image || !close) return;


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


    if(!viewer || !image) return;


    image.src="";


    viewer.classList.remove("active");


    const logo=document.querySelector(".logo");

    if(logo){

        logo.style.display="block";

    }


    const nav=document.querySelector(".bottom-nav");

    if(nav){

        nav.style.display="flex";

    }

}

/*=========================================
        SWIPE DOWN TO CLOSE
=========================================*/

let imageStartY=0;

document.addEventListener("touchstart",(e)=>{

    if(e.touches.length){

        imageStartY=e.touches[0].clientY;

    }

},{passive:true});


document.addEventListener("touchend",(e)=>{

    if(e.changedTouches.length){

        const imageEndY=e.changedTouches[0].clientY;

        if(imageEndY-imageStartY>120){

            closeImage();

        }

    }

},{passive:true});


/*=========================================
        KEYBOARD CONTROLS
=========================================*/

document.addEventListener("keydown",(e)=>{

    const viewer=document.getElementById("imageViewer");

    if(!viewer || !viewer.classList.contains("active")) return;


    if(e.key==="Escape"){

        closeImage();

    }

});


/*=========================================
        IMAGE LOADED
=========================================*/

const viewerImage=document.getElementById("viewerImage");

if(viewerImage){

    viewerImage.addEventListener("load",()=>{

        viewerImage.style.opacity="1";

    });

}


/*=========================================
        READY
=========================================*/

console.log(

"%cImage Gallery Ready",

"color:#00d4ff;font-size:18px;font-weight:bold"

);