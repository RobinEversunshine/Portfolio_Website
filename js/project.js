const artContainer2023 = document.getElementById("art2023");
const artContainer2022 = document.getElementById("art2022");
const artContainer2020 = document.getElementById("art2020");


const art2023 = ['250108sugarbell.webp', '241211name_title.webp', '240903mask2.webp', '240903mask.webp', '240724draft.webp', '240703draft.webp', '240423laywer.png', '240102draft4.webp', '231023draft.webp', '231009draft.webp', '231005draft2.webp', '231005draft.webp', '231003draft.webp', '230530draft.webp', '230330draft2.webp', '230126qrow.webp']
;

const art2022 = ['221224draft.webp', '221212_2.webp', '221212_1.webp', '221211_2.webp', '221211_1.webp', '221129draft.webp', '221124draft2.webp', '221122draft1.webp', '221118draft.webp', '221117draft3.webp', '221117draft.webp', '221115draft.webp', '221115.webp', '221105draft.webp', '221102.webp', '221029draft.webp', '221022home.webp', '221021draft.webp', '221020calameet.webp', '221019draft.webp', '221013colorscript.webp', '221010draft.webp', '221009_2.webp', '221009_1.webp', '221004.webp', '221003rain.webp', '220907draft~1.webp', '220907draft3.webp', '220907draft.webp', '220906.webp', '220901draft.webp', '220826_3.webp', '220826_2.webp', '220826_1.webp', '220812draft1.webp', '220804draft.webp', '220727draft.webp', '220711draft.webp', '220705draft.webp', '220618draft2.webp', '220618draft.webp', '220607draft.webp', '220604draft.webp', '220601draft2.webp', '220601draft.webp', '220514draft.webp']
;

const art2020 = ['210601draft.webp', '210526draft.webp', '210523draft.webp', '210514draft2.webp', '210430alter.webp', '210405draft2.webp', '210405draft.webp', '210325draft2.webp', '210318desert.webp', '210314beach.webp', '210302.webp', '201113draft.webp', '201107.webp', '200919.webp', '200918.webp', '200917.webp', '200916.webp', '200915.webp', '200914.webp', '200830.webp', '200228.webp', '200225.webp', '200222.webp', '200221.webp', '200220.webp', '200218.webp', '200124.webp', '200121cloud.webp', '200120cloud.webp', '200117.webp', '200114cloud.webp', '200108.webp', '200107.webp', '200103.webp', '191219.webp', '191216.webp', '191214.webp', '191124_2.webp', '191124_1.webp']
;



// create misc arts
function createCards() {
    art2023.forEach((fileName) => {
        const div = document.createElement("div");
        div.classList.add("imageBoxPrj");
        artContainer2023.appendChild(div);

        if (art2023[0] == fileName) {
            div.dataset.title = "None";
            div.id = "a23";
        }

        const img = document.createElement("img");
        
        img.src = `images/art/2023-2025/${fileName}`;
        img.alt = fileName;
        img.loading = "lazy";

        div.appendChild(img);
    });

    art2022.forEach((fileName) => {
        const div = document.createElement("div");
        div.classList.add("imageBoxPrj");
        artContainer2022.appendChild(div);

        if (art2022[0] == fileName) div.id = "a22";

        const img = document.createElement("img");
        img.loading = "lazy";
        
        img.src = `images/art/2022/${fileName}`;
        img.alt = fileName;

        div.appendChild(img);
    });

    art2020.forEach((fileName) => {
        const div = document.createElement("div");
        div.classList.add("imageBoxPrj");
        artContainer2020.appendChild(div);

        if (art2020[0] == fileName) div.id = "a20";

        const img = document.createElement("img");
        img.loading = "lazy";
        
        img.src = `images/art/2020-2021/${fileName}`;
        img.alt = fileName;

        div.appendChild(img);
    });
}




// dots fade in animation
const dotBoxes = document.getElementsByClassName("dotBox");
const initRotation = dotBoxes.length / 2 * -6 + 3;

function rotateDots() {
    const tl = gsap.timeline();
    
    let i = 0;
    for(const box of dotBoxes){
        tl.fromTo(box, { opacity: 0, rotate: initRotation - 6 + i * 6 + "deg" }, { opacity: 1, rotate: initRotation + i * 6 + "deg", duration: 0.3 }, i * 0.1 + 0.5);
        i += 1;
    }
}



// disable picture in picture
const videos = document.querySelectorAll("video");

function disablePIP() {
    videos.forEach((vid) => {
        vid.disablePictureInPicture = true;
        // vid.play();
    })
}




// pause video when outside of screen, play it when inside
function videoPlayPause() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => observer.observe(video));
}









// update dots when switching projects
const scrollClasses = document.getElementsByClassName("projectScrollElement");

let viewportCenter = window.innerHeight / 2;
let currentPrj = 0;
let lastPrj = -2;

function getCenterClass() {
    let minDiff = Infinity;
    let i = -1;

    for(const item of scrollClasses){
        i += 1;
        const rect = item.getBoundingClientRect();

        if (rect.bottom < viewportCenter || rect.top > viewportCenter) {
            continue;
        }else{
            currentPrj = i;
            // activeDots()
        }

        // const diff = Math.abs(rect.top - viewportCenter);
        // if (i==0){
        // console.log(rect.top);
        // console.log(rect.bottom);
        // }

        // if (diff < minDiff) {
        //     minDiff = diff;
        //     currentPrj = i;
        // }

        if (lastPrj != currentPrj){
            activeDots();
            lastPrj = currentPrj;
        }
        
    }
}


function activeDots() {
    dotBoxes[currentPrj].querySelector("circle").classList.add("active");
    dotBoxes[currentPrj].querySelector("h3").classList.add("active");

    if (lastPrj != -2){
    dotBoxes[lastPrj].querySelector("circle").classList.remove("active");
    dotBoxes[lastPrj].querySelector("h3").classList.remove("active");
    }
}







// if thumbnail on center, activate it
const scrollItems = document.getElementsByClassName("imageBoxPrj");
const projTitle = document.getElementById("projTitle");

let currentElement = null;
let lastElement = null;


function changeTitle(input, title){
    let output = title;
    if (input) output = input;
    if (input == "None") output = "";
    return output;
}




function getCenterElement() {
    let closest = null;
    let minDiff = Infinity;
    let title = "";

    for(const item of scrollItems){
        const rect = item.getBoundingClientRect();
        
        const curTitle = item.dataset.title;

        if (rect.top < 0) {
            title = changeTitle(curTitle, title);
            continue;
        }

        if (rect.top > viewportCenter * 2) {
            continue;
        }

        const elementCenter = rect.top + rect.height / 2;
        const diff = Math.abs(elementCenter - viewportCenter);

        // if (curTitle) title = curTitle;
        if (diff < minDiff) {
            minDiff = diff;
            closest = item;
            title = changeTitle(curTitle, title);
        }
    }

    if (closest) {
        currentElement = closest;
        if (lastElement != currentElement){
            if (lastElement) lastElement.classList.remove("active");
            currentElement.classList.add("active");
            projTitle.textContent = title;

            changeImageVideo(currentElement);

            lastElement = currentElement;
        }
    }
}



// change image and videos on the right
const imageBoxPrjBig1 = document.getElementsByClassName("imageBoxPrjBig")[0];
const imageBoxPrjBig2 = document.getElementsByClassName("imageBoxPrjBig")[1];
const imageBig = imageBoxPrjBig1.querySelector("img");
const videoBig = imageBoxPrjBig2.querySelector("video");


function changeImageVideo(element) {
    const image = element.querySelector("img");
    const video = element.querySelector("video");

    // change image
    if (image) {
        imageBig.src = image.src;
    }

    // change video, load it
    if (video) {
        videoBig.getElementsByTagName("source")[0].src = video.getElementsByTagName("source")[0].src;
        videoBig.load();
        imageBoxPrjBig2.style.opacity = 1;
    }else{
        // no video available, hide it
        imageBoxPrjBig2.style.opacity = 0;
    }
}


// hide description when window width is small
function checkWidth() {
    viewportCenter = window.innerHeight / 2;

    if (window.innerWidth < 1300) {
        gsap.to(".bgCanvas", {opacity: 0, duration: 0.5 });
    } else {
        gsap.to(".bgCanvas", {opacity: 1, duration: 0.5 });
    }
}





// smooth jump to destination when clicking local links
function smoothJump(event) {
    const link = event.target.closest("a");
    const imageBox = event.target.closest(".imageBoxPrj");
    
    if (link && link.href.includes("projects") && link.hash) {
        event.preventDefault();
        const target = document.querySelector(link.hash);

        if (target) {
            const rect = target.getBoundingClientRect();
            const offset = rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;

            window.scrollTo({ top: offset, behavior: "smooth" });
        }
    }

    if (imageBox){
        const rect = imageBox.getBoundingClientRect();
        const offset = rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;

        window.scrollTo({ top: offset, behavior: "smooth" });
    }

}





//////////////////////////////////////////////////////////////////





function onCreate() {
    // console.log("on create");
    // initial update
    gsap.to(".imageBoxContainer", {opacity: 1, duration: 1 });
    gsap.to(".bgCanvas", {opacity: 1, duration: 0.5 });
    rotateDots();

    // initial check
    getCenterClass();
    getCenterElement();
    checkWidth();

    createCards();

    disablePIP();
    videoPlayPause();
}



function onUpdate() {
    // monitor scroll
    window.addEventListener("scroll", getCenterClass);
    window.addEventListener("scroll", getCenterElement);

    //monitor resize
    window.addEventListener("resize", checkWidth);

    document.addEventListener("DOMContentLoaded", videoPlayPause);
    document.addEventListener("click", smoothJump);

    // if change to another card, mouse's still in video, then don't pause it
    document.addEventListener("wheel", (event) => {
        if (videoBig.contains(event.target)) {
        } else {
            videoBig.pause();
        }
    });


    // video play when mouse's in
    videoBig.addEventListener("mouseenter", () => {
        videoBig.play();
    });

    videoBig.addEventListener("mouseleave", () => {
        videoBig.pause();
    });


    // addEventListener("DOMContentLoaded", (event) => {
    //     if (window.location.pathname.includes("projects")){
    //         onCreate();
    //     }
    // });
}


onCreate();
onUpdate();











function removeAllEvent() {
    window.removeEventListener("scroll", getCenterClass);
    window.removeEventListener("scroll", getCenterElement);
    window.removeEventListener("resize", checkWidth);
    document.removeEventListener("click", smoothJump);
    document.removeEventListener("DOMContentLoaded", videoPlayPause);
}


// const links = document.querySelectorAll("a");

// for (const link of links){
//     link.addEventListener("click", removeAllEvent);
// }



document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (link && !link.href.includes("projects")) {
        removeAllEvent();
    }
});