/*=========================================
        GLOBAL APP FUNCTIONS
=========================================*/

"use strict";

/* Short Selector */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/*==============================
      Page Ready
==============================*/

document.addEventListener("DOMContentLoaded", () => {

    hideLoader();

    registerRipple();

    preventZoom();

});


/*==============================
        Loader
==============================*/

function hideLoader(){

    const loader=$("#loader");

    if(loader){

        setTimeout(()=>{

            loader.style.opacity="0";

            setTimeout(()=>{

                loader.remove();

            },400);

        },500);

    }

}


/*==============================
        Ripple Effect
==============================*/

function registerRipple(){

    document.querySelectorAll(".ripple").forEach(button=>{

        button.addEventListener("click",(e)=>{

            const circle=document.createElement("span");

            circle.className="ripple-circle";

            circle.style.left=e.offsetX+"px";

            circle.style.top=e.offsetY+"px";

            button.appendChild(circle);

            setTimeout(()=>{

                circle.remove();

            },700);

        });

    });

}


/*==============================
      Fullscreen Image
==============================*/

function openImage(src){

    const viewer=document.createElement("div");

    viewer.className="viewer";

    viewer.innerHTML=`

    <button class="close-viewer">✕</button>

    <img src="${src}" draggable="false">

    <a href="${src}" download>

        <button class="download">

            Download

        </button>

    </a>

    `;

    document.body.appendChild(viewer);

    $(".logo")?.classList.add("hidden");

    viewer.querySelector(".close-viewer").onclick=()=>{

        viewer.remove();

        $(".logo")?.classList.remove("hidden");

    };

}


/*==============================
      Fullscreen Video
==============================*/

function openVideo(src){

    const viewer=document.createElement("div");

    viewer.className="viewer";

    viewer.innerHTML=`

    <button class="close-viewer">✕</button>

    <video controls autoplay>

        <source src="${src}">

    </video>

    `;

    document.body.appendChild(viewer);

    $(".logo")?.classList.add("hidden");

    viewer.querySelector(".close-viewer").onclick=()=>{

        viewer.remove();

        $(".logo")?.classList.remove("hidden");

    };

}


/*==============================
      Download File
==============================*/

function downloadFile(file){

    const a=document.createElement("a");

    a.href=file;

    a.download="";

    document.body.appendChild(a);

    a.click();

    a.remove();

}


/*==============================
      Prevent Zoom
==============================*/

function preventZoom(){

    document.addEventListener("gesturestart",(e)=>{

        e.preventDefault();

    });

}


/*==============================
      Toast Message
==============================*/

function toast(message){

    const t=document.createElement("div");

    t.className="toast";

    t.innerText=message;

    document.body.appendChild(t);

    setTimeout(()=>{

        t.classList.add("show");

    },50);

    setTimeout(()=>{

        t.classList.remove("show");

        setTimeout(()=>{

            t.remove();

        },400);

    },2000);

}


/*==============================
      Navigation
==============================*/

function go(page){

    location.href=page;

}


/*==============================
      Menu Toggle
==============================*/

function openMenu(){

    go("menu.html");

}


/*==============================
      Home
==============================*/

function goHome(){

    go("index.html");

}


/*==============================
      Videos
==============================*/

function goVideos(){

    go("videos.html");

}


/*==============================
      Images
==============================*/

function goImages(){

    go("images.html");

}


/*==============================
      Special Page
==============================*/

function goSpecial(){

    go("special.html");

}