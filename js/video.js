"use strict";

/*=========================================
            VIDEO GALLERY
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initVideos();

});

function initVideos(){

    bindCards();

    bindViewer();

}


/*=========================================
        VIDEO LIST
=========================================*/

const videos=[

{
title:"Video 1",
cover:"assets/covers/video1.png",
file:"videos/video1.mp4"
},

{
title:"Video 2",
cover:"assets/covers/video2.png",
file:"videos/video2.mp4"
},

{
title:"Video 3",
cover:"assets/covers/video3.png",
file:"videos/video3.mp4"
},

{
title:"Video 4",
cover:"assets/covers/video4.png",
file:"videos/video4.mp4"
}

];


/*=========================================
        OPEN PLAYER
=========================================*/

function bindCards(){

    document.querySelectorAll(".video-card")

    .forEach((card,index)=>{

        card.addEventListener("click",()=>{

            playVideo(videos[index]);

        });

    });

}


function playVideo(video){

    const viewer=document.getElementById("videoViewer");

    const player=document.getElementById("player");

    const download=document.getElementById("downloadVideo");

    viewer.classList.add("active");

    player.src=video.file;

    player.load();

    player.play().catch(()=>{});

    download.href=video.file;

    const logo=document.querySelector(".gallery-logo");

    if(logo){

        logo.style.display="none";

    }

}

/*=========================================
        CLOSE PLAYER
=========================================*/

function bindViewer(){

    const viewer=document.getElementById("videoViewer");

    const player=document.getElementById("player");

    const close=document.querySelector(".close-viewer");

    if(!viewer || !player || !close) return;

    close.addEventListener("click",closePlayer);

    viewer.addEventListener("click",(e)=>{

        if(e.target===viewer){

            closePlayer();

        }

    });

}


function closePlayer(){

    const viewer=document.getElementById("videoViewer");

    const player=document.getElementById("player");

    const logo=document.querySelector(".gallery-logo");

    player.pause();

    player.removeAttribute("src");

    player.load();

    viewer.classList.remove("active");

    if(logo){

        logo.style.display="block";

    }

}


/*=========================================
        AUTO HIDE CONTROLS
=========================================*/

let hideTimer;

const player=document.getElementById("player");

if(player){

    player.addEventListener("mousemove",resetHideTimer);

    player.addEventListener("touchstart",resetHideTimer);

}

function resetHideTimer(){

    clearTimeout(hideTimer);

    hideTimer=setTimeout(()=>{

        // Future custom controls

    },3000);

}


/*=========================================
        SWIPE DOWN TO CLOSE
=========================================*/

let startY=0;

document.addEventListener("touchstart",(e)=>{

    startY=e.touches[0].clientY;

},{passive:true});

document.addEventListener("touchend",(e)=>{

    const endY=e.changedTouches[0].clientY;

    if(endY-startY>120){

        closePlayer();

    }

},{passive:true});

/*=========================================
        KEYBOARD SHORTCUTS
=========================================*/

document.addEventListener("keydown",(e)=>{

    const viewer=document.getElementById("videoViewer");

    const player=document.getElementById("player");

    if(!viewer.classList.contains("active")) return;

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
        VIDEO END
=========================================*/

const endPlayer=document.getElementById("player");

if(endPlayer){

    endPlayer.addEventListener("ended",()=>{

        closePlayer();

    });

}


/*=========================================
        LOOP OPTION
=========================================*/

function setLoop(enable){

    const p=document.getElementById("player");

    if(p){

        p.loop=enable;

    }

}


/*=========================================
        PRELOAD NEXT
=========================================*/

videos.forEach(v=>{

    const link=document.createElement("link");

    link.rel="preload";

    link.as="video";

    link.href=v.file;

    document.head.appendChild(link);

});


/*=========================================
        PERFORMANCE
=========================================*/

window.addEventListener("beforeunload",()=>{

    const p=document.getElementById("player");

    if(p){

        p.pause();

    }

});


/*=========================================
        READY
=========================================*/

console.log(

"%cVideo Gallery Ready",

"color:#00d4ff;font-size:18px;font-weight:bold;"

);

/*=========================================
        END OF video.js
=========================================*/