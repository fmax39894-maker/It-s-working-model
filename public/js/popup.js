const popup=document.getElementById("popup");

popup.onclick=()=>{

location.href="viewer.html?popup=true";

};

let active=false;

let x,y;

popup.addEventListener("touchstart",(e)=>{

active=true;

x=e.touches[0].clientX-popup.offsetLeft;

y=e.touches[0].clientY-popup.offsetTop;

});

popup.addEventListener("touchmove",(e)=>{

if(!active)return;

popup.style.left=(e.touches[0].clientX-x)+"px";

popup.style.top=(e.touches[0].clientY-y)+"px";

popup.style.right="auto";

popup.style.bottom="auto";

});

popup.addEventListener("touchend",()=>{

active=false;

});