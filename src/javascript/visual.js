import domElements from "./domElements.js";

export default class Display {

    static displayNavInput() {
        domElements.addProjectDefault.style.cssText = "display: none;";
        domElements.projectInputField.style.cssText = "display: block;";
    }


    static removeNavInput() {
        domElements.addProjectDefault.setAttribute("style", "");
        domElements.projectInputField.setAttribute("style", "");
    }


    static displayProject(arr) {
        domElements.projectListContainer.innerHTML = ""
        for(let i=0; i<arr.length; i++){
            let div = document.createElement("div")
            div.classList.add("project-list-element");
            div.innerHTML = `<h4>${arr[i].name}</h4><i class="fa-solid fa-xmark"></i>`
            domElements.projectListContainer.append(div);
        }
    }


    
}