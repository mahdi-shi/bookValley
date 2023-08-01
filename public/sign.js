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

//sending user's data to server for sign up

const Uname = document.querySelector("#UnameTxtBox");
const email = document.querySelector("#emailTxtBox");
const password = document.querySelector("#passTxtBox");
const rePassword = document.querySelector("#rePassTxtBox");
const signUpconstBtn = document.querySelector("#signUpSendBtn")
const messageBox = document.querySelector("#messageBox");

signUpconstBtn.addEventListener('click',async () => {

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
            messageBox.innerHTML = "Your signed up"
            messageBox.classList.add("messageBoxFadeInOut");
            setTimeout(() => {
                messageBox.classList.remove("messageBoxFadeInOut");
            }, 5000)

            //sending data to server

            const data = {userName,emailAddress,Password}
            const options = {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data) 
            };

            const response = await fetch("/UsersData",options)
            const dataResponse = await response.json();
            console.log("dataResponse");
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