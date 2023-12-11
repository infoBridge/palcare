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
        if (res.data && res.data.type === "EPAS") {

            console.log("new message", res)
        }
    }
    // navigator.serviceWorker.register('/service-worker.js');

    // console.log("serviceWorker",serviceWorker)
    //console.log("nav.s",navigator.serviceWorker)
    //console.log("nav",navigator)
}
	
//Future date validation
$('#date').on('change', () => {
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
        if ($('#date').val()) {
          $("#date").val('n').trigger('change')
          $('.modal-backdrop.fade.show').hide();
          $('.modal').remove();
          $('.modal-backdrop').remove();
          $('body').removeClass("modal-open");
        }
      } 
    }
    calculate($('#date').val())
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

let form_id=document.getElementById("breakingbad")

$("#epas_button").on('click', function (e) {
    console.log('fo follow', e.target)
    patient = $('#patient').val()
    first_name = $('#first_name').val()
    new_patient = $('#npatient').prop('checked') ? 1 : 0;
    exist_patient = $('#epatient').prop('checked') ? 1 : 0;
    surname = $('#surname').val()
    patient_name = $('#patient_name').val()
    date = $('#date').val()
    family = $('#family').val()
    community = $('#community').val()
    functionality = $('#functionality').val()
    fscore = $('#fscore').val()
    cscore = $('#cscore').val()
    funscore = $('#funscore').val()
    isillness = $('#isillness').val()
    withdrawn = $('#withdrawn').val()
    easy = $('#easy').val()
    slurred = $('#slurred').val()
    clear = $('#clear').val()
    unable = $('#unable').val()
    talk = $('#talk').val()
    others1 = $('#others1').val()
    shock = $('#shock').val()
    denial = $('#denial').val()
    hope = $('#hope').val()
    acceptance = $('#acceptance').val()
    others2 = $('#others2').val()
    sad = $('#sad').val()
    anger = $('#anger').val()
    guilt = $('#guilt').val()
    shame = $('#shame').val()
    depression = $('#depression').val()
    suicidal = $('#suicidal').val()
    others3 = $('#others3').val()
    death = $('#death').val()
    severepain = $('#severepain').val()
    leaving_family=$('#leaving_family').val()
    ofmeeting = $('#ofmeeting').val()
    others4 = $('#others4').val()
    angrywith = $('#angrywith').val()
    broken = $('#broken').val()
    forgiveness = $('#forgiveness').val()
    belief = $('#belief').val()
    others5 = $('#others5').val()
    pteam = $('#pteam').val()

    if (new_patient == 0 && exist_patient == 0) {

        alert("select new patient or existing patient")
        return false
    }

    if (new_patient == 1 && (first_name == '' || surname == '')) {
        alert("First name and surname is mandatory")
        return false
    }

    else if (exist_patient == 1 && (patient == '')) {
        alert('Patient is mandatory')
        return false
    }
    if (date === '')  {
        alert("Date is mandatory")
        return false
    }


    //   document.studentForm.txtInput.value='STUDENT-100';

    e.preventDefault()

    console.log("clicked")

    payload = {
        "doctype": "Emotional And Psychosocial Assessment",
        "patient": patient,
        "first_name": first_name,
        "surname": surname,
        "patient_name": patient_name,
        "date": date,
        "family_s_ns": family,
        "community_s_ns": community,
        "family_s_sf_df": functionality,
        "family_score": fscore,
        "community_score": cscore,
        "functionality_score": funscore,
        "insight_into_illness": isillness,
        "withdrawn": withdrawn,
        "easy": easy,
        "slurred": slurred,
        "clear": clear,
        "unable": unable,
        "talk": talk,
        "others_1": others1,
        "shock": shock,
        "denial": denial,
        "hope": hope,
        "acceptance": acceptance,
        "others_2": others2,
        "sad": sad,
        "anger": anger,
        "guilt": guilt,
        "shame": shame,
        "depr": depression,
        "suicide": suicidal,
        "others": others3,
        "of_death": death,
        "of_severe_pain_of_leaving_family_behind": severepain,
        "leaving_family_behind":leaving_family,
        "of_meeting_god": ofmeeting,
        "others_specify_in_notes": others4,
        "angry_with_god": angrywith,
        "broken_relationships": broken,
        "forgiveness": forgiveness,
        "belief_in_after_life": belief,
        "others_specify_in_notes_section": others5,
        "palcare_team_member_id_number": pteam


    }

    console.log("payload", payload)

    const sendMsg = (payload) => new Promise((resolve, reject) => {

        console.log(payload)

        if ((payload.first_name === "" || payload.date ==="")&& (payload.patient === ""|| payload.date ==="")) {
            reject('send_failed')
        }

        else {
            console.log('payload==>', payload)

            // const sendMsg = (payload) => new Promise((resolve, reject) => {
            obj = JSON.parse(JSON.stringify(payload))
            navigator.serviceWorker.controller.postMessage({
                type: 'EPAS',
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


