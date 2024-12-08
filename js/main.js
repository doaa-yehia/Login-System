"use strict"
let userNameInput=document.querySelector("#userName");
let userEmailInput=document.querySelector("#userEmail");
let userPasswordInput=document.querySelector("#userPassword");
let singUpRes=document.querySelector(".singUpRes")
let singUpBtn=document.querySelector(".supBtn");
let logInBtn=document.querySelector(".logInBtn");
let singInAn=document.querySelector(".singIn");
let singUpAn=document.querySelector(".singUp");

let userAcounts=[];
let specialAccount;

if (JSON.parse(localStorage.getItem("allUserAccounts") !== null)) {
    userAcounts = JSON.parse(localStorage.getItem("allUserAccounts"));
}



userNameInput.addEventListener("input", function (e) {
    const input=e.target;
    singUpRes.classList.replace("d-block","d-none");
    validForm(input);

   
 });

userEmailInput.addEventListener("input", function (e) {
   const input=e.target;
   singUpRes.classList.replace("d-block","d-none");
   validForm(input);
  
});

userPasswordInput.addEventListener("input", function (e) {
    const input=e.target;
    singUpRes.classList.replace("d-block","d-none");
    validForm(input);
   
 });

 
 singUpBtn.addEventListener("click", singUp );
 
 function singUp(){
    if(validForm(userNameInput)&&validForm(userEmailInput)&&validForm(userPasswordInput)){
        let account={
            name:userNameInput.value,
            email:userEmailInput.value,
            password:userPasswordInput.value,
        }
        if(!isFound(account)){
            userAcounts.push(account);
            localStorage.setItem("allUserAccounts", JSON.stringify(userAcounts));

            singUpRes.classList.replace("d-none","d-block");
            singUpRes.classList.add("text-success");
            singUpRes.classList.remove("text-danger");
            singUpRes.innerHTML="Success"
            clearform();
        }else{
            singUpRes.classList.replace("d-none","d-block");
            singUpRes.classList.add("text-danger");
            singUpRes.classList.remove("text-success");
            singUpRes.innerHTML="Email Already Exists";
        }
    }else{
        singUpRes.classList.replace("d-none","d-block");
        singUpRes.classList.add("text-danger");
        singUpRes.classList.remove("text-success");
        singUpRes.innerHTML="All inputs is required";
        userNameInput.nextElementSibling.classList.replace("d-block","d-none");
        userEmailInput.nextElementSibling.classList.replace("d-block","d-none");
        userPasswordInput.nextElementSibling.classList.replace("d-block","d-none");

    }
 }

 function clearform() {
    userNameInput.value="";
    userEmailInput.value="";
    userPasswordInput.value="";
 }

 singUpAn.addEventListener("click",singUpAnchor);
 
 function singUpAnchor(){
    userNameInput.classList.remove("d-none");
    userNameInput.classList.add("d-block");

    logInBtn.classList.add("d-none");
    logInBtn.classList.remove("d-block");
    
    singUpAn.classList.remove("d-inline");
    singUpAn.classList.add("d-none");

    singUpBtn.classList.add("d-block");
    singUpBtn.classList.remove("d-none");

    singInAn.classList.add("d-inline");
    singInAn.classList.remove("d-none");

    userNameInput.value="";
    userPasswordInput.value="";
    document.querySelector("#message").innerHTML=`You have an account?`;

}

singInAn.addEventListener("click",singInAnchor);


 function singInAnchor() {

    userNameInput.classList.add("d-none");
    userNameInput.classList.remove("d-block");

    userNameInput.nextElementSibling.classList.replace("d-block","d-none");
    singUpRes.classList.replace("d-block","d-none");


    singInAn.classList.add("d-none");
    singInAn.classList.remove("d-inline");

    singUpAn.classList.add("d-inline");
    singUpAn.classList.remove("d-none");


    singUpBtn.classList.add("d-none");
    singUpBtn.classList.remove("d-block");


    logInBtn.classList.add("d-block");
    logInBtn.classList.remove("d-none");
    document.querySelector("#message").innerHTML=`Don’t have an account?`;

   
}

logInBtn.addEventListener("click", function(e){
    // e.preventDefault();
    logIn();
} );

function logIn() {

    console.log("click");
    
    let accountIn={
        email:userEmailInput.value,
        password:userPasswordInput.value,
    }
    if(isExist(accountIn)){
        singUpRes.classList.replace("d-block","d-none");
        logInBtn.setAttribute("href", "./about.html");
        passName();
        
    }else{
        singUpRes.classList.replace("d-none","d-block");
        singUpRes.classList.add("text-danger");
        singUpRes.classList.remove("text-success");
        singUpRes.innerHTML="Incorrect Email or Password";
    }

} 
function passName() {
    let firstName=specialAccount;
    localStorage.setItem("uFirstName",firstName);
    return false;
}

 function isFound(item) {
    let found;
    for (let i = 0; i < userAcounts.length; i++) {
        if(userAcounts[i].email.toLowerCase()== item.email.toLowerCase()){
            found=true;
        }else{
            found=false;
        }
        if(found){
            break;
        }
    }
    return found;
 }

 function isExist(account) {
    let exist;
    for (let i = 0; i < userAcounts.length; i++) {
        if(userAcounts[i].email.toLowerCase()== account.email.toLowerCase()
            && userAcounts[i].password.toLowerCase()== account.password.toLowerCase()
        ){
            exist=true;
            specialAccount=userAcounts[i].name;
            break;
        }else{
            exist=false;
        }
        
    }
    return exist;
 }

function validForm(input){
        let regex={
            userName:/^[A-Z][a-z0-9_-]{2,15}$/,
            userEmail:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            userPassword:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        }
        let isValid=regex[input.id].test(input.value);

        if(isValid){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            input.nextElementSibling.classList.replace("d-block","d-none");

        } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            input.nextElementSibling.classList.replace("d-none","d-block");
        }   
        return isValid;
}
