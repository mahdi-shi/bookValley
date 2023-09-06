const subjects = document.querySelectorAll(".subjects");
const generBooksPnl = document.querySelector(".generBooksPnl");
const backgroundCover = document.querySelector(".backgroundCover");

//navbar style for scrolling 

const navBar = document.querySelector(".navBar");

generBooksPnl.scroll = () => {

    if(generBooksPnl.scrollTop > 100){
        //navBar.style.backgroundColor = "#242131";
        alert("hh")
    }
}

//calling api for eny subjects and create a pannel

for (let i = 0; i < subjects.length; i++) {
    subjects[i].addEventListener("click", async () => {

        //designing books in the pannel

        generBooksPnl.style.left = "0";
        generBooksPnl.style.opacity = "1";
        setTimeout(() => {
            backgroundCover.style.opacity = 1;
        },1000)

        //geting books from api

        const response = await fetch(`http://openlibrary.org/subjects/${subjects[i].innerHTML.toLowerCase()}.json?limit=100`)
        const data = await response.json();
        console.log(data);
        console.log(subjects[i].innerHTML.toLowerCase());
    })
}