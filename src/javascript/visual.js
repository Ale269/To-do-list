import domElements from "./domElements.js";

export default class Display {

    static displayNavInput() {
        domElements.addProjectBtn.style.cssText = "display: none;";
        domElements.projectInputField.style.cssText = "display: block;";
    }


    static removeNavInput() {
        domElements.addProjectBtn.setAttribute("style", "");
        domElements.projectInputField.setAttribute("style", "");
    }

    static displayTaskInput() {
        domElements.addTaskBtn.style.cssText = "display: none;";
        domElements.taskInputField.style.cssText = "display: block;";
    }

    static removeTaskInput() {
        domElements.addTaskBtn.setAttribute("style", "");
        domElements.taskInputField.setAttribute("style", "");
    }


    static displayProject(arr, selectedeProject) {
        domElements.projectListContainer.innerHTML = ""
        for(let i=0; i<arr.length; i++){
            let div = document.createElement("div")
            div.classList.add("project-list-element");
            if(arr[i].name == selectedeProject){div.classList.add("selected")};
            div.innerHTML = `<h4>${arr[i].name}</h4><i class="fa-solid fa-xmark"></i>`
            domElements.projectListContainer.append(div);
        }
    }


    
}