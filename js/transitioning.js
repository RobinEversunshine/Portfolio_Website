// fade in

gsap.fromTo(".main", { opacity: 0}, { opacity: 1, duration: 1,  onComplete: () => {
    document.getElementsByClassName("main")[0].style.transform = "none";
}}, "+=0.3");


// if (localStorage.getItem("transitioning") == "true") {
//     localStorage.setItem("transitioning", "false");
// } else {
    gsap.fromTo("nav", { opacity: 0}, { opacity: 1, duration: 1 });
// }

// store current path
localStorage.setItem("path", window.location.pathname)



// // fade out
// // const main = document.getElementsByClassName("main")[0];
// const links = document.querySelectorAll("a");

// for (const link of links){
//     link.addEventListener("click", function(event) {
//         event.preventDefault();
//         const href = link.getAttribute("href");

//         if (href && !href.startsWith("#") && href != window.location.pathname){
//             localStorage.setItem("transitioning", "true");
//             gsap.to(".main", { opacity: 0, y: -50, duration: 0.5, onComplete: () => {
//                 window.location.href = href;
//                 // window.location.replace(href);
//             }});
//         }
//     });
// }

let hash;

document.addEventListener("click", (event) => {
    let link = event.target.closest("a");
    if (link && link.hash) {
        hash = link.hash;
    }
});



function jumpToHash() {
    const target = document.querySelector(hash);
    if (target) {
        let offset = target.getBoundingClientRect().top + window.scrollY;
        // if (localStorage.getItem("path").includes("projects")){
            offset -= window.innerHeight / 2;
        // }
        window.scrollTo({ top: offset});
    }
}






async function loadData(next) {
    return new Promise(resolve => {
        setTimeout(() => {
            // console.log("数据已加载！");
            executeExternalScripts(next.container);
            jumpToHash()
            // window.dispatchEvent(new Event("DOMContentLoaded"));
            resolve();
        }, 100);
    });
}



barba.init({
    transitions: [{
        name: "fade-transition",

        leave({ current }) {
            let leaveAnim;

            if (localStorage.getItem("path").includes("projects")){
                // dots fade in animation
                const dotBoxes = current.container.querySelectorAll(".dotBox");
                const initRotation = dotBoxes.length / 2 * -6 + 3;

                const tl = gsap.timeline();
                
                let i = 0;
                for(const box of dotBoxes){
                    tl.to(box, { opacity: 0, rotate: initRotation + 6 + i * 6 + "deg", duration: 0.3 }, i * 0.07);
                    i += 1;
                }

                leaveAnim = 
                // return 
                gsap.timeline()
                    .to(current.container.querySelector(".bgCanvas"), {opacity: 0, duration: 0.5 }, "+=0.1")
                    .to(current.container.querySelector(".imageBoxContainer"), { x: 100, opacity: 0, duration: 1 }, "-=0.3")
                    .to(current.container, { opacity: 0, duration: 0.5}, "-=0.8")
                    .set(current.container, { display: "none" });


            } else {
                const projects = current.container.querySelectorAll(".rotateBox");
                const tl = gsap.timeline();

                let i = 5;
                for (const project of projects){
                    project.style.transition = "";

                    let rotate = project.style.rotate;
                    rotate = rotate.slice(0, -3);

                    const rotateDest = 60 + Number(rotate);
                
                    tl.to(project, { opacity: 0, rotate: rotateDest + "deg", duration: 0.6 }, i * 0.05 + 0.1);
                    i--;
                }

                leaveAnim = 
                // return 
                gsap.timeline()
                    .to(current.container.querySelector(".iam"), { opacity: 0, duration: 0.5 })
                    .to(current.container.querySelector(".videoContainer"), {opacity: 0, duration: 0.5 }, "-=0.2")
                    .to(current.container.querySelector(".descriptionContainer"), { x: 100, opacity: 0, duration: 1 }, "-=0.3")
                    .to(current.container, { opacity: 0, duration: 0.5}, "-=0.8")
                    // .to(current.container.querySelector(".about"), {opacity: 0, y: -50, duration: 0.5 }, "-=0.8")
                    // .to(current.container.querySelector(".titleContainer"), {opacity: 0, y: -50, duration: 0.5 }, "-=0.8")
                    .set(current.container, { display: "none" });



                // return gsap.to(current.container, { opacity: 0, y: -50, duration: 0.5 }).then(() => {
                //     current.container.style.display = "none";
                //     current.container.style.transform = "none";
                // });
            }
            return leaveAnim;
        },
        
        async beforeEnter({ next }) {
            next.container.style.opacity = 0;
            await loadData(next);
        },

        enter({ next }) {
            return gsap.fromTo(next.container, { opacity: 0}, { opacity: 1, duration: 0.5 })
        }
        ,
        afterEnter({ next }) {
            setTimeout(function(){
                document.getElementsByClassName("main")[0].style.transform = "none";
                // window.dispatchEvent(new Event("DOMContentLoaded"));
            }, 10);

            localStorage.setItem("path", window.location.pathname);
        }
    }]
});























// let scriptList = [];


// const scripts = document.getElementsByClassName("main")[0].querySelectorAll("script[src]");
// scripts.forEach(script => {
//     if (!scriptList.includes(script.src)){
//         scriptList.push(script.src);
//     }
// });


function executeExternalScripts(container) {
    const scripts = container.querySelectorAll("script[src]");
    scripts.forEach(script => {
        
        // if (!scriptList.includes(script.src)){
            // scriptList.push(script.src);

            fetch(script.src)  // 加载 script 文件
                .then(response => response.text())  // 获取 JS 代码
                .then(code => {
                    eval(code);  // 直接执行 JS 代码
                    console.log(`Executed: ${script.src}`);
                })
                .catch(error => console.error(`Error loading script ${script.src}:`, error));
        // }
    });
}



