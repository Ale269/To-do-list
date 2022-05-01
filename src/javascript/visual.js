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


    static displayProject(arr, selectedProject) {
        domElements.projectListContainer.innerHTML = ""
        console.log(selectedProject);

        Display.displayProjectTitle(selectedProject);

        for(let i=0; i<arr.length; i++){
            let div = document.createElement("div")
            div.classList.add("project-list-element");
            if(arr[i].name == selectedProject){div.classList.add("selected")};
            div.innerHTML = `<h4>${arr[i].name}</h4><i class="fa-solid fa-xmark"></i>`
            domElements.projectListContainer.append(div);
        }
    }

    static displayProjectTitle(title){
        if(title == null){
            domElements.projectTitle.textContent.textContent = "";
        }else{
            domElements.projectTitle.textContent = title;
        }
    }


    
}