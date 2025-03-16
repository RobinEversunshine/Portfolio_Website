// fade in

gsap.fromTo(".main", { opacity: 0}, { opacity: 1, duration: 1,  onComplete: () => {
    document.getElementsByClassName("main")[0].style.transform = "none";
}}, "+=0.5");


if (localStorage.getItem("transitioning") == "true") {
    localStorage.setItem("transitioning", "false");
} else {
    gsap.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
}

// store current path
localStorage.setItem("path", window.location.pathname)
localStorage.setItem("hash", window.location.hash);


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





// const links = document.querySelectorAll("a");

// for (const link of links){
//     link.addEventListener("click", function(event) {
//         // event.preventDefault();
//         const href = link.getAttribute("href");
//         console.log(href);
//         const url = new URL(href);
//         const hash = url.hash; // 例如 #section2
//         console.log(hash);
//     });
// }






async function loadData() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("数据已加载！");
            window.dispatchEvent(new Event("DOMContentLoaded"));
            resolve();
        }, 100); // 模拟2秒加载时间
    });
}



barba.init({
    transitions: [{
        name: "fade-transition",

        leave({ current }) {
            if (localStorage.getItem("path").includes("projects")){
                return gsap.timeline()
                    .to(current.container.querySelector(".bgCanvas"), {opacity: 0, duration: 0.5 })
                    .to(current.container.querySelector(".imageBoxContainer"), { x: 100, opacity: 0, duration: 1 }, "-=0.3")
                    .to(current.container, { opacity: 0, duration: 0.5}, "-=0.8")
                    .set(current.container, { display: "none" });
            } else {
                return gsap.to(current.container, { opacity: 0, y: -50, duration: 0.5 }).then(() => {
                    current.container.style.display = "none";
                    current.container.style.transform = "none";
                });
            }
        },
        
        async beforeEnter({ next }) {
            next.container.style.opacity = 0;

            // console.log("transition");
            executeExternalScripts(next.container);


            // const url = new URL(next.url.href);
            // const hash = url.hash; // 例如 #section2
            // console.log(hash);

            // if (hash) {
            //     // setTimeout(() => {
            //         const target = document.querySelector(hash);
            //         if (target) {
            //             const offset = target.getBoundingClientRect().top + window.scrollY;
            //             window.scrollTo({ top: offset, behavior: "smooth" });
            //         }
            //     // }, 300);
            // }


            // console.log("开始加载...");
            await loadData();
            // const hash = window.location.hash;

            
            // console.log("加载完成！");
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
            localStorage.setItem("hash", window.location.hash);
        }
    }]
});





let scriptList = [];


function executeExternalScripts(container) {
    const scripts = container.querySelectorAll("script[src]");
    scripts.forEach(script => {
        
        if (!scriptList.includes(script)){
            scriptList.push(script);

            fetch(script.src)  // 加载 script 文件
                .then(response => response.text())  // 获取 JS 代码
                .then(code => {
                    eval(code);  // 直接执行 JS 代码
                    console.log(`Executed: ${script.src}`);
                })
                .catch(error => console.error(`Error loading script ${script.src}:`, error));
        }
    });
}



