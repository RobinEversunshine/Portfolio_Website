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