import "../style/style.scss";
import domElements from "./domElements.js";

document.querySelector("button").addEventListener("click", () => {
    console.log("start");

    if(document.querySelector(".project-container").classList.contains("active")){
        document.querySelector(".project-container").setAttribute("class", "project-container");
        return;
    }

    document.querySelector(".project-container").classList.add("active");
});


class Project {
    constructor() {

    }
}


const Controller = (() => {
    const displayProjectCreator = function() {
        domElements.addProjectDefault.style.cssText = "display: none;";
        domElements.projectInputField.style.cssText = "display: block;";
    }

    const removeProjectCreator = function(e) {
        e.stopPropagation() 
        domElements.addProjectDefault.setAttribute("style", "");
        domElements.projectInputField.setAttribute("style", "");
    }


    domElements.addProjectBtn.addEventListener("click", displayProjectCreator);
    domElements.cancelProjectBtn.addEventListener("click", (event) => {
        removeProjectCreator(event);
    });


})();


