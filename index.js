const logoFrame = document.querySelector(".logo-frame");
const sparkleImages = [
  "images/paillettes/planet.png",
  "images/paillettes/star1.png",
  "images/paillettes/star2.png",
  "images/paillettes/star3.png",
  "images/paillettes/heart1.png",
  "images/paillettes/heart2.png",
];

function releaseSparkles() {
  logoFrame.classList.remove("shake");
  void logoFrame.offsetWidth;
  logoFrame.classList.add("shake");

  const bounds = logoFrame.getBoundingClientRect();
  sparkleImages.forEach((imagePath) => {
    const particleCount = 4;

    for (let index = 0; index < particleCount; index += 1) {
      const sparkle = document.createElement("span");
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 180;

      sparkle.className = "sparkle";
      sparkle.style.left = `${bounds.left + bounds.width / 2}px`;
      sparkle.style.top = `${bounds.top + bounds.height / 2}px`;
      sparkle.style.setProperty("--sparkle-image", `url("${imagePath}")`);
      sparkle.style.setProperty("--sparkle-x", `${Math.cos(angle) * distance}px`);
      sparkle.style.setProperty(
        "--sparkle-y",
        `${Math.sin(angle) * distance + 160}px`,
      );
      sparkle.style.setProperty(
        "--sparkle-rotation",
        `${-180 + Math.random() * 360}deg`,
      );
      sparkle.style.animationDelay = `${Math.random() * 120}ms`;
      document.body.appendChild(sparkle);
      sparkle.addEventListener("animationend", () => sparkle.remove(), {
        once: true,
      });
    }
  });
}

logoFrame.addEventListener("click", releaseSparkles);
logoFrame.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    releaseSparkles();
  }
});
