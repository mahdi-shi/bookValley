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
const bookCode = document.querySelectorAll(".bookCode");
const bookCovers = document.querySelectorAll(".bookCover");
const books = document.querySelectorAll(".books");

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
    generBooksPnl.scrollTo(0, 0);

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
            bookCode[i].innerHTML = data.works[i].key;
            bookCovers[i].style.opacity = 1
            if (data.works[i].cover_id == null) {
                bookCovers[i].src = "assets/sj-objio-XFWiZTa2Ub0-unsplash.jpg"
            }
            else {
                bookCovers[i].src = `https://covers.openlibrary.org/b/id/${data.works[i].cover_id}-M.jpg`
            }
        }

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
}

//open any book pannel with user selecting 

const bookName = document.querySelector(".bookName");
const autorName = document.querySelector(".autorName");
const bookImg = document.querySelector(".bookImg");
const backgroundBookImg = document.querySelector(".backgroundBookImg");
const aboutBook = document.querySelector("#aboutBook");
const bookPannelCloseBtn = document.querySelector('#bookPannelCloseBtn');
const aboutAuthor = document.querySelector("#aboutAuthor");
const bookLikeThisTitle = document.querySelectorAll(".bookLikeThisTitle")
const bookLikeThisImg = document.querySelectorAll(".bookLikeThisImg");
const bookLikeThisCode = document.querySelectorAll(".bookLikeThisCode");
let witchBookCode;

for (let i = 0; i < books.length; i++) {
    books[i].addEventListener("click", async () => {

        if (bookTitles[i].innerHTML == "") {
            return false;
        }
        else {
            const response = await fetch("https://openlibrary.org" + bookCode[i].innerHTML + ".json");
            const data = await response.json();

            bookPannel.style.opacity = "1"
            bookPannel.style.transform = "translate(0%)"
            navBar.style.backgroundColor = "transparent";
            navBar.style.boxShadow = "none"
            bookPannelCloseBtnSvg.style.fill = " rgb(41, 41, 51)";
            bookPannelCloseBtn.style.display = "block"

            witchBookCode = bookCode[i].innerHTML;
            const witchBook = witchBookCode;
            const data2 = { witchBook }
            const options2 = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data2)
            };

            const CommentRespones = await fetch("/dataForBookComments", options2);
            const CommentResponesData = await CommentRespones.json();
            console.log(CommentResponesData);

            if (CommentResponesData.length != null) {
                for (let i = 0; i < CommentResponesData.length; i++) {
                    let li = document.createElement("li");
                    let div = document.createElement("div");
                    let p1 = document.createElement("p");
                    let p2 = document.createElement("p");
                    let img = document.createElement("img");

                    li.classList.add("comment");
                    div.classList.add("commentProfIcon");
                    let para1Text = document.createTextNode(CommentResponesData[i].Name);
                    let para2Text = document.createTextNode(CommentResponesData[i].Comment);
                    p1.appendChild(para1Text);
                    p2.appendChild(para2Text);
                    p1.classList.add("commentProfName");
                    p2.classList.add("commentTxt");
                    img.classList.add("commentProfIconimg");
                    div.appendChild(img);
                    li.appendChild(div);
                    li.appendChild(p1);
                    li.appendChild(p2);
                    let p3 = document.createElement("p");
                    let p3Text = document.createTextNode("x");
                    p3.appendChild(p3Text);
                    p3.classList.add("closeCommentButton");

                    if (localStorage.getItem("userTarget") == CommentResponesData[i].Name) {
                        li.appendChild(p3);
                        p3.addEventListener("click",async () => {
                            li.remove();
                            const tempComment = CommentResponesData[i].Comment;
                            const data3 = { tempComment }
                            const options3 = {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data3)
                            };

                            const CommentRespones2 = await fetch("/removeComment", options3);
                            const CommentResponesData2 = await CommentRespones2.json();
                        })
                    }

                    if (CommentResponesData[i].commentPicture == null) {
                        img.src = "";
                    }
                    else {
                        img.src = CommentResponesData[i].commentPicture;
                    }
                    comments.appendChild(li);
                }
            }


            bookName.innerHTML = data.title;
            try {
                if (data.description == null) {
                    aboutBook.innerHTML = "This book doesn't have any decription..."
                }
                else {
                    aboutBook.innerHTML = data.description.value.slice(0, 510) + " ...";
                }
            }
            catch {
                if (data.description == null) {
                    aboutBook.innerHTML = "This book doesn't have any decription..."
                }
                else {
                    aboutBook.innerHTML = data.description.slice(0, 510) + " ...";
                }
            }
            console.log(data);

            const authorRespones = await fetch("https://openlibrary.org" + data.authors[0].author.key + ".json");
            const authorResponesData = await authorRespones.json();
            console.log(authorResponesData);

            autorName.innerHTML = authorResponesData.name;

            try {
                if (authorResponesData.bio == null) {
                    aboutAuthor.innerHTML = "This author doesn't have any biography..."
                }
                else {
                    aboutAuthor.innerHTML = authorResponesData.bio.value.slice(0, 310) + " ...";

                }
            }
            catch {
                if (authorResponesData.bio == null) {
                    aboutAuthor.innerHTML = "This author doesn't have any biography..."
                }
                else {
                    aboutAuthor.innerHTML = authorResponesData.bio.slice(0, 310) + " ...";
                }
            }

            bookName.style.opacity = 1;
            autorName.style.opacity = 1;

            if (data.covers == null) {
                bookImg.style.opacity = 1;
                bookImg.src = "assets/images (1).jfif";
            }
            else {
                bookImg.src = "https://covers.openlibrary.org/b/id/" + data.covers[0] + "-L.jpg";
                backgroundBookImg.src = "https://covers.openlibrary.org/b/id/" + data.covers[1] + "-M.jpg"
                backgroundBookImg.style.opacity = 1;
                bookImg.style.opacity = 1;
            }
            console.log(data.subjects[0].toLowerCase());
            const bookSubjectResponse = await fetch("https://openlibrary.org/search.json?q=" + data.title.toLowerCase());
            const bookSubjectsData = await bookSubjectResponse.json();
            console.log(bookSubjectsData);

            for (let i = 0; i < bookLikeThisTitle.length; i++) {
                bookLikeThisTitle[i].innerHTML = bookSubjectsData.docs[i].title;
                bookLikeThisCode[i].innerHTML = bookSubjectsData.docs[i].key;

                if (bookSubjectsData.docs[i].cover_i == null) {
                    bookLikeThisImg[i].style.opacity = 1;
                    bookLikeThisImg[i].src = "assets/images (1).jfif";
                }
                else {
                    bookLikeThisImg[i].src = "https://covers.openlibrary.org/b/id/" + bookSubjectsData.docs[i].cover_i + "-M.jpg";
                    bookLikeThisImg[i].style.opacity = 1;
                }
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
            generBooksPnl.style.left = "-100%";
            generBooksPnl.style.opacity = "0";
            backgroundCover.style.opacity = 0;
            navBar.style.backgroundColor = "transparent";
            for (let i = 0; i < bookTitles.length; i++) {
                bookTitles[i].innerHTML = "";
                bookCovers[i].style.opacity = 0;
                bookCovers[i].src = "";
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


document.body.onload = async () => {
    const userName = localStorage.getItem("userTarget");
    const data = { userName }
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch("/dataForProfile", options)
    const dataResponse = await response.json();

    if (dataResponse.image == null) {
        profIconPicture.style.display = "none";
        profilePictureSvg.style.display = 'block';
        profileIconSvg.style.display = "block";
    }
    else {
        profIconPicture.style.display = "block";
        profIconPicture.src = dataResponse.image;
        profileIconSvg.style.display = "none";
    }
}

const bookPannel = document.querySelector(".bookPannel");
const addBookBtn = document.querySelector("#addBookBtn");
const bookPannelCloseBtnSvg = document.querySelector("#bookPannelCloseBtnSvg");

profileIcon.addEventListener("click", () => {
    window.location.assign("profile.html");
})

bookPannel.onscroll = () => {
    if (bookPannel.scrollTop > 140) {
        navBar.style.backgroundColor = "#242131";
        navBar.style.boxShadow = "0 5px 15px rgba(0,0,0,0.4)"
        bookPannelCloseBtnSvg.style.fill = "rgb(130, 130, 167)";
    }
    if (bookPannel.scrollTop < 140) {
        navBar.style.backgroundColor = "transparent";
        navBar.style.boxShadow = "none"
        bookPannelCloseBtnSvg.style.fill = " rgb(86, 84, 110)";
    }
}

//like and dislike stuff 

const like = document.querySelectorAll(".like");
const dislike = document.querySelectorAll(".disLike");
let likeStatus = false;
let dislikeStatus = false;

/*for(let i = 0;i < like.length;i++){
    like[i].addEventListener("click",() => {

        if(!likeStatus){
            like[i].src = "assets/likeFull.png";
            likeStatus = true;
        }
        else{
            like[i].src = "assets/likeEmpty.png";
            likeStatus = false;
        }
    
        dislike[i].src = "assets/likeEmpty.png"
        dislikeStatus = false;
    })
    
    dislike.addEventListener("click",() => {
    
        if(!dislikeStatus){
            dislike[i].src = "assets/likeFull.png";
            dislikeStatus = true;
        }
        else{
            dislike[i].src = "assets/likeEmpty.png";
            dislikeStatus = false
        }
    
        like[i].src = "assets/likeEmpty.png"
        likeStatus = false;
    })
}*/

//close the pannel button

bookPannelCloseBtnSvg.addEventListener("click", () => {
    bookPannel.style.opacity = "0"
    bookPannel.style.transform = "translate(-100%)"
    bookImg.src = "";
    bookName.innerHTML = "";
    autorName.innerHTML = "";
    backgroundBookImg.src = "";
    bookImg.style.opacity = 0;
    bookName.style.opacity = 0;
    autorName.style.opacity = 0;
    backgroundBookImg.style.opacity = 0;
    bookPannelCloseBtn.style.display = "none"

    for (let i = 0; i < bookLikeThisTitle.length; i++) {
        bookLikeThisTitle[i].innerHTML = "";
        bookLikeThisCode[i].innerHTML = "";
        bookLikeThisImg[i].src = "";
        bookLikeThisImg[i].style.opacity = 0;
    }

    pushCount = 0;
    bookLikeThis[0].style.marginLeft = 0 + "px";
    pushToLeft.style.display = "none";
    pushToRight.style.opacity = 1;
    pushToRight.style.display = "block";

    const comments = document.querySelectorAll(".comment");
    for (let i = 0; i < comments.length; i++) {
        comments[i].remove();
    }

    bookPannel.scrollTo(0, 0);
})

// push other boook like this list to right 

const pushToRight = document.querySelector(".pushToRight");
const pushToLeft = document.querySelector(".pushToLeft");
const bookLikeThis = document.querySelectorAll('.bookLikeThis');
let pushCount = 0;

pushToRight.addEventListener("click", () => {
    pushCount = pushCount - 460;
    bookLikeThis[0].style.marginLeft = pushCount + "px";
    pushToLeft.style.display = "block";
    setTimeout(() => {
        pushToLeft.style.opacity = 1;
    }, 600)
    if (pushCount == -2300) {
        pushToRight.style.opacity = 0;

        setTimeout(() => {
            pushToRight.style.display = "none";
        }, 600)
    }
})

pushToLeft.addEventListener("click", () => {
    pushCount = pushCount + 460;
    bookLikeThis[0].style.marginLeft = pushCount + "px";
    pushToRight.style.display = "block";
    setTimeout(() => {
        pushToRight.style.opacity = 1;
    }, 600)
    if (pushCount == 0) {
        pushToLeft.style.opacity = 0;

        setTimeout(() => {
            pushToLeft.style.display = "none";
        }, 600)
    }
})


for (let i = 0; i < bookLikeThis.length; i++) {
    bookLikeThis[i].addEventListener("click", async () => {
        if (bookLikeThisCode[i].innerHTML == "") {
            return false;
        }
        else {
            const response = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + ".json");
            const data = await response.json();

            navBar.style.backgroundColor = "transparent";
            navBar.style.boxShadow = "none"

            bookName.innerHTML = data.title;
            try {
                if (data.description == null) {
                    aboutBook.innerHTML = "This book doesn't have any decription..."
                }
                else {
                    aboutBook.innerHTML = data.description.value.slice(0, 510) + " ...";
                }
            }
            catch {
                if (data.description == null) {
                    aboutBook.innerHTML = "This book doesn't have any decription..."
                }
                else {
                    aboutBook.innerHTML = data.description.slice(0, 510) + " ...";
                }
            }
            console.log(data);

            const authorRespones = await fetch("https://openlibrary.org" + data.authors[0].author.key + ".json");
            const authorResponesData = await authorRespones.json();
            console.log(authorResponesData);

            autorName.innerHTML = authorResponesData.name;
            bookPannel.scrollTo(0, 0);
            try {
                if (authorResponesData.bio == null) {
                    aboutAuthor.innerHTML = "This author doesn't have any biography..."
                }
                else {
                    aboutAuthor.innerHTML = authorResponesData.bio.value.slice(0, 310) + " ...";

                }
            }
            catch {
                if (authorResponesData.bio == null) {
                    aboutAuthor.innerHTML = "This author doesn't have any biography..."
                }
                else {
                    aboutAuthor.innerHTML = authorResponesData.bio.slice(0, 310) + " ...";
                }
            }

            bookName.style.opacity = 1;
            autorName.style.opacity = 1;
            pushCount = 0;
            bookLikeThis[0].style.marginLeft = 0 + "px";
            pushToLeft.style.display = "none";
            pushToRight.style.opacity = 1;
            pushToRight.style.display = "block";
            if (data.covers == null) {
                bookImg.style.opacity = 1;
                bookImg.src = "assets/images (1).jfif";
            }
            else {
                bookImg.src = "https://covers.openlibrary.org/b/id/" + data.covers[0] + "-L.jpg";
                backgroundBookImg.src = "https://covers.openlibrary.org/b/id/" + data.covers[1] + "-M.jpg"
                backgroundBookImg.style.opacity = 1;
                bookImg.style.opacity = 1;
            }
            const bookSubjectResponse = await fetch("https://openlibrary.org/search.json?q=" + data.title.toLowerCase());
            const bookSubjectsData = await bookSubjectResponse.json();
            console.log(bookSubjectsData);

            for (let i = 0; i < bookLikeThisTitle.length; i++) {
                bookLikeThisTitle[i].innerHTML = bookSubjectsData.docs[i].title;
                bookLikeThisCode[i].innerHTML = bookSubjectsData.docs[i].key;

                if (bookSubjectsData.docs[i].cover_i == null) {
                    bookLikeThisImg[i].style.opacity = 1;
                    bookLikeThisImg[i].src = "assets/images (1).jfif";
                }
                else {
                    bookLikeThisImg[i].src = "https://covers.openlibrary.org/b/id/" + bookSubjectsData.docs[i].cover_i + "-M.jpg";
                    bookLikeThisImg[i].style.opacity = 1;
                }
            }
        }
    })
}

const addCommentBox = document.querySelector("#insertCommentBtn");
const comments = document.querySelector(".comments");
const commentTxtBox = document.querySelector('#commentTxtBox');

addCommentBox.addEventListener("click", async () => {
    if (commentTxtBox.value == "" || commentTxtBox.value == null) {
        return false;
    }
    else {
        let li = document.createElement("li");
        let div = document.createElement("div");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let img = document.createElement("img");
        let p3 = document.createElement("p");

        const userName = localStorage.getItem("userTarget");
        const data = { userName }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch("/dataForProfile", options)
        const dataResponse = await response.json();

        let p3Text = document.createTextNode("x");
        p3.appendChild(p3Text);
        p3.classList.add("closeCommentButton");
        li.classList.add("comment");
        div.classList.add("commentProfIcon");
        let para1Text = document.createTextNode(dataResponse.userName);
        let para2Text = document.createTextNode(commentTxtBox.value);
        p1.appendChild(para1Text);
        p2.appendChild(para2Text);
        p1.classList.add("commentProfName");
        p2.classList.add("commentTxt");
        img.classList.add("commentProfIconimg");
        div.appendChild(img);
        li.appendChild(p3);
        li.appendChild(div);
        li.appendChild(p1);
        li.appendChild(p2);

        p3.addEventListener("click", () => {
            li.remove();
        })

        if (dataResponse.image == null) {
            img.src = "";
        }
        else {
            img.src = dataResponse.image;
        }
        comments.appendChild(li);

        commentTxtBox.value = "";

        const name = p1.innerHTML;
        const comment = p2.innerHTML;
        const commentPic = img.src;
        const witchBook = witchBookCode;

        const data2 = { name, comment, witchBook, commentPic }
        const options2 = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data2)
        };

        const response2 = await fetch("/commentsData", options2)
        const dataResponse2 = await response2.json();
    }
})