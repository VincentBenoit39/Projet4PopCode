const loading = document.querySelectorAll(".loader") ;
const content = document.getElementById("displayContent") ;

window.load = setTimeout(showContent, 2000);

function showContent() {
  loading.style.display = "none";
  loading.style.background = "none";
  content.style.display = "block";
}
