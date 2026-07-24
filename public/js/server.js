// =====================================
// It's Working Heart
// server.js
// Part 1
// =====================================

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// ================================
// Middleware
// ================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ================================
// Static Files
// ================================

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/assets",
  express.static(path.join(__dirname, "assets"))
);

// ================================
// Cache Headers
// ================================

app.use((req, res, next) => {

    res.setHeader(
        "Cache-Control",
        "public, max-age=3600"
    );

    next();

});

// ================================
// Media Folders
// ================================

const IMAGE_FOLDER = path.join(
    __dirname,
    "assets",
    "images"
);

const VIDEO_FOLDER = path.join(
    __dirname,
    "assets",
    "videos"
);

// Helper Function
function getFiles(folder, extensions) {

    if (!fs.existsSync(folder))
        return [];

    return fs.readdirSync(folder)

        .filter(file => {

            return extensions.includes(

                path.extname(file)
                    .toLowerCase()

            );

        })

        .sort();

}
// ================================
// Gallery API
// ================================

app.get("/api/gallery", (req, res) => {

    const images = getFiles(

        IMAGE_FOLDER,

        [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
            ".gif",
            ".bmp",
            ".svg"
        ]

    );

    const videos = getFiles(

        VIDEO_FOLDER,

        [
            ".mp4",
            ".webm",
            ".mov",
            ".mkv",
            ".avi",
            ".m4v"
        ]

    );

    res.json({

        success: true,

        totalImages: images.length,

        totalVideos: videos.length,

        images,

        videos

    });

});

// ================================
// Health Check
// ================================

app.get("/api/status", (req, res) => {

    res.json({

        status: "online",

        app: "It's Working Heart",

        images: getFiles(
            IMAGE_FOLDER,
            [
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
                ".gif",
                ".bmp",
                ".svg"
            ]
        ).length,

        videos: getFiles(
            VIDEO_FOLDER,
            [
                ".mp4",
                ".webm",
                ".mov",
                ".mkv",
                ".avi",
                ".m4v"
            ]
        ).length

    });

});
// ================================
// Home Route
// ================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );

});

// ================================
// 404 Page
// ================================

app.use((req, res) => {

    res.status(404).sendFile(
        path.join(__dirname, "public", "404.html")
    );

});

// ================================
// Global Error Handler
// ================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        error: "Internal Server Error"

    });

});

// ================================
// Start Server
// ================================

app.listen(PORT, () => {

    console.log("===================================");

    console.log("❤️ It's Working Heart ❤️");

    console.log("Server Running Successfully");

    console.log("Port : " + PORT);

    console.log(
        "URL  : http://localhost:" + PORT
    );

    console.log("===================================");

});