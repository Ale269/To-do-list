import "../style/style.scss";

document.querySelector("button").addEventListener("click", () => {
    console.log("start");

    if(document.querySelector(".project-container").classList.contains("active")){
        document.querySelector(".project-container").setAttribute("class", "project-container");
        return;
    }

    document.querySelector(".project-container").classList.add("active");
});
