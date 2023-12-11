var broadcast = null
$('.navbar-brand').removeClass('navbar-brand')
if ('serviceWorker' in navigator) {

  window.addEventListener('load', function () {

    // broadcast = new BroadcastChannel('count-channel');

    // // Listen to the response
    // broadcast.onmessage = (event) => {
    //     console.log(event.data.payload);

    // };




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
      //console.log('assap call then response navigator service worker',registration)
      // registration.active.postMessage("Hi service worker");
    }).then(function () {
      console.log('sync registered')
    }).catch(function () {

      console.log('sync registration failed')
    })
      .catch((error) => console.log('service worker error on load navigator', error));

    //console.log("this",this.navigator.serviceWorker)'
  })

  navigator.serviceWorker.onmessage = (res) => {
    if (res.data && res.data.type === "NOTES") {

      console.log("new message", res)
    }
  }
  // navigator.serviceWorker.register('/service-worker.js');

  // console.log("serviceWorker",serviceWorker)
  //console.log("nav.s",navigator.serviceWorker)
  //console.log("nav",navigator)
}

$(document).ready(function () {
  $("select").change(function () {
    $(this).find("option:selected")
      .each(function () {
        var optionValue = $(this).attr("value");
        if (optionValue) {
          $(".box").not("." + optionValue).hide();
          $("." + optionValue).show();
        } else {
          $(".box").hide();
        }
      });
  }).change();
});

//Future date validation
$('#p_date').on('change', () => {
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
      if ($('#p_date').val()) {
        $("#p_date").val('n').trigger('change')
        $('.modal-backdrop.fade.show').hide();
        $('.modal').remove();
        $('.modal-backdrop').remove();
        $('body').removeClass("modal-open");
      }
    }
  }
  calculate($('#p_date').val())
})
//Future date validation

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
    console.log(name_patient, "Name of patient")
    name_patient.map((doc) => {
      console.log("Doc data", doc)
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
    console.log(doctor_name, "docter name")
    doctor_name.map((doc) => {
      console.log("Doc data", doc)
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


let form_id = document.getElementById("notes_data")

$("#notes_button").on('click', function (e) {
  e.preventDefault()
  console.log('fo follow', e.target)
  new_patient = $('#npatient').prop('checked') ? 1 : 0;
  exist_patient = $('#epatient').prop('checked') ? 1 : 0;
  n_patient = $('#n_patient').val()
  first_name = $('#first_name').val()
  surname = $('#surname').val()
  p_name = $('#p_name').val()
  dtr_name = $('#dtr_name').val()
  nurse_name = $('#nurse_name').val()
  couns_name = $('#couns_name').val()
  p_date = $('#p_date').val()
  note_type = $('#note_type').val()
  d_notes = $('#d_notes').val()
  n_notes = $('#n_notes').val()
  c_notes = $('#c_notes').val()

  if (new_patient == 0 && exist_patient == 0) {

    alert("select new patient or existing patient")
    return false
  }

  if (new_patient == 1 && (first_name == '' || surname == '')) {
    alert("First name and surname is mandatory")
    return false
  }

  else if (exist_patient == 1 && (n_patient == '')) {
    alert('Patient is mandatory')
    return false
  }
  if (dtr_name == '') {
    alert('Doctor Name is mandatory')
    return false
  }
  if (p_date == '') {
    alert('Date is mandatory')
    return false
  }
  if (note_type == '') {
    alert('Note type is mandatory')
    return false
  }

  payload = {
    "doctype": "Notes",
    "patient_name": n_patient,
    "first_name": first_name,
    "surname": surname,
    "patient": p_name,
    "doctor_name": dtr_name,
    "nurse_name": nurse_name,
    "counselor_name": couns_name,
    "date": p_date,
    "note_type": note_type,
    "doctors_note": d_notes,
    "nurse_note": n_notes,
    "c_note": c_notes
  }

  console.log(payload)

  const sendMsg = (payload) => new Promise((resolve, reject) => {

    console.log(payload)
    if ((payload.first_name === "" || payload.doctor_name === "" || payload.date === "" || payload.note_type === "") && (payload.n_patient === "" || payload.doctor_name === "" || payload.date === "" || payload.note_type === "")) {

      reject('send_failed')
    }

    else {
      console.log('payload==>', payload)
      obj = JSON.parse(JSON.stringify(payload))
      console.log(obj, "resolve object")
      navigator.serviceWorker.controller.postMessage({
        type: 'NOTES',
        data: obj
      })
      // broadcast.postMessage({
      //   type: 'ENROLL',
      //   data: obj,
      // });
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


