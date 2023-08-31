//sending user's data to server for sign in

const singInUnameEmail = document.querySelector("#signInUserNameOrEmailTxtBox");
const signInpassword = document.querySelector("#signInPasswordTxtBox");
const signUpconstBtn = document.querySelector("#signInSendBtn")
const messageBox = document.querySelector("#messageBox");

signUpconstBtn.addEventListener('click', async () => {

    //checking that eny filed is not empty

    let userName = singInUnameEmail.value;
    let Password = signInpassword.value;

    if (userName == "" || Password == "") {
        messageBox.innerHTML = "Please fill in all fields"
        messageBox.classList.add("messageBoxFadeInOut");
        setTimeout(() => {
            messageBox.classList.remove("messageBoxFadeInOut");
        }, 5000)
    }
    else {

        //sending data to server for checking it

        const data = { userName, Password }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch("/signInUsersData", options)
        const dataResponse = await response.json();
        console.log(dataResponse);

        if (dataResponse.status == "it's there and password is correct") {
            messageBox.innerHTML = "Now you're signed in"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
            window.location.assign("profile.html")
            localStorage.setItem("userTarget", userName);
        }
        else if (dataResponse.status == "it's there but password is incorrect") {
            messageBox.innerHTML = "The password is incorrect"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
        }
        else {
            messageBox.innerHTML = "There is no account with this username, please sign up"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
        }
    }
})

singInUnameEmail.addEventListener('keydown', async (e) => {

    const keyName = e.key;
    if (keyName == "Enter") {
        //checking that eny filed is not empty

        let userName = singInUnameEmail.value;
        let Password = signInpassword.value;

        if (userName == "" || Password == "") {
            messageBox.innerHTML = "Please fill in all fields"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
        }
        else {

            //sending data to server for checking it

            const data = { userName, Password }
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            const response = await fetch("/signInUsersData", options)
            const dataResponse = await response.json();
            console.log(dataResponse);

            if (dataResponse.status == "it's there and password is correct") {
                messageBox.innerHTML = "Now you're signed in"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
                window.location.assign("profile.html")
                localStorage.setItem("userTarget", userName);
            }
            else if (dataResponse.status == "it's there but password is incorrect") {
                messageBox.innerHTML = "The password is incorrect"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
            }
            else {
                messageBox.innerHTML = "There is no account with this username, please sign up"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
            }
        }
    }
})
signInpassword.addEventListener('keydown', async (e) => {

    const keyName = e.key;
    if (keyName == "Enter") {
        //checking that eny filed is not empty

        let userName = singInUnameEmail.value;
        let Password = signInpassword.value;

        if (userName == "" || Password == "") {
            messageBox.innerHTML = "Please fill in all fields"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)
        }
        else {

            //sending data to server for checking it

            const data = { userName, Password }
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            const response = await fetch("/signInUsersData", options)
            const dataResponse = await response.json();
            console.log(dataResponse);

            if (dataResponse.status == "it's there and password is correct") {
                messageBox.innerHTML = "Now you're signed in"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
                window.location.assign("profile.html");
                localStorage.setItem("userTarget", userName);
            }
            else if (dataResponse.status == "it's there but password is incorrect") {
                messageBox.innerHTML = "The password is incorrect"
                messageBox.classList.add("messageBoxFadeInOut");
                setTimeout(() => {
                    messageBox.classList.remove("messageBoxFadeInOut");
                }, 5000)
            }
            else {
                messageBox.innerHTML = "There is no account with this username, please sign up"
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
    if (signInpassword.value == "" && singInUnameEmail.value == "") {
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
            localStorage.removeItem("username");
            localStorage.removeItem("password");

        }
        else {
            signInChk.style.opacity = 1;
            checkBoxStyleStatus = true;
            localStorage.setItem("username", singInUnameEmail.value);
            localStorage.setItem("password", signInpassword.value);
        }
    }
})

document.body.onload = async () => {
    let ckeckLocalStorage = localStorage.getItem("username");
    let ckeckLocalStorage2 = localStorage.getItem("password");

    if (ckeckLocalStorage == null && ckeckLocalStorage2 == null || ckeckLocalStorage == "" && ckeckLocalStorage2 == "") {
        console.log("there is no cookie");
    }
    else {
        singInUnameEmail.value = localStorage.getItem("username");
        signInpassword.value = localStorage.getItem("password");
    }

    const profileIcon = document.querySelector("#profileIcon");
    const profileIconSvg = document.querySelector("#profileIconSvg");

    profileIcon.addEventListener("click", () => {
        window.location.assign("profile.html");
    })

    const userName = localStorage.getItem("userTarget");

    if (userName == null) {
        profIconPicture.style.display = "none";
        profileIconSvg.style.display = "block";    }
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
    }
}