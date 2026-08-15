"use strict";

/*
=========================================================
        CLOUDINARY UPLOAD SYSTEM
        It’s Working Heart
=========================================================
*/

/*
IMPORTANT
---------
Replace these two values with your Cloudinary values:

1. CLOUDINARY_CLOUD_NAME
2. CLOUDINARY_UPLOAD_PRESET

The upload preset should be an UNSIGNED upload preset.
*/


const CLOUDINARY_CLOUD_NAME =
    "raykjrpl";


const CLOUDINARY_UPLOAD_PRESET =
    "It's working heart";



/* =====================================================
   CLOUDINARY UPLOAD URL
===================================================== */

const CLOUDINARY_UPLOAD_URL =
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;



/* =====================================================
   UPLOAD FILE
===================================================== */

async function uploadToCloudinary(
    file,
    onProgress = null
){

    if(!file){

        throw new Error(
            "No file selected."
        );

    }


    if(
        !CLOUDINARY_CLOUD_NAME ||
        CLOUDINARY_CLOUD_NAME ===
        "YOUR_CLOUD_NAME"
    ){

        throw new Error(
            "Cloudinary Cloud Name is not configured."
        );

    }


    if(
        !CLOUDINARY_UPLOAD_PRESET ||
        CLOUDINARY_UPLOAD_PRESET ===
        "YOUR_UPLOAD_PRESET"
    ){

        throw new Error(
            "Cloudinary Upload Preset is not configured."
        );

    }



    const formData =
        new FormData();


    formData.append(
        "file",
        file
    );


    formData.append(
        "upload_preset",
        CLOUDINARY_UPLOAD_PRESET
    );



    return new Promise(

        (resolve,reject)=>{

            const xhr =
                new XMLHttpRequest();


            xhr.open(
                "POST",
                CLOUDINARY_UPLOAD_URL
            );



            /* =========================================
               UPLOAD PROGRESS
            ========================================= */

            xhr.upload.addEventListener(
                "progress",
                event => {

                    if(
                        event.lengthComputable &&
                        typeof onProgress ===
                        "function"
                    ){

                        const percent =
                            Math.round(
                                (
                                    event.loaded /
                                    event.total
                                ) * 100
                            );


                        onProgress(
                            percent
                        );

                    }

                }
            );



            /* =========================================
               SUCCESS
            ========================================= */

            xhr.onload =
            function(){

                if(
                    xhr.status >= 200 &&
                    xhr.status < 300
                ){

                    try{

                        const result =
                            JSON.parse(
                                xhr.responseText
                            );


                        resolve(
                            result
                        );

                    }catch(error){

                        reject(
                            new Error(
                                "Invalid Cloudinary response."
                            )
                        );

                    }

                }else{

                    let message =
                        "Cloudinary upload failed.";

                    try{

                        const errorData =
                            JSON.parse(
                                xhr.responseText
                            );


                        if(
                            errorData.error &&
                            errorData.error.message
                        ){

                            message =
                                errorData.error.message;

                        }

                    }catch(error){

                        /* Ignore JSON parsing error */

                    }


                    reject(
                        new Error(
                            message
                        )
                    );

                }

            };



            /* =========================================
               NETWORK ERROR
            ========================================= */

            xhr.onerror =
            function(){

                reject(
                    new Error(
                        "Network error while uploading to Cloudinary."
                    )
                );

            };



            /* =========================================
               SEND
            ========================================= */

            xhr.send(
                formData
            );

        }

    );

}



/* =====================================================
   GET DIRECT URL
===================================================== */

function getCloudinaryUrl(
    result
){

    if(
        !result ||
        !result.secure_url
    ){

        return "";
    }


    return result.secure_url;

}



/* =====================================================
   CHECK IMAGE
===================================================== */

function isImageFile(
    file
){

    return !!(
        file &&
        file.type &&
        file.type.startsWith(
            "image/"
        )
    );

}



/* =====================================================
   CHECK VIDEO
===================================================== */

function isVideoFile(
    file
){

    return !!(
        file &&
        file.type &&
        file.type.startsWith(
            "video/"
        )
    );

}



/* =====================================================
   EXPORT
===================================================== */

window.uploadToCloudinary =
    uploadToCloudinary;


window.getCloudinaryUrl =
    getCloudinaryUrl;


window.isImageFile =
    isImageFile;


window.isVideoFile =
    isVideoFile;