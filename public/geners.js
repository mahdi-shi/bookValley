const subjects = document.querySelectorAll(".subjects");
const generBooksPnl = document.querySelector(".generBooksPnl");
const backgroundCover = document.querySelector(".backgroundCover");

//navbar style for scrolling 

const navBar = document.querySelector(".navBar");

generBooksPnl.onscroll = () => {

    if (generBooksPnl.scrollTop > 100) {
        navBar.style.backgroundColor = "#242131";
    }
    if (generBooksPnl.scrollTop < 100) {
        navBar.style.backgroundColor = "transparent";
    }
}

const generBooksPnlCloseBtn = document.querySelector("#generBooksPnlCloseBtn");
const subjectHeader = document.querySelector("#subjectHeader");
const bookTitles = document.querySelectorAll(".bookTitle");
const bookCovers = document.querySelectorAll(".bookCover");

//calling api for eny subjects and create a pannel

generBooksPnlCloseBtn.addEventListener("click", () => {
    generBooksPnl.style.left = "-100%";
    generBooksPnl.style.opacity = "0";
    backgroundCover.style.opacity = 0;
    navBar.style.backgroundColor = "transparent";
    for (let i = 0; i < bookTitles.length; i++) {
        bookTitles[i].innerHTML = "";
        bookCovers[i].style.opacity = 0;
        bookCovers[i].src = "";
    }
})

for (let i = 0; i < subjects.length; i++) {
    subjects[i].addEventListener("click", async () => {

        //designing books in the pannel

        generBooksPnl.style.left = "0";
        generBooksPnl.style.opacity = "1";
        setTimeout(() => {
            backgroundCover.style.opacity = 1;
        }, 1000)
        subjectHeader.innerHTML = subjects[i].innerHTML;

        //geting books from api

        const response = await fetch(`http://openlibrary.org/subjects/${subjects[i].innerHTML.toLowerCase()}.json?limit=300`)
        const data = await response.json();
        console.log(data);
        console.log(subjects[i].innerHTML.toLowerCase());

        for (let i = 0; i < data.works.length; i++) {
            bookTitles[i].innerHTML = data.works[i].title;
            bookCovers[i].style.opacity = 1
            if (data.works[i].cover_id == null) {
                bookCovers[i].src = "assets/sj-objio-XFWiZTa2Ub0-unsplash.jpg"
            }
            else {
                bookCovers[i].src = `https://covers.openlibrary.org/b/id/${data.works[i].cover_id}-M.jpg`
            }
        }
    })
}