const video = document.getElementById("introVideo");

video.onended = () => {
    document.body.style.opacity = "0";

    setTimeout(() => {
        location.href = "home.html";
    }, 700);
};

// Safety fallback if the video fails to load
setTimeout(() => {
    if (location.pathname.endsWith("index.html") || location.pathname === "/") {
        location.href = "home.html";
    }
}, 8000);