var broadcast = null
$('.navbar-brand').removeClass('navbar-brand')
if ('serviceWorker' in navigator) {

    window.addEventListener('load', function () {

        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {


        }, function (err) {

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

    })

    navigator.serviceWorker.onmessage = (res) => {
        if (res.data && res.data.type === "FINAL") {

            console.log("new message", res)
        }
    }
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
//Future date validation End

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
        console.log(name_patient, "name of patient")
        name_patient.map((doc) => {
            console.log("Doc Data", doc)
            $('#patientid').append(`<option value=${doc}/>`);
        })
    })
    .catch(error => console.log('error', error));

$("#final_button").on('click', function (e) {
    new_patient = $('#npatient').prop('checked') ? 1 : 0;
    exist_patient = $('#epatient').prop('checked') ? 1 : 0;
    patient = $('#patient').val()
    patientname = $('#patientname').val()
    first_name = $('#first_name').val()
    surname = $('#surname').val()
    date = $('#date').val()
    carep = $('#Carep').val()
    visitf = $('#visitf').val()
    strong = $('#strong').val()
    depress = $('#depress').val()
    painscore1 = $('#painscore1').val()
    nausea1 = $('#Nausea1').val()
    dyspnoea1 = $('#dyspnoea1').val()
    ghq12 = $('#ghq12').val()
    family1 = $('#family1').val()
    functinal = $('#functinal').val()
    caregiver = $('#caregiver').val()
    pinsight = $('#pinsight').val()
    cummunication = $('#cummunication').val()
    scale = $('#scale').val()
    palteam = $('#palteam').val()

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
    if (date === '') {
        alert("Date is mandatory")
        return false
    }


    //   document.studentForm.txtInput.value='STUDENT-100';

    e.preventDefault()

    //console.log("clicked")
    let form_id = document.getElementById("mindhunter")
    payload = {
        "doctype": "Final Summary",
        "patient_name": patient,
        "patient": patientname,
        "first_name": first_name,
        "surname": surname,
        "date": date,
        "care_priority_hml": carep,
        "visit_frequency": visitf,
        "strong_opioids": strong,
        "anti_depressants": depress,
        "pain_score": painscore1,
        "nausea_score": nausea1,
        "dyspnoea_score": dyspnoea1,
        "ghq": ghq12,
        "family_support": family1,
        "family_func": functinal,
        "caregiver": caregiver,
        "patient_insight": pinsight,
        "communication_pattern": cummunication,
        "karnofsky": scale,
        "team_member": palteam,

    }

    console.log("payload", payload)

    const sendMsg = (payload) => new Promise((resolve, reject) => {

        console.log(payload)
        if ((payload.first_name === "" || payload.date === "") && (payload.patient_name === "" || payload.date === "")) {

            reject('send_failed')
        }

        else {
            console.log('payload==>', payload)
            // const sendMsg = (payload) => new Promise((resolve, reject) => {
            obj = JSON.parse(JSON.stringify(payload))
            navigator.serviceWorker.controller.postMessage({
                type: 'FINAL',
                data: obj,
            });
            resolve('sendMessage_succesful')
        }
    })
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


