document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(
        "a:not(.back-link):not(.star-link):not(.code-github-link):not(.code-project-link):not(.download-link)"
    );

    links.forEach((link) => {
        if (link.closest(".blabla-page, .about-page") || link.children.length > 0 || !link.textContent.trim()) {
            return;
        }

        const text = link.textContent;
        const wave = [0, -0.12, -0.2, -0.12, 0, 0.12, 0.2, 0.12];
        const spans = Array.from(text).map((character, index) => {
            const span = document.createElement("span");
            span.className = "link-character";
            span.textContent = character;
            span.style.setProperty("--wave-y", `${wave[index % wave.length]}em`);
            return span;
        });

        link.replaceChildren(...spans);
        link.classList.add("link-wave");
    });
});
