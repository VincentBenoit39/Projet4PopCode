// -----------------------Zoom-------------------
"use strict";

/* @->zoom */
zoom();

/* @-<zoom ********************************************************************/
/******************************************************************************/
function zoom(classNames = {}, settings = {}) {
    /* Settings */
    var C_scaleDefault = settings["scaleDefault"] || 2; // Used on doubleclick, doubletap and resize
    var C_scaleDifference = settings["scaleDifference"] || 0.5; // Used on wheel zoom
    var C_scaleMax = settings["scaleMax"] || 10;
    var C_scaleMin = settings["scaleMin"] || 1;

    /* Selectors */
    var _active = classNames["zoomActive"] || "zoomActive";
    var _dataScale = "data-scale";
    var _dataTranslateX = "data-translate-x";
    var _dataTranslateY = "data-translate-y";
    var _visible = classNames["visible"] || "visible";
    var $container;
    var $element;
    var $zoom = document.getElementsByClassName(classNames["zoom"] || "zoom");

    /* Helpers */
    var capture = false;
    var doubleClickMonitor = [null];
    var containerHeight;
    var containerWidth;
    var containerOffsetX;
    var containerOffsetY;
    var initialScale;
    var elementHeight;
    var elementWidth;
    var heightDifference;
    var initialOffsetX;
    var initialOffsetY;
    var initialPinchDistance;
    var initialPointerOffsetX;
    var initialPointerOffsetX2;
    var initialPointerOffsetY;
    var initialPointerOffsetY2;
    var limitOffsetX;
    var limitOffsetY;
    var mousemoveCount = 0;
    var offset;
    var pinchOffsetX;
    var pinchOffsetY;
    var pointerOffsetX;
    var pointerOffsetX2;
    var pointerOffsetY;
    var pointerOffsetY2;
    var scaleDirection;
    var scaleDifference;
    var targetOffsetX;
    var targetOffsetY;
    var targetPinchDistance;
    var targetScale;
    var touchable = false;
    var touchCount;
    var touchmoveCount = 0;
    var doubleTapMonitor = [null];
    var widthDifference;

    /* EVENT - DOM ready ********************************************************/
    /****************************************************************************/
    for (var i = 0; i < $zoom.length; i++) {
        /* Initialize selectors */
        $container = $zoom[i];
        $element = $container.children[0];

        /* Set attributes */
        $element.setAttribute(_dataScale, 1);
        $element.setAttribute(_dataTranslateX, 0);
        $element.setAttribute(_dataTranslateY, 0);
    }

    /* EVENT - load - window ****************************************************/
    /****************************************************************************/
    window.addEventListener("load", function() {
        /* Wait for images to be loaded */
        for (var i = 0; i < $zoom.length; i++) {
            /* Initialize selectors */
            $container = $zoom[i];
            $element = $container.children[0];

            addClass($element, _visible);
        }

        /* EVENT - resize - window ************************************************/
        /**************************************************************************/
        window.addEventListener("resize", function() {
            for (var i = 0; i < $zoom.length; i++) {
                /* Initialize selectors */
                $container = $zoom[i];
                $element = $container.children[0];

                if (hasClass($container, _active) === false) {
                    continue;
                }

                /* Initialize helpers */
                containerHeight = $container.clientHeight;
                containerWidth = $container.clientWidth;
                elementHeight = $element.clientHeight;
                elementWidth = $element.clientWidth;
                initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
                initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
                targetScale = C_scaleDefault;
                limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
                limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;
                targetOffsetX = (elementWidth * targetScale) > containerWidth ? minMax(initialOffsetX, limitOffsetX * (-1), limitOffsetX) : 0;
                targetOffsetY = (elementHeight * targetScale) > containerHeight ? minMax(initialOffsetY, limitOffsetY * (-1), limitOffsetY) : 0;

                if (targetScale === 1) {
                    removeClass($container, _active);
                }

                /* Set attributes */
                $element.setAttribute(_dataScale, targetScale);
                $element.setAttribute(_dataTranslateX, targetOffsetX);
                $element.setAttribute(_dataTranslateY, targetOffsetY);

                /* @->moveScaleElement */
                moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);
            }
        });
    });

    /* EVENT - mousedown - $zoom ************************************************/
    /* **************************************************************************/
    massAddEventListener($zoom, "mousedown", mouseDown);

    /* EVENT - mouseenter - $zoom ***********************************************/
    /* **************************************************************************/
    massAddEventListener($zoom, "mouseenter", mouseEnter);

    /* EVENT - mouseleave - $zoom ***********************************************/
    /* **************************************************************************/
    massAddEventListener($zoom, "mouseleave", mouseLeave);

    /* EVENT - mousemove - document *********************************************/
    /****************************************************************************/
    document.addEventListener("mousemove", mouseMove);

    /* EVENT - mouseup - document ***********************************************/
    /****************************************************************************/
    document.addEventListener("mouseup", mouseUp);

    /* EVENT - touchstart - document ********************************************/
    /****************************************************************************/
    document.addEventListener("touchstart", function() {
        touchable = true;
    });

    /* EVENT - touchstart - $zoom ***********************************************/
    /* **************************************************************************/
    massAddEventListener($zoom, "touchstart", touchStart);

    /* EVENT - touchmove - document *********************************************/
    /****************************************************************************/
    document.addEventListener("touchmove", touchMove);

    /* EVENT - touchend - document **********************************************/
    /****************************************************************************/
    document.addEventListener("touchend", touchEnd);

    /* EVENT - wheel - $zoom ****************************************************/
    /****************************************************************************/
    massAddEventListener($zoom, "wheel", wheel);

    /* @-<mouseEnter ************************************************************/
    /****************************************************************************/
    function mouseEnter() {
        disableScroll();
    }

    /* @-<mouseLeave ************************************************************/
    /****************************************************************************/
    function mouseLeave() {
        enableScroll();
    }

    /* @-<mouseDown *************************************************************/
    /****************************************************************************/
    function mouseDown(e) {
        e.preventDefault();

        if (touchable === true || e.which !== 1) {
            return false;
        }

        /* Initialize selectors */
        $container = this;
        $element = this.children[0];

        /* Initialize helpers */
        initialPointerOffsetX = e.clientX;
        initialPointerOffsetY = e.clientY;

        /* Doubleclick */
        if (doubleClickMonitor[0] === null) {
            doubleClickMonitor[0] = e.target;
            doubleClickMonitor[1] = initialPointerOffsetX;
            doubleClickMonitor[2] = initialPointerOffsetY;

            setTimeout(function() {
                doubleClickMonitor = [null];
            }, 400);
        } else if (doubleClickMonitor[0] === e.target && mousemoveCount <= 5 && isWithinRange(initialPointerOffsetX, doubleClickMonitor[1] - 10, doubleClickMonitor[1] + 10) === true && isWithinRange(initialPointerOffsetY, doubleClickMonitor[2] - 10, doubleClickMonitor[2] + 10) === true) {
            if (hasClass($container, _active) === true) {
                /* Set attributes */
                $element.setAttribute(_dataScale, 1);
                $element.setAttribute(_dataTranslateX, 0);
                $element.setAttribute(_dataTranslateY, 0);

                removeClass($container, _active);

                /* @->moveScaleElement */
                moveScaleElement($element, 0, 0, 1);
            } else {
                /* Set attributes */
                $element.setAttribute(_dataScale, C_scaleDefault);
                $element.setAttribute(_dataTranslateX, 0);
                $element.setAttribute(_dataTranslateY, 0);

                addClass($container, _active);

                /* @->moveScaleElement */
                moveScaleElement($element, 0, 0, C_scaleDefault);
            }

            doubleClickMonitor = [null];
            return false;
        }

        /* Initialize helpers */
        containerOffsetX = $container.offsetLeft;
        containerOffsetY = $container.offsetTop;
        containerHeight = $container.clientHeight;
        containerWidth = $container.clientWidth
        elementHeight = $element.clientHeight;
        elementWidth = $element.clientWidth;
        initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
        initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
        initialScale = minMax(parseFloat($element.getAttribute(_dataScale)), C_scaleMin, C_scaleMax);

        mousemoveCount = 0;

        /* Set capture */
        capture = true;
    }

    /* @-<mouseMove *************************************************************/
    /****************************************************************************/
    function mouseMove(e) {
        if (touchable === true || capture === false) {
            return false;
        }

        /* Initialize helpers */
        pointerOffsetX = e.clientX;
        pointerOffsetY = e.clientY;
        targetScale = initialScale;
        limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
        limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;
        targetOffsetX = (elementWidth * targetScale) <= containerWidth ? 0 : minMax(pointerOffsetX - (initialPointerOffsetX - initialOffsetX), limitOffsetX * (-1), limitOffsetX);
        targetOffsetY = (elementHeight * targetScale) <= containerHeight ? 0 : minMax(pointerOffsetY - (initialPointerOffsetY - initialOffsetY), limitOffsetY * (-1), limitOffsetY);
        mousemoveCount++;

        if (Math.abs(targetOffsetX) === Math.abs(limitOffsetX)) {
            initialOffsetX = targetOffsetX;
            initialPointerOffsetX = pointerOffsetX;
        }

        if (Math.abs(targetOffsetY) === Math.abs(limitOffsetY)) {
            initialOffsetY = targetOffsetY;
            initialPointerOffsetY = pointerOffsetY;
        }

        /* Set attributes */
        $element.setAttribute(_dataScale, targetScale);
        $element.setAttribute(_dataTranslateX, targetOffsetX);
        $element.setAttribute(_dataTranslateY, targetOffsetY);

        /* @->moveScaleElement */
        moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);
    }

    /* @-<mouseUp ***************************************************************/
    /****************************************************************************/
    function mouseUp() {
        if (touchable === true || capture === false) {
            return false;
        }

        /* Unset capture */
        capture = false;
    }

    /* @-<touchStart ************************************************************/
    /****************************************************************************/
    function touchStart(e) {
        e.preventDefault();

        if (e.touches.length > 2) {
            return false;
        }

        /* Initialize selectors */
        $container = this;
        $element = this.children[0];

        /* Initialize helpers */
        containerOffsetX = $container.offsetLeft;
        containerOffsetY = $container.offsetTop;
        containerHeight = $container.clientHeight;
        containerWidth = $container.clientWidth;
        elementHeight = $element.clientHeight;
        elementWidth = $element.clientWidth;
        initialPointerOffsetX = e.touches[0].clientX;
        initialPointerOffsetY = e.touches[0].clientY;
        initialScale = minMax(parseFloat($element.getAttribute(_dataScale)), C_scaleMin, C_scaleMax);
        touchCount = e.touches.length;

        if (touchCount === 1) /* Single touch */
        {
            /* Doubletap */
            if (doubleTapMonitor[0] === null) {
                doubleTapMonitor[0] = e.target;
                doubleTapMonitor[1] = initialPointerOffsetX;
                doubleTapMonitor[2] = initialPointerOffsetY;

                setTimeout(function() {
                    doubleTapMonitor = [null];
                }, 400);
            } else if (doubleTapMonitor[0] === e.target && touchmoveCount <= 5 && isWithinRange(initialPointerOffsetX, doubleTapMonitor[1] - 30, doubleTapMonitor[1] + 30) === true && isWithinRange(initialPointerOffsetY, doubleTapMonitor[2] - 30, doubleTapMonitor[2] + 25) === true) {
                if (hasClass($container, _active) === true) {
                    /* Set attributes */
                    $element.setAttribute(_dataScale, 1);
                    $element.setAttribute(_dataTranslateX, 0);
                    $element.setAttribute(_dataTranslateY, 0);

                    removeClass($container, _active);

                    /* @->moveScaleElement */
                    moveScaleElement($element, 0, 0, 1);
                } else {
                    /* Set attributes */
                    $element.setAttribute(_dataScale, C_scaleDefault);
                    $element.setAttribute(_dataTranslateX, 0);
                    $element.setAttribute(_dataTranslateY, 0);

                    addClass($container, _active);

                    /* @->moveScaleElement */
                    moveScaleElement($element, 0, 0, C_scaleDefault);
                }

                doubleTapMonitor = [null];
                return false;
            }

            /* Initialize helpers */
            initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
            initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
        } else if (touchCount === 2) /* Pinch */
        {
            /* Initialize helpers */
            initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
            initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
            initialPointerOffsetX2 = e.touches[1].clientX;
            initialPointerOffsetY2 = e.touches[1].clientY;
            pinchOffsetX = (initialPointerOffsetX + initialPointerOffsetX2) / 2;
            pinchOffsetY = (initialPointerOffsetY + initialPointerOffsetY2) / 2;
            initialPinchDistance = Math.sqrt(((initialPointerOffsetX - initialPointerOffsetX2) * (initialPointerOffsetX - initialPointerOffsetX2)) + ((initialPointerOffsetY - initialPointerOffsetY2) * (initialPointerOffsetY - initialPointerOffsetY2)));
        }

        touchmoveCount = 0;

        /* Set capture */
        capture = true;
    }

    /* @-<touchMove *************************************************************/
    /****************************************************************************/
    function touchMove(e) {
        e.preventDefault();

        if (capture === false) {
            return false;
        }

        /* Initialize helpers */
        pointerOffsetX = e.touches[0].clientX;
        pointerOffsetY = e.touches[0].clientY;
        touchCount = e.touches.length;
        touchmoveCount++;

        if (touchCount > 1) /* Pinch */
        {
            pointerOffsetX2 = e.touches[1].clientX;
            pointerOffsetY2 = e.touches[1].clientY;
            targetPinchDistance = Math.sqrt(((pointerOffsetX - pointerOffsetX2) * (pointerOffsetX - pointerOffsetX2)) + ((pointerOffsetY - pointerOffsetY2) * (pointerOffsetY - pointerOffsetY2)));

            if (initialPinchDistance === null) {
                initialPinchDistance = targetPinchDistance;
            }

            if (Math.abs(initialPinchDistance - targetPinchDistance) >= 1) {
                /* Initialize helpers */
                targetScale = minMax(targetPinchDistance / initialPinchDistance * initialScale, C_scaleMin, C_scaleMax);
                limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
                limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;
                scaleDifference = targetScale - initialScale;
                targetOffsetX = (elementWidth * targetScale) <= containerWidth ? 0 : minMax(initialOffsetX - ((((((pinchOffsetX - containerOffsetX) - (containerWidth / 2)) - initialOffsetX) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetX * (-1), limitOffsetX);
                targetOffsetY = (elementHeight * targetScale) <= containerHeight ? 0 : minMax(initialOffsetY - ((((((pinchOffsetY - containerOffsetY) - (containerHeight / 2)) - initialOffsetY) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetY * (-1), limitOffsetY);

                if (targetScale > 1) {
                    addClass($container, _active);
                } else {
                    removeClass($container, _active);
                }

                /* @->moveScaleElement */
                moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);

                /* Initialize helpers */
                initialPinchDistance = targetPinchDistance;
                initialScale = targetScale;
                initialOffsetX = targetOffsetX;
                initialOffsetY = targetOffsetY;
            }
        } else /* Single touch */
        {
            /* Initialize helpers */
            targetScale = initialScale;
            limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
            limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;
            targetOffsetX = (elementWidth * targetScale) <= containerWidth ? 0 : minMax(pointerOffsetX - (initialPointerOffsetX - initialOffsetX), limitOffsetX * (-1), limitOffsetX);
            targetOffsetY = (elementHeight * targetScale) <= containerHeight ? 0 : minMax(pointerOffsetY - (initialPointerOffsetY - initialOffsetY), limitOffsetY * (-1), limitOffsetY);

            if (Math.abs(targetOffsetX) === Math.abs(limitOffsetX)) {
                initialOffsetX = targetOffsetX;
                initialPointerOffsetX = pointerOffsetX;
            }

            if (Math.abs(targetOffsetY) === Math.abs(limitOffsetY)) {
                initialOffsetY = targetOffsetY;
                initialPointerOffsetY = pointerOffsetY;
            }

            /* Set attributes */
            $element.setAttribute(_dataScale, initialScale);
            $element.setAttribute(_dataTranslateX, targetOffsetX);
            $element.setAttribute(_dataTranslateY, targetOffsetY);

            /* @->moveScaleElement */
            moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);
        }
    }

    /* @-<touchEnd **************************************************************/
    /****************************************************************************/
    function touchEnd(e) {
        touchCount = e.touches.length;

        if (capture === false) {
            return false;
        }

        if (touchCount === 0) /* No touch */
        {
            /* Set attributes */
            $element.setAttribute(_dataScale, initialScale);
            $element.setAttribute(_dataTranslateX, targetOffsetX);
            $element.setAttribute(_dataTranslateY, targetOffsetY);

            initialPinchDistance = null;
            capture = false;
        } else if (touchCount === 1) /* Single touch */
        {
            initialPointerOffsetX = e.touches[0].clientX;
            initialPointerOffsetY = e.touches[0].clientY;
        } else if (touchCount > 1) /* Pinch */
        {
            initialPinchDistance = null;
        }
    }

    /* @-<wheel *****************************************************************/
    /****************************************************************************/
    function wheel(e) {
        /* Initialize selectors */
        $container = this;
        $element = this.children[0];

        /* Initialize helpers */
        offset = $container.getBoundingClientRect();
        containerHeight = $container.clientHeight;
        containerWidth = $container.clientWidth;
        elementHeight = $element.clientHeight;
        elementWidth = $element.clientWidth;
        containerOffsetX = offset.left;
        containerOffsetY = offset.top;
        initialScale = minMax(parseFloat($element.getAttribute(_dataScale), C_scaleMin, C_scaleMax));
        initialOffsetX = parseFloat($element.getAttribute(_dataTranslateX));
        initialOffsetY = parseFloat($element.getAttribute(_dataTranslateY));
        pointerOffsetX = e.clientX;
        pointerOffsetY = e.clientY;
        scaleDirection = e.deltaY < 0 ? 1 : -1;
        scaleDifference = C_scaleDifference * scaleDirection;
        targetScale = initialScale + scaleDifference;

        /* Prevent scale overflow */
        if (targetScale < C_scaleMin || targetScale > C_scaleMax) {
            return false;
        }

        /* Set offset limits */
        limitOffsetX = ((elementWidth * targetScale) - containerWidth) / 2;
        limitOffsetY = ((elementHeight * targetScale) - containerHeight) / 2;

        if (targetScale <= 1) {
            targetOffsetX = 0;
            targetOffsetY = 0;
        } else {
            /* Set target offsets */
            targetOffsetX = (elementWidth * targetScale) <= containerWidth ? 0 : minMax(initialOffsetX - ((((((pointerOffsetX - containerOffsetX) - (containerWidth / 2)) - initialOffsetX) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetX * (-1), limitOffsetX);
            targetOffsetY = (elementHeight * targetScale) <= containerHeight ? 0 : minMax(initialOffsetY - ((((((pointerOffsetY - containerOffsetY) - (containerHeight / 2)) - initialOffsetY) / (targetScale - scaleDifference))) * scaleDifference), limitOffsetY * (-1), limitOffsetY);
        }

        if (targetScale > 1) {
            addClass($container, _active);
        } else {
            removeClass($container, _active);
        }

        /* Set attributes */
        $element.setAttribute(_dataScale, targetScale);
        $element.setAttribute(_dataTranslateX, targetOffsetX);
        $element.setAttribute(_dataTranslateY, targetOffsetY);

        /* @->moveScaleElement */
        moveScaleElement($element, targetOffsetX + "px", targetOffsetY + "px", targetScale);
    }
}

/* Library ********************************************************************/
/******************************************************************************/

/* @-<addClass ****************************************************************/
/******************************************************************************/
function addClass($element, targetClass) {
    if (hasClass($element, targetClass) === false) {
        $element.className += " " + targetClass;
    }
}

/* @-<disableScroll ***********************************************************/
/******************************************************************************/
function disableScroll() {
    if (window.addEventListener) // older FF
    {
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    }

    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

/* @-<enableScroll ************************************************************/
/******************************************************************************/
function enableScroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    }

    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

/* @isWithinRange *************************************************************/
/******************************************************************************/
function isWithinRange(value, min, max) {
    if (value >= min && value <= max) {
        return true;
    } else {
        return false;
    }
}

/* @hasClass ******************************************************************/
/******************************************************************************/
function hasClass($element, targetClass) {
    var rgx = new RegExp("(?:^|\\s)" + targetClass + "(?!\\S)", "g");

    if ($element.className.match(rgx)) {
        return true;
    } else {
        return false;
    }
}

/* @-<massAddEventListener ****************************************************/
/******************************************************************************/
function massAddEventListener($elements, event, customFunction, useCapture) {
    var useCapture = useCapture || false;

    for (var i = 0; i < $elements.length; i++) {
        $elements[i].addEventListener(event, customFunction, useCapture);
    }
}

/* @-<minMax ******************************************************************/
/******************************************************************************/
function minMax(value, min, max) {
    if (value < min) {
        value = min;
    } else if (value > max) {
        value = max;
    }

    return value;
}

/* @-<moveScaleElement ********************************************************/
/******************************************************************************/
function moveScaleElement($element, targetOffsetX, targetOffsetY, targetScale) {
    $element.style.cssText = "-moz-transform : translate(" + targetOffsetX + ", " + targetOffsetY + ") scale(" + targetScale + "); -ms-transform : translate(" + targetOffsetX + ", " + targetOffsetY + ") scale(" + targetScale + "); -o-transform : translate(" + targetOffsetX + ", " + targetOffsetY + ") scale(" + targetScale + "); -webkit-transform : translate(" + targetOffsetX + ", " + targetOffsetY + ") scale(" + targetScale + "); transform : translate3d(" + targetOffsetX + ", " + targetOffsetY + ", 0) scale3d(" + targetScale + ", " + targetScale + ", 1);";
}

/* @-<preventDefault **********************************************************/
/******************************************************************************/
function preventDefault(e) {
    e = e || window.event;

    if (e.preventDefault) {
        e.preventDefault();
    }

    e.returnValue = false;
}

/* @preventDefaultForScrollKeys ***********************************************/
/******************************************************************************/
function preventDefaultForScrollKeys(e) {
    var keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

/* @removeClass ***************************************************************/
/******************************************************************************/
function removeClass($element, targetClass) {
    var rgx = new RegExp("(?:^|\\s)" + targetClass + "(?!\\S)", "g");

    $element.className = $element.className.replace(rgx, "");
}
// ===========================erreur===================
// let error1 = false
// let error2 = false
// let error3 = false
// let error = document.querySelector('.zoom');

// document.addEventListener('click', function () {
//     if (error1 == false & error1 != true) {
//         document.querySelector('.error1').style = 'color: #0AEFF7;'
//         error1 = true
//         return
//     }
//     if (error1 == true & error2 == false) {
//         document.querySelector('.error2').style = 'color: #0AEFF7;'
//         error2 = true
//         return
//     }
//     if (error2 == true & error3 == false) {
//         document.querySelector('.error3').style = 'color: #0AEFF7;'
//         document.querySelector('.modal-GO').style.display = "flex";
//         error3 = true
//         return
//     }
// })
// // =====================resultat=============================
// let score = document.querySelector(".check");
// let check = 0;
// document.addEventListener('click', function () {
//     check ++;
//     score.innerHTML = check
// })





// // ----------------------------tableau langues------------------
let found = []
let input = document.querySelector(".input");
let langues = ["JavaScript", "HTML", "CSS", "SQL", "Python", "Java", "Bash", "Shell", "PowerShell", "C#", "PHP", "TypeScript", "C", "Ruby", "Go", "Assembly", "Swift", "Kotlin", "R", "VBA", "Objective-C", "Scala", "Rust", "Dart", "Elixir", "Clojure", "WebAssembly"]

// if(langues.includes(input.toLowerCase().replace("é", "e"))){
// 	result.innerHTML=langues+" c'est bien une langue de codage";
// 	script.stop;
// }
// else{
// 	result.innerHTML=student+" n'es pas une langue de codage"
// }
// ======================modale======================
let modalContainer = document.querySelector(".modal-container");

document.addEventListener("click", function(){
  modalContainer.style.display = "flex";
})



// =======================liste languages ======================

        // //VARIABLES
        // let languages = ["JavaScript", "HTML", "CSS", "SQL", "Python", "Java", "Bash", "Shell", "PowerShell", "C#", "PHP", "TypeScript", "C", "Ruby", "Go", "Assembly", "Swift", "Kotlin", "R", "VBA", "Objective-C", "Scala", "Rust", "Dart", "Elixir", "Clojure", "WebAssembly"]
        // let trouver = []
        // let result = document.querySelector(".input")
        // let studentDisplay = document.querySelector(".yourTurn")
        // let listeTrouver = document.querySelector(".languagestrouver")

        //     // IMPORTANT : La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau. Si l'élément cherché n'est pas présent dans le tableau, la méthode renverra -1.

        //     //On récupère l'index dans le tableau, de l'apprenant choisi
        //     let languesPosition = students.indexOf(langues[index]);
        //     console.log(languesPosition)

        //     //On ajoute dans le tableau vide, l'apprenant choisi
        //     trouver.push(langues[index])
        //     console.log(trouver)
         
        //     // IMPORTANT : La méthode splice() modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant de nouveaux éléments à même le tableau.On peut ainsi vider ou remplacer une partie d'un tableau.

        //     //Maintenant on supprime du tableau apprenant l'apprenant choisi
        //     langues.splice(languesPosition, 1)
        //     console.log(langues)

        //     // IMPORTANT : La méthode join() crée et renvoie une nouvelle chaîne de caractères en concaténant tous les éléments d'un tableau (ou d'un objet semblable à un tableau). La concaténation utilise la virgule ou une autre chaîne, fournie en argument, comme séparateur.

        //     //On affiche le tableau des apprenants passés
        //     modaleTrouver.innerHTML = listeTrouver.join("<br>")




