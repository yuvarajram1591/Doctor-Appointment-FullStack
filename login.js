///////////////////////////////////////////////
// TOGGLE LOGIN PAGE AND SIGNUP (REGISTER) PAGE

let successPopup = document.querySelector(".success-popup");
let loginForm = document.querySelector(".login-form");
let registerForm = document.querySelector(".register-form");
let loginPageLink = document.querySelector("#login-page-link");
let registerpageLInk = document.querySelector("#register-page-link");
// let getUsersData = JSON.parse(localStorage.getItem("userdata"));

registerpageLInk.addEventListener("click", () => {
  loginForm.classList.toggle("hidden");
  registerForm.classList.toggle("hidden");
});
loginPageLink.addEventListener("click", () => {
  loginForm.classList.toggle("hidden");
  registerForm.classList.toggle("hidden");
});


///////////////////////////////////////
// LOGIN TO CHECK USERNAME AND PASSWORD

let loginFormData = document.getElementById("login-form-data");
loginFormData.addEventListener("submit", doLogin);

// let usersDataArr = [];

function doLogin(event) {
  event.preventDefault();
  let email = document.querySelector("#useremail").value;
  let password = document.querySelector("#userpassword").value;
  let url = `http://localhost:8080/accounts/login?password=${password}&email=${email}`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.code == 200) {
        window.location.href = "homepage.html";
        sessionStorage.setItem("data", JSON.stringify(data));
      }
      else {
        showErrorPopup("show", data.message);
      }
    });
}

///////////////////////////////////////////////////////////////////
// SHOW ERROR POPUP (INAVALID USER , INCORRECT USERNAME OR PASSWORD);

function showErrorPopup(show, message) {
  let errorMsg = document.querySelector(".error-msg-text");
  if (show) {
    errorMsg.innerHTML = message;
  }
  else {
    errorMsg.innerHTML = message;
  }
  let errorMsgPopup = document.querySelector(".error-popup");
  errorMsgPopup.classList.toggle("hidden");
  let errorMsgCloseBtn = document.querySelector(".error-msg-close");
  errorMsgCloseBtn.addEventListener("click", () => {
    errorMsgPopup.classList.add("hidden");
  });
}

///////////////////////////////////////////////////////////////////
// SUBMIT REGISTER (SIGNUP) FORM AND GET FORM DATA 

var form = document.getElementById("register-form-data");
form.addEventListener("submit", doSubmitRegisterFrom);

function doSubmitRegisterFrom(event) {
  event.preventDefault();
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let useremail = document.getElementById("uemail").value;
  let usernumber = document.getElementById("usernumber").value;
  let userpassword = document.getElementById("userpwd").value;
  let url = `http://localhost:8080/accounts/signup?first=${firstname}&last=${lastname}&email=${useremail}&password=${userpassword}&phone=${usernumber}`;
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.message == data.message) {
        // successPopup.classList.toggle("hidden");
        window.location.href="index.html";
      }
    });
  }
  
 ////////////////////////////////////////////////////
// // SUCCESFULLY SIGNUP(REGISTER) TO SHOW SUCCESS POPUP

// let successBtnLink = document.querySelector(".success-btn");
// let successPopuupCloseBtn = document.querySelector(".success-popup-closebtn");
// successBtnLink.addEventListener("click", () => {
//   successPopup.classList.toggle("hidden");
// });
// successPopuupCloseBtn.addEventListener("click", () => {
//   successPopup.classList.add("hidden");
// });

////////////////////////////
// SHOW AND HIDE PASSWORD

function showPassword(id) {
  var pwdInput = document.getElementById(`${id}`);
  if (pwdInput.type === "password") {
    pwdInput.type = "text";
  } else {
    pwdInput.type = "password";
  }
}
