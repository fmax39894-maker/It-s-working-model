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