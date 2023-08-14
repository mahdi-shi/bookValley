//inserting image from user's files to the page

const profImageInputbox = document.querySelector("#profImageInputbox");
const imageProf = document.querySelector("#imgProf");
const imageProfDirty = document.querySelector("#imgProfDirty");
const profIconPicture = document.querySelector("#profIconPicture")

profImageInputbox.addEventListener("change",() =>{
    imageProf.style.display = "block";
    imageProf.src = URL.createObjectURL(profImageInputbox.files[0]);
    imageProfDirty.style.display = "block";
    profIconPicture.src = URL.createObjectURL(profImageInputbox.files[0]);
    profIconPicture.style.display = "block";
})

//styling a paper in page 

const bookChallengeTxt = document.querySelector("#bookChallengeTxt");
const backgroundPic4 = document.querySelector(".backgroundPic4");

bookChallengeTxt.addEventListener("mousemove",() => {
    backgroundPic4.style.filter = "brightness("+80+"%)"
})
bookChallengeTxt.addEventListener("mouseout",() => {
    backgroundPic4.style.filter = "brightness("+90+"%)"
})
backgroundPic4.addEventListener("mousemove",() => {
    backgroundPic4.style.filter = "brightness("+80+"%)"
})
backgroundPic4.addEventListener("mouseout",() => {
    backgroundPic4.style.filter = "brightness("+90+"%)"
})

//click event for gramophone for sing

const gramophone = document.querySelector(".backgroundPic2");
const gramophoneAudio = document.querySelector("#gramophoneAudio");
let gramophoneStatus = false;

gramophone.addEventListener("click",() => {
    if(gramophoneStatus == false){
        gramophoneAudio.play();
        gramophoneStatus = true
    }
    else{
        gramophoneAudio.pause();
        gramophoneStatus = false;
    }
})

// reload event for checking user have an account or not , if yes so ....

document.body.onload = () => {
    are();
}