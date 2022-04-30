import "../style/style.scss";
import domElements from "./domElements.js";
import Display from "./visual.js"
var _ = require('lodash');


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

    static removeProject(name){
        _.remove(Project.projectList, function(element) {
            return element.name == name;
        })

        Project.logProjectList();
    }

}


const Controller = (() => {

    const toggleNavigation = function() {
        if(domElements.projectContainer.classList.contains("active")){
            domElements.projectContainer.setAttribute("class", "project-container");
            return;
        }
    
        domElements.projectContainer.classList.add("active");
    }

    const updateFromLocalStorage = function() {
        Project.projectList = JSON.parse(window.localStorage.getItem("ProjectList"));
        console.log(window.localStorage.getItem("ProjectList"))

        Display.displayProject(Project.projectList);
    }

    updateFromLocalStorage();

    const setLocalStorage = function() {
        window.localStorage.setItem("ProjectList", JSON.stringify(Project.projectList));
        console.log(localStorage);
    }

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

        setLocalStorage();

        Display.displayProject(Project.projectList);

        domElements.projectName.value = "";
        domElements.radiobtn.radioLow.checked = false;
        domElements.radiobtn.radioMedium.checked = false;
        domElements.radiobtn.radioHigh.checked = false;
    }


    const removeProjectFromList = function(e) {
        if(!e.target.classList.contains("fa-xmark")){return;}
        let projectName = e.target.parentNode.querySelector("h4").textContent;

        Project.removeProject(projectName);

        setLocalStorage();

        Display.displayProject(Project.projectList);
    }



    domElements.navigationBtn.addEventListener("click", toggleNavigation);

    domElements.addProjectBtn.addEventListener("click", displayProjectCreator);

    domElements.cancelProjectBtn.addEventListener("click", (event) => {
        removeProjectCreator(event);
    });

    domElements.confirmProjectBtn.addEventListener("click", createNewProject);

    domElements.projectListContainer.addEventListener("click", (e) => {
        removeProjectFromList(e)
    })


})();


