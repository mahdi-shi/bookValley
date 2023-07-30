// checkBox style

let signInChk = document.querySelector("#signInChk");
let checkBoxStyleStatus = false;

signInChk.addEventListener("click",() => {
    if(checkBoxStyleStatus == true){
        signInChk.style.opacity = 0.3;
        checkBoxStyleStatus = false;
    }
    else{
        signInChk.style.opacity = 1;
        checkBoxStyleStatus = true;
    }
})
