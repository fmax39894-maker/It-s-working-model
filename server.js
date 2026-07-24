const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

function getFiles(folder, extensions) {
  const dir = path.join(__dirname, folder);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(file =>
      extensions.includes(path.extname(file).toLowerCase())
    )
    .sort();
}

app.get("/api/gallery", (req, res) => {
  res.json({
    images: getFiles("assets/images", [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".gif"
    ]),
    videos: getFiles("assets/videos", [
      ".mp4",
      ".webm",
      ".mov",
      ".mkv"
    ])
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});