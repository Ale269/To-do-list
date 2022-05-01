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


    static selectedProject = "project 1";


    static projectList = [
        {
            name: "project 1"
        },
        {
            name: "project 2"
        },
        {
            name: "project 3"
        }
    ];



    static logProjectList(){
        console.log(Project.projectList);
    }



    static removeProject(name){
        _.remove(Project.projectList, function(element) {
            return element.name == name;
        })

        Project.logProjectList();
    }



    static updateProject() {

    }

}


const Controller = (() => {

    // navigation Logic 
    const toggleNavigation = function() {
        if(domElements.projectContainer.classList.contains("active")){
            domElements.projectContainer.setAttribute("class", "project-container");
            return;
        }
    
        domElements.projectContainer.classList.add("active");
    }


    // Local storage logic 

    const updateFromLocalStorage = function() {
        // update project list
        if(JSON.parse(window.localStorage.getItem("ProjectList")).length == 0){
            setLocalStorage();
            Display.displayProject(Project.projectList, Project.selectedProject);;
            selectFirstElement();
            return;
        }

        Project.projectList = JSON.parse(window.localStorage.getItem("ProjectList"));
        console.log(window.localStorage.getItem("ProjectList"))

        Display.displayProject(Project.projectList, Project.selectedProject);
        selectFirstElement();
    }

    const setLocalStorage = function() {
        window.localStorage.setItem("ProjectList", JSON.stringify(Project.projectList));
        console.log(localStorage);
    }


    const selectFirstElement = function() {
        Project.selectedProject = Project.projectList[0].name;
        document.querySelectorAll(".project-list-element").forEach((element) => {
            if(element.querySelector("h4").textContent == Project.selectedProject){
                element.classList.add("selected");
            }
        })

        Display.displayProjectTitle(Project.selectedProject);
    }

    updateFromLocalStorage();


    // Project section logic

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

        //if(checkedValue === null){alert("Project must have a urgency value"); return;}

        const customProject = new Project(domElements.projectName.value, checkedValue);
        Project.projectList.push(customProject);

        Project.logProjectList();

        setLocalStorage();

        Display.displayProject(Project.projectList, Project.selectedProject);

        domElements.projectName.value = "";
        domElements.radiobtn.radioLow.checked = false;
        domElements.radiobtn.radioMedium.checked = false;
        domElements.radiobtn.radioHigh.checked = false;
    }


    const removeProjectFromList = function(e) {
        let projectName = e.target.parentNode.querySelector("h4").textContent;

        if(e.target.parentNode.classList.contains("selected")){Project.selectedProject = null};
        console.log(Project.selectedProject);

        Project.removeProject(projectName);

        setLocalStorage();

        Display.displayProject(Project.projectList, Project.selectedProject);
    }



    // To do list logic
    const selectProject = function(e) {
        document.querySelectorAll(".project-list-element").forEach((element) => {
            if(element.classList.contains("selected")){
                element.setAttribute("class", "project-list-element");
            }
        })


        if(e.target.tagName == "h4"){
            e.target.parentNode.classList.add("selected");
            Project.selectedProject = e.target.textContent;

            console.log(Project.selectedProject);

        }else if(e.target.classList.contains("project-list-element")){
            e.target.classList.add("selected");
            Project.selectedProject = e.target.querySelector("h4").textContent;

            console.log(Project.selectedProject);
        }else{
            return;
        }

        Display.displayProjectTitle(Project.selectedProject);

    }




    //Event listeners

    domElements.addTaskBtn.addEventListener("click", Display.displayTaskInput);

    domElements.cancelTaskBtn.addEventListener("click", Display.removeTaskInput);

    domElements.projectListContainer.addEventListener("click", (e) => {
        if(e.target.classList.contains("fa-xmark")){return;}
        selectProject(e);
    })

    domElements.navigationBtn.addEventListener("click", toggleNavigation);

    domElements.addProjectBtn.addEventListener("click", Display.displayNavInput);

    domElements.cancelProjectBtn.addEventListener("click", Display.removeNavInput);

    domElements.confirmProjectBtn.addEventListener("click", createNewProject);

    domElements.projectListContainer.addEventListener("click", (e) => {
        if(!e.target.classList.contains("fa-xmark")){return;}
        removeProjectFromList(e)
    })


})();


