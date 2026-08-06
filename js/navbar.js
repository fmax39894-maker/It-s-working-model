/*=========================================
        PREMIUM NAVBAR
=========================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();

});

function initNavbar(){

    const nav=document.querySelector(".bottom-nav");

    if(!nav) return;

    const items=document.querySelectorAll(".nav-item");

    const indicator=document.querySelector(".indicator");

    const page=getCurrentPage();

    setActive(page);

    items.forEach((item,index)=>{

        item.addEventListener("click",()=>{

            items.forEach(i=>i.classList.remove("active"));

            item.classList.add("active");

            moveIndicator(index);

            navigate(item.dataset.page);

        });

    });

}


/*=========================================
        Current Page
=========================================*/

function getCurrentPage(){

    const file=location.pathname.split("/").pop();

    switch(file){

        case "videos.html":

            return 1;

        case "images.html":

            return 2;

        case "special.html":

            return 3;

        default:

            return 0;

    }

}


/*=========================================
        Set Active Item
=========================================*/

function setActive(index){

    const items=document.querySelectorAll(".nav-item");

    items.forEach(i=>i.classList.remove("active"));

    if(items[index]){

        items[index].classList.add("active");

    }

    moveIndicator(index);

}


/*=========================================
        Move Indicator
=========================================*/

function moveIndicator(index){

    const indicator=document.querySelector(".indicator");

    if(!indicator) return;

    const positions=[

        "translateX(0)",

        "translateX(calc(100% + 12px))",

        "translateX(calc(200% + 24px))",

        "translateX(calc(300% + 36px))"

    ];

    indicator.style.transform=positions[index];

}

/*=========================================
        PAGE NAVIGATION
=========================================*/

function navigate(page){

    if(!page) return;

    if(location.pathname.endsWith(page)){

        return;

    }

    document.body.classList.add("fade");

    setTimeout(()=>{

        location.href=page;

    },180);

}


/*=========================================
        SHOW NAVBAR
=========================================*/

function showNavbar(){

    const nav=document.querySelector(".bottom-nav");

    if(nav){

        nav.classList.remove("hide");

        nav.classList.add("show");

    }

}


/*=========================================
        HIDE NAVBAR
=========================================*/

function hideNavbar(){

    const nav=document.querySelector(".bottom-nav");

    if(nav){

        nav.classList.remove("show");

        nav.classList.add("hide");

    }

}


/*=========================================
      PAGE HELPERS
=========================================*/

function goHome(){

    navigate("index.html");

}

function goVideos(){

    navigate("videos.html");

}

function goImages(){

    navigate("images.html");

}

function goSpecial(){

    navigate("special.html");

}

function goMenu(){

    navigate("menu.html");

}


/*=========================================
      ACTIVE PAGE CLASS
=========================================*/

window.addEventListener("load",()=>{

    const nav=document.querySelector(".bottom-nav");

    if(!nav) return;

    const page=location.pathname.split("/").pop();

    nav.classList.remove(
        "home",
        "video",
        "image",
        "special"
    );

    switch(page){

        case "videos.html":

            nav.classList.add("video");

            break;

        case "images.html":

            nav.classList.add("image");

            break;

        case "special.html":

            nav.classList.add("special");

            break;

        default:

            nav.classList.add("home");

    }

});


/*=========================================
      KEYBOARD SHORTCUTS
=========================================*/

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "1":

            goHome();

            break;

        case "2":

            goVideos();

            break;

        case "3":

            goImages();

            break;

        case "4":

            goSpecial();

            break;

    }

});