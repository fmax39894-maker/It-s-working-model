"use strict";

/*
=========================================================
        FIREBASE CONFIGURATION
=========================================================
*/

import {
    initializeApp
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    query,
    orderBy
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/*
=========================================================
        FIREBASE CONFIG
=========================================================
*/

const firebaseConfig = {

    apiKey:
        "AIzaSyCYpUFyBaOByeByNrkeqR8ErT3K7r7TbKc",

    authDomain:
        "working-model-of-heart-251c4.firebaseapp.com",

    projectId:
        "working-model-of-heart-251c4",

    storageBucket:
        "working-model-of-heart-251c4.firebasestorage.app",

    messagingSenderId:
        "225784710105",

    appId:
        "1:225784710105:web:d6526ae93c57073e740fc8",

    measurementId:
        "G-HCTMP0Z38C"

};


/*
=========================================================
        INITIALIZE FIREBASE
=========================================================
*/

const app =
    initializeApp(
        firebaseConfig
    );


const db =
    getFirestore(
        app
    );


/*
=========================================================
        COLLECTION NAME
=========================================================
*/

const MEDIA_COLLECTION =
    "heartProjectMedia";


/*
=========================================================
        GET ALL MEDIA
=========================================================
*/

export async function getMedia(){

    const mediaQuery =
        query(

            collection(
                db,
                MEDIA_COLLECTION
            ),

            orderBy(
                "createdAt",
                "asc"
            )

        );


    const snapshot =
        await getDocs(
            mediaQuery
        );


    return snapshot.docs.map(
        item => ({

            id:
                item.id,

            ...item.data()

        })
    );

}


/*
=========================================================
        ADD MEDIA
=========================================================
*/

export async function addMedia(
    type,
    name,
    url
){

    if(
        !type ||
        !name ||
        !url
    ){

        throw new Error(
            "Missing media information."
        );

    }


    const mediaData = {

        type:
            type,

        name:
            name.trim(),

        url:
            url.trim(),

        createdAt:
            serverTimestamp(),

        updatedAt:
            serverTimestamp()

    };


    const result =
        await addDoc(

            collection(
                db,
                MEDIA_COLLECTION
            ),

            mediaData

        );


    return result.id;

}


/*
=========================================================
        UPDATE MEDIA
=========================================================
*/

export async function updateMedia(
    id,
    data
){

    if(!id){

        throw new Error(
            "Media ID is required."
        );

    }


    const mediaRef =
        doc(
            db,
            MEDIA_COLLECTION,
            id
        );


    await updateDoc(

        mediaRef,

        {

            type:
                data.type,

            name:
                data.name.trim(),

            url:
                data.url.trim(),

            updatedAt:
                serverTimestamp()

        }

    );

}


/*
=========================================================
        DELETE MEDIA
=========================================================
*/

export async function deleteMedia(
    id
){

    if(!id){

        throw new Error(
            "Media ID is required."
        );

    }


    const mediaRef =
        doc(
            db,
            MEDIA_COLLECTION,
            id
        );


    await deleteDoc(
        mediaRef
    );

}


/*
=========================================================
        EXPORT FIREBASE DATABASE
=========================================================
*/

export {
    db,
    MEDIA_COLLECTION
};