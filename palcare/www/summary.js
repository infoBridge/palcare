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
        }).then(function () {
            console.log('sync registered')
        }).catch(function () {

            console.log('sync registration failed')
        })
            .catch((error) => console.log('service worker error on load navigator', error));

    })

    navigator.serviceWorker.onmessage = (res) => {
        if (res.data && res.data.type === "SUMMARY") {

            console.log("new message", res)
        }
    }
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
$('#pscdate').on('change', () => {
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
            if ($('#pscdate').val()) {
                $("#pscdate").val('n').trigger('change')
                $('.modal-backdrop.fade.show').hide();
                $('.modal').remove();
                $('.modal-backdrop').remove();
                $('body').removeClass("modal-open");
            }
        }
    }
    calculate($('#pscdate').val())
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


//Function for camera
$('#patient-photo').on('click', () => {
    $("#exampleModalCenter").modal("toggle");
    document.getElementById('savebtn').onclick = (event) => {
        if (document.getElementById('photo').src != 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGlJREFUeF7t1AEJADAMA8HVv5Oa3GAuHq4KwqVkdvceR4AAgYDAGKxASyISIPAFDJZHIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRB46/vA5AUJNVYAAAAASUVORK5CYII=') {
            var canvas = document.getElementById("canvas");
            image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            $('#img_data1').attr('src', image)
            $('#img_data1').removeClass('d-none')


        }
        else {
            alert('Please Take a snap')
        }
    }
})

var mediaStream = null;
// Prefer camera resolution nearest to 1280x720.
var constraints = {
    audio: false,
    video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "environment"
    }
};

async function getMediaStream(constraints) {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        let video = document.getElementById('cam');
        video.srcObject = mediaStream;
        video.onloadedmetadata = (event) => {
            video.play();
        };
    } catch (err) {
        console.error(err.message);
    }
};

async function switchCamera(cameraMode) {
    try {
        // stop the current video stream
        if (mediaStream != null && mediaStream.active) {
            var tracks = mediaStream.getVideoTracks();
            tracks.forEach(track => {
                track.stop();
            })
        }

        // set the video source to null
        document.getElementById('cam').srcObject = null;

        // change "facingMode"
        constraints.video.facingMode = cameraMode;

        // get new media stream
        await getMediaStream(constraints);
    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }
}

function takePicture() {
    let canvas = document.getElementById('canvas');
    let video = document.getElementById('cam');
    let photo = document.getElementById('photo');
    let context = canvas.getContext('2d');
    const height = video.videoHeight;
    const width = video.videoWidth;
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    } else {
        clearphoto();
    }
}

function clearPhoto() {
    let canvas = document.getElementById('canvas');
    let photo = document.getElementById('photo');
    let context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

document.getElementById('switchFrontBtn').onclick = (event) => {
    switchCamera("user");
}

document.getElementById('switchBackBtn').onclick = (event) => {
    switchCamera("environment");
}

document.getElementById('snapBtn').onclick = (event) => {
    takePicture();
    event.preventDefault();
}
function vidOff() {
    if (mediaStream != null) {
        var tracks = mediaStream.getVideoTracks();
        tracks.forEach(track => {
            track.stop();
        })
    }
}

document.getElementById('summary_save_btn').onclick = (event) => {
    var canvas = document.getElementById("img_data1");
    var first_name = $("#first_name").val()
    var patient = $('#patient').val()
    var surname = $('#surname').val()
    var summarycard = $('#summarycard').val()
    var pscdate = $('#pscdate').val()
    var new_patient = $('#npatient').prop('checked') ? 1 : 0;
    var exist_patient = $('#epatient').prop('checked') ? 1 : 0;
    if (canvas.src != window.location.href) {
        if (new_patient == 1) {
            if (first_name == '' || surname == '' || summarycard == '' || pscdate == '') {
                // alert('hi')
            } else {
                image = canvas.src.replace("image/png", "image/octet-stream");
                var link = document.createElement('a');
                first_name = first_name ? first_name : "my-image.png"
                link.download = `${first_name}-Summary Form.png`;
                location.reload(true);
            }
        }
        if (exist_patient == 1) {
            if (patient == '' || summarycard == '' || pscdate == '') {
                // alert('hi')
            } else {
                image = canvas.src.replace("image/png", "image/octet-stream");
                var link = document.createElement('a');
                patient = patient ? patient : "my-image.png"
                link.download = `${patient}-Summary Form.png`;
                location.reload(true);
            }
        }
        link.href = image;
        link.click();
    }
}
clearPhoto();
//Function for camera End

let form_id = document.getElementById("vikings")
$("#summary_save_btn").on('click', function (e) {
    console.log('fo follow', e.target)
    new_patient = $('#npatient').prop('checked') ? 1 : 0;
    exist_patient = $('#epatient').prop('checked') ? 1 : 0;
    patient2 = $('#patient').val()
    first_name = $('#first_name').val()
    surname = $('#surname').val()
    patientname2 = $('#patientname').val()
    summarycard = $('#summarycard').val()
    pscdate = $('#pscdate').val()
    dayspal = $('#dayspal').val()
    discharge = $('#discharge').val()
    death = $('#death').val()
    bereavement = $('#bereavement').val()

    if (new_patient == 0 && exist_patient == 0) {

        alert("Select New Patient or Existing Patient")
        return false
    }

    if (new_patient == 1 && (first_name == '' || surname == '')) {
        alert("First Name and Surname is Mandatory")
        return false
    }



    if (new_patient == 1 && (first_name == '' || surname == '')) {
        alert("First Name and Surname is Mandatory")
        return false
    }

    else if (exist_patient == 1 && (patient2 == '')) {
        alert('Patient is Nandatory')
        return false
    }

    if (summarycard == '') {
        alert("Summary Card Type is mandatory")
        return false
    }
    if (pscdate == '') {
        alert("Date is mandatory")
        return false
    }

    //   document.studentForm.txtInput.value='STUDENT-100';

    e.preventDefault()

    //console.log("clicked")

    payload = {

        "doctype": "Patient Summary Card",
        "patient_name": patient2,
        "first_name": first_name,
        "surname": surname,
        "patient": patientname2,
        "summary_card_type": summarycard,
        "date": pscdate,
        "no_of_days_with_palcare": dayspal,
        "palce_of_discharge": discharge,
        "place_of_death": death,
        "place_of_bereavement": bereavement
    }

    const sendMsg = (payload) => new Promise((resolve, reject) => {

        console.log(payload)
        if ((payload.first_name === "" || payload.date === "" || payload.summary_card_type === "") && (payload.patient2 === "" || payload.date === "" || payload.summary_card_type === "")) {

            reject('send_failed')
        }

        else {
            console.log('payload==>', payload)
            obj = JSON.parse(JSON.stringify(payload))
            console.log(obj, "resolve object")

            navigator.serviceWorker.controller.postMessage({
                type: 'SUMMARY',
                data: obj
            })
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


