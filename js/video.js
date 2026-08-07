"use strict";

/*=========================================
        VIDEO GALLERY
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initVideoGallery();

});

function initVideoGallery(){

    setupCards();

    setupViewer();

}

/*=========================================
        OPEN VIDEO
=========================================*/

function setupCards(){

    const cards=document.querySelectorAll(".video-card");

    cards.forEach(card=>{

        card.addEventListener("click",()=>{

            const file=card.dataset.video;

            openPlayer(file);

        });

    });

}

/*=========================================
        PLAYER
=========================================*/

function openPlayer(file){

    const viewer=document.getElementById("videoViewer");

    const player=document.getElementById("player");

    const download=document.getElementById("downloadVideo");

    if(!viewer || !player) return;

    viewer.classList.add("active");

    player.src=file;

    player.load();

    player.play().catch(()=>{});

    if(download){

        download.href=file;

    }

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
        CLOSE PLAYER
=========================================*/

function setupViewer(){

    const viewer=document.getElementById("videoViewer");

    const player=document.getElementById("player");

    const close=document.querySelector(".close-viewer");


    if(!viewer || !player || !close) return;


    close.addEventListener("click",()=>{

        closePlayer();

    });


    viewer.addEventListener("click",(e)=>{

        if(e.target===viewer){

            closePlayer();

        }

    });


}


/*=========================================
        CLOSE FUNCTION
=========================================*/

function closePlayer(){

    const viewer=document.getElementById("videoViewer");

    const player=document.getElementById("player");


    if(!viewer || !player) return;


    player.pause();

    player.removeAttribute("src");

    player.load();


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
        VIDEO END
=========================================*/

const mainPlayer=document.getElementById("player");


if(mainPlayer){

    mainPlayer.addEventListener("ended",()=>{

        closePlayer();

    });

}

/*=========================================
        SWIPE DOWN TO CLOSE
=========================================*/

let startY=0;


document.addEventListener("touchstart",(e)=>{

    if(e.touches.length){

        startY=e.touches[0].clientY;

    }

},{passive:true});



document.addEventListener("touchend",(e)=>{

    if(e.changedTouches.length){

        let endY=e.changedTouches[0].clientY;


        if(endY-startY>120){

            closePlayer();

        }

    }

},{passive:true});



/*=========================================
        KEYBOARD CONTROLS
=========================================*/

document.addEventListener("keydown",(e)=>{


    const viewer=document.getElementById("videoViewer");

    const player=document.getElementById("player");


    if(!viewer || !viewer.classList.contains("active")) return;



    switch(e.key){


        case "Escape":

            closePlayer();

            break;



        case " ":

            e.preventDefault();


            if(player.paused){

                player.play();

            }else{

                player.pause();

            }

            break;



        case "f":

        case "F":


            if(player.requestFullscreen){

                player.requestFullscreen();

            }

            break;


    }


});



/*=========================================
        PRELOAD VIDEOS
=========================================*/


document.querySelectorAll(".cover-video")

.forEach(video=>{


    video.load();


});



/*=========================================
        READY
=========================================*/

console.log(

"%cVideo Gallery Ready",

"color:#00d4ff;font-size:18px;font-weight:bold"

);