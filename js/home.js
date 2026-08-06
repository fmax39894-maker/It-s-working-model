"use strict";

/*=========================================
        HOME PAGE
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initHome();

});

function initHome(){

    initVideo();

    createParticles();

    animateLogo();

    enableMenu();

}


/*=========================================
        HOME VIDEO
=========================================*/

function initVideo(){

    const video=document.querySelector(".bg-video");

    if(!video) return;

    video.muted=true;

    video.loop=true;

    video.playsInline=true;

    video.play().catch(()=>{});

}


/*=========================================
        MENU BUTTON
=========================================*/

function enableMenu(){

    const btn=document.querySelector(".menu-btn");

    if(!btn) return;

    btn.addEventListener("click",()=>{

        if(typeof goMenu==="function"){

            goMenu();

        }

    });

}


/*=========================================
        LOGO ANIMATION
=========================================*/

function animateLogo(){

    const logo=document.querySelector(".logo");

    if(!logo) return;

    let t=0;

    setInterval(()=>{

        t+=0.03;

        logo.style.transform=

        `translateX(-50%) translateY(${Math.sin(t)*4}px)`;

    },30);

}


/*=========================================
        PARTICLES
=========================================*/

function createParticles(){

    const holder=document.getElementById("particles");

    if(!holder) return;

    for(let i=0;i<35;i++){

        const p=document.createElement("span");

        p.className="particle";

        p.style.left=Math.random()*100+"%";

        p.style.width=(2+Math.random()*5)+"px";

        p.style.height=p.style.width;

        p.style.animationDuration=

        (8+Math.random()*12)+"s";

        p.style.animationDelay=

        (Math.random()*8)+"s";

        holder.appendChild(p);

    }

}

/*=========================================
        PAGE VISIBILITY
=========================================*/

document.addEventListener("visibilitychange",()=>{

    const video=document.querySelector(".bg-video");

    if(!video) return;

    if(document.hidden){

        video.pause();

    }else{

        video.play().catch(()=>{});

    }

});


/*=========================================
        FULLSCREEN EVENTS
=========================================*/

document.addEventListener("fullscreenchange",()=>{

    const logo=document.querySelector(".logo");

    const nav=document.querySelector(".bottom-nav");

    if(document.fullscreenElement){

        if(logo) logo.classList.add("hide");

        if(nav) nav.classList.remove("hide");

    }else{

        if(logo) logo.classList.remove("hide");

    }

});


/*=========================================
        TOUCH EFFECT
=========================================*/

document.addEventListener("touchstart",(e)=>{

    const x=e.touches[0].clientX;

    const y=e.touches[0].clientY;

    spawnGlow(x,y);

});


function spawnGlow(x,y){

    const glow=document.createElement("div");

    glow.style.position="fixed";

    glow.style.left=(x-12)+"px";

    glow.style.top=(y-12)+"px";

    glow.style.width="24px";

    glow.style.height="24px";

    glow.style.borderRadius="50%";

    glow.style.pointerEvents="none";

    glow.style.background="rgba(0,212,255,.6)";

    glow.style.boxShadow="0 0 20px cyan";

    glow.style.zIndex="99999";

    glow.style.transition="all .6s ease";

    document.body.appendChild(glow);

    requestAnimationFrame(()=>{

        glow.style.transform="scale(3)";

        glow.style.opacity="0";

    });

    setTimeout(()=>{

        glow.remove();

    },600);

}


/*=========================================
        PERFORMANCE
=========================================*/

window.addEventListener("load",()=>{

    const video=document.querySelector(".bg-video");

    if(video){

        video.setAttribute("playsinline","");

        video.setAttribute("webkit-playsinline","");

    }

});


/*=========================================
        HOME READY
=========================================*/

console.log("Home Loaded Successfully");

/*=========================================
      HOME PAGE FINAL
=========================================*/

/* Auto Resume Video */

window.addEventListener("focus",()=>{

    const video=document.querySelector(".bg-video");

    if(video){

        video.play().catch(()=>{});

    }

});


/* Resize Fix */

window.addEventListener("resize",()=>{

    const video=document.querySelector(".bg-video");

    if(video){

        video.style.width="100%";

        video.style.height="100%";

    }

});


/* Prevent Context Menu */

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});


/* Double Tap Prevention */

let lastTouch=0;

document.addEventListener("touchend",(e)=>{

    const now=Date.now();

    if(now-lastTouch<300){

        e.preventDefault();

    }

    lastTouch=now;

},{passive:false});


/* Hide Logo During Fullscreen */

function updateHeader(){

    const logo=document.querySelector(".logo");

    if(!logo) return;

    if(document.fullscreenElement){

        logo.style.display="none";

    }else{

        logo.style.display="block";

    }

}

document.addEventListener("fullscreenchange",updateHeader);

document.addEventListener("webkitfullscreenchange",updateHeader);


/* Click Sound */

const clickSound=document.getElementById("clickSound");

document.querySelectorAll("button,.nav-item").forEach(item=>{

    item.addEventListener("click",()=>{

        if(clickSound){

            clickSound.currentTime=0;

            clickSound.play().catch(()=>{});

        }

    });

});


/* Loading Complete */

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    if(loader){

        loader.style.opacity="0";

        setTimeout(()=>{

            loader.remove();

        },600);

    }

});


/* Footer Console */

console.log(

"%cPremium Media Showcase Ready",

"color:#00d4ff;font-size:18px;font-weight:bold;"

);

/*=========================================
            END OF home.js
=========================================*/