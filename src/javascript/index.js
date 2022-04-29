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
    domElements.addProjectBtn.addEventListener("click", displayProjectCreator);


    
})();


