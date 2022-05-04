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
            div.innerHTML = `<i class="fa-regular fa-folder"></i><h4>${arr[i].name}</h4><i class="remove-project fa-solid fa-xmark"></i>`
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

            div.setAttribute("class",`task-list-element${arr[i].urgency}`);
            div.innerHTML = `<div class="first-task-row">
                <h4 class="task-title">${arr[i].name}</h4>
                <i class="check fa-regular fa-circle-check"></i>
            </div>
            <div class="second-task-row">
                <p class="descritpion">${arr[i].description}</p>
            </div>
            <div class="date-task-row">
                <h4 class="date">${arr[i].date}</h4>
            </div>
            `

            if(!arr[i].description == undefined){
                document.querySelector("second-task-row").style.cssText("display: none;");
            };

            if(arr[i].date === undefined){
                document.querySelector("date-task-row").style.cssText("display: none;");
            };


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