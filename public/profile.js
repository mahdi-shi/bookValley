//inserting image from user's files to the page

const profImageInputbox = document.querySelector("#profImageInputbox");
const imageProf = document.querySelector("#imgProf");
const imageProfDirty = document.querySelector("#imgProfDirty");
const profIconPicture = document.querySelector("#profIconPicture")

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
        //usernameTxt.textContent = "User-name : " +
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
            return false;
        }
        else {
            imageProf.style.display = "block";
            imageProfDirty.style.display = "block";
            profIconPicture.style.display = "block";
            imageProf.src = dataResponse.image;
            profIconPicture.src = dataResponse.image;
        }
    }
}

document.querySelector("#profEditBtn").addEventListener("click", async () => {
})