// checkBox style

let signInChk = document.querySelector("#signInChk");
let checkBoxStyleStatus = false;

signInChk.addEventListener("click", () => {
    if (checkBoxStyleStatus == true) {
        signInChk.style.opacity = 0.3;
        checkBoxStyleStatus = false;
    }
    else {
        signInChk.style.opacity = 1;
        checkBoxStyleStatus = true;
    }
})

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