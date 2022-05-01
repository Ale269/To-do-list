const domElements = {
    navigationBtn: document.querySelector("button"),
    projectContainer: document.querySelector(".project-container"),
    addProjectBtn: document.querySelector(".add-project-default-btn"),
    projectInputField: document.querySelector(".project-input-container"),
    cancelProjectBtn: document.getElementById("cancel-btn-project"),
    confirmProjectBtn: document.getElementById("confirm-btn-project"),
    radiobtn: {
        radioHigh: document.getElementById("high"),
        radioMedium: document.getElementById("medium"),
        radioLow: document.getElementById("low"),
    },
    projectName: document.getElementById("project-name"),
    projectListContainer: document.querySelector(".show-list-of-project"),
    addTaskBtn: document.querySelector(".add-items-default-btn"),
    taskInputField: document.querySelector(".task-input-container"),
    cancelTaskBtn: document.getElementById("cancel-btn-task"),
    projectTitle: document.getElementById("project-name-title"),
}


export default domElements;