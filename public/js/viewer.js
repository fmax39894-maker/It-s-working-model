// ================================
// Media Gallery Pro
// viewer.js
// ================================

const params = new URLSearchParams(window.location.search);

const type = params.get("type");
const file = params.get("file");
const popup = params.get("popup");

const container = document.getElementById("viewerContainer");
const fileName = document.getElementById("fileName");
const downloadBtn = document.getElementById("downloadBtn");

let mediaURL = "";

// ================================
// Floating Popup Image
// ================================

if (popup === "true") {

    mediaURL = "/assets/popup.png";

    const img = document.createElement("img");

    img.src = mediaURL;

    img.className = "viewerImage";

    container.appendChild(img);

    fileName.textContent = "scan me";
}

// ================================
// Image Viewer
// ================================

else if (type === "image") {

    mediaURL = "/assets/images/" + file;

    const img = document.createElement("img");

    img.src = mediaURL;

    img.alt = file;

    img.className = "viewerImage";

    container.appendChild(img);

    fileName.textContent = decodeURIComponent(file);
}

// ================================
// Video Viewer
// ================================

else if (type === "video") {

    mediaURL = "/assets/videos/" + file;

    const video = document.createElement("video");

    video.src = mediaURL;

    video.controls = true;

    video.autoplay = true;

    video.playsInline = true;

    video.className = "viewerVideo";

    container.appendChild(video);

    fileName.textContent = decodeURIComponent(file);
}

// ================================
// Invalid Link
// ================================

else {

    container.innerHTML =
    "<h2 style='color:white'>Media Not Found</h2>";

}

// ================================
// Download Button
// ================================

downloadBtn.onclick = () => {

    if (!mediaURL) return;

    const a = document.createElement("a");

    a.href = mediaURL;

    a.download = "";

    document.body.appendChild(a);

    a.click();

    a.remove();

};

// ================================
// Double Tap Zoom (Images Only)
// ================================

let zoom = false;

container.addEventListener("dblclick", () => {

    const img = document.querySelector(".viewerImage");

    if (!img) return;

    zoom = !zoom;

    img.style.transform =
        zoom ? "scale(2)" : "scale(1)";

});