//sending user's data to server for sign up

const Uname = document.querySelector("#UnameTxtBox");
const email = document.querySelector("#emailTxtBox");
const password = document.querySelector("#passTxtBox");
const rePassword = document.querySelector("#rePassTxtBox");
const signUpconstBtn = document.querySelector("#signUpSendBtn")
const messageBox = document.querySelector("#messageBox");
const signStatus = false;
var witchBookCode;
var temp;
var challengEndingStatus = false;

signUpconstBtn.addEventListener('click', async () => {

    //checking that eny filed is not empty

    let userName = Uname.value;
    let emailAddress = email.value;
    let Password = password.value;
    let RePassword = rePassword.value

    if (userName == "" || emailAddress == "" || Password == "" || RePassword == "") {
        messageBox.innerHTML = "Please fill in all fields"
        messageBox.classList.add("messageBoxFadeInOut");
        setTimeout(() => {
            messageBox.classList.remove("messageBoxFadeInOut");
        }, 5000)
    }
    else {

        //checking that the email field is a currect format of email

        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

        if (email.value.match(emailPattern) && password.value == rePassword.value) {

            //sending data to server

            const data = { userName, emailAddress, Password }
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            const response = await fetch("/UsersData", options)
            const dataResponse = await response.json();
            console.log(dataResponse);

            if (dataResponse.status == "it's there") {
                messageBox.innerHTML = "This username or email is already signed up, please sign in"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
            }
            else {
                messageBox.innerHTML = "Now you're signed up"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
                window.location.assign("profile.html")
                localStorage.setItem("userTarget", userName)
                console.log("ok");
            }
        }
        else {
            messageBox.innerHTML = "something went wrong with your password or Email"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
        }
    }

})

rePassword.addEventListener("keydown", async (e) => {
    const keyName = e.key;
    if (keyName == "Enter") {
        //checking that eny filed is not empty

        let userName = Uname.value;
        let emailAddress = email.value;
        let Password = password.value;
        let RePassword = rePassword.value

        if (userName == "" || emailAddress == "" || Password == "" || RePassword == "") {
            messageBox.innerHTML = "Please fill in all fields"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
        }
        else {

            //checking that the email field is a currect format of email

            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

            if (email.value.match(emailPattern) && password.value == rePassword.value) {

                //sending data to server

                const data = { userName, emailAddress, Password }
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };

                const response = await fetch("/UsersData", options)
                const dataResponse = await response.json();
                console.log(dataResponse);

                if (dataResponse.status == "it's there") {
                    messageBox.innerHTML = "This username or email is already signed up, please sign in"
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
                }
                else {
                    messageBox.innerHTML = "Now you're signed up"
                    window.location.assign("profile.html")
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
                    signStatus = true;
                    localStorage.setItem("userTarget", userName)
                }
            }
            else {
                messageBox.innerHTML = "something went wrong with your password or Email"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
            }
        }
    }
})
Uname.addEventListener("keydown", async (e) => {
    const keyName = e.key;
    if (keyName == "Enter") {
        //checking that eny filed is not empty

        let userName = Uname.value;
        let emailAddress = email.value;
        let Password = password.value;
        let RePassword = rePassword.value

        if (userName == "" || emailAddress == "" || Password == "" || RePassword == "") {
            messageBox.innerHTML = "Please fill in all fields"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
        }
        else {

            //checking that the email field is a currect format of email

            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

            if (email.value.match(emailPattern) && password.value == rePassword.value) {

                //sending data to server

                const data = { userName, emailAddress, Password }
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };

                const response = await fetch("/UsersData", options)
                const dataResponse = await response.json();
                console.log(dataResponse);

                if (dataResponse.status == "it's there") {
                    messageBox.innerHTML = "This username or email is already signed up, please sign in"
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
                }
                else {
                    messageBox.innerHTML = "Now you're signed up"
                    window.location.assign("profile.html")
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
                    signStatus = true;
                    console.log(signStatus);
                    localStorage.setItem("userTarget", userName)
                }
            }
            else {
                messageBox.innerHTML = "something went wrong with your password or Email"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
            }
        }
    }
})


email.addEventListener("keydown", async (e) => {
    const keyName = e.key;
    if (keyName == "Enter") {
        //checking that eny filed is not empty

        let userName = Uname.value;
        let emailAddress = email.value;
        let Password = password.value;
        let RePassword = rePassword.value

        if (userName == "" || emailAddress == "" || Password == "" || RePassword == "") {
            messageBox.innerHTML = "Please fill in all fields"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
        }
        else {

            //checking that the email field is a currect format of email

            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

            if (email.value.match(emailPattern) && password.value == rePassword.value) {

                //sending data to server

                const data = { userName, emailAddress, Password }
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };

                const response = await fetch("/UsersData", options)
                const dataResponse = await response.json();
                console.log(dataResponse);

                if (dataResponse.status == "it's there") {
                    messageBox.innerHTML = "This username or email is already signed up, please sign in"
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
                }
                else {
                    messageBox.innerHTML = "Now you're signed up"
                    window.location.assign("profile.html")
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
                    signStatus = true;
                    console.log(signStatus);
                    localStorage.setItem("userTarget", userName)
                }
            }
            else {
                messageBox.innerHTML = "something went wrong with your password or Email"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
            }
        }
    }
})

password.addEventListener("keydown", async (e) => {
    const keyName = e.key;
    if (keyName == "Enter") {
        //checking that eny filed is not empty

        let userName = Uname.value;
        let emailAddress = email.value;
        let Password = password.value;
        let RePassword = rePassword.value

        if (userName == "" || emailAddress == "" || Password == "" || RePassword == "") {
            messageBox.innerHTML = "Please fill in all fields"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
        }
        else {

            //checking that the email field is a currect format of email

            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

            if (email.value.match(emailPattern) && password.value == rePassword.value) {

                //sending data to server

                const data = { userName, emailAddress, Password }
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };

                const response = await fetch("/UsersData", options)
                const dataResponse = await response.json();
                console.log(dataResponse);

                if (dataResponse.status == "it's there") {
                    messageBox.innerHTML = "This username or email is already signed up, please sign in"
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
                }
                else {
                    messageBox.innerHTML = "Now you're signed up"
                    window.location.assign("profile.html")
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
                    signStatus = true;
                    localStorage.setItem("userTarget", userName)
                }
            }
            else {
                messageBox.innerHTML = "something went wrong with your password or Email"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
            }
        }
    }
})

// remember me button event for create a cookie for user and save his data to browser

let signInChk = document.querySelector("#signInChk");
let checkBoxStyleStatus = false;

signInChk.addEventListener("click", () => {
    if (Uname.value == "" && email.value == "" && password.value == "" && rePassword.value == "") {
        messageBox.innerHTML = "Please fill in all fields"
        messageBox.classList.add("messageBoxFadeInOut");
        setTimeout(() => {
            messageBox.classList.remove("messageBoxFadeInOut");
        }, 5000)
    }
    else {
        if (checkBoxStyleStatus == true) {
            signInChk.style.opacity = 0.3;
            checkBoxStyleStatus = false;
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            localStorage.removeItem("rePassword");

        }
        else {
            signInChk.style.opacity = 1;
            checkBoxStyleStatus = true;
            localStorage.setItem("email", email.value);
            localStorage.setItem("username", Uname.value);
            localStorage.setItem("password", password.value);
            localStorage.setItem("rePassword", rePassword.value);
        }
    }
})

document.body.onload = async () => {
    let ckeckLocalStorage = localStorage.getItem("email");
    let ckeckLocalStorage2 = localStorage.getItem("username");
    let ckeckLocalStorage3 = localStorage.getItem("password");
    let ckeckLocalStorage4 = localStorage.getItem("rePassword");

    signInChk.style.opacity = 0.3;
    checkBoxStyleStatus = false;

    if (ckeckLocalStorage == "" && ckeckLocalStorage2 == "" && ckeckLocalStorage3 == "" && ckeckLocalStorage4 == "") {
        console.log("there is no data in localStorage");
    }
    else {
        email.value = ckeckLocalStorage;
        Uname.value = ckeckLocalStorage2;
        password.value = ckeckLocalStorage3;
        rePassword.value = ckeckLocalStorage4;
        signInChk.style.opacity = 0.3;
        checkBoxStyleStatus = false;
    }

    const profileIcon = document.querySelector("#profileIcon");
    const profileIconSvg = document.querySelector("#profileIconSvg");

    profileIcon.addEventListener("click", () => {
        window.location.assign("profile.html");
    })

    const userName = localStorage.getItem("userTarget");

    if (userName == null) {
        profIconPicture.style.display = "none";
        profileIconSvg.style.display = "block";
    }
    else {
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

        profIconPicture.style.display = "block";
        if (dataResponse.image == null) {
            profIconPicture.style.display = "none";
            profileIconSvg.style.display = "block";
        }
        else {
            profIconPicture.style.display = "block";
            profIconPicture.src = dataResponse.image;
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

        const shelvesResponse = await fetch("/shelvesData", shelfOptions);
        const shelvesResponseData = await shelvesResponse.json();
        console.log(shelvesResponseData);

        for (let i = 0; i < shelvesResponseData.length; i++) {

            let li = document.createElement("li");
            let shelfTitle = document.createElement("p");
            let shelfTitleTxt = document.createTextNode(shelvesResponseData[i].Name)
            let shelfImg = document.createElement("img");

            li.classList.add("shelfLi");
            shelfTitle.appendChild(shelfTitleTxt);
            shelfTitle.classList.add("shelfTitle");
            shelfImg.src = "assets/addShelfImg.png";
            shelfImg.classList.add("addShelfItemsImg");

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
                    console.log(temp);

                    const shelfName = shelfTitle.innerHTML;
                    const book = temp;
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
                    console.log(shelvesResponseData2);

                    if (shelfName == "read") {
                        const response = await fetch("/dataForProfile", options)
                        const dataResponse = await response.json();
                        console.log(dataResponse);

                        if (dataResponse.idealChallengNumber == null) {
                            return false;
                        }
                        else {
                            if (dataResponse.ChallengNumber == dataResponse.idealChallengNumber) {
                                challengPara.innerHTML = "Congratulations, you've read " + dataResponse.idealChallengNumber + " books this year :)";
                                bookCounter.style.display = "none";
                                challengBoxDoneBtn.style.display = "none";
                                challengBox.style.display = "block";
                                challengBoxBackgroundCover.style.display = "block";
                                challengEndingStatus = true;

                                setTimeout(() => {
                                    challengBoxBackgroundCover.style.opacity = 1;
                                    challengBox.style.opacity = 1
                                }, 300)

                                const challengDataCancel = { userName }
                                const challengCancelOption = {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(challengDataCancel)
                                };
                                const cancelChalleng = await fetch("/challengCanceler", challengCancelOption);
                                const cancelChallengData = await cancelChalleng.json();
                                console.log(cancelChallengData);
                                const currentData = new Date();
                            }
                            else {
                                const currentNumber = dataResponse.ChallengNumber;
                                const bookCounterNumber = currentNumber + 1;
                                const updateChalleng = { userName, bookCounterNumber }
                                const updateChallengOption = {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(updateChalleng)
                                };
                                const updateChallengData = await fetch("/updateChallengNumber", updateChallengOption);
                                const updateChallengResponse = await updateChallengData.json();
                                console.log(updateChallengResponse);
                            }
                        }
                    }

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
                        shelfBtnStatus = false;

                        const book = temp;
                        const shelfData2 = { userName, shelfName, book }
                        console.log(shelfData2);
                        const shelfOptions2 = {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(shelfData2)
                        };

                        const shelvesResponse2 = await fetch("/shelfAdd", shelfOptions2);
                        const shelvesResponseData2 = await shelvesResponse2.json();
                        console.log(shelvesResponseData2);

                        if (shelfName == "read") {
                            const response = await fetch("/dataForProfile", options)
                            const dataResponse = await response.json();
                            console.log(dataResponse);

                            if (dataResponse.idealChallengNumber == null) {
                                return false;
                            }
                            else {
                                if (dataResponse.ChallengNumber == dataResponse.idealChallengNumber) {
                                    challengPara.innerHTML = "Congratulations, you've read " + dataResponse.idealChallengNumber + " books this year :)";
                                    bookCounter.style.display = "none";
                                    challengBoxDoneBtn.style.display = "none";
                                    challengBox.style.display = "block";
                                    challengBoxBackgroundCover.style.display = "block";
                                    challengEndingStatus = true;

                                    setTimeout(() => {
                                        challengBoxBackgroundCover.style.opacity = 1;
                                        challengBox.style.opacity = 1
                                    }, 300)

                                    const challengDataCancel = { userName }
                                    const challengCancelOption = {
                                        method: "POST",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(challengDataCancel)
                                    };
                                    const cancelChalleng = await fetch("/challengCanceler", challengCancelOption);
                                    const cancelChallengData = await cancelChalleng.json();
                                    console.log(cancelChallengData);
                                    const currentData = new Date();
                                }
                                else {
                                    const currentNumber = dataResponse.ChallengNumber;
                                    const bookCounterNumber = currentNumber + 1;
                                    const updateChalleng = { userName, bookCounterNumber }
                                    const updateChallengOption = {
                                        method: "POST",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(updateChalleng)
                                    };
                                    const updateChallengData = await fetch("/updateChallengNumber", updateChallengOption);
                                    const updateChallengResponse = await updateChallengData.json();
                                    console.log(updateChallengResponse);
                                }
                            }
                        }
                    }
                    shelfBtnStatus = false;
                }
            })
        }
    }
}

//searching stuff

const searchPnl = document.querySelector(".searchPnl");
const searchPnlCloseBtn = document.querySelector("#searchPnlCloseBtn");
const bookSearchTxtBox = document.querySelector("#bookSearchTxtBox");
const secondetList = document.querySelector(".secondetList");
const bookPannelCloseBtn = document.querySelector('#bookPannelCloseBtn');
const bookPannel = document.querySelector(".bookPannel");
const bookImg = document.querySelector(".bookImg");

searchBoxBtn.addEventListener("click", async () => {

    if (bookSearchTxtBox.value == null || bookSearchTxtBox.value == "") {
        messageBox.classList.add("messageBoxFadeInOut");
        setTimeout(() => {
            messageBox.classList.remove("messageBoxFadeInOut");
        }, 5000);
    }
    else {

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
                    bookPannelCloseBtnSvg.style.fill = "#685d74";
                    bookPannelCloseBtn.style.display = "block"
                    bookPannelCloseBtn.style.opacity = "1";

                    witchBookCode = p2.innerHTML;
                    temp = p2.innerHTML;

                    console.log(witchBookCode);
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
                    temp = bookLikeThisCode[i].innerHTML;

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
                        bookPannelCloseBtnSvg.style.fill = "#685d74";
                        bookPannelCloseBtn.style.display = "block"
                        bookPannelCloseBtn.style.opacity = "1";

                        witchBookCode = p2.innerHTML;
                        temp = p2.innerHTML;

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
                        temp = bookLikeThisCode[i].innerHTML;

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

const otherAuthorWorkBtn = document.querySelector("#otherAuthorWorkBtn");

otherAuthorWorkBtn.addEventListener("click", async () => {
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

    const response = await fetch("https://openlibrary.org/search.json?q=" + autorName.innerHTML)
    const data = await response.json();

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
                bookPannelCloseBtnSvg.style.fill = "#685d74";
                bookPannelCloseBtn.style.display = "block"
                bookPannelCloseBtn.style.opacity = "1";

                witchBookCode = p2.innerHTML;
                temp = p2.innerHTML;

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
                temp = bookLikeThisCode[i].innerHTML;

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

const navBar = document.querySelector(".navBar");

searchPnl.onscroll = () => {

    if (searchPnl.scrollTop > 100) {
        navBar.style.backgroundColor = "#242131";
    }
    if (searchPnl.scrollTop < 100) {
        navBar.style.backgroundColor = "transparent";
    }
}
const backgroundBookImg = document.querySelector(".backgroundBookImg ");
const shelfItems = document.querySelector(".shelfItems");
let shelfBtnStatus = false;


addBookBtn.addEventListener("click", () => {
    if (document.body.clientWidth <= 1024 && document.body.clientWidth > 820) {
        if (shelfBtnStatus == false) {
            shelfItems.style.display = "block";
            setTimeout(() => {
                shelfItems.style.left = 490 + "px";
                shelfItems.style.top = 380 + "px";
                shelfItems.style.opacity = .97;

            }, 300);
            shelfBtnStatus = true;
        }
        else {
            shelfItems.style.left = 40 + "%";
            shelfItems.style.top = 10 + "px";
            shelfItems.style.opacity = 0;
            setTimeout(() => {
                shelfItems.style.display = "none";

            }, 300);

            shelfBtnStatus = true;
        }
    }
    if (document.body.clientWidth <= 820 && document.body.clientWidth > 768) {
        if (shelfBtnStatus == false) {
            shelfItems.style.display = "block";
            setTimeout(() => {
                shelfItems.style.left = 490 + "px";
                shelfItems.style.top = 320 + "px";
                shelfItems.style.opacity = .97;
            }, 300);
            shelfBtnStatus = true;
        }
        else {
            shelfItems.style.left = 40 + "%";
            shelfItems.style.top = 10 + "px";
            shelfItems.style.opacity = 0;
            setTimeout(() => {
                shelfItems.style.display = "none";

            }, 300);

            shelfBtnStatus = false;
        }
    }
    if (document.body.clientWidth <= 768 && document.body.clientWidth > 430) {
        if (shelfBtnStatus == false) {
            shelfItems.style.display = "block";
            setTimeout(() => {
                shelfItems.style.left = 490 + "px";
                shelfItems.style.top = 320 + "px";
                shelfItems.style.opacity = .97;
            }, 300);
            shelfBtnStatus = true;
        }
        else {
            shelfItems.style.left = 40 + "%";
            shelfItems.style.top = 10 + "px";
            shelfItems.style.opacity = 0;
            setTimeout(() => {
                shelfItems.style.display = "none";

            }, 300);

            shelfBtnStatus = false;
        }
    }
    if (document.body.clientWidth <= 430 && document.body.clientWidth > 414) {
        if (shelfBtnStatus == false) {
            shelfItems.style.display = "block";
            setTimeout(() => {
                shelfItems.style.left = 490 + "px";
                shelfItems.style.top = 320 + "px";
                shelfItems.style.opacity = .97;
            }, 300);
            shelfBtnStatus = true;
        }
        else {
            shelfItems.style.left = 40 + "%";
            shelfItems.style.top = 10 + "px";
            shelfItems.style.opacity = 0;
            setTimeout(() => {
                shelfItems.style.display = "none";

            }, 300);

            shelfBtnStatus = false;
        }
    }
    if (document.body.clientWidth <= 414 && document.body.clientWidth > 390) {
        if (shelfBtnStatus == false) {
            shelfItems.style.display = "block";
            setTimeout(() => {
                shelfItems.style.left = 490 + "px";
                shelfItems.style.top = 320 + "px";
                shelfItems.style.opacity = .97;
            }, 300);
            shelfBtnStatus = true;
        }
        else {
            shelfItems.style.left = 40 + "%";
            shelfItems.style.top = 10 + "px";
            shelfItems.style.opacity = 0;
            setTimeout(() => {
                shelfItems.style.display = "none";

            }, 300);

            shelfBtnStatus = false;
        }
    }
    if (document.body.clientWidth <= 390) {
        if (shelfBtnStatus == false) {
            shelfItems.style.display = "block";
            setTimeout(() => {
                shelfItems.style.left = 490 + "px";
                shelfItems.style.top = 320 + "px";
                shelfItems.style.opacity = .97;
            }, 300);
            shelfBtnStatus = true;
        }
        else {
            shelfItems.style.left = 40 + "%";
            shelfItems.style.top = 10 + "px";
            shelfItems.style.opacity = 0;
            setTimeout(() => {
                shelfItems.style.display = "none";

            }, 300);

            shelfBtnStatus = false;
        }
    }
    else {
        addBookBtn.addEventListener("click", () => {
            if (shelfBtnStatus == false) {
                shelfItems.style.display = "block";
                setTimeout(() => {
                    shelfItems.style.left = 490 + "px";
                    shelfItems.style.top = 380 + "px";
                    shelfItems.style.opacity = .97;
                }, 300);
                shelfBtnStatus = true;
            }
            else {
                shelfItems.style.left = 40 + "%";
                shelfItems.style.top = 10 + "px";
                shelfItems.style.opacity = 0;
                setTimeout(() => {
                    shelfItems.style.display = "none";

                }, 300);

                shelfBtnStatus = false;
            }
        });
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

//challengBoxStuff

const witchYear = document.querySelector("#witchYear");
const bookCounter = document.querySelector("#bookCounter");
const challengPara = document.querySelector("#challengPara");
const challengBoxDoneBtn = document.querySelector("#challengBoxDoneBtn");

const challengBoxBackgroundCover = document.querySelector(".challengBoxBackgroundCover");
const challengBox = document.querySelector(".challengBox");
const challengBoxCloseBtn = document.querySelector("#challengBoxCloseBtn");
const challengBoxLink = document.querySelector(".challengBoxLink");

challengBoxLink.addEventListener("click", async () => {
    list.style.opacity = 0;
    setTimeout(() => {
        list.style.display = "none";
    }, 400); 
    menuTempBox.style.left = 161 + "%";
    helpMenuStatus = false;
    const challengBoxDoneBtn = document.querySelector("#challengBoxDoneBtn")
    const messageBox3 = document.querySelector("#messageText3");
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
    console.log(dataResponse)
    if (dataResponse.idealChallengNumber != null) {
        challengPara.innerHTML = "You've read " + dataResponse.ChallengNumber + " book out of " + dataResponse.idealChallengNumber;
        bookCounter.style.display = "none";
        challengBoxDoneBtn.innerHTML = "Cancel";
        challengBox.style.display = "block";
        challengBoxBackgroundCover.style.display = "block";
        setTimeout(() => {
            challengBoxBackgroundCover.style.opacity = 1;
            challengBox.style.opacity = 1
        }, 300)
        challengBoxDoneBtn.addEventListener("click", async () => {

            messageBox3.innerHTML = "challeng canceled";
            messageBox3.classList.add("msgBoxfadeUpDown3");
            setTimeout(() => {
                messageBox3.classList.remove("msgBoxfadeUpDown3");
            }, 3000);

            setTimeout(() => {
                challengBox.style.opacity = 0;
                challengBoxBackgroundCover.style.opacity = 0;
                location.reload();
                setTimeout(() => {
                    challengBoxBackgroundCover.style.display = "none";
                    challengBox.style.display = "none"
                }, 300);
            }, 3000);

            const challengDataCancel = { userName }
            const challengCancelOption = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(challengDataCancel)
            };
            const cancelChalleng = await fetch("/challengCanceler", challengCancelOption);
            const cancelChallengData = await cancelChalleng.json();

        });
    }
    else {
        challengBox.style.display = "block";
        challengBoxBackgroundCover.style.display = "block";
        setTimeout(() => {
            challengBoxBackgroundCover.style.opacity = 1;
            challengBox.style.opacity = 1
        }, 300)

        const currentData = new Date();

        if (challengEndingStatus == true) {
            challengPara.innerHTML = "How many books do you want to read in " + currentData.getFullYear() + " ?";
            bookCounter.style.display = "block";
            challengBoxDoneBtn.innerHTML = "Done";
            challengBoxDoneBtn.style.display = "block";
        }
        else {
            witchYear.innerHTML = currentData.getFullYear();
        }
        challengBoxDoneBtn.addEventListener("click", async () => {
            const currentData = new Date()

            if (bookCounter.value == null || bookCounter.value == "") {
                messageBox3.innerHTML = "please insert the number";
                messageBox3.classList.add("msgBoxfadeUpDown3");
                setTimeout(() => {
                    messageBox3.classList.remove("msgBoxfadeUpDown3");
                }, 5000);
                console.log(currentData.getFullYear());
            }
            else {
                let numbers = /^[0-9]+$/;

                if (!bookCounter.value.match(numbers)) {
                    messageBox3.innerHTML = "please insert number, not words";
                    messageBox3.classList.add("msgBoxfadeUpDown3");
                    setTimeout(() => {
                        messageBox3.classList.remove("msgBoxfadeUpDown3");
                    }, 5000);
                }
                else {

                    const idealChallengNumber = bookCounter.value;
                    const userName = localStorage.getItem("userTarget");

                    messageBox3.innerHTML = "Your challeng started!";
                    messageBox3.classList.add("msgBoxfadeUpDown3");
                    setTimeout(() => {
                        messageBox3.classList.remove("msgBoxfadeUpDown3");
                    }, 3000);

                    setTimeout(() => {
                        challengBox.style.opacity = 0;
                        challengBoxBackgroundCover.style.opacity = 0;
                        setTimeout(() => {
                            challengBoxBackgroundCover.style.display = "none";
                            challengBox.style.display = "none"
                        }, 300);
                    }, 3000);

                    const challengData = { idealChallengNumber, userName }
                    bookCounter.value = "";
                    const challengDataOption = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(challengData)
                    };
                    const createChalleng = await fetch("/addChalleng", challengDataOption);
                    const createChallengData = await createChalleng.json();
                }
            }
        });
    }
})

challengBoxBackgroundCover.addEventListener("click", () => {
    challengBox.style.opacity = 0;
    challengBoxBackgroundCover.style.opacity = 0;
    bookCounter.value = "";
    setTimeout(() => {
        challengBoxBackgroundCover.style.display = "none";
        challengBox.style.display = "none"
    }, 300)
})
challengBoxCloseBtn.addEventListener("click", () => {
    challengBox.style.opacity = 0;
    challengBoxBackgroundCover.style.opacity = 0;
    setTimeout(() => {
        challengBoxBackgroundCover.style.display = "none";
        challengBox.style.display = "none"
    }, 300);
    bookCounter.value = "";
})

const messageBox3 = document.querySelector("#messageText3");

const helpMenu = document.querySelector(".helpMenu");
const menuTempBox = document.querySelector(".menuTempBox");
const list = document.querySelector(".list");
let helpMenuStatus = false;

helpMenu.addEventListener("click",() => {
    if (!helpMenuStatus) {
        list.style.display = "block";
        menuTempBox.style.left = 61 + "%";
        setTimeout(() => {
            list.style.opacity = 1;
        }, 100); 
        helpMenuStatus = true;   
    }
    else{
        list.style.opacity = 0;
        setTimeout(() => {
            list.style.display = "none";
        }, 400); 
        menuTempBox.style.left = 161 + "%";
        helpMenuStatus = false;
    }
    
})