function navChange(event) {
    const link = event.target.closest("a");
    
    if (link && link.className.includes("upTitleLink")) {
            // const homeLink = document.getElementsByClassName("homeLink")[0];
            // homeLink.classList.remove("active");
            // homeLink.classList.add("upTitleLink");
            const active = document.querySelectorAll(".upTitleLink.active")[0];
            
            active.style.transitionDuration = "1s";
            active.classList.remove("active");
            console.log(active.style.transitionDuration);

            active.style.transitionDuration = "1s";
            // gsap.timeline().to(active, { fontSize: 15, duration: 1 }).set(active, {transitionDuration: 0.2});
            setTimeout(() => active.style.transitionDuration = "0.3s", 1000);



            link.classList.add("active");
            // gsap.timeline().to(link, { fontSize: 25, duration: 1 }, "-=1").set(active, {transitionDuration: 0.2});
            // link.classList.remove("upTitleLink");
    }
}

document.addEventListener("click", navChange);