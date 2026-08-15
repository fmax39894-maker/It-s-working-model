"use strict";

/* =========================================
   CLOUDINARY UPLOAD SYSTEM
========================================= */

async function uploadToCloudinary(
    file,
    onProgress = null
){

    if(!file){

        throw new Error(
            "No file selected."
        );

    }


    const cloudName =
        window.CLOUDINARY_CLOUD_NAME;


    const uploadPreset =
        window.CLOUDINARY_UPLOAD_PRESET;


    if(
        !cloudName ||
        cloudName === "YOUR_CLOUD_NAME"
    ){

        throw new Error(
            "Cloudinary Cloud Name is missing."
        );

    }


    if(!uploadPreset){

        throw new Error(
            "Cloudinary Upload Preset is missing."
        );

    }


    const uploadUrl =
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;


    const formData =
        new FormData();


    formData.append(
        "file",
        file
    );


    formData.append(
        "upload_preset",
        uploadPreset
    );


    return new Promise(
        (resolve,reject)=>{

            const xhr =
                new XMLHttpRequest();


            xhr.open(
                "POST",
                uploadUrl
            );


            /* =====================================
               PROGRESS
            ===================================== */

            xhr.upload.addEventListener(
                "progress",
                function(event){

                    if(
                        event.lengthComputable &&
                        typeof onProgress === "function"
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


            /* =====================================
               SUCCESS / ERROR
            ===================================== */

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

                        let errorMessage =
                            "Cloudinary upload failed.";


                        try{

                            const data =
                                JSON.parse(
                                    xhr.responseText
                                );


                            if(
                                data.error &&
                                data.error.message
                            ){

                                errorMessage =
                                    data.error.message;

                            }

                        }catch(error){

                        }


                        reject(
                            new Error(
                                errorMessage
                            )
                        );

                    }

                };


            /* =====================================
               NETWORK ERROR
            ===================================== */

            xhr.onerror =
                function(){

                    reject(
                        new Error(
                            "Could not connect to Cloudinary."
                        )
                    );

                };


            /* =====================================
               SEND
            ===================================== */

            xhr.send(
                formData
            );

        }
    );

}


/* =========================================
   GET CLOUDINARY URL
========================================= */

function getCloudinaryUrl(
    result
){

    if(
        result &&
        result.secure_url
    ){

        return result.secure_url;

    }

    return "";

}


/* =========================================
   GLOBAL FUNCTIONS
========================================= */

window.uploadToCloudinary =
    uploadToCloudinary;


window.getCloudinaryUrl =
    getCloudinaryUrl;