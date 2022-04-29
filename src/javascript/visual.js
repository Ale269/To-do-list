import domElements from "./domElements.js";

export default class Display {

    static displayNavInput() {
        domElements.addProjectDefault.style.cssText = "display: none;";
        domElements.projectInputField.style.cssText = "display: block;";
    }


    static removeNavInput() {
        domElements.addProjectDefault.setAttribute("style", "");
        domElements.projectInputField.setAttribute("style", "");
    }


    
}