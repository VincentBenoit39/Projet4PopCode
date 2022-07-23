const loading = document.querySelector(".loader") ;
const post = document.querySelector(".post") ;
let modalM = document.querySelector(".modalM");
let btnMention = document.querySelector(".m1");
let mention = document.querySelector(".modal-Mention")


window.onload = setTimeout(text, 3800);
console.log(loading);

function text() {
  loading.style.display = "none";
  post.style.display = "flex";
};

modalM.childNodes[5].addEventListener("click", function() {
  modalM.style.display = "none";
})

btnMention.addEventListener("click", () => {
    modalM.style.display = "flex";
    fetch("./main/Json/languages.json")
        .then((response) => response.json())
        .then((data) => {
            for (let z = 0; z < data.legals.legal.length; z++) {
                if (data.legals.legal[z].content) {
                mention.innerHTML = `${data.legals.legal[z].content}`;
                break
            }
          }
        });
});

