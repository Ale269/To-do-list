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
        domElements.projectListContainer.innerHTML = "";
        console.log(selectedProject);

        Display.displayProjectTitle(selectedProject);

        for(let i=0; i<arr.length; i++){
            let div = document.createElement("div")
            div.classList.add("project-list-element");
            if(arr[i].name == selectedProject){div.classList.add("selected")};
            div.innerHTML = `<h4>${arr[i].name}</h4><i class="remove-project fa-solid fa-xmark"></i>`
            domElements.projectListContainer.append(div);
        }
    }

    static displayProjectTitle(title){
        if(title == null){
            domElements.projectTitle.textContent = "";
        }else{
            domElements.projectTitle.textContent = title;
        }
    }


    static displayTask(arr, isSelected) {
        let result = Display.toggleTaskCreator(arr,isSelected);
        if(result === null){return;}

        for(let i=0; i<arr.length; i++){
            let div = document.createElement("div")
            div.classList.add("task-list-element");
            div.innerHTML = `<h4>${arr[i].name}</h4><i class="fa-solid fa-xmark"></i>`
            domElements.taskListContainer.append(div);
        }
    }
    

    static toggleTaskCreator(arr, isSelected) {
        if(arr == null){
            domElements.taskListContainer.innerHTML = "";
            domElements.TaskContainer.style.cssText = "display: none;";
            return null;
        }else{
            if(isSelected === true){
                domElements.TaskContainer.style.cssText = "";
                domElements.taskListContainer.innerHTML = "";
                domElements.taskInputField.style.cssText = "display: none;"
                domElements.addTaskBtn.style.cssText = "display: flex;"
            }else{
                domElements.taskListContainer.innerHTML = "";
                domElements.TaskContainer.style.cssText = "";
                domElements.taskInputField.style.cssText = "display: block;"
                domElements.addTaskBtn.style.cssText = "display: none;"
            }
        }

    }


    
}