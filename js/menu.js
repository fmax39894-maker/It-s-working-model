"use strict";

/*=========================================
            MENU PAGE
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initMenu();

});

function initMenu(){

    animateCards();

    setupLinks();

    setupBackButton();

}


/*=========================================
        CARD ANIMATION
=========================================*/

function animateCards(){

    const cards=document.querySelectorAll(".menu-card");

    cards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(40px)";

        setTimeout(()=>{

            card.style.transition=".6s ease";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*120);

    });

}


/*=========================================
        LINK EFFECT
=========================================*/

function setupLinks(){

    document.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click",()=>{

            if(typeof toast==="function"){

                toast("Opening...");

            }

        });

    });

}


/*=========================================
        BACK BUTTON
=========================================*/

function setupBackButton(){

    const back=document.querySelector(".back-btn");

    if(!back) return;

    back.addEventListener("click",()=>{

        history.back();

    });

}

/*=========================================
        TOUCH RIPPLE
=========================================*/

document.querySelectorAll(".menu-card").forEach(card=>{

    card.addEventListener("click",(e)=>{

        const ripple=document.createElement("span");

        ripple.className="menu-ripple";

        ripple.style.left=e.offsetX+"px";

        ripple.style.top=e.offsetY+"px";

        card.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});


/*=========================================
        HEADER SHADOW
=========================================*/

window.addEventListener("scroll",()=>{

    const header=document.querySelector(".menu-header");

    if(!header) return;

    if(window.scrollY>20){

        header.style.boxShadow=

        "0 8px 30px rgba(0,0,0,.35)";

        header.style.backdropFilter="blur(20px)";

    }

    else{

        header.style.boxShadow="none";

    }

});


/*=========================================
        ACTIVE LINK
=========================================*/

const current=

location.pathname

.split("/")

.pop();

document

.querySelectorAll(".menu-links a")

.forEach(link=>{

    if(link.getAttribute("href")==current){

        link.classList.add("active");

    }

});


/*=========================================
        BUTTON SOUND
=========================================*/

const sound=

document.getElementById("clickSound");

document

.querySelectorAll("button,a")

.forEach(item=>{

    item.addEventListener("click",()=>{

        if(sound){

            sound.currentTime=0;

            sound.play().catch(()=>{});

        }

    });

});


/*=========================================
        PAGE READY
=========================================*/

window.addEventListener("load",()=>{

    console.log(

        "Menu Page Ready"

    );

});

/*=========================================
        MENU FINAL
=========================================*/


/* Smooth Card Hover */

document.querySelectorAll(".menu-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-6px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});


/* Scroll To Top */

function scrollTopSmooth(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}


/* Prevent Double Click */

let menuLock=false;

document.querySelectorAll("a,button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(menuLock) return;

        menuLock=true;

        setTimeout(()=>{

            menuLock=false;

        },300);

    });

});


/* Escape Key */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        history.back();

    }

});


/* Orientation */

window.addEventListener("orientationchange",()=>{

    setTimeout(()=>{

        window.scrollTo(0,0);

    },200);

});


/* Footer */

console.log(

"%cMenu Loaded Successfully",

"color:#00d4ff;font-size:18px;font-weight:bold"

);


/*=========================================
            END OF menu.js
=========================================*/