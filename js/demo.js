


const main = document.getElementsByClassName("main")[0];
gsap.timeline().from(main, { opacity: 0}, 0.2);





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