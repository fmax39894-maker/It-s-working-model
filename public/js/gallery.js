// Gallery Container
const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");
const empty = document.getElementById("empty");

// Search Box
const search = document.getElementById("search");

// Store all images
let allImages = [];

// Load Gallery
async function loadGallery() {

    loading.style.display = "flex";

    try {

        const response = await fetch("/api/gallery");

        const data = await response.json();

        allImages = data.images || [];

        loading.style.display = "none";

        createGallery(allImages);

    } catch (err) {

        loading.style.display = "none";

        empty.style.display = "block";

        console.log(err);

    }

}

// Create Gallery
function createGallery(images) {

    gallery.innerHTML = "";

    if(images.length===0){

        empty.style.display="block";

        return;

    }

    empty.style.display="none";

    images.forEach(file=>{

        const card=document.createElement("div");

        card.className="card";

        const img=document.createElement("img");

        img.loading="lazy";

        img.src="/assets/images/"+file;

        img.alt=file;

        img.onclick=()=>{

            location.href=
            "viewer.html?type=image&file="
            +encodeURIComponent(file);

        };

        const name=document.createElement("p");

        name.textContent=file;

        card.appendChild(img);

        card.appendChild(name);

        gallery.appendChild(card);

    });

}

// Search
search.addEventListener("input",()=>{

    const text=search.value.toLowerCase();

    const filtered=allImages.filter(file=>{

        return file.toLowerCase().includes(text);

    });

    createGallery(filtered);

});

// Start
loadGallery();