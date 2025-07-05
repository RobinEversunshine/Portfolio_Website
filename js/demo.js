


const demoTitles = document.getElementsByClassName("demoTitle");
const videos = document.getElementsByClassName("video");


for(let i = 0; i < demoTitles.length; i++){
    const demoTitle = demoTitles[i];
    const video = videos[i];

    gsap.timeline().from(demoTitle, { y: 60, opacity: 0, duration: 1 }, "+=0.5")
    .from(video, { y: 60, opacity: 0, duration: 1 }, "-=0.8");
}




// smooth jump to destination when clicking local links
function smoothJump(event) {
    const link = event.target.closest("a");
    const imageBox = event.target.closest(".imageBoxPrj");
    
    if (link && link.href.includes("demo") && link.hash) {
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



document.addEventListener("click", smoothJump);






//////////////////////////////////////////////////////////////////




function removeAllEvent() {
    document.removeEventListener("click", smoothJump);
}



document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (link && !link.href.includes("gallery")) {
        removeAllEvent();
    }
});