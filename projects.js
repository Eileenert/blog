const projectModal = document.querySelector("#project-modal");
const projectModalFrame = document.querySelector(".project-modal-frame");
const projectModalClose = document.querySelector(".project-modal-close");
const projectLinks = document.querySelectorAll(".project-card");
let previouslyFocusedElement = null;

function closeProjectModal() {
  projectModal.hidden = true;
  projectModalFrame.src = "";
  document.body.classList.remove("modal-open");
  previouslyFocusedElement?.focus();
  previouslyFocusedElement = null;
}

function openProjectModal(event) {
  event.preventDefault();
  previouslyFocusedElement = event.currentTarget;
  projectModalFrame.src = event.currentTarget.href;
  projectModal.hidden = false;
  document.body.classList.add("modal-open");
  projectModalClose.focus();
}

projectLinks.forEach((projectLink) => {
  projectLink.addEventListener("click", openProjectModal);
});

projectModalClose.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !projectModal.hidden) {
    closeProjectModal();
  }
});
