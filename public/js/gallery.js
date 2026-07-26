// ================================
// Media Gallery Pro
// gallery.js
// ================================

const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");
const empty = document.getElementById("empty");
const searchBox = document.getElementById("search");

let allImages = [];

// Load Images
async function loadGallery() {

    loading.style.display = "flex";
    empty.style.display = "none";
    gallery.innerHTML = "";

    try {

        const res = await fetch("/api/gallery");

        if (!res.ok) throw new Error("Cannot load gallery");

        const data = await res.json();

        allImages = data.images || [];

        loading.style.display = "none";

        displayImages(allImages);

    } catch (err) {

        console.error(err);

        loading.style.display = "none";

        empty.style.display = "block";

    }

}

// Create Gallery
function displayImages(images) {

    gallery.innerHTML = "";

    if (images.length === 0) {

        empty.style.display = "block";

        return;

    }

    empty.style.display = "none";

    images.forEach(file => {

        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");

        img.src = "/assets/images/" + file;

        img.alt = "";

        img.loading = "lazy";

        img.decoding = "async";

        img.draggable = false;

        card.onclick = () => {

            window.location.href=`viewer.html?type=image&file=${encodeURIComponent(file)}`;

        };

        card.appendChild(img);

        gallery.appendChild(card);

    });

}

// Search
searchBox.addEventListener("input", () => {

    const keyword = searchBox.value
        .trim()
        .toLowerCase();

    const filtered = allImages.filter(file =>
        file.toLowerCase().includes(keyword)
    );

    displayImages(filtered);

});

// Reload Gallery
function refreshGallery() {

    loadGallery();

}

// Start
loadGallery();