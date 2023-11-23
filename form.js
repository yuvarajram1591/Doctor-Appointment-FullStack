//Show Appoinment form

function showAppoinmentForm() {
  document.querySelector(".form-section").style.display = "block";
}

//close Appoinment form

function formClose() {
  document.querySelector(".form-section").style.display = "none";

  resetFormValues();
}
// get userSignup data
function getUserSignUpData() {
  let loginUserData = JSON.parse(localStorage.getItem("currentUserLoginData"));
  let userSignupData = [loginUserData];
  let userFirstName = document.getElementById("userfirstname");
  let userLastName = document.getElementById("userlastname");
  let useremail = document.getElementById("useremail");
  let usernumber = document.getElementById("usernumber");
  console.log(userSignupData);

  if (userSignupData) {
    userSignupData.forEach((data) => {
      if (data.username.includes(" ")) {
        let [first, last] = data.username.split(" ");

        userFirstName.value = first;
        userLastName.value = last;
      } else {
        userFirstName.value = data.username;
      }

      useremail.value = data.useremail;
      usernumber.value = data.usernumber;
    });
  }
}
getUserSignUpData();
//form.js

let appoinmentDataArr = [];
// function submitAppoinmentForm() {
//   let appoinmentFormData = document.getElementById("appoinment-form");
//   let gender = document.appoinmentform.gender.value;
//   let formValue = new FormData(appoinmentFormData);
//   let patientdata = {};
//   for (const [key, value] of formValue) {
//     patientdata[key] = value;
//   }
//   patientdata["gender"] = gender;

//   appoinmentDataArr.push(patientdata);

//   localStorage.setItem(
//     "patientDataHomePage",
//     JSON.stringify(appoinmentDataArr)
//   );

//   //reset form values

//   resetFormValues();
//   formClose();

//   // getPatientData();
//   window.location.href = "AppoinmentPage.html";
// }

// function submitAppoinmentForm() {
//   console.log(patientId);
//   bookingId = String(bookingId).padStart(5, "0");
//   let appoinmentFormData = document.getElementById("appoinment-form");
//   let gender = document.appoinmentform.gender.value;
//   let username = document.appoinmentform.userfirstname.value;
//   let formValue = new FormData(appoinmentFormData);
//   let patientdataObj = {
//     patientId: patientId,
//     bookingId: bookingId,
//     createdTime: new Date().toLocaleString(),
//     status: "Booked",
//   };
//   ////

//   // patientDataObj['username']=userSignupData.username

//   for (const [key, value] of formValue) {
//     patientdataObj[key] = value;
//   }
//   patientdataObj["gender"] = gender;
//   // patientdataObj['createdTimeAndSec']=Date.now();

//   appoinmentDataArr.push(patientdataObj);

//   localStorage.setItem("patientData", JSON.stringify(appoinmentDataArr));
//   bookingId++;
//   // console.log('appmtArr'+appoinmentDataArr);
//   //reset form values
//   // deleteFormData(appoinmentDataArr);
//   resetFormValues();
//   formClose();
//   // getPatientData();
//   getLocalStorage();
//   // window.location.href = "patient.html";
// }
//reset form values
function resetFormValues() {
  let appoinmentFormData = document.getElementById("appoinment-form");
  for (let val of appoinmentFormData) {
    // console.log((val.value = ""));
    if (val.type == "radio" || val.type == "checkbox") {
      val.checked = false;
    } else if (val.type == "select-one") {
      val.selectedIndex = -1;
    } else {
      val.value = "";
    }
  }
  getUserSignUpData();
}

/// SUCCESFULLY  APPOINTMENT TO SHOW SUCCESS POPUP

let successPopup = document.querySelector(".success-popup");
let successBtnLink = document.querySelector(".success-btn");
let successPopuupCloseBtn = document.querySelector(".success-popup-closebtn");
successBtnLink.addEventListener("click", () => {
  successPopup.classList.toggle("hidden");
});
successPopuupCloseBtn.addEventListener("click", () => {
  successPopup.classList.add("hidden");
});



/*
//appoinment date and time min - max
let appoinmentTime_Date = document.getElementById("apmnttime");
let currentDate = new Date().toISOString().split("T");
appoinmentTime_Date.min = currentDate[0] + " " + currentDate[1].slice(0, 5);
*/
