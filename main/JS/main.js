const loading = document.querySelector(".loader") ;
const post = document.querySelector(".post") ;

window.onload = setTimeout(text, 3800);
console.log(loading);

function text() {
  loading.style.display = "none";
  post.style.display = "flex";
};
