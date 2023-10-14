//inserting image from user's files to the page

const profImageInputbox = document.querySelector("#profImageInputbox");
const imageProf = document.querySelector("#imgProf");
const imageProfDirty = document.querySelector("#imgProfDirty");
const profIconPicture = document.querySelector("#profIconPicture")
const profilePictureSvg = document.querySelector("#profilePictureSvg");
const profileIconSvg = document.querySelector("#profileIconSvg");
const navBar = document.querySelector(".navBar");
const searchPnl = document.querySelector(".searchPnl");
const searchPnlCloseBtn = document.querySelector("#searchPnlCloseBtn");
const bookSearchTxtBox = document.querySelector("#bookSearchTxtBox");
const secondetList = document.querySelector(".secondetList");
const bookPannelCloseBtn = document.querySelector('#bookPannelCloseBtn');
const bookPannel = document.querySelector(".bookPannel");
const bookImg = document.querySelector(".bookImg");

var witchBookCode;

profImageInputbox.addEventListener("change", (e) => {
    imageProf.style.display = "block";
    imageProfDirty.style.display = "block";
    profIconPicture.style.display = "block";

    let reader = new FileReader();
    reader.addEventListener("load", async () => {
        console.log(reader.result);
        imageProf.src = reader.result;
        profIconPicture.src = reader.result;

        const username = localStorage.getItem("userTarget");
        const image = imageProf.src;
        const data = { username, image };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch("/saveProfilePic", options)
        const dataResponse = await response.json();
    });
    reader.readAsDataURL(profImageInputbox.files[0]);
    profilePictureSvg.style.display = 'none';
    profileIconSvg.style.display = "none";

})

var shelfBtnStatus = false;

//styling a paper in page 

const bookChallengeTxt = document.querySelector("#bookChallengeTxt");
const backgroundPic4 = document.querySelector(".backgroundPic4");

bookChallengeTxt.addEventListener("mousemove", () => {
    backgroundPic4.style.filter = "brightness(" + 80 + "%)"
})
bookChallengeTxt.addEventListener("mouseout", () => {
    backgroundPic4.style.filter = "brightness(" + 90 + "%)"
})
backgroundPic4.addEventListener("mousemove", () => {
    backgroundPic4.style.filter = "brightness(" + 80 + "%)"
})
backgroundPic4.addEventListener("mouseout", () => {
    backgroundPic4.style.filter = "brightness(" + 90 + "%)"
})

//click event for gramophone for sing

const gramophone = document.querySelector(".backgroundPic2");
const gramophoneAudio = document.querySelector("#gramophoneAudio");
let gramophoneStatus = false;

gramophone.addEventListener("click", () => {
    if (gramophoneStatus == false) {
        gramophoneAudio.play();
        gramophoneStatus = true
    }
    else {
        gramophoneAudio.pause();
        gramophoneStatus = false;
    }
})

// reload event for checking user have an account or not , if yes so ....

const backgroundBookImg = document.querySelector(".backgroundBookImg");
const messageBox = document.querySelector("#messageText");

document.body.onload = async () => {
    const userName = localStorage.getItem("userTarget");
    const checkingUsersAccountPage = document.querySelector("#checkingUsersAccountPage");
    const usernameTxt = document.querySelector("#usernameTxt");
    const idTxt = document.querySelector("#idTxt");

    if (userName == null) {
        checkingUsersAccountPage.style.display = "block";
    }
    else {
        checkingUsersAccountPage.style.display = "none";
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

        usernameTxt.textContent = "User-name : " + dataResponse.userName;
        idTxt.textContent = "Id : " + dataResponse._id;
        imageProf.style.display = "block";
        imageProfDirty.style.display = "block";
        profIconPicture.style.display = "block";
        if (dataResponse.image == null) {
            imageProf.style.display = "none";
            imageProfDirty.style.display = "none";
            profIconPicture.style.display = "none";
            profilePictureSvg.style.display = 'block';
            profileIconSvg.style.display = "block";
        }
        else {
            imageProf.style.display = "block";
            imageProfDirty.style.display = "block";
            profIconPicture.style.display = "block";
            imageProf.src = dataResponse.image;
            profIconPicture.src = dataResponse.image;
            profilePictureSvg.style.display = 'none';
            profileIconSvg.style.display = "none";
        }

        const shelfData = { userName }
        const shelfOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shelfData)
        };

        console.log("ohhhhh1");

        const shelvesResponse = await fetch("/shelvesData", shelfOptions);
        const shelvesResponseData = await shelvesResponse.json();
        console.log(shelvesResponseData);

        const dShelf = document.querySelectorAll(".dShelf")
        const shelfPara = document.querySelectorAll(".shelfPara");

        for (let k = 0; k < dShelf.length; k++) {
            dShelf[k].addEventListener("click", async () => {
                for (let i = 0; i < shelvesResponseData.length; i++) {
                    console.log(shelvesResponseData[i].Name);
                    if (shelvesResponseData[i].Name == shelfPara[k].innerHTML.toLowerCase()) {
                        console.log(shelvesResponseData[i].book);

                        const secondetList2 = document.querySelector(".secondetList2");

                        for (let j = 0; j < shelvesResponseData[i].book.length; j++) {

                            if (shelvesResponseData[i].book.length == 0) {
                                console.log("oooops");
                                return false;
                            }
                            else {
                                const anyShelfBook = await fetch("https://openlibrary.org" + shelvesResponseData[i].book[j] + ".json");
                                const anyShelfBookData = await anyShelfBook.json();
                                console.log(anyShelfBookData);

                                let li = document.createElement("li");
                                let p = document.createElement("p");
                                let p2 = document.createElement("p");
                                let img = document.createElement("img");

                                let titlePara = document.createTextNode(anyShelfBookData.title);
                                let codePara = document.createTextNode(anyShelfBookData.key)

                                p.appendChild(titlePara);
                                p.classList.add("bookTitle");
                                p2.appendChild(codePara);
                                p2.classList.add("bookCode");
                                img.classList.add("bookCover");
                                if (anyShelfBookData.covers[0] == null) {
                                    img.src = "assets/images (1).jfif";
                                }
                                else {
                                    img.src = "https://covers.openlibrary.org/b/id/" + anyShelfBookData.covers[0] + "-M.jpg";
                                }

                                li.style = "--i:" + j;
                                li.classList.add("li2");
                                li.appendChild(p);
                                li.appendChild(p2);
                                li.appendChild(img);
                                console.log(li);
                                secondetList2.appendChild(li);

                                const bookLikeThisTitle = document.querySelectorAll(".bookLikeThisTitle");
                                const bookLikeThisImg = document.querySelectorAll(".bookLikeThisImg");
                                const bookLikeThisCode = document.querySelectorAll(".bookLikeThisCode");
                                const pushToRight = document.querySelector(".pushToRight");
                                const pushToLeft = document.querySelector(".pushToLeft");
                                const bookLikeThis = document.querySelectorAll('.bookLikeThis');
                                const bookName = document.querySelector(".bookName");
                                const autorName = document.querySelector(".autorName");
                                const backgroundBookImg = document.querySelector(".backgroundBookImg");
                                const aboutBook = document.querySelector("#aboutBook");
                                const aboutAuthor = document.querySelector("#aboutAuthor");
                                const bookCode = document.querySelectorAll(".bookCode");
                                const bookPannelCloseBtnSvg = document.querySelector("#bookPannelCloseBtnSvg");

                                li.addEventListener("click", async () => {
                                    if (p2.innerHTML == "") {
                                        return false;
                                    }
                                    else {
                                        const response = await fetch("https://openlibrary.org" + p2.innerHTML + ".json");
                                        const data = await response.json();

                                        const responseRate = await fetch("https://openlibrary.org" + p2.innerHTML + "/ratings.json");
                                        const dataRate = await responseRate.json();

                                        console.log(dataRate, data);
                                        const bookRateStar2 = document.querySelectorAll(".bookRateStar2");

                                        if (dataRate.summary.average >= 4) {
                                            bookRateStar2[4].style.opacity = "1";
                                            bookRateStar2[3].style.opacity = "1";
                                            bookRateStar2[2].style.opacity = "1";
                                            bookRateStar2[1].style.opacity = "1";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average < 4 && dataRate.summary.average >= 3) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "1";
                                            bookRateStar2[2].style.opacity = "1";
                                            bookRateStar2[1].style.opacity = "1";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average < 3 && dataRate.summary.average >= 2) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "1";
                                            bookRateStar2[1].style.opacity = "1";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average < 2 && dataRate.summary.average >= 1) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "0";
                                            bookRateStar2[1].style.opacity = "1";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average < 1 && dataRate.summary.average > 0) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "0";
                                            bookRateStar2[1].style.opacity = "0";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average == null) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "0";
                                            bookRateStar2[1].style.opacity = "0";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average == 0) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "0";
                                            bookRateStar2[1].style.opacity = "0";
                                            bookRateStar2[0].style.opacity = "0";
                                        }

                                        console.log(dataRate);

                                        bookPannel.style.opacity = "1"
                                        bookPannel.style.transform = "translate(0%,-15%)"
                                        navBar.style.backgroundColor = "transparent";
                                        navBar.style.boxShadow = "none"
                                        bookPannelCloseBtnSvg.style.fill = " rgb(41, 41, 51)";
                                        bookPannelCloseBtn.style.display = "block"
                                        bookPannelCloseBtn.style.opacity = "1";

                                        witchBookCode = p2.innerHTML;
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

                                        const comments = document.querySelector(".comments");

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
                                                    p3.addEventListener("click", async () => {
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


                                        bookName.innerHTML = p.innerHTML;
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
                                        bookPannelCloseBtn.style.opacity = "0"

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

                                    let pushCount = 0;
                                    // push other boook like this list to right 
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

                                    for (let i = 0; i < bookLikeThis.length; i++) {
                                        bookLikeThis[i].addEventListener("click", async () => {
                                            if (bookLikeThisCode[i].innerHTML == "") {
                                                return false;
                                            }
                                            else {
                                                const response = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + ".json");
                                                const data = await response.json();

                                                const responseRate2 = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + "/ratings.json");
                                                const dataRate2 = await responseRate2.json();

                                                const comments2 = document.querySelectorAll(".comment");
                                                for (let i = 0; i < comments2.length; i++) {
                                                    comments2[i].remove();
                                                }

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

                                                bookPannel.scrollTo(0, 0);

                                                if (dataRate2.summary.average >= 4) {
                                                    bookRateStar2[4].style.opacity = "1";
                                                    bookRateStar2[3].style.opacity = "1";
                                                    bookRateStar2[2].style.opacity = "1";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average < 4 && dataRate2.summary.average >= 3) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "1";
                                                    bookRateStar2[2].style.opacity = "1";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average < 3 && dataRate2.summary.average >= 2) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "1";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average < 2 && dataRate2.summary.average >= 1) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average < 1 && dataRate2.summary.average > 0) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "0";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average == null) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "0";
                                                    bookRateStar2[0].style.opacity = "0";
                                                }
                                                else if (dataRate2.summary.average == 0) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "0";
                                                    bookRateStar2[0].style.opacity = "0";
                                                }

                                                console.log(dataRate2);

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

                                                witchBookCode = bookLikeThisCode[i].innerHTML;
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
                                                console.log(CommentResponesData + "her it is");

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
                                                            p3.addEventListener("click", async () => {
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

                                                bookName.style.opacity = 1;
                                                autorName.style.opacity = 1;
                                                pushCount = 0;
                                                bookLikeThis[0].style.marginLeft = 0 + "px";
                                                pushToLeft.style.display = "none";
                                                pushToRight.style.opacity = 1;
                                                pushToRight.style.display = "block";

                                                const bookSubjectResponse = await fetch("https://openlibrary.org/search.json?q=" + data.title.toLowerCase());
                                                const bookSubjectsData = await bookSubjectResponse.json();

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
                                })
                            }
                        }

                        break;
                    }
                }
            })
        }

        if (shelvesResponseData.length > 3) {
            console.log("not bad");
            for (let i = 0; i < shelvesResponseData.length; i++) {
                console.log("not bad again");
                if (shelvesResponseData[i].Name != "reading" && shelvesResponseData[i].Name != "readed" && shelvesResponseData[i].Name != "want to read") {
                    let li = document.createElement("li");
                    let shelfTitle = document.createElement("p");
                    let shelfTitleTxt = document.createTextNode(shelvesResponseData[i].Name)

                    li.classList.add("shelfLi");
                    shelfTitle.appendChild(shelfTitleTxt);
                    addShelfBtn.style.width = 275 + "px";

                    li.appendChild(shelfTitle);
                    shelvesBox.appendChild(li);

                    li.addEventListener("click", async () => {
                        shelfPnl.style.opacity = 1;
                        shelfPnl.style.top = 50 + "%";
                        navBar.style.backgroundColor = "transparent";
                        shelfNameTitle.innerHTML = shelfTitle.innerHTML;
                        searchPnlCloseBtn.style.display = "none";
                        console.log(shelvesResponseData[i].book);

                        const secondetList2 = document.querySelector(".secondetList2");

                        for (let j = 0; j < shelvesResponseData[i].book.length; j++) {

                            if (shelvesResponseData[i].book.length == 0) {

                                console.log("oooops");
                                return false;
                            }
                            else {
                                const anyShelfBook = await fetch("https://openlibrary.org" + shelvesResponseData[i].book[j] + ".json");
                                const anyShelfBookData = await anyShelfBook.json();
                                console.log(anyShelfBookData);

                                let li = document.createElement("li");
                                let p = document.createElement("p");
                                let p2 = document.createElement("p");
                                let img = document.createElement("img");

                                let titlePara = document.createTextNode(anyShelfBookData.title);
                                let codePara = document.createTextNode(anyShelfBookData.key)

                                p.appendChild(titlePara);
                                p.classList.add("bookTitle");
                                p2.appendChild(codePara);
                                p2.classList.add("bookCode");
                                img.classList.add("bookCover");
                                if (anyShelfBookData.covers[0] == null) {
                                    img.src = "assets/images (1).jfif";
                                }
                                else {
                                    img.src = "https://covers.openlibrary.org/b/id/" + anyShelfBookData.covers[0] + "-M.jpg";
                                }

                                li.style = "--i:" + j;
                                li.classList.add("li2");
                                li.appendChild(p);
                                li.appendChild(p2);
                                li.appendChild(img);
                                console.log(li);
                                secondetList2.appendChild(li);
                                const bookLikeThisTitle = document.querySelectorAll(".bookLikeThisTitle");
                                const bookLikeThisImg = document.querySelectorAll(".bookLikeThisImg");
                                const bookLikeThisCode = document.querySelectorAll(".bookLikeThisCode");
                                const pushToRight = document.querySelector(".pushToRight");
                                const pushToLeft = document.querySelector(".pushToLeft");
                                const bookLikeThis = document.querySelectorAll('.bookLikeThis');
                                const bookName = document.querySelector(".bookName");
                                const autorName = document.querySelector(".autorName");
                                const backgroundBookImg = document.querySelector(".backgroundBookImg");
                                const aboutBook = document.querySelector("#aboutBook");
                                const aboutAuthor = document.querySelector("#aboutAuthor");
                                const bookCode = document.querySelectorAll(".bookCode");
                                const bookPannelCloseBtnSvg = document.querySelector("#bookPannelCloseBtnSvg");

                                li.addEventListener("click", async () => {
                                    if (p2.innerHTML == "") {
                                        return false;
                                    }
                                    else {
                                        const response = await fetch("https://openlibrary.org" + p2.innerHTML + ".json");
                                        const data = await response.json();

                                        const responseRate = await fetch("https://openlibrary.org" + p2.innerHTML + "/ratings.json");
                                        const dataRate = await responseRate.json();

                                        console.log(dataRate, data);
                                        const bookRateStar2 = document.querySelectorAll(".bookRateStar2");

                                        if (dataRate.summary.average >= 4) {
                                            bookRateStar2[4].style.opacity = "1";
                                            bookRateStar2[3].style.opacity = "1";
                                            bookRateStar2[2].style.opacity = "1";
                                            bookRateStar2[1].style.opacity = "1";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average < 4 && dataRate.summary.average >= 3) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "1";
                                            bookRateStar2[2].style.opacity = "1";
                                            bookRateStar2[1].style.opacity = "1";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average < 3 && dataRate.summary.average >= 2) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "1";
                                            bookRateStar2[1].style.opacity = "1";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average < 2 && dataRate.summary.average >= 1) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "0";
                                            bookRateStar2[1].style.opacity = "1";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average < 1 && dataRate.summary.average > 0) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "0";
                                            bookRateStar2[1].style.opacity = "0";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average == null) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "0";
                                            bookRateStar2[1].style.opacity = "0";
                                            bookRateStar2[0].style.opacity = "1";
                                        }
                                        else if (dataRate.summary.average == 0) {
                                            bookRateStar2[4].style.opacity = "0";
                                            bookRateStar2[3].style.opacity = "0";
                                            bookRateStar2[2].style.opacity = "0";
                                            bookRateStar2[1].style.opacity = "0";
                                            bookRateStar2[0].style.opacity = "0";
                                        }

                                        console.log(dataRate);

                                        bookPannel.style.opacity = "1"
                                        bookPannel.style.transform = "translate(0%,-15%)"
                                        navBar.style.backgroundColor = "transparent";
                                        navBar.style.boxShadow = "none"
                                        bookPannelCloseBtnSvg.style.fill = " rgb(41, 41, 51)";
                                        bookPannelCloseBtn.style.display = "block"
                                        bookPannelCloseBtn.style.opacity = "1";

                                        witchBookCode = p2.innerHTML;
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

                                        const comments = document.querySelector(".comments");

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
                                                    p3.addEventListener("click", async () => {
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


                                        bookName.innerHTML = p.innerHTML;
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
                                        bookPannelCloseBtn.style.opacity = "0"

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

                                    let pushCount = 0;
                                    // push other boook like this list to right 
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

                                    for (let i = 0; i < bookLikeThis.length; i++) {
                                        bookLikeThis[i].addEventListener("click", async () => {
                                            if (bookLikeThisCode[i].innerHTML == "") {
                                                return false;
                                            }
                                            else {
                                                const response = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + ".json");
                                                const data = await response.json();

                                                const responseRate2 = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + "/ratings.json");
                                                const dataRate2 = await responseRate2.json();

                                                const comments2 = document.querySelectorAll(".comment");
                                                for (let i = 0; i < comments2.length; i++) {
                                                    comments2[i].remove();
                                                }

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

                                                bookPannel.scrollTo(0, 0);

                                                if (dataRate2.summary.average >= 4) {
                                                    bookRateStar2[4].style.opacity = "1";
                                                    bookRateStar2[3].style.opacity = "1";
                                                    bookRateStar2[2].style.opacity = "1";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average < 4 && dataRate2.summary.average >= 3) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "1";
                                                    bookRateStar2[2].style.opacity = "1";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average < 3 && dataRate2.summary.average >= 2) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "1";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average < 2 && dataRate2.summary.average >= 1) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average < 1 && dataRate2.summary.average > 0) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "0";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate2.summary.average == null) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "0";
                                                    bookRateStar2[0].style.opacity = "0";
                                                }
                                                else if (dataRate2.summary.average == 0) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "0";
                                                    bookRateStar2[0].style.opacity = "0";
                                                }

                                                console.log(dataRate2);

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

                                                witchBookCode = bookLikeThisCode[i].innerHTML;
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
                                                console.log(CommentResponesData + "her it is");

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
                                                            p3.addEventListener("click", async () => {
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

                                                bookName.style.opacity = 1;
                                                autorName.style.opacity = 1;
                                                pushCount = 0;
                                                bookLikeThis[0].style.marginLeft = 0 + "px";
                                                pushToLeft.style.display = "none";
                                                pushToRight.style.opacity = 1;
                                                pushToRight.style.display = "block";

                                                const bookSubjectResponse = await fetch("https://openlibrary.org/search.json?q=" + data.title.toLowerCase());
                                                const bookSubjectsData = await bookSubjectResponse.json();

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
                                })
                            }
                        }
                    })
                }
            }
        }

        for (let i = 0; i < shelvesResponseData.length; i++) {

            let li = document.createElement("li");
            let shelfTitle = document.createElement("p");
            let shelfTitleTxt = document.createTextNode(shelvesResponseData[i].Name)
            let shelfImg = document.createElement("img");

            li.classList.add("shelfLi2");
            shelfTitle.appendChild(shelfTitleTxt);
            shelfTitle.classList.add("shelfTitle2");
            shelfImg.src = "assets/addShelfImg.png";
            shelfImg.classList.add("addShelfItemsImg");

            console.log("shelfTitleTxt");

            li.appendChild(shelfTitle);
            li.appendChild(shelfImg);
            shelfItems.appendChild(li);

            let bookShelfStatus = false;

            li.addEventListener("click", async () => {
                const shelfData = { userName }
                const shelfOptions = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(shelfData)
                };
                const shelvesResponse = await fetch("/shelvesData", shelfOptions);
                const shelvesResponseData = await shelvesResponse.json();

                if (shelvesResponseData[i].book == null) {
                    messageBox.innerHTML = "the book added to shelf"
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000);
                    console.log(witchBookCode);
                    console.log(shelvesResponseData[i]);
                    console.log(shelfBtnStatus);
                    const shelfName = shelfTitle.innerHTML;
                    const book = witchBookCode;
                    const shelfData2 = { userName, shelfName, book }
                    const shelfOptions2 = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(shelfData2)
                    };

                    shelfItems.style.left = 40 + "%";
                    shelfItems.style.top = 410 + "px";
                    shelfItems.style.opacity = 0;
                    setTimeout(() => {
                        shelfItems.style.display = "none";
                    }, 300);

                    const shelvesResponse2 = await fetch("/shelfAdd", shelfOptions2);
                    const shelvesResponseData2 = await shelvesResponse2.json();

                    shelfBtnStatus = false;
                }
                else {

                    shelfItems.style.left = 40 + "%";
                    shelfItems.style.top = 410 + "px";
                    shelfItems.style.opacity = 0;
                    setTimeout(() => {
                        shelfItems.style.display = "none";
                    }, 300);

                    for (let j = 0; j < shelvesResponseData[i].book.length; j++) {
                        if (shelvesResponseData[i].book[j] == witchBookCode) {
                            messageBox.innerHTML = "you already have this book in the shelf"
                            messageBox.classList.add("messageBoxFadeInOut");
                            setTimeout(() => {
                                messageBox.classList.remove("messageBoxFadeInOut");
                            }, 5000);
                            bookShelfStatus = true;
                            console.log(shelfBtnStatus);
                            console.log(witchBookCode);
                            console.log(shelvesResponseData[i].book[j]);
                            shelfBtnStatus = false;
                            break;
                        }
                        else {
                            bookShelfStatus = false;
                            console.log(shelfBtnStatus);
                            console.log(witchBookCode);
                            console.log(shelvesResponseData[i].book[j]);
                            shelfBtnStatus = false;
                        }
                    }

                    if (bookShelfStatus == false) {
                        messageBox.innerHTML = "book added to the shelf"
                        messageBox.classList.add("messageBoxFadeInOut");
                        setTimeout(() => {
                            messageBox.classList.remove("messageBoxFadeInOut");
                        }, 5000);
                        const shelfName = shelfTitle.innerHTML;
                        const book = witchBookCode;
                        const shelfData2 = { userName, shelfName, book }
                        const shelfOptions2 = {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(shelfData2)
                        };
                        shelfBtnStatus = false;
                        const shelvesResponse2 = await fetch("/shelfAdd", shelfOptions2);
                        const shelvesResponseData2 = await shelvesResponse2.json();
                    }
                    shelfBtnStatus = false;
                }
            })

            console.log(i);
        }
    }
}

//edit profile stuff

const pictureEditInput = document.querySelector("#pictureEditInput");
const pictureEditlbl = document.querySelector("#pictureEditlbl");

pictureEditInput.addEventListener('change', (e) => {
    pictureEditlbl.innerHTML = e.target.files[0].name;
    console.log(e.target.files[0].name);
    let reader = new FileReader();
    reader.addEventListener("load", async () => {
        imageProf.style.display = "block";
        imageProfDirty.style.display = "block";
        profIconPicture.style.display = "block";
        imageProf.src = reader.result;
        profIconPicture.src = reader.result;
    });
    reader.readAsDataURL(pictureEditInput.files[0]);

    profilePictureSvg.style.display = 'none';
    profileIconSvg.style.display = "none";
})

//showing editBox

const editBox = document.querySelector("#editBox");
const coverPage = document.querySelector(".coverPage");

document.querySelector("#profEditBtn").addEventListener("click", async () => {
    coverPage.style.display = "block";
    editBox.style.display = "block";
    setTimeout(() => {
        coverPage.style.opacity = ".5";
        editBox.style.opacity = "1"
    }, 100)
})

coverPage.addEventListener("click", async () => {
    coverPage.style.opacity = "0";
    editBox.style.opacity = "0"
    setTimeout(() => {
        coverPage.style.display = "none";
        editBox.style.display = "none";
    }, 300)
})

//change the data that user edited

var editBoxDoneBtn = document.querySelector("#editBoxDoneBtn");
var deleteAccountTxt = document.querySelector("#deleteAccountTxt");
var usernameEditInput = document.querySelector("#usernameEditInput");
var messageText = document.querySelector("#messageText");
var userStatus = localStorage.getItem("userTarget");

editBoxDoneBtn.addEventListener("click", async () => {
    if (usernameEditInput.value == "" && pictureEditInput.value == "") {
        messageText.innerHTML == "please Fill in the fields"
        messageText.classList.add("msgBoxfadeUpDown");
        setTimeout(() => {
            messageText.classList.remove("msgBoxfadeUpDown");
        }, 5500)
    }
    else if (usernameEditInput.value == "" && pictureEditInput.value != "") {
        const username = localStorage.getItem("userTarget");
        const image = imageProf.src;
        const newUsername = localStorage.getItem("userTarget");
        const data = { username, image, newUsername };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        localStorage.setItem("userTarget", newUsername)
        const response = await fetch("/editProfileData", options)
        const dataResponse = await response.json();
        console.log(dataResponse);

        usernameTxt.innerHTML = "User-name : " + dataResponse.userName;
        idTxt.innerHTML = "Id : " + dataResponse._id;

        coverPage.style.opacity = "0";
        editBox.style.opacity = "0"
        setTimeout(() => {
            coverPage.style.display = "none";
            editBox.style.display = "none";
        }, 300)

        usernameEditInput.value = "";
        pictureEditlbl.innerHTML = "";
    }
    else {
        const username = localStorage.getItem("userTarget");
        const image = imageProf.src;
        const newUsername = usernameEditInput.value;
        const data = { username, image, newUsername };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        localStorage.setItem("userTarget", newUsername)
        const response = await fetch("/editProfileData", options)
        const dataResponse = await response.json();
        console.log(dataResponse);

        usernameTxt.innerHTML = "User-name : " + dataResponse.userName;
        idTxt.innerHTML = "Id : " + dataResponse._id;

        coverPage.style.opacity = "0";
        editBox.style.opacity = "0"
        setTimeout(() => {
            coverPage.style.display = "none";
            editBox.style.display = "none";
        }, 300)

        usernameEditInput.value = "";
        pictureEditlbl.innerHTML = "Select";
        profilePictureSvg.style.display = 'none';
        profileIconSvg.style.display = "none";
    }
})

//delete an account stuff

const checkingUsersAccountPage = document.querySelector("#checkingUsersAccountPage");

deleteAccountTxt.addEventListener("click", async () => {
    const username = localStorage.getItem("userTarget");
    const data = { username };
    localStorage.removeItem("userTarget");
    checkingUsersAccountPage.style.display = "block"

    coverPage.style.opacity = "0";
    editBox.style.opacity = "0"
    setTimeout(() => {
        coverPage.style.display = "none";
        editBox.style.display = "none";
    }, 300)

    usernameEditInput.value = "";
    pictureEditlbl.innerHTML = "Select";
    profilePictureSvg.style.display = "block";
    profileIconSvg.style.display = "block";

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch("/removeUser", options)
    const dataResponse = await response.json();
    console.log(dataResponse);
})


//searching stuff


searchBoxBtn.addEventListener("click", async () => {

    if (bookSearchTxtBox.value == null || bookSearchTxtBox.value == "") {
        messageBox.classList.add("messageBoxFadeInOut");
        setTimeout(() => {
            messageBox.classList.remove("messageBoxFadeInOut");
        }, 5000);
    }
    else {

        searchPnlCloseBtn.style.display = "block";
        searchPnl.style.marginTop = "-9vh";
        searchPnl.style.opacity = "0.95";
        bookPannel.style.opacity = "0"
        bookPannel.style.transform = "translate(-100%)"
        bookPannelCloseBtn.style.display = "none"
        bookPannelCloseBtn.style.opacity = "0";
        bookImg.src = null

        const allBooks = document.querySelectorAll(".books");

        if (allBooks.length > 0) {
            for (let i = 0; i < allBooks.length; i++) {
                allBooks[i].remove();
            }
        }

        bookPannel.scrollTo(0, 0);
        searchPnl.scrollTo(0, 0);

        const response = await fetch("https://openlibrary.org/search.json?q=" + bookSearchTxtBox.value)
        const data = await response.json();
        const bookLikeThisTitle = document.querySelectorAll(".bookLikeThisTitle");
        const bookLikeThisImg = document.querySelectorAll(".bookLikeThisImg");
        const bookLikeThisCode = document.querySelectorAll(".bookLikeThisCode");
        const pushToRight = document.querySelector(".pushToRight");
        const pushToLeft = document.querySelector(".pushToLeft");
        const bookLikeThis = document.querySelectorAll('.bookLikeThis');
        const bookName = document.querySelector(".bookName");
        const autorName = document.querySelector(".autorName");
        const backgroundBookImg = document.querySelector(".backgroundBookImg");
        const aboutBook = document.querySelector("#aboutBook");
        const aboutAuthor = document.querySelector("#aboutAuthor");
        const bookRateStar2 = document.querySelectorAll(".bookRateStar2");
        const bookCode = document.querySelectorAll(".bookCode");
        const bookPannelCloseBtnSvg = document.querySelector("#bookPannelCloseBtnSvg");

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
            let p2 = document.createElement("p");
            let img = document.createElement("img");

            let titlePara = document.createTextNode(data.docs[i].title);
            let codePara = document.createTextNode(data.docs[i].key)

            p.appendChild(titlePara);
            p.classList.add("bookTitle");
            p2.appendChild(codePara);
            p2.classList.add("bookCode");
            img.classList.add("bookCover");
            if (data.docs[i].cover_i == null) {
                img.src = "assets/images (1).jfif";
            }
            else {
                img.src = "https://covers.openlibrary.org/b/id/" + data.docs[i].cover_i + "-M.jpg";
            }

            div.classList.add("books");
            div.appendChild(p);
            div.appendChild(p2);
            div.appendChild(img);
            div.style = "--i:" + i;
            li.classList.add("li");
            li.appendChild(div);
            secondetList.appendChild(li);

            //open any book pannel with user selecting 

            div.addEventListener("click", async () => {
                if (p2.innerHTML == "") {
                    return false;
                }
                else {

                    const response = await fetch("https://openlibrary.org" + p2.innerHTML + ".json");
                    const data = await response.json();

                    const responseRate = await fetch("https://openlibrary.org" + p2.innerHTML + "/ratings.json");
                    const dataRate = await responseRate.json();

                    if (dataRate.summary.average >= 4) {
                        bookRateStar2[4].style.opacity = "1";
                        bookRateStar2[3].style.opacity = "1";
                        bookRateStar2[2].style.opacity = "1";
                        bookRateStar2[1].style.opacity = "1";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate.summary.average < 4 && dataRate.summary.average >= 3) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "1";
                        bookRateStar2[2].style.opacity = "1";
                        bookRateStar2[1].style.opacity = "1";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate.summary.average < 3 && dataRate.summary.average >= 2) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "1";
                        bookRateStar2[1].style.opacity = "1";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate.summary.average < 2 && dataRate.summary.average >= 1) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "0";
                        bookRateStar2[1].style.opacity = "1";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate.summary.average < 1 && dataRate.summary.average > 0) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "0";
                        bookRateStar2[1].style.opacity = "0";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate.summary.average == null) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "0";
                        bookRateStar2[1].style.opacity = "0";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate.summary.average == 0) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "0";
                        bookRateStar2[1].style.opacity = "0";
                        bookRateStar2[0].style.opacity = "0";
                    }

                    console.log(dataRate);

                    bookPannel.style.opacity = "1"
                    bookPannel.style.transform = "translate(0%,-15%)"
                    navBar.style.backgroundColor = "transparent";
                    navBar.style.boxShadow = "none"
                    bookPannelCloseBtnSvg.style.fill = " rgb(41, 41, 51)";
                    bookPannelCloseBtn.style.display = "block"
                    bookPannelCloseBtn.style.opacity = "1";

                    witchBookCode = p2.innerHTML;
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
                                p3.addEventListener("click", async () => {
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
                bookPannelCloseBtn.style.opacity = "0"

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

            let pushCount = 0;
            // push other boook like this list to right 
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
        }

        for (let i = 0; i < bookLikeThis.length; i++) {
            bookLikeThis[i].addEventListener("click", async () => {
                if (bookLikeThisCode[i].innerHTML == "") {
                    return false;
                }
                else {
                    const response = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + ".json");
                    const data = await response.json();

                    const responseRate2 = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + "/ratings.json");
                    const dataRate2 = await responseRate2.json();

                    const comments2 = document.querySelectorAll(".comment");
                    for (let i = 0; i < comments2.length; i++) {
                        comments2[i].remove();
                    }

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

                    bookPannel.scrollTo(0, 0);

                    if (dataRate2.summary.average >= 4) {
                        bookRateStar2[4].style.opacity = "1";
                        bookRateStar2[3].style.opacity = "1";
                        bookRateStar2[2].style.opacity = "1";
                        bookRateStar2[1].style.opacity = "1";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate2.summary.average < 4 && dataRate2.summary.average >= 3) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "1";
                        bookRateStar2[2].style.opacity = "1";
                        bookRateStar2[1].style.opacity = "1";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate2.summary.average < 3 && dataRate2.summary.average >= 2) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "1";
                        bookRateStar2[1].style.opacity = "1";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate2.summary.average < 2 && dataRate2.summary.average >= 1) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "0";
                        bookRateStar2[1].style.opacity = "1";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate2.summary.average < 1 && dataRate2.summary.average > 0) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "0";
                        bookRateStar2[1].style.opacity = "0";
                        bookRateStar2[0].style.opacity = "1";
                    }
                    else if (dataRate2.summary.average == null) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "0";
                        bookRateStar2[1].style.opacity = "0";
                        bookRateStar2[0].style.opacity = "0";
                    }
                    else if (dataRate2.summary.average == 0) {
                        bookRateStar2[4].style.opacity = "0";
                        bookRateStar2[3].style.opacity = "0";
                        bookRateStar2[2].style.opacity = "0";
                        bookRateStar2[1].style.opacity = "0";
                        bookRateStar2[0].style.opacity = "0";
                    }

                    console.log(dataRate2);

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

                    witchBookCode = bookLikeThisCode[i].innerHTML;
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
                    console.log(CommentResponesData + "her it is");

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
                                p3.addEventListener("click", async () => {
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

                    bookName.style.opacity = 1;
                    autorName.style.opacity = 1;
                    pushCount = 0;
                    bookLikeThis[0].style.marginLeft = 0 + "px";
                    pushToLeft.style.display = "none";
                    pushToRight.style.opacity = 1;
                    pushToRight.style.display = "block";

                    const bookSubjectResponse = await fetch("https://openlibrary.org/search.json?q=" + data.title.toLowerCase());
                    const bookSubjectsData = await bookSubjectResponse.json();

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
    }
})

bookSearchTxtBox.addEventListener("keydown", async (e) => {
    const keyName = e.key;
    if (keyName == "Enter") {
        if (bookSearchTxtBox.value == null || bookSearchTxtBox.value == "") {
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000);
        }
        else {
            searchPnlCloseBtn.style.display = "block";
            searchPnl.style.marginTop = "-9vh";
            searchPnl.style.opacity = "0.95";
            bookPannel.style.opacity = "0"
            bookPannel.style.transform = "translate(-100%)"
            bookPannelCloseBtn.style.display = "none"
            bookPannelCloseBtn.style.opacity = "0";
            bookImg.src = null

            const allBooks = document.querySelectorAll(".books");

            if (allBooks.length > 0) {
                for (let i = 0; i < allBooks.length; i++) {
                    allBooks[i].remove();
                }
            }

            bookPannel.scrollTo(0, 0);
            searchPnl.scrollTo(0, 0);

            const response = await fetch("https://openlibrary.org/search.json?q=" + bookSearchTxtBox.value)
            const data = await response.json();
            const bookLikeThisTitle = document.querySelectorAll(".bookLikeThisTitle");
            const bookLikeThisImg = document.querySelectorAll(".bookLikeThisImg");
            const bookLikeThisCode = document.querySelectorAll(".bookLikeThisCode");
            const pushToRight = document.querySelector(".pushToRight");
            const pushToLeft = document.querySelector(".pushToLeft");
            const bookLikeThis = document.querySelectorAll('.bookLikeThis');
            const bookName = document.querySelector(".bookName");
            const autorName = document.querySelector(".autorName");
            const backgroundBookImg = document.querySelector(".backgroundBookImg");
            const aboutBook = document.querySelector("#aboutBook");
            const aboutAuthor = document.querySelector("#aboutAuthor");
            const bookRateStar2 = document.querySelectorAll(".bookRateStar2");
            const bookCode = document.querySelectorAll(".bookCode");
            const bookPannelCloseBtnSvg = document.querySelector("#bookPannelCloseBtnSvg");

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
                let p2 = document.createElement("p");
                let img = document.createElement("img");

                let titlePara = document.createTextNode(data.docs[i].title);
                let codePara = document.createTextNode(data.docs[i].key)

                p.appendChild(titlePara);
                p.classList.add("bookTitle");
                p2.appendChild(codePara);
                p2.classList.add("bookCode");
                img.classList.add("bookCover");
                if (data.docs[i].cover_i == null) {
                    img.src = "assets/images (1).jfif";
                }
                else {
                    img.src = "https://covers.openlibrary.org/b/id/" + data.docs[i].cover_i + "-M.jpg";
                }

                div.classList.add("books");
                div.appendChild(p);
                div.appendChild(p2);
                div.appendChild(img);
                div.style = "--i:" + i;
                li.classList.add("li");
                li.appendChild(div);
                secondetList.appendChild(li);

                //open any book pannel with user selecting 

                div.addEventListener("click", async () => {
                    if (p2.innerHTML == "") {
                        return false;
                    }
                    else {

                        const response = await fetch("https://openlibrary.org" + p2.innerHTML + ".json");
                        const data = await response.json();

                        const responseRate = await fetch("https://openlibrary.org" + p2.innerHTML + "/ratings.json");
                        const dataRate = await responseRate.json();

                        if (dataRate >= 4) {
                            bookRateStar2[4].style.opacity = "1";
                            bookRateStar2[3].style.opacity = "1";
                            bookRateStar2[2].style.opacity = "1";
                            bookRateStar2[1].style.opacity = "1";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate.summary.average < 4 && dataRate.summary.average >= 3) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "1";
                            bookRateStar2[2].style.opacity = "1";
                            bookRateStar2[1].style.opacity = "1";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate.summary.average < 3 && dataRate.summary.average >= 2) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "1";
                            bookRateStar2[1].style.opacity = "1";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate.summary.average < 2 && dataRate.summary.average >= 1) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "0";
                            bookRateStar2[1].style.opacity = "1";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate.summary.average < 1 && dataRate.summary.average > 0) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "0";
                            bookRateStar2[1].style.opacity = "0";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate.summary.average == null) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "0";
                            bookRateStar2[1].style.opacity = "0";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate.summary.average == 0) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "0";
                            bookRateStar2[1].style.opacity = "0";
                            bookRateStar2[0].style.opacity = "0";
                        }

                        console.log(dataRate);

                        bookPannel.style.opacity = "1"
                        bookPannel.style.transform = "translate(0%,-15%)"
                        navBar.style.backgroundColor = "transparent";
                        navBar.style.boxShadow = "none"
                        bookPannelCloseBtnSvg.style.fill = " rgb(41, 41, 51)";
                        bookPannelCloseBtn.style.display = "block"
                        bookPannelCloseBtn.style.opacity = "1";

                        witchBookCode = p2.innerHTML;
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
                                    p3.addEventListener("click", async () => {
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
                    bookPannelCloseBtn.style.opacity = "0"

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

                let pushCount = 0;
                // push other boook like this list to right 
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
            }

            for (let i = 0; i < bookLikeThis.length; i++) {
                bookLikeThis[i].addEventListener("click", async () => {
                    if (bookLikeThisCode[i].innerHTML == "") {
                        return false;
                    }
                    else {
                        const response = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + ".json");
                        const data = await response.json();

                        const responseRate2 = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + "/ratings.json");
                        const dataRate2 = await responseRate2.json();

                        const comments2 = document.querySelectorAll(".comment");
                        for (let i = 0; i < comments2.length; i++) {
                            comments2[i].remove();
                        }

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

                        bookPannel.scrollTo(0, 0);

                        if (dataRate2.summary.average >= 4) {
                            bookRateStar2[4].style.opacity = "1";
                            bookRateStar2[3].style.opacity = "1";
                            bookRateStar2[2].style.opacity = "1";
                            bookRateStar2[1].style.opacity = "1";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate2.summary.average < 4 && dataRate2.summary.average >= 3) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "1";
                            bookRateStar2[2].style.opacity = "1";
                            bookRateStar2[1].style.opacity = "1";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate2.summary.average < 3 && dataRate2.summary.average >= 2) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "1";
                            bookRateStar2[1].style.opacity = "1";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate2.summary.average < 2 && dataRate2.summary.average >= 1) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "0";
                            bookRateStar2[1].style.opacity = "1";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate2.summary.average < 1 && dataRate2.summary.average > 0) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "0";
                            bookRateStar2[1].style.opacity = "0";
                            bookRateStar2[0].style.opacity = "1";
                        }
                        else if (dataRate2.summary.average == null) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "0";
                            bookRateStar2[1].style.opacity = "0";
                            bookRateStar2[0].style.opacity = "0";
                        }
                        else if (dataRate2.summary.average == 0) {
                            bookRateStar2[4].style.opacity = "0";
                            bookRateStar2[3].style.opacity = "0";
                            bookRateStar2[2].style.opacity = "0";
                            bookRateStar2[1].style.opacity = "0";
                            bookRateStar2[0].style.opacity = "0";
                        }

                        console.log(dataRate2);

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

                        witchBookCode = bookLikeThisCode[i].innerHTML;
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
                        console.log(CommentResponesData + "her it is");

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
                                    p3.addEventListener("click", async () => {
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

                        bookName.style.opacity = 1;
                        autorName.style.opacity = 1;
                        pushCount = 0;
                        bookLikeThis[0].style.marginLeft = 0 + "px";
                        pushToLeft.style.display = "none";
                        pushToRight.style.opacity = 1;
                        pushToRight.style.display = "block";

                        const bookSubjectResponse = await fetch("https://openlibrary.org/search.json?q=" + data.title.toLowerCase());
                        const bookSubjectsData = await bookSubjectResponse.json();

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

const ProfPage = document.querySelector(".ProfPage");

document.body.onscroll = () => {

    if (document.body.scrollTop > 100) {
        navBar.style.backgroundColor = "#242131";
    }
    if (document.body.scrollTop < 100) {
        navBar.style.backgroundColor = "transparent";
    }
}

// any shelf event

const dShelf = document.querySelectorAll(".dShelf");
const shelfPnl = document.querySelector(".shelfPnl");
const shelfNameTitle = document.querySelector("#shelfNameTitle");
const shelfPara = document.querySelectorAll(".shelfPara");
const shelfPnlCloseBtn = document.querySelector("#shelfPnlCloseBtn");

for (let i = 0; i < dShelf.length; i++) {
    dShelf[i].addEventListener("click", () => {
        shelfPnl.style.opacity = 1;
        shelfPnl.style.top = 50 + "%";
        navBar.style.backgroundColor = "transparent";
        shelfNameTitle.innerHTML = shelfPara[i].innerHTML;
        searchPnlCloseBtn.style.display = "none";
    })
}

shelfPnlCloseBtn.addEventListener("click", () => {
    shelfPnl.style.opacity = 0;
    shelfPnl.style.top = 150 + "%";
    const li2 = document.querySelectorAll(".li2");

    for (let i = 0; i < li2.length; i++) {
        li2[i].remove();
    }
})

shelfPnl.onscroll = () => {

    if (shelfPnl.scrollTop > 100) {
        navBar.style.backgroundColor = "#242131";
    }
    if (shelfPnl.scrollTop < 100) {
        navBar.style.backgroundColor = "transparent";
    }
}

//adding a new shelf event

const addShelfBtn = document.querySelector("#addShelfBtn");
const nameSelectoreBox = document.querySelector(".nameSelectoreBox");
const shelfNameSelector = document.querySelector("#shelfNameSelector");
const addShelfBtnSlc = document.querySelector("#addShelfBtnSlc");
const shelfName = document.querySelector("#shelfName");
const shelvesBox = document.querySelector(".shelvesBox")

addShelfBtn.addEventListener("click", () => {
    coverPage.style.display = "block";
    nameSelectoreBox.style.display = "block";

    setTimeout(() => {
        coverPage.style.opacity = ".5";
        nameSelectoreBox.style.opacity = "1"
    }, 100)
});

coverPage.addEventListener("click", () => {
    shelfName.style.transform = "translate(90px,37px)"
    shelfName.style.color = "#e3e2e973";
    shelfNameSelector.blur()
    shelfNameSelector.value = "";
    nameSelectoreBox.style.opacity = "0";
    setTimeout(() => {
        nameSelectoreBox.style.display = "none"
    }, 100);
})

addShelfBtnSlc.addEventListener("click", async () => {
    if (shelfNameSelector.value == null || shelfNameSelector.value == "") {
        messageText.innerHTML == "please Fill in the field"
        messageText.classList.add("msgBoxfadeUpDown");
        setTimeout(() => {
            messageText.classList.remove("msgBoxfadeUpDown");
        }, 5500)
    }
    else {
        let li = document.createElement("li");
        let shelfTitle = document.createElement("p");
        let shelfTitleTxt = document.createTextNode(shelfNameSelector.value)

        li.classList.add("shelfLi");
        shelfTitle.appendChild(shelfTitleTxt);
        addShelfBtn.style.width = 275 + "px";

        li.appendChild(shelfTitle);
        shelvesBox.appendChild(li);

        let shelfName2 = shelfNameSelector.value;
        let user = localStorage.getItem("userTarget");

        li.addEventListener("click", () => {
            shelfPnl.style.opacity = 1;
            shelfPnl.style.top = 50 + "%";
            navBar.style.backgroundColor = "transparent";
            shelfNameTitle.innerHTML = shelfTitle.innerHTML;
            searchPnlCloseBtn.style.display = "none";
        })

        const shelfData = { shelfName2, user }
        const options3 = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shelfData)
        };

        const ShelfRespons = await fetch("/shelfCreator", options3)
        const ShelfResponsData = await ShelfRespons.json();

        shelfNameSelector.blur()
        shelfNameSelector.value = "";
        shelfName.style.transform = "translate(" + 90 + "px+," + 37 + "px)";
        shelfName.style.color = "#e3e2e973";
        shelfNameSelector.blur()
        shelfNameSelector.value = "";
        nameSelectoreBox.style.opacity = "0";
        setTimeout(() => {
            nameSelectoreBox.style.display = "none"
        }, 100);
        coverPage.style.opacity = "0";
        editBox.style.opacity = "0"
        setTimeout(() => {
            coverPage.style.display = "none";
            editBox.style.display = "none";
        }, 300)
    }
})

shelfNameSelector.addEventListener("keydown", async (e) => {
    const keyName = e.key;
    if (keyName == "Enter") {
        if (shelfNameSelector.value == null || shelfNameSelector.value == "") {
            messageText.innerHTML == "please Fill in the field"
            messageText.classList.add("msgBoxfadeUpDown");
            setTimeout(() => {
                messageText.classList.remove("msgBoxfadeUpDown");
            }, 5500)
        }
        else {
            let li = document.createElement("li");
            let shelfTitle = document.createElement("p");
            let shelfTitleTxt = document.createTextNode(shelfNameSelector.value)

            li.classList.add("shelfLi");
            shelfTitle.appendChild(shelfTitleTxt);
            addShelfBtn.style.width = 275 + "px";

            li.appendChild(shelfTitle);
            shelvesBox.appendChild(li);

            let shelfName2 = shelfNameSelector.value;
            let user = localStorage.getItem("userTarget");

            const shelfData = { shelfName2, user }
            const options3 = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(shelfData)
            };

            const ShelfRespons = await fetch("/shelfCreator", options3)
            const ShelfResponsData = await ShelfRespons.json();

            li.addEventListener("click", () => {
                shelfPnl.style.opacity = 1;
                shelfPnl.style.top = 50 + "%";
                navBar.style.backgroundColor = "transparent";
                shelfNameTitle.innerHTML = shelfTitle.innerHTML;
                searchPnlCloseBtn.style.display = "none";
            })

            shelfNameSelector.blur()
            shelfNameSelector.value = "";
            shelfName.style.transform = "translate(90px,37px)"
            shelfName.style.color = "#e3e2e973";
            shelfNameSelector.blur()
            shelfNameSelector.value = "";
            nameSelectoreBox.style.opacity = "0";
            setTimeout(() => {
                nameSelectoreBox.style.display = "none"
            }, 100);
            coverPage.style.opacity = "0";
            editBox.style.opacity = "0"
            setTimeout(() => {
                coverPage.style.display = "none";
                editBox.style.display = "none";
            }, 300);
        }
    }
})

//name selecting for shelf box effect

shelfNameSelector.addEventListener("mousedown", () => {
    shelfName.style.transform = "translate(20px,10px)"
    shelfName.style.color = "#e3e2e9";
});

shelfName.addEventListener("click", () => {
    shelfName.style.transform = "translate(20px,10px)"
    shelfName.style.color = "#e3e2e9";
    shelfNameSelector.focus()
});

const shelfItems = document.querySelector(".shelfItems");

addBookBtn.addEventListener("click", () => {
    if (shelfBtnStatus == false) {
        shelfItems.style.display = "block";
        setTimeout(() => {
            shelfItems.style.left = 50 + "%";
            shelfItems.style.top = 280 + "px";
            shelfItems.style.opacity = .97;
        }, 300);
        shelfBtnStatus = true;
    }
    else {
        shelfItems.style.left = 40 + "%";
        shelfItems.style.top = 410 + "px";
        shelfItems.style.opacity = 0;
        setTimeout(() => {
            shelfItems.style.display = "none";

        }, 300);

        shelfBtnStatus = false;
    }
});

backgroundBookImg.addEventListener("click", () => {
    shelfItems.style.left = 40 + "%";
    shelfItems.style.top = 410 + "px";
    shelfItems.style.opacity = 0;
    setTimeout(() => {
        shelfItems.style.display = "none";

    }, 300);

    shelfBtnStatus = false;
})

const backgroundBookImgCover = document.querySelector(".backgroundBookImgCover")
const BookImg = document.querySelector(".BookImg");

backgroundBookImgCover.addEventListener("click", () => {
    shelfItems.style.left = 40 + "%";
    shelfItems.style.top = 410 + "px";
    shelfItems.style.opacity = 0;
    setTimeout(() => {
        shelfItems.style.display = "none";

    }, 300);

    shelfBtnStatus = false;
})

BookImg.addEventListener("click", () => {
    shelfItems.style.left = 40 + "%";
    shelfItems.style.top = 410 + "px";
    shelfItems.style.opacity = 0;
    setTimeout(() => {
        shelfItems.style.display = "none";

    }, 300);

    shelfBtnStatus = false;
})

const shelfEditPnlCloseBtn = document.querySelector("#shelfEditPnlCloseBtn");
const shelfEditBox = document.querySelector(".shelfEditBox");
const shelfEditPnlCover = document.querySelector(".shelfEditPnlCover");
const editShelfBtn = document.querySelector("#editShelfBtn");


shelfEditPnlCloseBtn.addEventListener("click", () => {
    shelfEditBox.style.opacity = 0;
    shelfEditBox.style.marginTop = 400 + "px";
    shelfEditPnlCover.style.opacity = 0;
    setTimeout(() => {
        shelfEditPnlCover.style.display = "none";
        shelfEditBox.style.display = "none"
    }, 300)
})
shelfEditPnlCover.addEventListener("click", () => {
    shelfEditBox.style.opacity = 0;
    shelfEditBox.style.marginTop = 400 + "px";
    shelfEditPnlCover.style.opacity = 0;
    setTimeout(() => {
        shelfEditPnlCover.style.display = "none";
        shelfEditBox.style.display = "none"
    }, 300)
})

editShelfBtn.addEventListener("click", () => {
    if (shelfNameTitle.innerHTML == "Want to read" || shelfNameTitle.innerHTML == "Reading" || shelfNameTitle.innerHTML == "Readed") {
        messageBox2.innerHTML = "sorry, you can't make change in this shelf"
        messageBox2.classList.add("messageBoxFadeInOut");
        setTimeout(() => {
            messageBox2.classList.remove("messageBoxFadeInOut");
        }, 5000);
    }
    else {
        shelfEditBox.style.display = "block";
        shelfEditBox.style.marginTop = 300 + "px";
        shelfEditPnlCover.style.display = "block";
        setTimeout(() => {
            shelfEditPnlCover.style.opacity = "1";
            shelfEditBox.style.opacity = "1"
        }, 300)
    }
})

//editing the name of shelf

const shelfEditBoxBtn = document.querySelector("#shelfEditBoxBtn");
const shelfNameTxtBox = document.querySelector("#shelfNameTxtBox");
const messageBox2 = document.querySelector("#messageText2");

shelfEditBoxBtn.addEventListener("click", async () => {
    if (shelfNameTxtBox.value == null || shelfNameTxtBox.value == "") {
        messageBox2.innerHTML = "please insert the new Name"
        messageBox2.classList.add("messageBoxFadeInOut");
        setTimeout(() => {
            messageBox2.classList.remove("messageBoxFadeInOut");
        }, 5000);
    }
    else {
        const newShelfName = shelfNameTxtBox.value;
        const userName = localStorage.getItem("userTarget");
        const oldShelfName = shelfNameTitle.innerHTML;
        const shelfData2 = { userName, oldShelfName, newShelfName };

        console.log(shelfData2);


        if (newShelfName == oldShelfName) {
            messageBox2.innerHTML = "this is the old name,please insert something new!"
            messageBox2.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox2.classList.remove("messageBoxFadeInOut");
            }, 5000);
        }
        else {
            shelfNameTxtBox.value = "";

            shelfNameTitle.innerHTML = newShelfName;

            messageBox2.innerHTML = "Shelf's name edited"
            messageBox2.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox2.classList.remove("messageBoxFadeInOut");
            }, 5000);

            shelfEditBox.style.opacity = 0;
            shelfEditBox.style.marginTop = 400 + "px";
            shelfEditPnlCover.style.opacity = 0;
            setTimeout(() => {
                shelfEditPnlCover.style.display = "none";
                shelfEditBox.style.display = "none"
            }, 300)


            try {
                const shelfOptions2 = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(shelfData2)
                };
                const editShelfName = await fetch("/shelfNameEdit", shelfOptions2);
                const editShelfNameData = await editShelfName.json();

            }
            catch {
                console.log("a bug from nowhere");
            }

            const shelfLiTemp = document.querySelectorAll(".shelfLi");
            console.log(shelfLiTemp.length);
            for (let j = 0; j < shelfLiTemp.length; j++) {
                shelfLiTemp[j].remove();
            }

            const shelfData = { userName }
            const shelfOptions = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(shelfData)
            };
            const shelvesResponse = await fetch("/shelvesData", shelfOptions);
            const shelvesResponseData = await shelvesResponse.json();
            if (shelvesResponseData.length > 3) {
                console.log("not bad");
                for (let i = 0; i < shelvesResponseData.length; i++) {
                    console.log("not bad again");
                    if (shelvesResponseData[i].Name != "reading" && shelvesResponseData[i].Name != "readed" && shelvesResponseData[i].Name != "want to read") {
                        let li = document.createElement("li");
                        let shelfTitle = document.createElement("p");
                        let shelfTitleTxt = document.createTextNode(shelvesResponseData[i].Name)

                        li.classList.add("shelfLi");
                        shelfTitle.appendChild(shelfTitleTxt);
                        addShelfBtn.style.width = 275 + "px";

                        li.appendChild(shelfTitle);
                        shelvesBox.appendChild(li);

                        li.addEventListener("click", async () => {
                            shelfPnl.style.opacity = 1;
                            shelfPnl.style.top = 50 + "%";
                            navBar.style.backgroundColor = "transparent";
                            shelfNameTitle.innerHTML = shelfTitle.innerHTML;
                            searchPnlCloseBtn.style.display = "none";
                            console.log(shelvesResponseData[i].book);

                            const secondetList2 = document.querySelector(".secondetList2");

                            for (let j = 0; j < shelvesResponseData[i].book.length; j++) {

                                if (shelvesResponseData[i].book.length == 0) {

                                    console.log("oooops");
                                    return false;
                                }
                                else {
                                    const anyShelfBook = await fetch("https://openlibrary.org" + shelvesResponseData[i].book[j] + ".json");
                                    const anyShelfBookData = await anyShelfBook.json();
                                    console.log(anyShelfBookData);

                                    let li = document.createElement("li");
                                    let p = document.createElement("p");
                                    let p2 = document.createElement("p");
                                    let img = document.createElement("img");

                                    let titlePara = document.createTextNode(anyShelfBookData.title);
                                    let codePara = document.createTextNode(anyShelfBookData.key)

                                    p.appendChild(titlePara);
                                    p.classList.add("bookTitle");
                                    p2.appendChild(codePara);
                                    p2.classList.add("bookCode");
                                    img.classList.add("bookCover");
                                    if (anyShelfBookData.covers[0] == null) {
                                        img.src = "assets/images (1).jfif";
                                    }
                                    else {
                                        img.src = "https://covers.openlibrary.org/b/id/" + anyShelfBookData.covers[0] + "-M.jpg";
                                    }

                                    li.style = "--i:" + j;
                                    li.classList.add("li2");
                                    li.appendChild(p);
                                    li.appendChild(p2);
                                    li.appendChild(img);
                                    console.log(li);
                                    secondetList2.appendChild(li);
                                    const bookLikeThisTitle = document.querySelectorAll(".bookLikeThisTitle");
                                    const bookLikeThisImg = document.querySelectorAll(".bookLikeThisImg");
                                    const bookLikeThisCode = document.querySelectorAll(".bookLikeThisCode");
                                    const pushToRight = document.querySelector(".pushToRight");
                                    const pushToLeft = document.querySelector(".pushToLeft");
                                    const bookLikeThis = document.querySelectorAll('.bookLikeThis');
                                    const bookName = document.querySelector(".bookName");
                                    const autorName = document.querySelector(".autorName");
                                    const backgroundBookImg = document.querySelector(".backgroundBookImg");
                                    const aboutBook = document.querySelector("#aboutBook");
                                    const aboutAuthor = document.querySelector("#aboutAuthor");
                                    const bookCode = document.querySelectorAll(".bookCode");
                                    const bookPannelCloseBtnSvg = document.querySelector("#bookPannelCloseBtnSvg");

                                    li.addEventListener("click", async () => {
                                        if (p2.innerHTML == "") {
                                            return false;
                                        }
                                        else {
                                            const response = await fetch("https://openlibrary.org" + p2.innerHTML + ".json");
                                            const data = await response.json();

                                            const responseRate = await fetch("https://openlibrary.org" + p2.innerHTML + "/ratings.json");
                                            const dataRate = await responseRate.json();

                                            console.log(dataRate, data);
                                            const bookRateStar2 = document.querySelectorAll(".bookRateStar2");

                                            if (dataRate.summary.average >= 4) {
                                                bookRateStar2[4].style.opacity = "1";
                                                bookRateStar2[3].style.opacity = "1";
                                                bookRateStar2[2].style.opacity = "1";
                                                bookRateStar2[1].style.opacity = "1";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate.summary.average < 4 && dataRate.summary.average >= 3) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "1";
                                                bookRateStar2[2].style.opacity = "1";
                                                bookRateStar2[1].style.opacity = "1";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate.summary.average < 3 && dataRate.summary.average >= 2) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "1";
                                                bookRateStar2[1].style.opacity = "1";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate.summary.average < 2 && dataRate.summary.average >= 1) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "0";
                                                bookRateStar2[1].style.opacity = "1";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate.summary.average < 1 && dataRate.summary.average > 0) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "0";
                                                bookRateStar2[1].style.opacity = "0";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate.summary.average == null) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "0";
                                                bookRateStar2[1].style.opacity = "0";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate.summary.average == 0) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "0";
                                                bookRateStar2[1].style.opacity = "0";
                                                bookRateStar2[0].style.opacity = "0";
                                            }

                                            console.log(dataRate);

                                            bookPannel.style.opacity = "1"
                                            bookPannel.style.transform = "translate(0%,-15%)"
                                            navBar.style.backgroundColor = "transparent";
                                            navBar.style.boxShadow = "none"
                                            bookPannelCloseBtnSvg.style.fill = " rgb(41, 41, 51)";
                                            bookPannelCloseBtn.style.display = "block"
                                            bookPannelCloseBtn.style.opacity = "1";

                                            witchBookCode = p2.innerHTML;
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

                                            const comments = document.querySelector(".comments");

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
                                                        p3.addEventListener("click", async () => {
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


                                            bookName.innerHTML = p.innerHTML;
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
                                            bookPannelCloseBtn.style.opacity = "0"

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

                                        let pushCount = 0;
                                        // push other boook like this list to right 
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

                                        for (let i = 0; i < bookLikeThis.length; i++) {
                                            bookLikeThis[i].addEventListener("click", async () => {
                                                if (bookLikeThisCode[i].innerHTML == "") {
                                                    return false;
                                                }
                                                else {
                                                    const response = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + ".json");
                                                    const data = await response.json();

                                                    const responseRate2 = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + "/ratings.json");
                                                    const dataRate2 = await responseRate2.json();

                                                    const comments2 = document.querySelectorAll(".comment");
                                                    for (let i = 0; i < comments2.length; i++) {
                                                        comments2[i].remove();
                                                    }

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

                                                    bookPannel.scrollTo(0, 0);

                                                    if (dataRate2.summary.average >= 4) {
                                                        bookRateStar2[4].style.opacity = "1";
                                                        bookRateStar2[3].style.opacity = "1";
                                                        bookRateStar2[2].style.opacity = "1";
                                                        bookRateStar2[1].style.opacity = "1";
                                                        bookRateStar2[0].style.opacity = "1";
                                                    }
                                                    else if (dataRate2.summary.average < 4 && dataRate2.summary.average >= 3) {
                                                        bookRateStar2[4].style.opacity = "0";
                                                        bookRateStar2[3].style.opacity = "1";
                                                        bookRateStar2[2].style.opacity = "1";
                                                        bookRateStar2[1].style.opacity = "1";
                                                        bookRateStar2[0].style.opacity = "1";
                                                    }
                                                    else if (dataRate2.summary.average < 3 && dataRate2.summary.average >= 2) {
                                                        bookRateStar2[4].style.opacity = "0";
                                                        bookRateStar2[3].style.opacity = "0";
                                                        bookRateStar2[2].style.opacity = "1";
                                                        bookRateStar2[1].style.opacity = "1";
                                                        bookRateStar2[0].style.opacity = "1";
                                                    }
                                                    else if (dataRate2.summary.average < 2 && dataRate2.summary.average >= 1) {
                                                        bookRateStar2[4].style.opacity = "0";
                                                        bookRateStar2[3].style.opacity = "0";
                                                        bookRateStar2[2].style.opacity = "0";
                                                        bookRateStar2[1].style.opacity = "1";
                                                        bookRateStar2[0].style.opacity = "1";
                                                    }
                                                    else if (dataRate2.summary.average < 1 && dataRate2.summary.average > 0) {
                                                        bookRateStar2[4].style.opacity = "0";
                                                        bookRateStar2[3].style.opacity = "0";
                                                        bookRateStar2[2].style.opacity = "0";
                                                        bookRateStar2[1].style.opacity = "0";
                                                        bookRateStar2[0].style.opacity = "1";
                                                    }
                                                    else if (dataRate2.summary.average == null) {
                                                        bookRateStar2[4].style.opacity = "0";
                                                        bookRateStar2[3].style.opacity = "0";
                                                        bookRateStar2[2].style.opacity = "0";
                                                        bookRateStar2[1].style.opacity = "0";
                                                        bookRateStar2[0].style.opacity = "0";
                                                    }
                                                    else if (dataRate2.summary.average == 0) {
                                                        bookRateStar2[4].style.opacity = "0";
                                                        bookRateStar2[3].style.opacity = "0";
                                                        bookRateStar2[2].style.opacity = "0";
                                                        bookRateStar2[1].style.opacity = "0";
                                                        bookRateStar2[0].style.opacity = "0";
                                                    }

                                                    console.log(dataRate2);

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

                                                    witchBookCode = bookLikeThisCode[i].innerHTML;
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
                                                    console.log(CommentResponesData + "her it is");

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
                                                                p3.addEventListener("click", async () => {
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

                                                    bookName.style.opacity = 1;
                                                    autorName.style.opacity = 1;
                                                    pushCount = 0;
                                                    bookLikeThis[0].style.marginLeft = 0 + "px";
                                                    pushToLeft.style.display = "none";
                                                    pushToRight.style.opacity = 1;
                                                    pushToRight.style.display = "block";

                                                    const bookSubjectResponse = await fetch("https://openlibrary.org/search.json?q=" + data.title.toLowerCase());
                                                    const bookSubjectsData = await bookSubjectResponse.json();

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
                                    })
                                }
                            }
                        })
                    }
                }
            }
        }
    }
});

shelfNameTxtBox.addEventListener("keydown", async (e) => {
    const keyName = e.key;
    if (keyName == "Enter") {
        if (shelfNameTxtBox.value == null || shelfNameTxtBox.value == "") {
            messageBox2.innerHTML = "please insert the new Name"
            messageBox2.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox2.classList.remove("messageBoxFadeInOut");
            }, 5000);
        }
        else {
            const newShelfName = shelfNameTxtBox.value;
            const userName = localStorage.getItem("userTarget");
            const oldShelfName = shelfNameTitle.innerHTML;
            const shelfData2 = { userName, oldShelfName, newShelfName };

            console.log(shelfData2);


            if (newShelfName == oldShelfName) {
                messageBox2.innerHTML = "this is the old name,please insert something new!"
                messageBox2.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox2.classList.remove("messageBoxFadeInOut");
                }, 5000);
            }
            else {
                shelfNameTxtBox.value = "";

                shelfNameTitle.innerHTML = newShelfName;

                messageBox2.innerHTML = "Shelf's name edited"
                messageBox2.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox2.classList.remove("messageBoxFadeInOut");
                }, 5000);

                shelfEditBox.style.opacity = 0;
                shelfEditBox.style.marginTop = 400 + "px";
                shelfEditPnlCover.style.opacity = 0;
                setTimeout(() => {
                    shelfEditPnlCover.style.display = "none";
                    shelfEditBox.style.display = "none"
                }, 300)


                try {
                    const shelfOptions2 = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(shelfData2)
                    };
                    const editShelfName = await fetch("/shelfNameEdit", shelfOptions2);
                    const editShelfNameData = await editShelfName.json();

                }
                catch {
                    console.log("a bug from nowhere");
                }

                const shelfData = { userName }
                const shelfOptions = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(shelfData)
                };
                const shelvesResponse = await fetch("/shelvesData", shelfOptions);
                const shelvesResponseData = await shelvesResponse.json();
                if (shelvesResponseData.length > 3) {
                    console.log("not bad");
                    for (let i = 0; i < shelvesResponseData.length; i++) {
                        console.log("not bad again");
                        if (shelvesResponseData[i].Name != "reading" && shelvesResponseData[i].Name != "readed" && shelvesResponseData[i].Name != "want to read") {
                            let li = document.createElement("li");
                            let shelfTitle = document.createElement("p");
                            let shelfTitleTxt = document.createTextNode(shelvesResponseData[i].Name)

                            li.classList.add("shelfLi");
                            shelfTitle.appendChild(shelfTitleTxt);
                            addShelfBtn.style.width = 275 + "px";

                            li.appendChild(shelfTitle);
                            shelvesBox.appendChild(li);

                            li.addEventListener("click", async () => {
                                shelfPnl.style.opacity = 1;
                                shelfPnl.style.top = 50 + "%";
                                navBar.style.backgroundColor = "transparent";
                                shelfNameTitle.innerHTML = shelfTitle.innerHTML;
                                searchPnlCloseBtn.style.display = "none";
                                console.log(shelvesResponseData[i].book);

                                const secondetList2 = document.querySelector(".secondetList2");

                                for (let j = 0; j < shelvesResponseData[i].book.length; j++) {

                                    if (shelvesResponseData[i].book.length == 0) {

                                        console.log("oooops");
                                        return false;
                                    }
                                    else {
                                        const anyShelfBook = await fetch("https://openlibrary.org" + shelvesResponseData[i].book[j] + ".json");
                                        const anyShelfBookData = await anyShelfBook.json();
                                        console.log(anyShelfBookData);

                                        let li = document.createElement("li");
                                        let p = document.createElement("p");
                                        let p2 = document.createElement("p");
                                        let img = document.createElement("img");

                                        let titlePara = document.createTextNode(anyShelfBookData.title);
                                        let codePara = document.createTextNode(anyShelfBookData.key)

                                        p.appendChild(titlePara);
                                        p.classList.add("bookTitle");
                                        p2.appendChild(codePara);
                                        p2.classList.add("bookCode");
                                        img.classList.add("bookCover");
                                        if (anyShelfBookData.covers[0] == null) {
                                            img.src = "assets/images (1).jfif";
                                        }
                                        else {
                                            img.src = "https://covers.openlibrary.org/b/id/" + anyShelfBookData.covers[0] + "-M.jpg";
                                        }

                                        li.style = "--i:" + j;
                                        li.classList.add("li2");
                                        li.appendChild(p);
                                        li.appendChild(p2);
                                        li.appendChild(img);
                                        console.log(li);
                                        secondetList2.appendChild(li);
                                        const bookLikeThisTitle = document.querySelectorAll(".bookLikeThisTitle");
                                        const bookLikeThisImg = document.querySelectorAll(".bookLikeThisImg");
                                        const bookLikeThisCode = document.querySelectorAll(".bookLikeThisCode");
                                        const pushToRight = document.querySelector(".pushToRight");
                                        const pushToLeft = document.querySelector(".pushToLeft");
                                        const bookLikeThis = document.querySelectorAll('.bookLikeThis');
                                        const bookName = document.querySelector(".bookName");
                                        const autorName = document.querySelector(".autorName");
                                        const backgroundBookImg = document.querySelector(".backgroundBookImg");
                                        const aboutBook = document.querySelector("#aboutBook");
                                        const aboutAuthor = document.querySelector("#aboutAuthor");
                                        const bookCode = document.querySelectorAll(".bookCode");
                                        const bookPannelCloseBtnSvg = document.querySelector("#bookPannelCloseBtnSvg");

                                        li.addEventListener("click", async () => {
                                            if (p2.innerHTML == "") {
                                                return false;
                                            }
                                            else {
                                                const response = await fetch("https://openlibrary.org" + p2.innerHTML + ".json");
                                                const data = await response.json();

                                                const responseRate = await fetch("https://openlibrary.org" + p2.innerHTML + "/ratings.json");
                                                const dataRate = await responseRate.json();

                                                console.log(dataRate, data);
                                                const bookRateStar2 = document.querySelectorAll(".bookRateStar2");

                                                if (dataRate.summary.average >= 4) {
                                                    bookRateStar2[4].style.opacity = "1";
                                                    bookRateStar2[3].style.opacity = "1";
                                                    bookRateStar2[2].style.opacity = "1";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate.summary.average < 4 && dataRate.summary.average >= 3) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "1";
                                                    bookRateStar2[2].style.opacity = "1";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate.summary.average < 3 && dataRate.summary.average >= 2) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "1";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate.summary.average < 2 && dataRate.summary.average >= 1) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "1";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate.summary.average < 1 && dataRate.summary.average > 0) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "0";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate.summary.average == null) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "0";
                                                    bookRateStar2[0].style.opacity = "1";
                                                }
                                                else if (dataRate.summary.average == 0) {
                                                    bookRateStar2[4].style.opacity = "0";
                                                    bookRateStar2[3].style.opacity = "0";
                                                    bookRateStar2[2].style.opacity = "0";
                                                    bookRateStar2[1].style.opacity = "0";
                                                    bookRateStar2[0].style.opacity = "0";
                                                }

                                                console.log(dataRate);

                                                bookPannel.style.opacity = "1"
                                                bookPannel.style.transform = "translate(0%,-15%)"
                                                navBar.style.backgroundColor = "transparent";
                                                navBar.style.boxShadow = "none"
                                                bookPannelCloseBtnSvg.style.fill = " rgb(41, 41, 51)";
                                                bookPannelCloseBtn.style.display = "block"
                                                bookPannelCloseBtn.style.opacity = "1";

                                                witchBookCode = p2.innerHTML;
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

                                                const comments = document.querySelector(".comments");

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
                                                            p3.addEventListener("click", async () => {
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


                                                bookName.innerHTML = p.innerHTML;
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
                                                bookPannelCloseBtn.style.opacity = "0"

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

                                            let pushCount = 0;
                                            // push other boook like this list to right 
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

                                            for (let i = 0; i < bookLikeThis.length; i++) {
                                                bookLikeThis[i].addEventListener("click", async () => {
                                                    if (bookLikeThisCode[i].innerHTML == "") {
                                                        return false;
                                                    }
                                                    else {
                                                        const response = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + ".json");
                                                        const data = await response.json();

                                                        const responseRate2 = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + "/ratings.json");
                                                        const dataRate2 = await responseRate2.json();

                                                        const comments2 = document.querySelectorAll(".comment");
                                                        for (let i = 0; i < comments2.length; i++) {
                                                            comments2[i].remove();
                                                        }

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

                                                        bookPannel.scrollTo(0, 0);

                                                        if (dataRate2.summary.average >= 4) {
                                                            bookRateStar2[4].style.opacity = "1";
                                                            bookRateStar2[3].style.opacity = "1";
                                                            bookRateStar2[2].style.opacity = "1";
                                                            bookRateStar2[1].style.opacity = "1";
                                                            bookRateStar2[0].style.opacity = "1";
                                                        }
                                                        else if (dataRate2.summary.average < 4 && dataRate2.summary.average >= 3) {
                                                            bookRateStar2[4].style.opacity = "0";
                                                            bookRateStar2[3].style.opacity = "1";
                                                            bookRateStar2[2].style.opacity = "1";
                                                            bookRateStar2[1].style.opacity = "1";
                                                            bookRateStar2[0].style.opacity = "1";
                                                        }
                                                        else if (dataRate2.summary.average < 3 && dataRate2.summary.average >= 2) {
                                                            bookRateStar2[4].style.opacity = "0";
                                                            bookRateStar2[3].style.opacity = "0";
                                                            bookRateStar2[2].style.opacity = "1";
                                                            bookRateStar2[1].style.opacity = "1";
                                                            bookRateStar2[0].style.opacity = "1";
                                                        }
                                                        else if (dataRate2.summary.average < 2 && dataRate2.summary.average >= 1) {
                                                            bookRateStar2[4].style.opacity = "0";
                                                            bookRateStar2[3].style.opacity = "0";
                                                            bookRateStar2[2].style.opacity = "0";
                                                            bookRateStar2[1].style.opacity = "1";
                                                            bookRateStar2[0].style.opacity = "1";
                                                        }
                                                        else if (dataRate2.summary.average < 1 && dataRate2.summary.average > 0) {
                                                            bookRateStar2[4].style.opacity = "0";
                                                            bookRateStar2[3].style.opacity = "0";
                                                            bookRateStar2[2].style.opacity = "0";
                                                            bookRateStar2[1].style.opacity = "0";
                                                            bookRateStar2[0].style.opacity = "1";
                                                        }
                                                        else if (dataRate2.summary.average == null) {
                                                            bookRateStar2[4].style.opacity = "0";
                                                            bookRateStar2[3].style.opacity = "0";
                                                            bookRateStar2[2].style.opacity = "0";
                                                            bookRateStar2[1].style.opacity = "0";
                                                            bookRateStar2[0].style.opacity = "0";
                                                        }
                                                        else if (dataRate2.summary.average == 0) {
                                                            bookRateStar2[4].style.opacity = "0";
                                                            bookRateStar2[3].style.opacity = "0";
                                                            bookRateStar2[2].style.opacity = "0";
                                                            bookRateStar2[1].style.opacity = "0";
                                                            bookRateStar2[0].style.opacity = "0";
                                                        }

                                                        console.log(dataRate2);

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

                                                        witchBookCode = bookLikeThisCode[i].innerHTML;
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
                                                        console.log(CommentResponesData + "her it is");

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
                                                                    p3.addEventListener("click", async () => {
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

                                                        bookName.style.opacity = 1;
                                                        autorName.style.opacity = 1;
                                                        pushCount = 0;
                                                        bookLikeThis[0].style.marginLeft = 0 + "px";
                                                        pushToLeft.style.display = "none";
                                                        pushToRight.style.opacity = 1;
                                                        pushToRight.style.display = "block";

                                                        const bookSubjectResponse = await fetch("https://openlibrary.org/search.json?q=" + data.title.toLowerCase());
                                                        const bookSubjectsData = await bookSubjectResponse.json();

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
                                        })
                                    }
                                }
                            })
                        }
                    }
                }
            }
        }
    }

});

//deleting the shelf 

const deleteShelfBtn = document.querySelector("#deleteShelfBtn");

deleteShelfBtn.addEventListener("click", async () => {
    const userName = localStorage.getItem("userTarget");
    const shelfName = shelfNameTitle.innerHTML;
    const shelfData3 = { userName, shelfName };

    shelfPnl.style.opacity = 0;
    shelfPnl.style.top = 150 + "%";
    const li2 = document.querySelectorAll(".li2");

    for (let i = 0; i < li2.length; i++) {
        li2[i].remove();
    }

    console.log(shelfData3);

    shelfNameTxtBox.value = "";
    
    messageBox.innerHTML = "Shelf deleted"
    messageBox.classList.add("messageBoxFadeInOut");
    setTimeout(() => {
        messageBox.classList.remove("messageBoxFadeInOut");
    }, 5000);

    document.body.scrollTo(0, 0);

    shelfEditBox.style.opacity = 0;
    shelfEditBox.style.marginTop = 400 + "px";
    shelfEditPnlCover.style.opacity = 0;
    setTimeout(() => {
        shelfEditPnlCover.style.display = "none";
        shelfEditBox.style.display = "none"
    }, 300)

    try {
        const shelfOptions3 = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shelfData3)
        };
        const deleteShelfName = await fetch("/shelfDelete", shelfOptions3);
        const deleteShelfNameData = await deleteShelfName.json();

    }
    catch {
        console.log("a bug from nowhere");
    }

    const shelfLiTemp = document.querySelectorAll(".shelfLi");
    console.log(shelfLiTemp.length);
    for (let j = 0; j < shelfLiTemp.length; j++) {
        shelfLiTemp[j].remove();
    }

    const shelfData = { userName }
    const shelfOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shelfData)
    };
    const shelvesResponse = await fetch("/shelvesData", shelfOptions);
    const shelvesResponseData = await shelvesResponse.json();
    if (shelvesResponseData.length > 3) {
        console.log("not bad");
        for (let i = 0; i < shelvesResponseData.length; i++) {
            console.log("not bad again");
            if (shelvesResponseData[i].Name != "reading" && shelvesResponseData[i].Name != "readed" && shelvesResponseData[i].Name != "want to read") {
                let li = document.createElement("li");
                let shelfTitle = document.createElement("p");
                let shelfTitleTxt = document.createTextNode(shelvesResponseData[i].Name)

                li.classList.add("shelfLi");
                shelfTitle.appendChild(shelfTitleTxt);
                addShelfBtn.style.width = 275 + "px";

                li.appendChild(shelfTitle);
                shelvesBox.appendChild(li);

                li.addEventListener("click", async () => {
                    shelfPnl.style.opacity = 1;
                    shelfPnl.style.top = 50 + "%";
                    navBar.style.backgroundColor = "transparent";
                    shelfNameTitle.innerHTML = shelfTitle.innerHTML;
                    searchPnlCloseBtn.style.display = "none";
                    console.log(shelvesResponseData[i].book);

                    const secondetList2 = document.querySelector(".secondetList2");

                    for (let j = 0; j < shelvesResponseData[i].book.length; j++) {

                        if (shelvesResponseData[i].book.length == 0) {

                            console.log("oooops");
                            return false;
                        }
                        else {
                            const anyShelfBook = await fetch("https://openlibrary.org" + shelvesResponseData[i].book[j] + ".json");
                            const anyShelfBookData = await anyShelfBook.json();
                            console.log(anyShelfBookData);

                            let li = document.createElement("li");
                            let p = document.createElement("p");
                            let p2 = document.createElement("p");
                            let img = document.createElement("img");

                            let titlePara = document.createTextNode(anyShelfBookData.title);
                            let codePara = document.createTextNode(anyShelfBookData.key)

                            p.appendChild(titlePara);
                            p.classList.add("bookTitle");
                            p2.appendChild(codePara);
                            p2.classList.add("bookCode");
                            img.classList.add("bookCover");
                            if (anyShelfBookData.covers[0] == null) {
                                img.src = "assets/images (1).jfif";
                            }
                            else {
                                img.src = "https://covers.openlibrary.org/b/id/" + anyShelfBookData.covers[0] + "-M.jpg";
                            }

                            li.style = "--i:" + j;
                            li.classList.add("li2");
                            li.appendChild(p);
                            li.appendChild(p2);
                            li.appendChild(img);
                            console.log(li);
                            secondetList2.appendChild(li);
                            const bookLikeThisTitle = document.querySelectorAll(".bookLikeThisTitle");
                            const bookLikeThisImg = document.querySelectorAll(".bookLikeThisImg");
                            const bookLikeThisCode = document.querySelectorAll(".bookLikeThisCode");
                            const pushToRight = document.querySelector(".pushToRight");
                            const pushToLeft = document.querySelector(".pushToLeft");
                            const bookLikeThis = document.querySelectorAll('.bookLikeThis');
                            const bookName = document.querySelector(".bookName");
                            const autorName = document.querySelector(".autorName");
                            const backgroundBookImg = document.querySelector(".backgroundBookImg");
                            const aboutBook = document.querySelector("#aboutBook");
                            const aboutAuthor = document.querySelector("#aboutAuthor");
                            const bookCode = document.querySelectorAll(".bookCode");
                            const bookPannelCloseBtnSvg = document.querySelector("#bookPannelCloseBtnSvg");

                            li.addEventListener("click", async () => {
                                if (p2.innerHTML == "") {
                                    return false;
                                }
                                else {
                                    const response = await fetch("https://openlibrary.org" + p2.innerHTML + ".json");
                                    const data = await response.json();

                                    const responseRate = await fetch("https://openlibrary.org" + p2.innerHTML + "/ratings.json");
                                    const dataRate = await responseRate.json();

                                    console.log(dataRate, data);
                                    const bookRateStar2 = document.querySelectorAll(".bookRateStar2");

                                    if (dataRate.summary.average >= 4) {
                                        bookRateStar2[4].style.opacity = "1";
                                        bookRateStar2[3].style.opacity = "1";
                                        bookRateStar2[2].style.opacity = "1";
                                        bookRateStar2[1].style.opacity = "1";
                                        bookRateStar2[0].style.opacity = "1";
                                    }
                                    else if (dataRate.summary.average < 4 && dataRate.summary.average >= 3) {
                                        bookRateStar2[4].style.opacity = "0";
                                        bookRateStar2[3].style.opacity = "1";
                                        bookRateStar2[2].style.opacity = "1";
                                        bookRateStar2[1].style.opacity = "1";
                                        bookRateStar2[0].style.opacity = "1";
                                    }
                                    else if (dataRate.summary.average < 3 && dataRate.summary.average >= 2) {
                                        bookRateStar2[4].style.opacity = "0";
                                        bookRateStar2[3].style.opacity = "0";
                                        bookRateStar2[2].style.opacity = "1";
                                        bookRateStar2[1].style.opacity = "1";
                                        bookRateStar2[0].style.opacity = "1";
                                    }
                                    else if (dataRate.summary.average < 2 && dataRate.summary.average >= 1) {
                                        bookRateStar2[4].style.opacity = "0";
                                        bookRateStar2[3].style.opacity = "0";
                                        bookRateStar2[2].style.opacity = "0";
                                        bookRateStar2[1].style.opacity = "1";
                                        bookRateStar2[0].style.opacity = "1";
                                    }
                                    else if (dataRate.summary.average < 1 && dataRate.summary.average > 0) {
                                        bookRateStar2[4].style.opacity = "0";
                                        bookRateStar2[3].style.opacity = "0";
                                        bookRateStar2[2].style.opacity = "0";
                                        bookRateStar2[1].style.opacity = "0";
                                        bookRateStar2[0].style.opacity = "1";
                                    }
                                    else if (dataRate.summary.average == null) {
                                        bookRateStar2[4].style.opacity = "0";
                                        bookRateStar2[3].style.opacity = "0";
                                        bookRateStar2[2].style.opacity = "0";
                                        bookRateStar2[1].style.opacity = "0";
                                        bookRateStar2[0].style.opacity = "1";
                                    }
                                    else if (dataRate.summary.average == 0) {
                                        bookRateStar2[4].style.opacity = "0";
                                        bookRateStar2[3].style.opacity = "0";
                                        bookRateStar2[2].style.opacity = "0";
                                        bookRateStar2[1].style.opacity = "0";
                                        bookRateStar2[0].style.opacity = "0";
                                    }

                                    console.log(dataRate);

                                    bookPannel.style.opacity = "1"
                                    bookPannel.style.transform = "translate(0%,-15%)"
                                    navBar.style.backgroundColor = "transparent";
                                    navBar.style.boxShadow = "none"
                                    bookPannelCloseBtnSvg.style.fill = " rgb(41, 41, 51)";
                                    bookPannelCloseBtn.style.display = "block"
                                    bookPannelCloseBtn.style.opacity = "1";

                                    witchBookCode = p2.innerHTML;
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

                                    const comments = document.querySelector(".comments");

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
                                                p3.addEventListener("click", async () => {
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


                                    bookName.innerHTML = p.innerHTML;
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
                                    bookPannelCloseBtn.style.opacity = "0"

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

                                let pushCount = 0;
                                // push other boook like this list to right 
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

                                for (let i = 0; i < bookLikeThis.length; i++) {
                                    bookLikeThis[i].addEventListener("click", async () => {
                                        if (bookLikeThisCode[i].innerHTML == "") {
                                            return false;
                                        }
                                        else {
                                            const response = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + ".json");
                                            const data = await response.json();

                                            const responseRate2 = await fetch("https://openlibrary.org" + bookLikeThisCode[i].innerHTML + "/ratings.json");
                                            const dataRate2 = await responseRate2.json();

                                            const comments2 = document.querySelectorAll(".comment");
                                            for (let i = 0; i < comments2.length; i++) {
                                                comments2[i].remove();
                                            }

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

                                            bookPannel.scrollTo(0, 0);

                                            if (dataRate2.summary.average >= 4) {
                                                bookRateStar2[4].style.opacity = "1";
                                                bookRateStar2[3].style.opacity = "1";
                                                bookRateStar2[2].style.opacity = "1";
                                                bookRateStar2[1].style.opacity = "1";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate2.summary.average < 4 && dataRate2.summary.average >= 3) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "1";
                                                bookRateStar2[2].style.opacity = "1";
                                                bookRateStar2[1].style.opacity = "1";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate2.summary.average < 3 && dataRate2.summary.average >= 2) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "1";
                                                bookRateStar2[1].style.opacity = "1";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate2.summary.average < 2 && dataRate2.summary.average >= 1) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "0";
                                                bookRateStar2[1].style.opacity = "1";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate2.summary.average < 1 && dataRate2.summary.average > 0) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "0";
                                                bookRateStar2[1].style.opacity = "0";
                                                bookRateStar2[0].style.opacity = "1";
                                            }
                                            else if (dataRate2.summary.average == null) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "0";
                                                bookRateStar2[1].style.opacity = "0";
                                                bookRateStar2[0].style.opacity = "0";
                                            }
                                            else if (dataRate2.summary.average == 0) {
                                                bookRateStar2[4].style.opacity = "0";
                                                bookRateStar2[3].style.opacity = "0";
                                                bookRateStar2[2].style.opacity = "0";
                                                bookRateStar2[1].style.opacity = "0";
                                                bookRateStar2[0].style.opacity = "0";
                                            }

                                            console.log(dataRate2);

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

                                            witchBookCode = bookLikeThisCode[i].innerHTML;
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
                                            console.log(CommentResponesData + "her it is");

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
                                                        p3.addEventListener("click", async () => {
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

                                            bookName.style.opacity = 1;
                                            autorName.style.opacity = 1;
                                            pushCount = 0;
                                            bookLikeThis[0].style.marginLeft = 0 + "px";
                                            pushToLeft.style.display = "none";
                                            pushToRight.style.opacity = 1;
                                            pushToRight.style.display = "block";

                                            const bookSubjectResponse = await fetch("https://openlibrary.org/search.json?q=" + data.title.toLowerCase());
                                            const bookSubjectsData = await bookSubjectResponse.json();

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
                            })
                        }
                    }
                })
            }
        }
    }

});