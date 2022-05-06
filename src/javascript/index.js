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
            name: "project 1",
            listArr: []
        },
        {
            name: "project 2",
            listArr: []
        },
        {
            name: "project 3",
            listArr: []
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


    static findProject(name){
        return _.findIndex(Project.projectList, function(element) { return element.name == name; });
    }

}


class Task {
    constructor(name,urgency,date, description) {
        this.name = name;
        this.urgency = urgency;
        this.date = date;
        this.description = description;
    }

    static removeTask(name, listArr) {
        _.remove(listArr, function(element) { return element.name == name; });
        console.log(listArr);
    }
}


const Controller = (() => {

    // navigation Logic 
    const toggleNavigation = function() {
        if(domElements.projectContainer.classList.contains("active")){
            domElements.projectContainer.setAttribute("class", "project-container");
            domElements.navigationBtn.setAttribute("class", "menu-nav-btn fa-solid fa-bars");
            return;
        }
    
        domElements.projectContainer.classList.add("active");
        domElements.navigationBtn.classList.add("nav-active");
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

        let index = Project.findProject(Project.selectedProject);
        Display.displayTask(Project.projectList[index].listArr, true);
        
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

        Display.displayTask(Project.selectedProject, false);
    }



    // To do list logic
    const selectProject = function(e) {
        console.log(e.target.tagName);
        if(e.target.tagName == "H4"){
            document.querySelectorAll(".project-list-element").forEach((element) => {
                if(element.classList.contains("selected")){
                    element.setAttribute("class", "project-list-element");
                }
            })

            e.target.parentNode.classList.add("selected");
            Project.selectedProject = e.target.textContent;

            console.log(Project.selectedProject);

        }else if(e.target.classList.contains("project-list-element")){
            document.querySelectorAll(".project-list-element").forEach((element) => {
                if(element.classList.contains("selected")){
                    element.setAttribute("class", "project-list-element");
                }
            })
            
            e.target.classList.add("selected");
            Project.selectedProject = e.target.querySelector("h4").textContent;

            console.log(Project.selectedProject);
        }else{
            return;
        }


        Display.displayProjectTitle(Project.selectedProject);

        let index = Project.findProject(Project.selectedProject);

        Display.displayTask(Project.projectList[index].listArr, true);

    }


    const createNewTask = function() {
        if(domElements.taskName.value == ""){alert("Task must have a name"); return;}

        let index = Project.findProject(Project.selectedProject);

        console.log(index);

        for(let i=0; i<Project.projectList[index].listArr.length; i++){
            if(domElements.taskName.value === Project.projectList[index].listArr[i].name){
                alert("A task with this name already exist");
                return;
            }
        }


        let checkedValue = null;
        if(domElements.radiobtn.radioHigh.checked === true){
            checkedValue = " high";
        }else if(domElements.radiobtn.radioMedium.checked === true){
            checkedValue = " medium";
        }else if(domElements.radiobtn.radioLow.checked === true){
            checkedValue = " low";
        }

        if(checkedValue === null){alert("A task must have a urgency value"); return;}

        console.log(domElements.taskName.value);
        const customTask = new Task(domElements.taskName.value, checkedValue, domElements.date.value, domElements.taskDescription.value);
        Project.projectList[index].listArr.push(customTask);

        Project.logProjectList();

        setLocalStorage();

        Display.displayTask(Project.projectList[index].listArr, false);

        domElements.date.value = "";
        domElements.taskDescription.value = "";
        domElements.taskName.value = "";
        domElements.radiobtn.radioLow.checked = false;
        domElements.radiobtn.radioMedium.checked = false;
        domElements.radiobtn.radioHigh.checked = false;
    }


    const removeTask = function(e) {      
        let taskName = e.target.parentNode.querySelector("h4").textContent;

        let index = Project.findProject(Project.selectedProject);
        Task.removeTask(taskName, Project.projectList[index].listArr)

        setLocalStorage();

        Display.displayTask(Project.projectList[index].listArr, true);

    }




    //Event listeners

    domElements.confirmTaskBtn.addEventListener("click", createNewTask);

    domElements.addTaskBtn.addEventListener("click", Display.displayTaskInput);

    domElements.cancelTaskBtn.addEventListener("click", Display.removeTaskInput);

    domElements.projectListContainer.addEventListener("click", (e) => {
        if(e.target.classList.contains("remove-project")){return;}
        selectProject(e);
    })

    domElements.taskListContainer.addEventListener("click", (e) => {
        if(!e.target.classList.contains("check")){return};
        removeTask(e);
    })

    domElements.navigationBtn.addEventListener("click", toggleNavigation);

    domElements.addProjectBtn.addEventListener("click", Display.displayNavInput);

    domElements.cancelProjectBtn.addEventListener("click", Display.removeNavInput);

    domElements.confirmProjectBtn.addEventListener("click", createNewProject);

    domElements.projectListContainer.addEventListener("click", (e) => {
        if(!e.target.classList.contains("remove-project")){return;}
        removeProjectFromList(e)
    })


})();


