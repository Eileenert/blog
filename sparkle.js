const sparkleAssets = [
    "planet.png",
    "star1.png",
    "star2.png",
    "star3.png",
    "heart1.png",
    "heart2.png",
];

const sparkleScript = document.currentScript;
const sparkleImageRoot = new URL("images/paillettes/", sparkleScript.src);
let lastMouseSparkle = 0;

function createMouseSparkle(x, y) {
    const sparkle = document.createElement("span");
    const imageName = sparkleAssets[Math.floor(Math.random() * sparkleAssets.length)];
    const drift = -35 + Math.random() * 70;
    const fall = 45 + Math.random() * 70;

    sparkle.className = "sparkle";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty(
        "--sparkle-image",
        `url("${new URL(imageName, sparkleImageRoot)}")`,
    );
    sparkle.style.setProperty("--sparkle-x", `${drift}px`);
    sparkle.style.setProperty("--sparkle-y", `${fall}px`);
    sparkle.style.setProperty(
        "--sparkle-rotation",
        `${-180 + Math.random() * 360}deg`,
    );
    sparkle.style.animationDuration = `${700 + Math.random() * 500}ms`;
    document.body.appendChild(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove(), {
        once: true,
    });
}

document.addEventListener("pointermove", (event) => {
    const now = performance.now();

    if (now - lastMouseSparkle < 55) {
        return;
    }

    lastMouseSparkle = now;
    createMouseSparkle(event.clientX, event.clientY);
});
