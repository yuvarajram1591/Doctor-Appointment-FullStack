///////////////////////////////////////////////
//SHOW AND HIDE PROFILE DETAIL (NAVBAR)

let profile = document.querySelector(".profile-logo");
let showProfile = document.querySelector(".show-profile");
profile.addEventListener("mouseover", showProfileDetails);
profile.addEventListener("click", showProfileDetails);
function showProfileDetails(e) {
  e.stopPropagation();
  showProfile.classList.toggle("visible");
  profile.classList.toggle("profile-logo-shadow");
}
document.body.addEventListener("click", () => {
  showProfile.classList.remove("visible");
  profile.classList.remove("profile-logo-shadow");
});

//////////////////////////////////////////////
// SET CURRENT USER NAME AND EMAIL IN PROFILE

function getUserLoginId() {
  let currentUserData = JSON.parse(sessionStorage.getItem("data"));
  let userProfileEmail = currentUserData.email_id;

  if (userProfileEmail) {
    let userProfileName = userProfileEmail.slice(
      0,
      userProfileEmail.indexOf("@")
    );
    let capitiliseName = userProfileName.replace(
      userProfileName[0],
      userProfileName[0].toUpperCase()
    );

    document.querySelector(".profile-email").innerHTML = userProfileEmail;
    document.querySelector(".profile-name").innerHTML = capitiliseName;
  }
}
getUserLoginId();

//////////////////////////////////////
// GET USERSIGNUP DATA  AND  SHOW THE DEFAULT VALUES IN APPOINMENT FORM (NAME,EMAIL,NUMBER);

function getUserSignUpData() {
  let loginUserData = JSON.parse(sessionStorage.getItem("data"));
  let userSignupData = [loginUserData];
  let userFirstName = document.getElementById("userfirstname");
  let userLastName = document.getElementById("userlastname");
  let useremail = document.getElementById("useremail");
  let usernumber = document.getElementById("usernumber");

  if (userSignupData) {
    userSignupData.forEach((data) => {
      if (data.user_name.includes(" ")) {
        let [first, last] = data.user_name.split(" ");

        userFirstName.value = first;
        userLastName.value = last;
      } else {
        userFirstName.value = data.user_first;
      }

      useremail.value = data.email_id;
      usernumber.value = data.phone;
    })
  }
}
getUserSignUpData();

// SHOW APPOINMENT FORM

function showAppoinmentForm() {
  document.querySelector(".form-section").style.display = "block";
}

////////////////////////////////////////////////
// SHOW THE DEFAULT VALUES IN APPOINMENT FORM DOCTOR LIST

function getDoctorName() {
  let url = "http://localhost:8080/doctor_booking/appointment-service/doctor-full-list";
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'apllication/json',
    },
  }).then(response => response.json())
    .then(data => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        document.querySelector("#doctor").innerHTML += `<option value=${data[i].name}>${data[i].name}</option>`;
      }
    })
}
getDoctorName();

////////////////////////////////////////////////
// SHOW THE DEFAULT VALUES IN APPOINMENT FORM DOCTOR CATEGORY LIST

function getDoctorCategory() {
  let url = "http://localhost:8080/doctor_booking/appointment-service/doctor-full-list";
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'apllication/json',
    },
  }).then(response => response.json())
    .then(data => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        document.querySelector("#category-list").innerHTML += `<option value=${data[i].category}>${data[i].category}</option>`;
      }
    })
}
getDoctorCategory();

////////////////////////////////////////////////
// DOCTOR LIST

function getDoctorList() {
  // let doctorList=document.querySelector(".doctor-list");
  let url = "http://localhost:8080/doctor_booking/appointment-service/doctor-full-list";
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'apllication/json',
    },
  }).then(response => response.json())
    .then(data => {
      // console.log(data);
      // let data = data.value;
      for (let i = 0; i < data.length; i++) {
        if (document.querySelector(".doctor-main") != null) {
          document.querySelector(".doctor-main").innerHTML += `<ul class="doctor">
              <li><img src="images/doctor-img.jpg" class='doctor-img' alt="#"></li>
              <li><h3>${data[i].name.toUpperCase()}</h3></li>
              <li><h5>${data[i].category}</5></li>
              <li class='email'>${data[i].email}</li> 
               </ul>`;
        }
      }
    })
}
getDoctorList();

////////////////////////////////////////////////
// SUBMIT APPOINMENT FORM

// const form = document.getElementById("appoinment-form");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const formData = new FormData(this);
//   const searchParams = new URLSearchParams();
//   for (const pair of formData) {
//     searchParams.append(pair[0], pair[1]);
//   }

//   let url = `http://localhost:8080/doctor_booking/appointment-service/booking`;
//   fetch(url, {
//     body: searchParams,
//     method: "post",
//     headers: {
//       Accept: 'application/json',
//       'content-type': 'apllication/json',
//     },
//   }).then(function (response) {
//     return response.json();
//   }).then(function (data) {
//     console.log(data);
//   }).catch(function (error) {
//     console.log(error);
//   })
// });









function submitAppoinmentForm() {
  const form = document.getElementById("appoinment-form");
  // const url = form.action;
  // const formData = new FormData(form);
  const data = new URLSearchParams(new FormData(form));
  // try {
  // const responseData = await postFormDataAsJson({ url, formData });

	// window.location.assign("http://localhost:8080/doctor_booking/appointment.html");
  // }  catch (error) {
	// 	console.error(error);
	// }

  // const plainFormData = Object.fromEntries(formData.entries());
	// const formDataJsonString = JSON.stringify(plainFormData);
  urlQuery = "";
  for (const [key, value] of data) {
    urlQuery += `&${key}=${value}`;
  }
  urlQuery = "" + urlQuery.slice(1);
  let url = `http://localhost:8080/doctor_booking/appointment-service/booking?${urlQuery}`;
  fetch(url, {
    method: 'POST',
    body:FormData,
    headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
  }).then(response => response.json())
    .then(data => {
      console.log(data);
      sessionStorage.setItem("data", JSON.stringify(data));
      if(data.message==data.message){
          alert(data.message);
      }

    })
}

// async function postFormDataAsJson({ url, formData }) {
// 	const plainFormData = Object.fromEntries(formData.entries());
// 	const formDataJsonString = JSON.stringify(plainFormData);

// 	const fetchOptions = {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Accept: "application/json",
// 		},
// 		body: formDataJsonString,
// 	};

// 	const response = await fetch(url, fetchOptions);

// 	if (!response.ok) {
// 		const errorMessage = await response.text();
// 		throw new Error(errorMessage);
// 	}

// 	return response.json();
// }

////////////////////////////////////////////////
// YOUR APPOINTMENT DETAILS

function appoinmentDetails() {
  let currentUserData = JSON.parse(sessionStorage.getItem("data"));
  let userProfileEmail = currentUserData.email_id;
  let url = `http://localhost:8080/doctor_booking/appointment-service/appointments-details?email_id=${userProfileEmail}`;
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'apllication/json',
    },
  }).then(response => response.json())
    .then(data => {
      // console.log(data);
      document.querySelector(".card-boxs").innerHTML = '';
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          // let val=data[i].name.charAt().toUpperCase();
          if (document.querySelector(".card-boxs") != null) {
            //       document.querySelector(".card-boxs").innerHTML += `<ul class="card-list">
            //   <div class='first'>
            //      <li> <img src="images/icons8-stethoscope-24.png" alt=""><span class="card-dr-name"> ${data[i].name}</span></li>
            //      <li class="three-dot" onclick="doCancel()">
            //      <svg xmlns="http://www.w3.org/2000/svg" class="three-dot-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            //      <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            //      </svg>
            //      <span onclick="doCancelOne(${data[i].id})" class="cancel">Cancel</span></li>
            //    </div>
            //    <li><img src="images/icons8-treatment-50.png" class="category-img" alt=""><span class="card-checkup">${data[i].department}</span></li>
            //    <div class='second'>
            //      <li><img src="images/clock.png" alt=""><span class="card-date">${data[i].date}</span></li>
            //      <li class="card-approved">Booked</li>
            //    </div>
            //  </ul>`;
            document.querySelector(".card-boxs").innerHTML += `<ul class="card-list">
           <li class="top"> <img src="images/clock.png" alt=""><span class="card-dr-name"> ${data[i].date}</span></li>
           <div class="center-main">
           <li><img src="images/doctor-img.jpg" class='doctor-img' alt="#"></li>
           <div class="center-one">
            <li><img src="images/icons8-stethoscope-24.png" alt=""><span class="card-checkup">${data[i].name}</span></li>
            <li><img src="images/icons8-treatment-50.png" class="category-img" alt=""><span class="card-checkup">${data[i].department}</span></li>
           </div>
           </div>
            <div class='bottom'>
             <li class="reject" onclick="doCancelOne(${data[i].id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
             <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
           </svg> Reject</li>
             <li class="accpet"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
             <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
           </svg> Accpet</li>
             </div>
           </ul>`;
          }
        }
      }
      else {
        // document.getElementsByClassName("card-delete").style.display = "block";
        document.querySelector(".card-delete").style.display = "block";
      }
    })
}
appoinmentDetails();

////////////////////////////////////////////////
// CANCEL THE APPOINMENT FORM

// function doCancel() {

//   if (document.querySelector(".cancel").style.display = "block") {
//     console.log(true);
//   }
// }
function doCancelOne(id) {
  let url = `http://localhost:8080/doctor_booking/appointment-service/appointments-cancel?id=${id}`;
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'apllication/json',
    },
  }).then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.message == data.message) {
        appoinmentDetails();
      }
    })
}

////////////////////////////////////////////////
// Patient appointment details

function patientDetails() {
  let url = `http://localhost:8080/doctor_booking/appointment-service/patient-full-list`;
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'apllication/json',
    },
  }).then(response => response.json())
    .then(data => {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        let first_letter = data[i].name.charAt().toUpperCase();
        // let second_letter=data[i].name.slice(0,1);
        if (document.querySelector(".patient-main") != null) {
          document.querySelector(".patient-main").innerHTML += `<ul class='patient'>
        <li class='circle'>${first_letter}</li>
        <li><h4>${data[i].name.toUpperCase()}</h4></li>
        <li><h3>${data[i].email_id}</h3></li>
        <li>${data[i].contact}</li>
        <li class='email'>${data[i].date}</li> </ul>`;
        }
      }
    })
}
patientDetails();

////////////////////////////////////////////////
// CLOSE THE APPOINMENT FORM AND CLEAR VALUES

function formClose() {
  document.querySelector(".form-section").style.display = "none";
}

function doctorClose() {
  document.querySelector(".appointment").classList.toggle("hidden");
}
