const domElements = {
    navigationBtn: document.querySelector("button"),
    projectContainer: document.querySelector(".project-container"),
    addProjectBtn: document.querySelector(".add-project-button"),
    projectInputField: document.querySelector(".input-container"),
    addProjectDefault: document.querySelector(".add-project-default-btn"),
    cancelProjectBtn: document.getElementById("cancel-btn-project"),
    confirmProjectBtn: document.getElementById("confirm-btn-project"),
    radiobtn: {
        radioHigh: document.getElementById("high"),
        radioMedium: document.getElementById("medium"),
        radioLow: document.getElementById("low"),
    },
    projectName: document.getElementById("name"),
    projectListContainer: document.querySelector(".show-list-of-project"),
}


export default domElements;