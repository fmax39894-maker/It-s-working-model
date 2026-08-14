"use strict";

/* =========================================================
   HEARTBEAT
========================================================= */

const bpm = document.getElementById("bpm");

if (bpm) {

    setInterval(() => {

        bpm.textContent =
            70 + Math.floor(Math.random() * 7);

    }, 1200);

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });


/* =========================================================
   HOST CONFIGURATION
========================================================= */

const HOST_PASSWORD = "aayushman";

let hostUnlocked = false;

let currentMediaFilter = "all";


/* =========================================================
   LOCAL MEDIA STORAGE
========================================================= */

let mediaStore =
    JSON.parse(
        localStorage.getItem("heartProjectMedia") || "[]"
    );


/* =========================================================
   SETTINGS MENU
========================================================= */

function toggleSettings() {

    const menu =
        document.getElementById("settingsMenu");

    if (!menu) return;

    menu.classList.toggle("show");

}


/* =========================================================
   SETTINGS PASSWORD
========================================================= */

function unlockFromSettings() {

    const password =
        document.getElementById("settingsPassword");

    const message =
        document.getElementById(
            "settingsPasswordMessage"
        );

    const controls =
        document.getElementById(
            "settingsHostControls"
        );

    if (!password || !message || !controls) {
        return;
    }


    if (password.value === HOST_PASSWORD) {

        hostUnlocked = true;

        controls.classList.add("show");

        message.textContent =
            "✓ Host controls unlocked.";

        message.style.color =
            "#69e58a";

    }

    else {

        hostUnlocked = false;

        controls.classList.remove("show");

        message.textContent =
            "Incorrect password.";

        message.style.color =
            "#ff5262";

    }

}


/* =========================================================
   OPEN HOST FROM SETTINGS
========================================================= */

function openHostFromSettings() {

    const menu =
        document.getElementById("settingsMenu");

    if (menu) {
        menu.classList.remove("show");
    }

    openHostPanel();

}


/* =========================================================
   HOST PANEL
========================================================= */

function openHostPanel() {

    const panel =
        document.getElementById("hostPanel");

    if (!panel) return;

    panel.classList.add("show");

}


function closeHostPanel() {

    const panel =
        document.getElementById("hostPanel");

    const login =
        document.getElementById("hostLogin");

    const upload =
        document.getElementById("uploadArea");

    const password =
        document.getElementById("hostPassword");

    const message =
        document.getElementById("hostMessage");


    if (panel) {
        panel.classList.remove("show");
    }


    hostUnlocked = false;


    if (login) {
        login.style.display = "block";
    }


    if (upload) {
        upload.style.display = "none";
    }


    if (password) {
        password.value = "";
    }


    if (message) {
        message.textContent = "";
    }

}


/* =========================================================
   HOST LOGIN
========================================================= */

function unlockHost() {

    const password =
        document.getElementById("hostPassword");

    const message =
        document.getElementById("hostMessage");

    const login =
        document.getElementById("hostLogin");

    const upload =
        document.getElementById("uploadArea");


    if (!password || !message) {
        return;
    }


    if (password.value === HOST_PASSWORD) {

        hostUnlocked = true;

        if (login) {
            login.style.display = "none";
        }

        if (upload) {
            upload.style.display = "grid";
        }

        message.textContent =
            "✓ Host access granted.";

        message.style.color =
            "#69e58a";

        renderHostMediaList();

    }

    else {

        hostUnlocked = false;

        message.textContent =
            "Incorrect password. Please try again.";

        message.style.color =
            "#ff5262";

    }

}


/* =========================================================
   SAVE MEDIA
========================================================= */

function saveMedia() {

    if (!hostUnlocked) {

        const message =
            document.getElementById(
                "hostMessage"
            );

        if (message) {

            message.textContent =
                "Unlock host controls first.";

        }

        return;

    }


    const photoInput =
        document.getElementById("photoFiles");

    const videoInput =
        document.getElementById("videoFiles");


    const files = [];


    if (photoInput) {

        files.push(
            ...Array.from(photoInput.files)
        );

    }


    if (videoInput) {

        files.push(
            ...Array.from(videoInput.files)
        );

    }


    if (!files.length) {

        const message =
            document.getElementById(
                "hostMessage"
            );

        if (message) {

            message.textContent =
                "Choose a photo or video first.";

            message.style.color =
                "#ff5262";

        }

        return;

    }


    let completed = 0;


    files.forEach(file => {

        const reader =
            new FileReader();


        reader.onload = function(event) {

            const type =
                file.type.startsWith("video/")
                    ? "video"
                    : "photo";


            mediaStore.push({

                id:
                    Date.now() +
                    "_" +
                    Math.random()
                        .toString(36)
                        .slice(2),

                name: file.name,

                type: type,

                data: event.target.result

            });


            completed++;


            if (completed === files.length) {

                localStorage.setItem(
                    "heartProjectMedia",
                    JSON.stringify(mediaStore)
                );


                if (photoInput) {
                    photoInput.value = "";
                }

                if (videoInput) {
                    videoInput.value = "";
                }


                renderMedia(
                    currentMediaFilter,
                    true
                );


                const message =
                    document.getElementById(
                        "hostMessage"
                    );

                if (message) {

                    message.textContent =
                        "✓ Media added successfully.";

                    message.style.color =
                        "#69e58a";

                }

            }

        };


        reader.readAsDataURL(file);

    });

}


/* =========================================================
   RENDER MEDIA
========================================================= */

function renderMedia(
    filter = "all",
    reveal = false
) {

    const gallery =
        document.getElementById("gallery");

    const empty =
        document.getElementById(
            "galleryEmpty"
        );


    if (!gallery || !empty) {
        return;
    }


    gallery.innerHTML = "";


    const items =
        mediaStore.filter(item => {

            return (
                filter === "all" ||
                item.type === filter
            );

        });


    if (reveal) {

        gallery.classList.add(
            "media-visible"
        );

        empty.classList.toggle(
            "media-visible",
            items.length === 0
        );

    }

    else {

        gallery.classList.remove(
            "media-visible"
        );

        empty.classList.remove(
            "media-visible"
        );

    }


    items.forEach(item => {

        const card =
            document.createElement("div");

        card.className =
            "gallery-item";


        let media;


        if (item.type === "photo") {

            media =
                document.createElement("img");

            media.src =
                item.data;

            media.alt =
                item.name;

        }

        else {

            media =
                document.createElement("video");

            media.src =
                item.data;

            media.controls = false;

            media.playsInline = true;

            media.preload = "metadata";

        }


        const caption =
            document.createElement("div");

        caption.className =
            "gallery-caption";

        caption.textContent =
            item.name;


        card.appendChild(media);

        card.appendChild(caption);


        card.onclick = () => {

            showMediaInsideSection(item);

        };


        gallery.appendChild(card);

    });


    renderHostMediaList();

}


/* =========================================================
   FILTER MEDIA
========================================================= */

function filterMedia(
    filter,
    button
) {

    currentMediaFilter =
        filter;


    document
        .querySelectorAll(
            ".media-filter"
        )
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    renderMedia(
        filter,
        true
    );

}


/* =========================================================
   SECTION VIEWER
========================================================= */

function showMediaInsideSection(item) {

    const viewer =
        document.getElementById(
            "sectionViewer"
        );

    const content =
        document.getElementById(
            "sectionViewerContent"
        );

    const title =
        document.getElementById(
            "sectionViewerTitle"
        );


    if (!viewer || !content || !title) {
        return;
    }


    content.innerHTML = "";


    title.textContent =
        item.name;


    let media;


    if (item.type === "photo") {

        media =
            document.createElement("img");

        media.src =
            item.data;

        media.alt =
            item.name;

    }

    else {

        media =
            document.createElement("video");

        media.src =
            item.data;

        media.controls = true;

        media.autoplay = true;

        media.playsInline = true;

    }


    media.className =
        "section-view-media";


    content.appendChild(
        media
    );


    viewer.classList.add(
        "show"
    );


    viewer.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


/* =========================================================
   CLOSE SECTION VIEWER
========================================================= */

function closeSectionViewer() {

    const viewer =
        document.getElementById(
            "sectionViewer"
        );

    const content =
        document.getElementById(
            "sectionViewerContent"
        );


    if (viewer) {

        viewer.classList.remove(
            "show"
        );

    }


    if (content) {

        content.innerHTML = "";

    }

}


/* =========================================================
   HOST MEDIA LIST
========================================================= */

function renderHostMediaList() {

    const list =
        document.getElementById(
            "hostMediaList"
        );


    if (!list) {
        return;
    }


    if (!hostUnlocked) {

        list.innerHTML = "";

        return;

    }


    list.innerHTML = "";


    mediaStore.forEach(
        (item, index) => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "host-media-row";


            const label =
                document.createElement(
                    "span"
                );


            label.textContent =
                (
                    item.type === "photo"
                        ? "📸 "
                        : "🎬 "
                ) +
                item.name;


            const remove =
                document.createElement(
                    "button"
                );


            remove.textContent =
                "Remove";


            remove.onclick = () => {

                if (
                    !confirm(
                        "Remove this item from the gallery?"
                    )
                ) {
                    return;
                }


                mediaStore.splice(
                    index,
                    1
                );


                localStorage.setItem(
                    "heartProjectMedia",
                    JSON.stringify(
                        mediaStore
                    )
                );


                renderMedia(
                    currentMediaFilter,
                    true
                );


                const message =
                    document.getElementById(
                        "hostMessage"
                    );


                if (message) {

                    message.textContent =
                        "✓ Media removed.";

                    message.style.color =
                        "#69e58a";

                }

            };


            row.appendChild(
                label
            );

            row.appendChild(
                remove
            );


            list.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   MEDIA LIGHTBOX
========================================================= */

function openMediaLightbox(item) {

    const box =
        document.getElementById(
            "mediaLightbox"
        );

    const content =
        document.getElementById(
            "lightboxContent"
        );


    if (!box || !content) {
        return;
    }


    content.innerHTML = "";


    let media;


    if (item.type === "photo") {

        media =
            document.createElement("img");

        media.src =
            item.data;

    }

    else {

        media =
            document.createElement("video");

        media.src =
            item.data;

        media.controls = true;

        media.autoplay = true;

        media.playsInline = true;

    }


    content.appendChild(
        media
    );


    box.classList.add(
        "show"
    );

}


/* =========================================================
   CLOSE MEDIA LIGHTBOX
========================================================= */

function closeMediaLightbox(event) {

    if (
        event &&
        event.target.closest(
            "#lightboxContent"
        )
    ) {

        return;

    }


    const box =
        document.getElementById(
            "mediaLightbox"
        );

    const content =
        document.getElementById(
            "lightboxContent"
        );


    if (box) {

        box.classList.remove(
            "show"
        );

    }


    if (content) {

        content.innerHTML = "";

    }

}


/* =========================================================
   CLOSE SETTINGS WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const menu =
            document.getElementById(
                "settingsMenu"
            );

        const button =
            document.querySelector(
                ".settings-btn"
            );


        if (
            menu &&
            button &&
            menu.classList.contains("show") &&
            !menu.contains(event.target) &&
            !button.contains(event.target)
        ) {

            menu.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   INITIAL LOCAL MEDIA LOAD
========================================================= */

renderMedia(
    "all",
    false
);


/* =========================================================
   FIREBASE
========================================================= */

window.firebaseReady = false;

window.firebaseUser = null;

window.firebaseItems = [];


/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */

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


/* =========================================================
   FIREBASE MODULE
========================================================= */

(async function initFirebase() {

    try {

        const {
            initializeApp
        } =
            await import(
                "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"
            );


        const {
            getAuth,
            signInWithEmailAndPassword,
            onAuthStateChanged,
            signOut
        } =
            await import(
                "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js"
            );


        const {
            getStorage,
            ref,
            listAll,
            getDownloadURL,
            uploadBytes,
            deleteObject
        } =
            await import(
                "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js"
            );


        const app =
            initializeApp(
                firebaseConfig
            );


        const auth =
            getAuth(app);


        const storage =
            getStorage(app);


        const ROOT =
            "heart-project-media";


        let firebaseUser =
            null;


        let firebaseItems =
            [];


        window.firebaseAuth =
            auth;


        window.firebaseStorage =
            storage;


        window.firebaseRef =
            ref;


        window.firebaseListAll =
            listAll;


        window.firebaseGetDownloadURL =
            getDownloadURL;


        window.firebaseUploadBytes =
            uploadBytes;


        window.firebaseDeleteObject =
            deleteObject;


        /* =================================================
           FIREBASE MESSAGE
        ================================================= */

        function firebaseMessage(
            text,
            success = false
        ) {

            const element =
                document.getElementById(
                    "firebaseMessage"
                );


            if (element) {

                element.textContent =
                    text;

                element.className =
                    "firebase-message " +
                    (
                        success
                            ? "ok"
                            : ""
                    );

            }


            const hostMessage =
                document.getElementById(
                    "hostMessage"
                );


            if (
                hostMessage &&
                !element
            ) {

                hostMessage.textContent =
                    text;

                hostMessage.style.color =
                    success
                        ? "#69e58a"
                        : "#ff6875";

            }

        }


        /* =================================================
           LOAD FIREBASE MEDIA
        ================================================= */

        async function loadFirebaseMedia() {

            try {

                const folder =
                    ref(
                        storage,
                        ROOT
                    );


                const result =
                    await listAll(
                        folder
                    );


                const items = [];


                for (
                    const fileRef
                    of result.items
                ) {

                    const url =
                        await getDownloadURL(
                            fileRef
                        );


                    const type =
                        /\.(mp4|webm|ogg|mov|m4v)$/i
                            .test(
                                fileRef.name
                            )
                            ? "video"
                            : "photo";


                    items.push({

                        id:
                            fileRef.fullPath,

                        name:
                            fileRef.name,

                        type:
                            type,

                        data:
                            url

                    });

                }


                firebaseItems =
                    items;


                window.firebaseItems =
                    items;


                mediaStore =
                    items;


                window.firebaseReady =
                    true;


                renderMedia(
                    currentMediaFilter,
                    false
                );


                renderFirebaseHostList();


                const status =
                    document.getElementById(
                        "firebaseStatus"
                    );


                if (status) {

                    status.textContent =
                        "☁️ Live project gallery connected";

                    status.className =
                        "firebase-status live";

                }

            }

            catch(error) {

                console.error(
                    "Firebase Storage:",
                    error
                );


                const status =
                    document.getElementById(
                        "firebaseStatus"
                    );


                if (status) {

                    status.textContent =
                        "☁️ Firebase Storage setup required";

                }

            }

        }


        /* =================================================
           FIREBASE HOST LIST
        ================================================= */

        function renderFirebaseHostList() {

            const list =
                document.getElementById(
                    "hostMediaList"
                );


            if (!list) {
                return;
            }


            if (!firebaseUser) {
                return;
            }


            list.innerHTML = "";


            firebaseItems.forEach(
                item => {

                    const row =
                        document.createElement(
                            "div"
                        );


                    row.className =
                        "host-media-row";


                    const name =
                        document.createElement(
                            "span"
                        );


                    name.textContent =
                        (
                            item.type === "photo"
                                ? "📸 "
                                : "🎬 "
                        ) +
                        item.name;


                    const remove =
                        document.createElement(
                            "button"
                        );


                    remove.textContent =
                        "Remove";


                    remove.onclick =
                        async () => {

                            if (
                                !confirm(
                                    "Remove this item?"
                                )
                            ) {
                                return;
                            }


                            try {

                                await deleteObject(
                                    ref(
                                        storage,
                                        item.id
                                    )
                                );


                                firebaseMessage(
                                    "✓ Removed.",
                                    true
                                );


                                await loadFirebaseMedia();

                            }

                            catch(error) {

                                console.error(
                                    error
                                );


                                firebaseMessage(
                                    "Remove failed. Check Storage rules."
                                );

                            }

                        };


                    row.appendChild(
                        name
                    );


                    row.appendChild(
                        remove
                    );


                    list.appendChild(
                        row
                    );

                }
            );

        }


        /* =================================================
           LEADER LOGIN
        ================================================= */

        async function loginLeader() {

            const email =
                document.getElementById(
                    "leaderEmail"
                );

            const password =
                document.getElementById(
                    "leaderPassword"
                );


            if (!email || !password) {

                firebaseMessage(
                    "Leader login fields are missing."
                );

                return;

            }


            const emailValue =
                email.value.trim();


            const passwordValue =
                password.value;


            if (
                !emailValue ||
                !passwordValue
            ) {

                firebaseMessage(
                    "Enter the leader email and password."
                );

                return;

            }


            try {

                await signInWithEmailAndPassword(
                    auth,
                    emailValue,
                    passwordValue
                );


                firebaseMessage(
                    "✓ Leader access granted.",
                    true
                );

            }

            catch(error) {

                console.error(
                    error
                );


                firebaseMessage(
                    "Login failed. Check your email and password."
                );

            }

        }


        /* =================================================
           LEADER LOGOUT
        ================================================= */

        async function logoutLeader() {

            try {

                await signOut(
                    auth
                );

            }

            catch(error) {

                console.error(
                    error
                );

            }

        }


        /* =================================================
           FIREBASE UPLOAD
        ================================================= */

        async function uploadFirebaseFiles() {

            if (!firebaseUser) {

                firebaseMessage(
                    "Leader login is required."
                );

                return;

            }


            const photoInput =
                document.getElementById(
                    "photoFiles"
                );


            const videoInput =
                document.getElementById(
                    "videoFiles"
                );


            const files = [];


            if (photoInput) {

                files.push(
                    ...Array.from(
                        photoInput.files
                    )
                );

            }


            if (videoInput) {

                files.push(
                    ...Array.from(
                        videoInput.files
                    )
                );

            }


            if (!files.length) {

                firebaseMessage(
                    "Choose a photo or video first."
                );

                return;

            }


            try {

                firebaseMessage(
                    "Uploading…"
                );


                for (
                    const file
                    of files
                ) {

                    const safeName =
                        file.name.replace(
                            /[^a-zA-Z0-9._-]/g,
                            "_"
                        );


                    const name =
                        Date.now() +
                        "_" +
                        Math.random()
                            .toString(36)
                            .slice(2, 8) +
                        "_" +
                        safeName;


                    const fileRef =
                        ref(
                            storage,
                            ROOT +
                            "/" +
                            name
                        );


                    await uploadBytes(
                        fileRef,
                        file,
                        {
                            contentType:
                                file.type
                        }
                    );

                }


                if (photoInput) {

                    photoInput.value =
                        "";

                }


                if (videoInput) {

                    videoInput.value =
                        "";

                }


                firebaseMessage(
                    "✓ Uploaded. Visitors will see the update.",
                    true
                );


                await loadFirebaseMedia();

            }

            catch(error) {

                console.error(
                    error
                );


                firebaseMessage(
                    "Upload failed. Check Storage rules."
                );

            }

        }


        /* =================================================
           FIREBASE AUTH STATE
        ================================================= */

        onAuthStateChanged(
            auth,
            user => {

                firebaseUser =
                    user;


                window.firebaseUser =
                    user;


                const login =
                    document.getElementById(
                        "hostLogin"
                    );


                const upload =
                    document.getElementById(
                        "uploadArea"
                    );


                if (user) {

                    hostUnlocked =
                        true;


                    if (login) {

                        login.style.display =
                            "none";

                    }


                    if (upload) {

                        upload.style.display =
                            "grid";

                    }


                    renderFirebaseHostList();

                }

                else {

                    if (login) {

                        login.style.display =
                            "block";

                    }


                    if (upload) {

                        upload.style.display =
                            "none";

                    }

                }

            }
        );


        /* =================================================
           GLOBAL FIREBASE FUNCTIONS
        ================================================= */

        window.loginLeader =
            loginLeader;


        window.logoutLeader =
            logoutLeader;


        window.uploadFirebaseFiles =
            uploadFirebaseFiles;


        window.loadFirebaseMedia =
            loadFirebaseMedia;


        window.renderFirebaseHostList =
            renderFirebaseHostList;


        /* =================================================
           START FIREBASE
        ================================================= */

        await loadFirebaseMedia();


        setInterval(
            loadFirebaseMedia,
            3000
        );


    }

    catch(error) {

        console.error(
            "Firebase initialization failed:",
            error
        );


        const status =
            document.getElementById(
                "firebaseStatus"
            );


        if (status) {

            status.textContent =
                "☁️ Firebase connection unavailable";

        }

    }

})();