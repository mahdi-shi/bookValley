//sending user's data to server for sign up

const Uname = document.querySelector("#UnameTxtBox");
const email = document.querySelector("#emailTxtBox");
const password = document.querySelector("#passTxtBox");
const rePassword = document.querySelector("#rePassTxtBox");
const signUpconstBtn = document.querySelector("#signUpSendBtn")
const messageBox = document.querySelector("#messageBox");

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

rePassword.addEventListener("keydown",async (e) => {
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
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
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
Uname.addEventListener("keydown",async (e) => {
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
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
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


email.addEventListener("keydown",async (e) => {
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
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
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

password.addEventListener("keydown",async (e) => {
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
                    messageBox.classList.add("messageBoxFadeInOut");
                    setTimeout(() => {
                        messageBox.classList.remove("messageBoxFadeInOut");
                    }, 5000)
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
    else{
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

document.body.onload = () => {
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
}