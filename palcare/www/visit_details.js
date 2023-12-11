var broadcast = null
$('.navbar-brand').removeClass('navbar-brand')
if ('serviceWorker' in navigator) {

  window.addEventListener('load', function () {

    broadcast = new BroadcastChannel('count-channel');


    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {

      //console.log('sw success with scope:', registration.scope)

    }, function (err) {

      //console.log('ServiceWorker registration failed:', err)
    })
      .catch((e) => {

        // console.log(e)
      })

    navigator.serviceWorker.ready.then(registration => {
      console.log("service worker ready")
      return registration.sync.register('sendFormData')
    }).then(function () {
      console.log('sync registered')
    }).catch(function () {

      console.log('sync registration failed')
    })
      .catch((error) => console.log('service worker error on load navigator', error));

    //console.log("this",this.navigator.serviceWorker)'
  })

  navigator.serviceWorker.onmessage = (res) => {
    if (res.data && res.data.type === "MEDICAL") {

      console.log("new message", res)
    }
  }
}

//Future date validation
$('#vdate').on('change', () => {
  function calculate(input) {
    dob = new Date();
    today = new Date();
    let x = input.split("-");
    let reverseArray = x.reverse();
    dob.setDate(x[0]);
    dob.setMonth(x[1] - 1);
    dob.setFullYear(x[2]);
    let year, month, day;
    day = (function () {
      if (today.getDate() > dob.getDate()) {
        return today.getDate() - dob.getDate() - 1;
      }
      else if (today.getDate() == dob.getDate()) {
        return today.getDate() - dob.getDate();
      }
      else {
        let calDate = new Date(dob.getFullYear(), dob.getMonth() + 1, 0);
        return (today.getDate() + calDate.getDate()) - dob.getDate() - 1;
      }
    }());
    month = (function () {
      if (today.getMonth() >= dob.getMonth()) {
        if (today.getDate() >= dob.getDate()) {
          return today.getMonth() - dob.getMonth();
        }
        else {
          if ((today.getMonth() - 1) >= dob.getMonth()) {
            return (today.getMonth() - 1) - dob.getMonth();
          }
          else {
            return ((today.getMonth() - 1) + 12) - dob.getMonth();
          }
        }
      }
      else {
        if (today.getDate() >= dob.getDate()) {
          return (today.getMonth() + 12) - dob.getMonth();
        }
        else {
          return ((today.getMonth() - 1) + 12) - dob.getMonth();
        }
      }
    }());
    year = (function () {
      if (dob.getMonth() == today.getMonth()) {
        if (dob.getDate() > today.getDate()) {
          return (today.getFullYear() - 1) - dob.getFullYear();
        } else {
          return today.getFullYear() - dob.getFullYear();
        }
      } else {
        if (dob.getMonth() > today.getMonth()) {
          return (today.getFullYear() - 1) - dob.getFullYear();
        } else {
          return today.getFullYear() - dob.getFullYear();
        }
      }
    }());
    if (year < 0) {
      alert("Please Enter a valid Date")
      if ($('#vdate').val()) {
        $("#vdate").val('n').trigger('change')
        $('.modal-backdrop.fade.show').hide();
        $('.modal').remove();
        $('.modal-backdrop').remove();
        $('body').removeClass("modal-open");
      }
    }
  }
  calculate($('#vdate').val())
})

$('#daterecord').on('change', () => {
  function calculate(input) {
    dob = new Date();
    today = new Date();
    let x = input.split("-");
    let reverseArray = x.reverse();
    dob.setDate(x[0]);
    dob.setMonth(x[1] - 1);
    dob.setFullYear(x[2]);
    let year, month, day;
    day = (function () {
      if (today.getDate() > dob.getDate()) {
        return today.getDate() - dob.getDate() - 1;
      }
      else if (today.getDate() == dob.getDate()) {
        return today.getDate() - dob.getDate();
      }
      else {
        let calDate = new Date(dob.getFullYear(), dob.getMonth() + 1, 0);
        return (today.getDate() + calDate.getDate()) - dob.getDate() - 1;
      }
    }());
    month = (function () {
      if (today.getMonth() >= dob.getMonth()) {
        if (today.getDate() >= dob.getDate()) {
          return today.getMonth() - dob.getMonth();
        }
        else {
          if ((today.getMonth() - 1) >= dob.getMonth()) {
            return (today.getMonth() - 1) - dob.getMonth();
          }
          else {
            return ((today.getMonth() - 1) + 12) - dob.getMonth();
          }
        }
      }
      else {
        if (today.getDate() >= dob.getDate()) {
          return (today.getMonth() + 12) - dob.getMonth();
        }
        else {
          return ((today.getMonth() - 1) + 12) - dob.getMonth();
        }
      }
    }());
    year = (function () {
      if (dob.getMonth() == today.getMonth()) {
        if (dob.getDate() > today.getDate()) {
          return (today.getFullYear() - 1) - dob.getFullYear();
        } else {
          return today.getFullYear() - dob.getFullYear();
        }
      } else {
        if (dob.getMonth() > today.getMonth()) {
          return (today.getFullYear() - 1) - dob.getFullYear();
        } else {
          return today.getFullYear() - dob.getFullYear();
        }
      }
    }());
    if (year < 0) {
      alert("Please Enter a valid Date")
      if ($('#daterecord').val()) {
        $("#daterecord").val('n').trigger('change')
        $('.modal-backdrop.fade.show').hide();
        $('.modal').remove();
        $('.modal-backdrop').remove();
        $('body').removeClass("modal-open");
      }
    }
  }
  calculate($('#daterecord').val())
})

$('#followupdate').on('change', () => {
  function calculate(input) {
    dob = new Date();
    today = new Date();
    let x = input.split("-");
    let reverseArray = x.reverse();
    dob.setDate(x[0]);
    dob.setMonth(x[1] - 1);
    dob.setFullYear(x[2]);
    let year, month, day;
    day = (function () {
      if (today.getDate() > dob.getDate()) {
        return today.getDate() - dob.getDate() - 1;
      }
      else if (today.getDate() == dob.getDate()) {
        return today.getDate() - dob.getDate();
      }
      else {
        let calDate = new Date(dob.getFullYear(), dob.getMonth() + 1, 0);
        return (today.getDate() + calDate.getDate()) - dob.getDate() - 1;
      }
    }());
    month = (function () {
      if (today.getMonth() >= dob.getMonth()) {
        if (today.getDate() >= dob.getDate()) {
          return today.getMonth() - dob.getMonth();
        }
        else {
          if ((today.getMonth() - 1) >= dob.getMonth()) {
            return (today.getMonth() - 1) - dob.getMonth();
          }
          else {
            return ((today.getMonth() - 1) + 12) - dob.getMonth();
          }
        }
      }
      else {
        if (today.getDate() >= dob.getDate()) {
          return (today.getMonth() + 12) - dob.getMonth();
        }
        else {
          return ((today.getMonth() - 1) + 12) - dob.getMonth();
        }
      }
    }());
    year = (function () {
      if (dob.getMonth() == today.getMonth()) {
        if (dob.getDate() > today.getDate()) {
          return (today.getFullYear() - 1) - dob.getFullYear();
        } else {
          return today.getFullYear() - dob.getFullYear();
        }
      } else {
        if (dob.getMonth() > today.getMonth()) {
          return (today.getFullYear() - 1) - dob.getFullYear();
        } else {
          return today.getFullYear() - dob.getFullYear();
        }
      }
    }());
    if (year < 0) {
      alert("Please Enter a valid Date")
      if ($('#followupdate').val()) {
        $("#followupdate").val('n').trigger('change')
        $('.modal-backdrop.fade.show').hide();
        $('.modal').remove();
        $('.modal-backdrop').remove();
        $('body').removeClass("modal-open");
      }
    }
  }
  calculate($('#followupdate').val())
})
//Future date validation end 

function myFunction() {
  var checkBox = document.getElementById("npatient");
  var box = document.getElementById("epatient");
  var f_name = document.getElementById("fdisplay");
  var s_name = document.getElementById("sdisplay")
  var p_name = document.getElementById("nameP")

  if (checkBox.checked == true) {
    f_name.style.display = "block";
    s_name.style.display = "block"
  } else {
    f_name.style.display = "none";
    s_name.style.display = "none"
  }
  var non_data = document.getElementById("pdisplay");
  if (box.checked == true) {
    non_data.style.display = "block";
    p_name.style.display = "block"
  } else {
    non_data.style.display = "none";
    p_name.style.display = "none"
  }
}


let name_patient = ''
let doctor_name = ''
let nurse_name = ''
let counsellor_name = ''
var myHeaders = new Headers();
myHeaders.append("Authorization", "token 032259d9bcde088:9a6a83fc6b685b0");
myHeaders.append("Cookie", "sid=Guest; system_user=no; full_name=Guest; user_id=Guest; user_image=");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("/api/method/palcare.patient_list.Patient", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result); name_patient = JSON.parse(result).message
    console.log(name_patient, "name of patient")
    name_patient.map((doc) => {
      console.log("doc data", doc)
      $('#patientid').append(`<option value=${doc}/>`);
    })
  })
  .catch(error => console.log('error', error));


var myHeaders = new Headers();
myHeaders.append("Authorization", "token 032259d9bcde088:9a6a83fc6b685b0");
myHeaders.append("Cookie", "sid=Guest; system_user=no; full_name=Guest; user_id=Guest; user_image=");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("/api/method/palcare.patient_list.Doctor", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result); doctor_name = JSON.parse(result).message
    console.log(doctor_name, "akjdnonfof")
    doctor_name.map((doc) => {
      console.log("nooob", doc)
      $('#doctorid').append(`<option >${doc}</option>`);
    })
  })
  .catch(error => console.log('error', error));


var myHeaders = new Headers();
myHeaders.append("Authorization", "token 032259d9bcde088:9a6a83fc6b685b0");
myHeaders.append("Cookie", "sid=Guest; system_user=no; full_name=Guest; user_id=Guest; user_image=");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("/api/method/palcare.patient_list.Nurse", requestOptions)
  .then(response => response.text())
  .then(result => {
    let aa = ''
    console.log(result); nurse_name = JSON.parse(result).message
    console.log(nurse_name, "akjdnonfof")
    nurse_name.map((doc) => {
      console.log("doc data", doc)
      $('#nurseid').append(`<option >${doc}</option>`);
    })
  })
  .catch(error => console.log('error', error));


var myHeaders = new Headers();
myHeaders.append("Authorization", "token 032259d9bcde088:9a6a83fc6b685b0");
myHeaders.append("Cookie", "sid=Guest; system_user=no; full_name=Guest; user_id=Guest; user_image=");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("/api/method/palcare.patient_list.Counselor", requestOptions)
  .then(response => response.text())
  .then(result => {
    let aa = ''
    console.log(result); counsellor_name = JSON.parse(result).message
    console.log(counsellor_name, "counselor")
    counsellor_name.map((doc) => {
      console.log("doc data", doc)
      $('#counselorid').append(`<option >${doc}</option>`);
    })
  })
  .catch(error => console.log('error', error));

let form_id = document.getElementById("parasite")

$("#visit_button").on('click', function (e) {
  console.log('fo follow', e.target)
  new_patient = $('#npatient').prop('checked') ? 1 : 0;
  exist_patient = $('#epatient').prop('checked') ? 1 : 0;
  patient1 = $('#patient').val()
  first_name = $('#first_name').val()
  surname = $('#surname').val()
  patientname1 = $('#patientname1').val()
  vdate = $('#vdate').val()
  vtime = $('#vtime').val()
  carep = $('#Carep').val()
  zone1 = $('#zone1').val()
  incharge = $('#incharge').val()
  otherdocter = $('#otherdocter').val()
  nurseincharge = $('#nurseincharge').val()
  othernurse = $('#othernurse').val()
  counselor = $('#counselor').val()
  othercounsellor = $('#othercounsellor').val()
  palcarestaff = $('#palcarestaff').val()
  vother = $('#vother').val()
  enrolment = $('#enrolment').val()
  followup = $('#followup').val()
  followupdate = $('#followupdate').val()
  bereavement = $('#bereavement').val()
  daterecord = $('#daterecord').val()
  bywhom = $('#bywhom').val()

  if (new_patient == 0 && exist_patient == 0) {

    alert("select new patient or existing patient")
    return false
  }

  if (new_patient == 1 && (first_name == '' || surname == '')) {
    alert("First name and surname is mandatory")
    return false
  }
  if (vdate == '') {
    alert("Visit Date is mandatory")
    return false
  }
  if (incharge == '') {
    alert("Doctor in Charge is mandatory")
    return false
  }
  if (nurseincharge == '') {
    alert("Nurse in Charge is mandatory")
    return false
  }

  else if (exist_patient == 1 && (patient1 == '')) {
    alert('Patient is mandatory')
    return false
  }


  //   document.studentForm.txtInput.value='STUDENT-100';

  e.preventDefault()

  //console.log("clicked")

  payload = {
    "doctype": "Visit Details",
    "first_name": first_name,
    "surname": surname,
    "patient": patient1,
    "patient_name": patientname1,
    "visit_date": vdate,
    "visit_time": vtime,
    "care_priority_hml": carep,
    "zone": zone1,
    "doctor_in_charge": incharge,
    "other_doctor": otherdocter,
    "nurse_in_charge": nurseincharge,
    "other_nurse": othernurse,
    "counselor": counselor,
    "other_counsellor": othercounsellor,
    "palcare_staff": palcarestaff,
    "other": vother,
    "enrolment": enrolment,
    "follow_up": followup,
    "follow_up_date": followupdate,
    "bereavement": bereavement,
    "date": daterecord,
    "by_whom": bywhom


  }
  const sendMsg = (payload) => new Promise((resolve, reject) => {

    console.log(payload)
    if ((payload.first_name === "" || payload.visit_date === "" || payload.doctor_in_charge === "" || payload.nurse_in_charge === "") && (payload.patient3 === "" || payload.visit_date === "" || payload.doctor_in_charge === "" || payload.nurse_in_charge === "")) {

      reject('send_failed')
    }

    else {
      console.log('payload==>', payload)
      // const sendMsg = (payload) => new Promise((resolve, reject) => {
      obj = JSON.parse(JSON.stringify(payload))
      navigator.serviceWorker.controller.postMessage({
        type: 'VISIT',
        data: obj,
      });
      resolve('sendMessage_succesful')
    }
  })

  // sendMsg()
  sendMsg(payload).then((e) => {

    frappe.show_alert({
      message: __('Document Saved'),
      indicator: 'green'
    }, 5);

    form_id.reset()
  })
    .catch(e => {
      frappe.show_alert({
        message: __('Document Not Saved,Please Try Again'),
        indicator: 'red'
      }, 5);
    })


});


