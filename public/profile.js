//inserting image from user's files to the page

const profImageInputbox = document.querySelector("#profImageInputbox");
const imageProf = document.querySelector("#imgProf");
const imageProfDirty = document.querySelector("#imgProfDirty");
const profIconPicture = document.querySelector("#profIconPicture")
const profilePictureSvg = document.querySelector("#profilePictureSvg");
const profileIconSvg = document.querySelector("#profileIconSvg");
const navBar = document.querySelector(".navBar");

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

const searchPnl = document.querySelector(".searchPnl");
const searchPnlCloseBtn = document.querySelector("#searchPnlCloseBtn");
const bookSearchTxtBox = document.querySelector("#bookSearchTxtBox");
const secondetList = document.querySelector(".secondetList");

searchBoxBtn.addEventListener("click", async () => {

    if (bookSearchTxtBox.value == "") {
        messageText.innerHTML == "please Fill in the field"
        messageText.classList.add("msgBoxfadeUpDown");
        setTimeout(() => {
            messageText.classList.remove("msgBoxfadeUpDown");
        }, 5500)
    }
    else {
        searchPnl.style.marginTop = "-18vh";
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
            messageText.innerHTML == "please Fill in the field"
            messageText.classList.add("msgBoxfadeUpDown");
            setTimeout(() => {
                messageText.classList.remove("msgBoxfadeUpDown");
            }, 5500)
        }
        else {
            searchPnl.style.marginTop = "-18vh";
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