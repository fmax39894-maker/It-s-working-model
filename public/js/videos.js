// ===========================
// Video Gallery
// ===========================

const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");
const empty = document.getElementById("empty");
const search = document.getElementById("search");

let allVideos = [];

// Load Videos

async function loadVideos(){

loading.style.display="flex";

empty.style.display="none";

gallery.innerHTML="";

try{

const response=await fetch("/api/gallery");

const data=await response.json();

allVideos=data.videos||[];

loading.style.display="none";

displayVideos(allVideos);

}catch(e){

console.log(e);

loading.style.display="none";

empty.style.display="block";

}

}

// Display Videos

function displayVideos(videos){

gallery.innerHTML="";

if(videos.length===0){

empty.style.display="block";

return;

}

empty.style.display="none";

videos.forEach(file=>{

const card=document.createElement("div");

card.className="card";

// Thumbnail

const video=document.createElement("video");

video.src="/assets/videos/"+file;

video.preload="metadata";

video.muted=true;

video.playsInline=true;

// Play Icon

const play=document.createElement("div");

play.className="playIcon";

play.innerHTML="▶";

// Name

const name=document.createElement("p");

name.textContent=file;

// Open Viewer

card.onclick=()=>{

location.href=

"viewer.html?type=video&file="+

encodeURIComponent(file);

};

card.appendChild(video);

card.appendChild(play);

card.appendChild(name);

gallery.appendChild(card);

});

}

// Search

search.addEventListener("input",()=>{

const text=search.value.toLowerCase();

const result=allVideos.filter(v=>

v.toLowerCase().includes(text)

);

displayVideos(result);

});

// Refresh

function refreshVideos(){

loadVideos();

}

// Start

loadVideos();