"use strict";

/* =========================================
        CLOUDINARY CONFIGURATION
   ========================================= */

const CLOUDINARY_CLOUD_NAME = "raykjrpl";

const CLOUDINARY_UPLOAD_PRESET = "It's working heart";


/* =========================================
        CLOUDINARY UPLOAD URL
   ========================================= */

const CLOUDINARY_UPLOAD_URL =
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;


/* =========================================
        EXPORT
   ========================================= */

export {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_UPLOAD_URL
};