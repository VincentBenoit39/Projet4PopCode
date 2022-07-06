const loading = document.querySelector(".loader") ;
const post = document.querySelector(".post") ;

window.onload = setTimeout(text, 3800);
console.log(loading);

function text() {
  loading.style.display = "none";
  post.style.display = "flex";
};
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active")
}
