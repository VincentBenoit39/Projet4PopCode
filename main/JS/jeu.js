"use strict";zoom();function zoom(t,e,n){t=void 0!==t&&Object.keys(t).length?t:{};var i=(e=void 0!==e&&Object.keys(e).length?e:{}).scaleDefault||2,r=e.scaleDifference||.5,s=e.scaleMax||10,o=e.scaleMin||1,a=e.scrollDisable||!0,u=e.transitionDuration||200,l=e.doubleclickDelay||300,c=!function(){if(["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].indexOf(navigator.platform)>-1||navigator.userAgent.includes("Mac")&&"ontouchend"in document){var t=navigator.userAgent.toLowerCase();if(t.indexOf("safari")>-1&&-1===t.indexOf("chrome"))return!0}return!1}();if(a){var d=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){d=!0}}))}catch(t){}var h=!!d&&{passive:!1},f="onwheel"in document.createElement("div")?"wheel":"mousewheel"}for(var m,b,g,v,A,p,w,x,E,L,M,F,y,z,Y,X,D,k,H,O,W,P,S,C,N,R,T,B,j,q,V,G,I=t.active||"zoom-active",J="data-scale",K="data-translate-x",Q="data-translate-y",U=t.transition||"zoom-transition",Z=t.visible||"zoom-visible",$=t.zoom||"zoom",_=document.getElementsByClassName($),tt=!1,et=[null],nt=0,it=!1,rt=0,st=[null],ot=0;ot<_.length;ot++)m=_[ot],(b=m.children[0]).setAttribute(J,1),b.setAttribute(K,0),b.setAttribute(Q,0);function at(t,e){!1===lt(t,e)&&(t.className+=" "+e)}function ut(t,e,n){return t>=e&&t<=n}function lt(t,e){var n=new RegExp("(?:^|\\s)"+e+"(?!\\S)","g");return!!t.className.match(n)}function ct(t,e,n,i){i=i||!1;for(var r=0;r<t.length;r++)t[r].addEventListener(e,n,i)}function dt(t,e,n){return t<e?t=e:t>n&&(t=n),t}function ht(t,e,n,i){t.style.cssText=c?"-moz-transform : translate("+e+", "+n+") scale("+i+"); -ms-transform : translate("+e+", "+n+") scale("+i+"); -o-transform : translate("+e+", "+n+") scale("+i+"); -webkit-transform : translate("+e+", "+n+") scale("+i+"); transform : translate3d("+e+", "+n+", 0) scale3d("+i+", "+i+", 1);":"-moz-transform : translate("+e+", "+n+") scale("+i+"); -ms-transform : translate("+e+", "+n+") scale("+i+"); -o-transform : translate("+e+", "+n+") scale("+i+"); -webkit-transform : translate("+e+", "+n+") scale("+i+"); transform : translate("+e+", "+n+") scale("+i+", "+i+")"}function ft(t){(t=t||window.event).preventDefault&&t.preventDefault(),t.returnValue=!1}function mt(t){if({37:1,38:1,39:1,40:1}[t.keyCode])return ft(t),!1}function bt(t,e){var n=new RegExp("(?:^|\\s)"+e+"(?!\\S)","g");t.className=t.className.replace(n,"")}function gt(t,e,n){return(t*n-e)/2}function vt(t){at(t,I),n&&n(t,!0)}function At(t){bt(t,I),n&&n(t,!1)}window.addEventListener("load",function(){for(var t=0;t<_.length;t++)m=_[t],at(b=m.children[0],Z);window.addEventListener("resize",function(){for(var t=0;t<_.length;t++)m=_[t],b=m.children[0],!1!==lt(m,I)&&(g=m.clientHeight,v=m.clientWidth,x=b.clientHeight,E=b.clientWidth,L=parseFloat(b.getAttribute(K)),M=parseFloat(b.getAttribute(Q)),D=gt(E,v,V=i),k=gt(x,g,V),B=E*V>v?dt(L,-1*D,D):0,j=x*V>g?dt(M,-1*k,k):0,1===V&&At(m),b.setAttribute(J,V),b.setAttribute(K,B),b.setAttribute(Q,j),ht(b,B+"px",j+"px",V))})}),ct(_,"mousedown",function(t){if(ft(),!0===it||1!==t.which)return!1;if(m=this,b=this.children[0],y=t.clientX,Y=t.clientY,null===et[0])et[0]=t.target,et[1]=y,et[2]=Y,setTimeout(function(){et=[null]},l);else if(et[0]===t.target&&nt<=5&&!0===ut(y,et[1]-10,et[1]+10)&&!0===ut(Y,et[2]-10,et[2]+10))return at(b,U),!0===lt(m,I)?(b.setAttribute(J,1),b.setAttribute(K,0),b.setAttribute(Q,0),At(m),ht(b,0,0,1)):(P=t.clientX,C=t.clientY,T=(i-1)*(R=1),D=gt(E,v,V=i),k=gt(x,g,V),V<=1?(B=0,j=0):(B=E*V<=v?0:dt(L-(P-A-v/2-L)/(V-T)*T,-1*D,D),j=x*V<=g?0:dt(M-(C-p-g/2-M)/(V-T)*T,-1*k,k)),vt(m),b.setAttribute(J,V),b.setAttribute(K,B),b.setAttribute(Q,j),ht(b,B+"px",j+"px",i)),setTimeout(function(){bt(b,U)},u),et=[null],!1;H=m.getBoundingClientRect(),A=H.left,p=H.top,g=m.clientHeight,v=m.clientWidth,x=b.clientHeight,E=b.clientWidth,L=parseFloat(b.getAttribute(K)),M=parseFloat(b.getAttribute(Q)),w=dt(parseFloat(b.getAttribute(J)),o,s),nt=0,tt=!0}),ct(_,"mouseenter",function(){!function(){if(!a)return!1;window.addEventListener("DOMMouseScroll",ft,!1),window.addEventListener(f,ft,h),window.addEventListener("touchmove",ft,h),window.addEventListener("keydown",mt,!1)}()}),ct(_,"mouseleave",function(){!function(){if(!a)return!1;window.removeEventListener("DOMMouseScroll",ft,!1),window.removeEventListener(f,ft,h),window.removeEventListener("touchmove",ft,h),window.removeEventListener("keydown",mt,!1)}()}),document.addEventListener("mousemove",function(t){if(!0===it||!1===tt)return!1;P=t.clientX,C=t.clientY,D=gt(E,v,V=w),k=gt(x,g,V),B=E*V<=v?0:dt(P-(y-L),-1*D,D),j=x*V<=g?0:dt(C-(Y-M),-1*k,k),nt++,Math.abs(B)===Math.abs(D)&&(L=B,y=P);Math.abs(j)===Math.abs(k)&&(M=j,Y=C);b.setAttribute(J,V),b.setAttribute(K,B),b.setAttribute(Q,j),ht(b,B+"px",j+"px",V)}),document.addEventListener("mouseup",function(){if(!0===it||!1===tt)return!1;tt=!1}),document.addEventListener("touchstart",function(){it=!0}),ct(_,"touchstart",function(t){if(ft(),t.touches.length>2)return!1;if(m=this,b=this.children[0],H=m.getBoundingClientRect(),A=H.left,p=H.top,g=m.clientHeight,v=m.clientWidth,x=b.clientHeight,E=b.clientWidth,y=t.touches[0].clientX,Y=t.touches[0].clientY,w=dt(parseFloat(b.getAttribute(J)),o,s),1===(G=t.touches.length)){if(null===st[0])st[0]=t.target,st[1]=y,st[2]=Y,setTimeout(function(){st=[null]},l);else if(st[0]===t.target&&rt<=1&&!0===ut(y,st[1]-10,st[1]+10)&&!0===ut(Y,st[2]-10,st[2]+10))return at(b,U),!0===lt(m,I)?(b.setAttribute(J,1),b.setAttribute(K,0),b.setAttribute(Q,0),At(m),ht(b,0,0,1)):(P=t.touches[0].clientX,C=t.touches[0].clientY,T=(i-1)*(R=1),D=gt(E,v,V=i),k=gt(x,g,V),V<=1?(B=0,j=0):(B=E*V<=v?0:dt(L-(P-A-v/2-L)/(V-T)*T,-1*D,D),j=x*V<=g?0:dt(M-(C-p-g/2-M)/(V-T)*T,-1*k,k)),vt(m),b.setAttribute(J,V),b.setAttribute(K,B),b.setAttribute(Q,j),ht(b,B+"px",j+"px",i)),setTimeout(function(){bt(b,U)},u),st=[null],!1;L=parseFloat(b.getAttribute(K)),M=parseFloat(b.getAttribute(Q))}else 2===G&&(L=parseFloat(b.getAttribute(K)),M=parseFloat(b.getAttribute(Q)),z=t.touches[1].clientX,X=t.touches[1].clientY,O=(y+z)/2,W=(Y+X)/2,F=Math.sqrt((y-z)*(y-z)+(Y-X)*(Y-X)));rt=0,tt=!0}),document.addEventListener("touchmove",function(t){if(ft(),!1===tt)return!1;P=t.touches[0].clientX,C=t.touches[0].clientY,G=t.touches.length,rt++,G>1?(S=t.touches[1].clientX,N=t.touches[1].clientY,q=Math.sqrt((P-S)*(P-S)+(C-N)*(C-N)),null===F&&(F=q),Math.abs(F-q)>=1&&(V=dt(q/F*w,o,s),D=gt(E,v,V),k=gt(x,g,V),T=V-w,B=E*V<=v?0:dt(L-(O-A-v/2-L)/(V-T)*T,-1*D,D),j=x*V<=g?0:dt(M-(W-p-g/2-M)/(V-T)*T,-1*k,k),V>1?vt(m):At(m),ht(b,B+"px",j+"px",V),F=q,w=V,L=B,M=j)):(D=gt(E,v,V=w),k=gt(x,g,V),B=E*V<=v?0:dt(P-(y-L),-1*D,D),j=x*V<=g?0:dt(C-(Y-M),-1*k,k),Math.abs(B)===Math.abs(D)&&(L=B,y=P),Math.abs(j)===Math.abs(k)&&(M=j,Y=C),b.setAttribute(J,w),b.setAttribute(K,B),b.setAttribute(Q,j),ht(b,B+"px",j+"px",V))},{passive:!1}),document.addEventListener("touchend",function(t){if(G=t.touches.length,!1===tt)return!1;0===G?(b.setAttribute(J,w),b.setAttribute(K,B),b.setAttribute(Q,j),F=null,tt=!1):1===G?(y=t.touches[0].clientX,Y=t.touches[0].clientY):G>1&&(F=null)}),ct(_,"wheel",function(t){if(m=this,b=this.children[0],H=m.getBoundingClientRect(),g=m.clientHeight,v=m.clientWidth,x=b.clientHeight,E=b.clientWidth,A=H.left,p=H.top,w=dt(parseFloat(b.getAttribute(J),o,s)),L=parseFloat(b.getAttribute(K)),M=parseFloat(b.getAttribute(Q)),P=t.clientX,C=t.clientY,R=t.deltaY<0?1:-1,(V=w+(T=r*R))<o||V>s)return!1;D=gt(E,v,V),k=gt(x,g,V),V<=1?(B=0,j=0):(B=E*V<=v?0:dt(L-(P-A-v/2-L)/(V-T)*T,-1*D,D),j=x*V<=g?0:dt(M-(C-p-g/2-M)/(V-T)*T,-1*k,k));V>1?vt(m):At(m);b.setAttribute(J,V),b.setAttribute(K,B),b.setAttribute(Q,j),ht(b,B+"px",j+"px",V)})}"undefined"!=typeof module&&(module.exports={zoom:zoom});

var zoom = document.querySelector('.imgZoom');
var zoombarreblue = document.querySelector('.zoombarreblue');

zoom.addEventListener('wheel', function(){
    for (let n = 0; n < zoom.dataset.scale; n++){
        zoombarreblue.style.height = `${n}pc`;
    }
})
window.onload = setTimeout(start, 500);

function start() {
  modalS.style.display = "flex";
};
// ======================modale======================
let found = [];
let lan = ["JavaScript", "HTML", "CSS", "SQL", "Python", "Java", "Bash", "C++", "PowerShell", "C#", "PHP", "TypeScript", "C", "Ruby", "Go", "Assembly", "Swift", "Kotlin", "R", "VBA", "Objective-C", "Scala", "Rust", "Dart", "Elixir", "Clojure", "WebAssembly"];
let langues = lan.map((j) => {
    return j.toUpperCase();
});
let list = document.querySelector(".list");
let modalL = document.querySelector(".modalL");
let modalV = document.querySelector(".modalV");
let modalInput = document.querySelector(".modalI");
let modalM = document.querySelector(".modalM");
let input = document.querySelector(".input");
let score = document.querySelector(".check");
let description = document.querySelector(".modal-View");
let btnMention = document.querySelector(".m1");
let mention = document.querySelector(".modal-Mention")
let modalS = document.querySelector(".modalS")

let error1 = false;
let error2 = false;
let error3 = false;
let check = 0;

btnMention.addEventListener("click", () => {
    modalM.style.display = "flex";
    fetch("main/Json/languages.json")
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

document.querySelector(".btnlanguagestrouver").addEventListener("click", function() {
    modalL.style.display = "flex";
})
modalL.childNodes[5].addEventListener("click", function() {
    modalL.style.display = "none";
})
modalM.childNodes[5].addEventListener("click", function() {
    modalM.style.display = "none";
})
modalS.childNodes[3].addEventListener("click", function() {
    modalS.style.display = "none";
})
modalV.childNodes[3].addEventListener("click", function() {
    modalV.style.display = "none";
})

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
        modalL.style.display = "none";
        modalM.style.display = "none";
        modalS.style.display = "none";
        modalV.style.display = "none";
    }
    if (e.key == "Escape"){
        modalInput.style.display = "none";
        input.textContent = "";
    }
    if (e.key == "Backspace"){
        input.textContent = input.textContent.slice(e, -1);
    }
    let languesPass = langues.indexOf(input.innerHTML);
    if(e.key === "Enter" && langues.includes(input.innerHTML)){
        check++;
        setTimeout(function(){ 
            score.innerHTML = check
            found.push(input.innerHTML)
            langues.splice(languesPass, 1)
            list.innerHTML = found.join(" - ")
            input.textContent = "";
            modalInput.style.display = "none";
            modalV.style.display = "flex";
        }, 800);
        fetch("main/Json/languages.json")
            .then((reponse) => reponse.json())
            .then((data) => {
                for (let i = 0; i < data.languages.langage.length; i++) {
                    if (data.languages.langage[i].name === input.textContent.toLocaleLowerCase()) {
                        description.innerHTML = 
                        `<div class="view-name">${data.languages.langage[i].name}</div><img class="view-img" src=${data.languages.langage[i].picture} alt="logo">
                        <p>${data.languages.langage[i].description}</p><label id="fermeturefenetre>FERMER AUTOMATIQUEMENT CETTE FENETRE APRÈS 2S<input type="checkbox" checked="checked"><span class="checkmark"></span></label>
                        `
                        break
                    }}
                }
            );
        if (check === 27){
            document.querySelector(".modalW").style.display = "flex";
            return
        }
    }
    if(e.key === "Enter" && input.textContent === ""){
        modalInput.style.display = "none";
        return;
    }
    if(e.key === "Enter" && !langues.includes(input.innerHTML)){
        if(found.includes(input.textContent)){
            modalInput.style.display = "flex";
            input.innerHTML = "Language déja trouvés";
            setTimeout(function() {
                input.textContent = "";
                modalInput.style.display = "none";
            }, 800)
            return
        }
        else{
            modalInput.style.display = "none";
            input.textContent = "";
            if (error1 == false & error1 != true) {
                document.querySelector('.error1').style = 'color: #0AEFF7;'
                error1 = true
                modalInput.style.display = "none";
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
            }}
    }
})
// ============================================cursor==========================
// let cursor = document.querySelector(".cursor")
// let cursorinner = document.querySelector(".cursor2")
// let a = document.querySelectorAll(".hovereffect")

// document.addEventListener("mousemove", function (e) {
//   let x = e.clientX
//   let y = e.clientY
//   cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
// })

// document.addEventListener("mousemove", function (e) {
//   let x = e.clientX
//   let y = e.clientY
//   cursorinner.style.left = x + "px"
//   cursorinner.style.top = y + "px"
// });

// document.addEventListener("mousedown", function () {
//   cursor.classList.add("click")
//   cursorinner.classList.add("cursorinnerhover")
// });

// document.addEventListener("mouseup", function () {
//   cursor.classList.remove("click")
//   cursorinner.classList.remove("cursorinnerhover")
// });

// a.forEach((item) => {
//   item.addEventListener("mouseover", () => {
//     cursor.classList.add("hover")
//   })
//   item.addEventListener("mouseleave", () => {
//     cursor.classList.remove("hover")
//   })
// })


