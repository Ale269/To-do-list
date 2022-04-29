import "../style/style.scss";
import domElements from "./domElements.js";
import Display from "./visual.js"

document.querySelector("button").addEventListener("click", () => {
    console.log("start");

    if(document.querySelector(".project-container").classList.contains("active")){
        document.querySelector(".project-container").setAttribute("class", "project-container");
        return;
    }

    document.querySelector(".project-container").classList.add("active");
});


class Project {
    constructor(name, urgencyValue) {
        this.name = name;
        this.urgencyValue = urgencyValue;
        this.listArr = [];
    }

    static projectList = [];

    static logProjectList(){
        console.log(Project.projectList);
    }

    removeProject(name){
        projectList = _.remove(projectList, function(element) {
            element.name === name; 
        })

        Project.logProjectList();
    }
}


const Controller = (() => {

    const displayProjectCreator = function() {
        Display.displayNavInput();
    }

    const removeProjectCreator = function(e) {
        Display.removeNavInput();
        e.stopPropagation() 
    }

    const createNewProject = function() {
        if(domElements.projectName.value == ""){alert("Project must have a name"); return;}
        for(let i=0; i<Project.projectList.length; i++){
            if(domElements.projectName.value === Project.projectList[i].name){
                alert("A project with this name already exist");
                return;
            }
        }

        let checkedValue = null;
        if(domElements.radiobtn.radioHigh.checked === true){
            checkedValue = "high";
        }else if(domElements.radiobtn.radioMedium.checked === true){
            checkedValue = "medium";
        }else if(domElements.radiobtn.radioLow.checked === true){
            checkedValue = "low";
        }

        if(checkedValue === null){alert("Project must have a urgency value"); return;}

        const customProject = new Project(domElements.projectName.value, checkedValue);
        Project.projectList.push(customProject);
        Project.logProjectList();

        domElements.projectName.value = "";
        domElements.radiobtn.radioLow.checked = false;
        domElements.radiobtn.radioMedium.checked = false;
        domElements.radiobtn.radioHigh.checked = false;
        
    }




    domElements.addProjectBtn.addEventListener("click", displayProjectCreator);

    domElements.cancelProjectBtn.addEventListener("click", (event) => {
        removeProjectCreator(event);
    });

    domElements.confirmProjectBtn.addEventListener("click", createNewProject);


})();


