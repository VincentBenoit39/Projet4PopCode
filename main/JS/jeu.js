
var zoom = document.querySelector('.zoom img');
var zoombarreblue = document.querySelector('.zoombarreblue');

zoom.addEventListener('wheel', function(){
    for (n = 0; n < zoom.dataset.scale; n++){
        console.log(n);
        zoombarreblue.style.height = `${n}0%`;
    }
})
// ======================modale======================
let found = []
let lan = ["JavaScript", "HTML", "CSS", "SQL", "Python", "Java", "Bash", "C++", "PowerShell", "C#", "PHP", "TypeScript", "C", "Ruby", "Go", "Assembly", "Swift", "Kotlin", "R", "VBA", "Objective-C", "Scala", "Rust", "Dart", "Elixir", "Clojure", "WebAssembly"]
let langues = lan.map((j) => {
    return j.toUpperCase();
});
let modalInput = document.querySelector(".modalI");
let input = document.querySelector(".input")
let error = document.querySelector('.zoom');
let score = document.querySelector(".check");
let error1 = false
let error2 = false
let error3 = false
let check = 0;

window.addEventListener("keydown", function (e) {
    if (
        e.key === "a" ||
        e.key === "b" || 
        e.key === "c" || 
        e.key === "d" || 
        e.key === "e" || 
        e.key === "f" || 
        e.key === "g" || 
        e.key === "h" || 
        e.key === "i" || 
        e.key === "j" || 
        e.key === "k" || 
        e.key === "l" || 
        e.key === "m" || 
        e.key === "n" || 
        e.key === "o" || 
        e.key === "p" || 
        e.key === "q" || 
        e.key === "r" || 
        e.key === "s" || 
        e.key === "t" || 
        e.key === "u" || 
        e.key === "v" || 
        e.key === "w" || 
        e.key === "x" || 
        e.key === "y" || 
        e.key === "z" || 
        e.key === "+" || 
        e.key === "-" || 
        e.key === "#" ||
        e.key === " "
        ) {
        modalInput.style.display = "flex";
        input.innerHTML += e.key.toUpperCase();
    }
    if (e.key == "Escape"){
        modalInput.style.display = "none";
        input.textContent = "";
    }
    if (e.key == "Backspace"){
        input.textContent = input.textContent.slice(e, -1);
    }
    if(e.key === "Enter" && langues.includes(input.innerHTML)){
        check++;
        score.innerHTML = check
        modalInput.style.display = "none";
        input.textContent = "";
        
        if (check === 2){
            document.querySelector(".modalW").style.display = "flex";
            return
        }
    }
    if(e.key === "Enter" && input.textContent === ""){
        modalInput.style.display = "none";
        return;
    }
    if(e.key === "Enter" && !langues.includes(input.innerHTML)){
        modalInput.style.display = "none";
        input.textContent = "";
        if (error1 == false & error1 != true) {
            document.querySelector('.error1').style = 'color: #0AEFF7;'
            error1 = true
            modalInput.style.display = "none";
            moInput = false;
            return
        }
        if (error1 == true & error2 == false) {
            document.querySelector('.error2').style = 'color: #0AEFF7;'
            error2 = true
            return
        }
        if (error2 == true & error3 == false) {
            document.querySelector('.error3').style = 'color: #0AEFF7;'
            document.querySelector('.modalG').style.display = "flex";
            document.querySelector('.modal-GO').style.display = "flex";
            error3 = true
            stop
        }
    }
})




