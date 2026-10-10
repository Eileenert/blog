const blogModal = document.querySelector("#blog-modal");
const blogModalFrame = document.querySelector(".blog-modal-frame");
const blogModalClose = document.querySelector(".blog-modal-close");
const blogPostLinks = document.querySelectorAll(".blog-post-link");
let previouslyFocusedPost = null;

function closeBlogModal() {
    blogModal.hidden = true;
    blogModalFrame.src = "";
    document.body.classList.remove("modal-open");
    previouslyFocusedPost?.focus();
    previouslyFocusedPost = null;
}

function openBlogModal(event) {
    event.preventDefault();
    previouslyFocusedPost = event.currentTarget;
    blogModalFrame.src = event.currentTarget.href;
    blogModal.hidden = false;
    document.body.classList.add("modal-open");
    blogModalClose.focus();
}

blogPostLinks.forEach((postLink) => {
    postLink.addEventListener("click", openBlogModal);
});

blogModalClose.addEventListener("click", closeBlogModal);

blogModal.addEventListener("click", (event) => {
    if (event.target === blogModal) {
        closeBlogModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !blogModal.hidden) {
        closeBlogModal();
    }
});
