"use strict";

/*=========================================
            IMAGE GALLERY
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initImages();

});

const images=[

{
title:"Image 1",
file:"assets/images/image1.png"
},

{
title:"Image 2",
file:"assets/images/image2.png"
},

{
title:"Image 3",
file:"assets/images/image3.png"
},

{
title:"Image 4",
file:"assets/images/image4.png"
}

];

let currentIndex=0;


/*=========================================
        INITIALIZE
=========================================*/

function initImages(){

    bindImages();

    bindViewer();

}


/*=========================================
        IMAGE CLICK
=========================================*/

function bindImages(){

    document

    .querySelectorAll(".image-card")

    .forEach((card,index)=>{

        card.addEventListener("click",()=>{

            currentIndex=index;

            openImage(index);

        });

    });

}


/*=========================================
        OPEN IMAGE
=========================================*/

function openImage(index){

    const viewer=

    document.getElementById("imageViewer");

    const image=

    document.getElementById("fullImage");

    const download=

    document.getElementById("downloadImage");

    image.src=images[index].file;

    download.href=images[index].file;

    viewer.classList.add("active");

    const logo=

    document.querySelector(".gallery-logo");

    if(logo){

        logo.style.display="none";

    }

}

/*=========================================
        VIEWER EVENTS
=========================================*/

function bindViewer(){

    const viewer=document.getElementById("imageViewer");

    const close=document.querySelector(".close-viewer");

    if(!viewer || !close) return;

    close.addEventListener("click",closeImage);

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

    const image=document.getElementById("fullImage");

    const logo=document.querySelector(".gallery-logo");

    viewer.classList.remove("active");

    image.removeAttribute("src");

    if(logo){

        logo.style.display="block";

    }

}


/*=========================================
        SWIPE SUPPORT
=========================================*/

let startX=0;

document.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

},{passive:true});

document.addEventListener("touchend",(e)=>{

    const endX=e.changedTouches[0].clientX;

    const diff=endX-startX;

    if(!document.getElementById("imageViewer")

        .classList.contains("active")) return;

    if(diff<-60){

        nextImage();

    }

    if(diff>60){

        previousImage();

    }

},{passive:true});


/*=========================================
        NEXT IMAGE
=========================================*/

function nextImage(){

    currentIndex++;

    if(currentIndex>=images.length){

        currentIndex=0;

    }

    openImage(currentIndex);

}


/*=========================================
        PREVIOUS IMAGE
=========================================*/

function previousImage(){

    currentIndex--;

    if(currentIndex<0){

        currentIndex=images.length-1;

    }

    openImage(currentIndex);

}