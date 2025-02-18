function lerp(a, b, t) {
	return a + (b - a) * t;
}


const videos = ["videos/anim.mp4", "videos/vfx.mp4", "videos/tech.mp4", "videos/code.mp4", "videos/game.mp4", "videos/Swirling Sand Final.mp4"];


// get elements
const body = document.getElementById("body");

const rotateContainer = document.getElementsByClassName("rotateContainer")[0];
const rotateContainer2 = document.getElementsByClassName("rotateContainer2")[0];
const projects = document.getElementsByClassName("rotateBox");
const iam = document.getElementById("iam");

const descriptionContainer = document.getElementsByClassName("descriptionContainer")[0];
const descriptionBoxes = descriptionContainer.getElementsByClassName("descriptionBox")

const videoContainer = document.getElementsByClassName("videoContainer")[0];
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video1Source = document.getElementById("source1");
const video2Source = document.getElementById("source2");


let currentIndex = 0;
let lastIndex = -2;

let lastScrollY = window.scrollY;
let scrollDir = "down";

let videoSwitch = 1;


const scrollDuration = 20;


// rotate container parallel movement
const minScroll = 1320;
const maxScroll = 4600;
const scrollGradient = 800;

const minSpeed = 0.97;
const maxSpeed = 0;
let scrollSpeed = 0;
let scrollAmount = 0;


body.style.height = (projects.length + 1) * 30 * scrollDuration + window.innerHeight * 8 + "px";


function getScroll(scroll){
    // video parallel movement
    videoContainer.style.transform = `translateY(${scroll * 0.85 + 200}px)`;



    // rotate container parallel movement
    if (scroll < minScroll){
        let t = (scroll - (minScroll - scrollGradient)) / (scrollGradient);
        scrollSpeed = lerp(maxSpeed, minSpeed, t);
    } else if (scroll > maxScroll){
        let t = (scroll - (maxScroll)) / (scrollGradient);
        scrollAmount = lerp((scroll - minScroll) * minSpeed, (maxScroll - minScroll) * minSpeed, t);
    } else {
        scrollSpeed = minSpeed;
    }

    scrollSpeed = Math.min(Math.max(scrollSpeed, maxSpeed), minSpeed);

    if (scroll < maxScroll){
        rotateContainer.style.transform = `translateY(${(scroll - minScroll) * scrollSpeed}px)`;
    }else{
        rotateContainer.style.transform = `translateY(${scrollAmount}px)`;
    }




    // show video & description after scrolling down
    if (scroll < window.innerHeight * 1.8 || scroll > 5200){
        videoContainer.style.opacity = "0%";
        descriptionContainer.style.opacity = "0%";
        rotateContainer2.style.opacity = "0%";
    }else{
        videoContainer.style.opacity = "100%";
        if (window.innerWidth > 1200) {
            descriptionContainer.style.opacity = "100%";
        }
        rotateContainer2.style.opacity = "100%";
    }

    if (scroll < window.innerHeight * 1.5){
        iam.style.opacity = "0%";
    }else{
        iam.style.opacity = "100%";
    }



    // get scroll value
    let scrollValue = scroll - window.innerHeight * 1.9;
    scrollValue = -scrollValue / scrollDuration + 25;
    scrollValue = Math.floor(scrollValue / 30) * 30;


    let transitionList = [];

    for (let i = 0; i < projects.length; i++){
        let amount = scrollValue + i * 30;

        // clamp rotation
        amount = Math.min(Math.max(amount, -120), 120);
        amount = Math.max(amount, (projects.length - i - 1) * -30);
        // amount = Math.min(amount, (i) * 30);

        let transition = amount / 30;
        

        // get current index
        if (transition == 0){
            currentIndex = i;
        }

        if (scroll < window.innerHeight * 1.9){
            transition = i + 2;
            currentIndex = -1;
        }

        transitionList.push(transition);
    }



    // index change, then update rotate boxes, change background video, and change description
    if (lastIndex != currentIndex){
        rotate(transitionList);
        changeVideo();
        changeDesc();
        lastIndex = currentIndex;
    }
}



function rotate(transitionList){
    // detect scroll direction
    let currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        scrollDir = "down";
    } else if (currentScrollY < lastScrollY) {
        scrollDir = "up";
    }


    let i = 0;

    for (project of projects){
        let transition = transitionList[i];
        let transitionAbs = Math.abs(transition);

        // rotation transition delay
        let transitionDelay = transition;
        
        if (scrollDir == "down"){
            if (currentIndex != projects.length - 1){
                transitionDelay -= 1;
            }
        }else{
            if (currentIndex != 0){
                transitionDelay += 1;
            }
        }

        if (transitionDelay != 0){
            project.style.transition = "rotate 0.5s cubic-bezier(0.8, 0, 0.3, 1.5)" + (Math.abs(transitionDelay) + 0.7) * 0.07 + "s";
        }else{
            project.style.transition = "rotate 0.5s cubic-bezier(0.7, -1, 0.3, 1.5)"
        }


        // rotate
        project.style.rotate = transition * 30 + "deg";


        // opacity
        let projBox = project.getElementsByClassName("projectBox")[0];
        if (transitionAbs == 0){
            projBox.style.opacity = "100%";
        }else if (transitionAbs == 1){
            projBox.style.opacity = "40%";
        }else if (transitionAbs == 2){
            projBox.style.opacity = "15%";
        }else{
            projBox.style.opacity = "0%";
        }
        
        
        // image box size scale
        let imageBox = project.getElementsByClassName("imageBox")[0];
        if (transitionAbs == 0){
            projBox.style.width = "680px";
            imageBox.style.width = "320px";
            imageBox.style.height = "180px";
        }else{
            projBox.style.width = "600px";
            imageBox.style.width = "80px";
            imageBox.style.height = "80px";
        }

        i++;
    }
    lastScrollY = currentScrollY;
}



function changeVideo(){
    if (videoSwitch == 2){
        video1Source.src = videos[currentIndex];
        video1.load();
        video1.play();
        video2.style.opacity = "0%";
        video1.style.opacity = "100%";
        videoSwitch = 1;
    }else if (videoSwitch == 1){
        video2Source.src = videos[currentIndex];
        video2.load();
        video1.play();
        video1.style.opacity = "0%"; 
        video2.style.opacity = "100%";
        videoSwitch = 2;
    }
} 



function changeDesc(){
    for (let i = 0; i < descriptionBoxes.length; i++){
        if (i == currentIndex){
            descriptionBoxes[i].style.opacity = "100%";
        }else{
            descriptionBoxes[i].style.opacity = "0%";
        }
    }
}
// function fixBlock(){
//     const block = document.getElementById("projBlock");
//     const blockOffsetTop = block.offsetTop;
//     console.log(blockOffsetTop);
// }



// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (!entry.isIntersecting) {
//             stickyBlock.style.position = "fixed";
//             stickyBlock.style.top = "0vh";
//             // stickyBlock.style.translate = "0px 0px";
//             // stickyBlock.classList.add("fixed");
//         } else {
//             stickyBlock.style.position = "absolute";
//             // stickyBlock.style.translate = "0px 90vh";
//             stickyBlock.style.top = "90vh";
//             // stickyBlock.classList.remove("fixed");
//         }
//     });
// }, { threshold: 0 });

// observer.observe(stickyMonitor);



// hide description when window width is small
function checkWidth() {
    if (window.innerWidth < 1150) {
        descriptionContainer.style.opacity = "0%";
    } else {
        descriptionContainer.style.opacity = "100%";
    }
}

window.addEventListener("resize", checkWidth);



// title animation delay
const title = document.getElementsByClassName('title');

for(i = 0; i < title.length; i++) {
    title[i].style.animationDelay = (i * 0.1) + 0.5 + "s";
}



// lenis
const lenis = new Lenis({
    duration: 1.2, // 过渡时间（秒）
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 缓动函数
    smooth: true // 开启平滑滚动
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



lenis.on('scroll', ({ scroll }) => {
    getScroll(scroll);
});


getScroll(scrollY);
checkWidth()