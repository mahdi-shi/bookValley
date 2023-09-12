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

    //searching stuff

    const searchPnl = document.querySelector(".searchPnl");
    const searchPnlCloseBtn = document.querySelector("#searchPnlCloseBtn");
    const bookSearchTxtBox = document.querySelector("#bookSearchTxtBox");
    const secondetList = document.querySelector(".secondetList");
    const messageBox = document.querySelector("#messageBox");

    searchBoxBtn.addEventListener("click", async () => {

        if (bookSearchTxtBox.value == "") {
            messageBox.style.top = "7%"
            setTimeout(() => {
                messageBox.style.top = "-10%"
            }, 4000);
        }
        else {
            searchPnl.style.marginTop = "-9vh";
            searchPnl.style.opacity = "0.95";

            const response = await fetch("https://openlibrary.org/search.json?q=" + bookSearchTxtBox.value)
            const data = await response.json();

            const books = document.querySelectorAll(".li");

            if (books.length > 0) {
                for (let i = 0; i < books.length; i++) {
                    books[i].remove();
                }
            }

            for (let i = 0; i < data.docs.length; i++) {

                console.log(data.docs[i].title);

                let li = document.createElement("li");
                let div = document.createElement("div");
                let p = document.createElement("p");
                let img = document.createElement("img");

                let titlePara = document.createTextNode(data.docs[i].title);
                p.appendChild(titlePara);
                p.classList.add("bookTitle");
                img.classList.add("bookCover");
                if (data.docs[i].cover_i == null) {
                    img.src = "assets/images (1).jfif";
                }
                else {
                    img.src = "https://covers.openlibrary.org/b/id/" + data.docs[i].cover_i + "-M.jpg";
                }

                div.classList.add("books");
                div.appendChild(p);
                div.appendChild(img);
                div.style = "--i:" + i;
                li.classList.add("li");
                li.appendChild(div);
                secondetList.appendChild(li)

            }
        }
    })

    bookSearchTxtBox.addEventListener("keydown", async (e) => {
    const keyName = e.key;
    if (keyName == "Enter") {
        if (bookSearchTxtBox.value == "") {
            messageBox.style.top = "7%"
            setTimeout(() => {
                messageBox.style.top = "-10%"
            }, 4000);
        }
        else {
            searchPnl.style.marginTop = "-9vh";
            searchPnl.style.opacity = "0.95";

            const response = await fetch("https://openlibrary.org/search.json?q=" + bookSearchTxtBox.value)
            const data = await response.json();

            const books = document.querySelectorAll(".li");

            if (books.length > 0) {
                for (let i = 0; i < books.length; i++) {
                    books[i].remove();
                }
            }

            for (let i = 0; i < data.docs.length; i++) {

                console.log(data.docs[i].title);

                let li = document.createElement("li");
                let div = document.createElement("div");
                let p = document.createElement("p");
                let img = document.createElement("img");

                let titlePara = document.createTextNode(data.docs[i].title);
                p.appendChild(titlePara);
                p.classList.add("bookTitle");
                img.classList.add("bookCover");
                if (data.docs[i].cover_i == null) {
                    img.src = "assets/images (1).jfif";
                }
                else {
                    img.src = "https://covers.openlibrary.org/b/id/" + data.docs[i].cover_i + "-M.jpg";
                }

                div.classList.add("books");
                div.appendChild(p);
                div.appendChild(img);
                div.style = "--i:" + i;
                li.classList.add("li");
                li.appendChild(div);
                secondetList.appendChild(li)

            }
        }
    }
})

    searchPnlCloseBtn.addEventListener("click", () => {
        searchPnl.style.marginTop = "-200vh";
        searchPnl.style.opacity = "0";
        bookSearchTxtBox.value = "";
        const books = document.querySelectorAll(".li");
        if (books.length > 0) {
            for (let i = 0; i < books.length; i++) {
                books[i].remove();
            }
        }

    })

    searchPnl.onscroll = () => {

        if (searchPnl.scrollTop > 100) {
            navBar.style.backgroundColor = "#242131";
        }
        if (searchPnl.scrollTop < 100) {
            navBar.style.backgroundColor = "transparent";
        }
    }