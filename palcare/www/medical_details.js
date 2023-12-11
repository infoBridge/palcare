var broadcast = null
$('.navbar-brand').removeClass('navbar-brand')
if ('serviceWorker' in navigator) {

    window.addEventListener('load', function () {


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
        if (res.data && res.data.type === "MEDICAL") {

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
//Future date validation End

function myFunctionPatient() {
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

function myFunction() {
    var checkBox = document.getElementById("cancer");
    var box = document.getElementById("noncancer");
    var can_data = document.getElementById("can_data");
    if (checkBox.checked == true) {
        can_data.style.display = "block";
    } else {
        can_data.style.display = "none";
    }
    var non_data = document.getElementById("non_data");
    if (box.checked == true) {
        non_data.style.display = "block";
    } else {
        non_data.style.display = "none";
    }
}

let name_patient = ''
let new_allergens = ''
let new_comorbidiities = ''
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
        console.log(name_patient, "Name of patints")
        name_patient.map((doc) => {
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

fetch("/api/method/palcare.patient_list.Comorbidiities", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result); new_comorbidiities = JSON.parse(result).message
        console.log(new_comorbidiities, "Name of patints")
        new_comorbidiities.map((doc) => {
            $('#comorbidiities').append(`<option value=${doc}/>`);
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

fetch("/api/method/palcare.patient_list.Allergens", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result); new_allergens = JSON.parse(result).message
        console.log(new_allergens, "Name of patints")
        new_allergens.map((doc) => {
            $('#allergens').append(`<option value=${doc}/>`);
        })
    })
    .catch(error => console.log('error', error));


//Function for camera
$('#patient-photo').on('click', () => {
    $("#exampleModalCenter").modal("toggle");
    document.getElementById('save_img').onclick = (event) => {
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

$('#constent-img').on('click', () => {
    $("#exampleModalCenter").modal("toggle");
    document.getElementById('save_img').onclick = (event) => {
        if (document.getElementById('photo').src != 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGlJREFUeF7t1AEJADAMA8HVv5Oa3GAuHq4KwqVkdvceR4AAgYDAGKxASyISIPAFDJZHIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRB46/vA5AUJNVYAAAAASUVORK5CYII=') {
            var canvas = document.getElementById("canvas");
            image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            $('#img_data').attr('src', image)
            $('#img_data').removeClass('d-none')
        }
        else {
            alert('Please Take a snap')
        }
    }
})

// reference to the current media stream
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

function vidOff() {
    if (mediaStream != null) {
        var tracks = mediaStream.getVideoTracks();
        tracks.forEach(track => {
            track.stop();
        })
    }
}

document.getElementById('snapBtn').onclick = (event) => {
    takePicture();
    event.preventDefault();
}
document.getElementById('save_img').onclick = (event) => {
    var canvas = document.getElementById("canvas");
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    $('#img_data').attr('src', image)
    $('#img_data').removeClass('d-none')
}
document.getElementById('patient_medical_submit').onclick = (event) => {
    var first_name = $("#first_name").val()
    var canvas = document.getElementById("img_data");
    var new_patient = $('#npatient').prop('checked') ? 1 : 0;
    var exist_patient = $('#epatient').prop('checked') ? 1 : 0;
    var patient = $('#patient').val()
    var surname = $('#surname').val()
    if (canvas.src != window.location.href) {
        if (new_patient == 1) {
            if (first_name == '' || surname == '') {
            } else {
                image = canvas.src.replace("image/png", "image/octet-stream");
                var link = document.createElement('a');
                first_name = first_name ? first_name : "my-image.png"
                link.download = `${first_name}-Genogram.png`;
                location.reload(true);
            }
        }
        if (exist_patient == 1) {
            if (patient == '') { } else {
                image = canvas.src.replace("image/png", "image/octet-stream");
                var link = document.createElement('a');
                patient = patient ? patient : "my-image.png"
                link.download = `${patient}-Genogram.png`;
                location.reload(true);
            }
        }
        link.href = image;
        link.click();
    }
    var canvas_c = document.getElementById("img_data1");
    if (canvas_c.src != window.location.href) {
        if (new_patient == 1) {
            if (first_name == '' || surname == '') {
            } else {
                image = canvas_c.src.replace("image/png", "image/octet-stream");
                var Clink = document.createElement('a');
                first_name = first_name ? first_name : "my-image.png"
                Clink.download = `${first_name}-Pain Assessment.png`;
                location.reload(true);
            }
        }
        if (exist_patient == 1) {
            if (patient == '') { } else {
                image = canvas_c.src.replace("image/png", "image/octet-stream");
                var Clink = document.createElement('a');
                patient = patient ? patient : "my-image.png"
                Clink.download = `${patient}-Pain Assessment.png`;
                location.reload(true);
            }
        }
        Clink.href = image;
        Clink.click();
    }
}
clearPhoto();
//Function for camera End

let form_id = document.getElementById("whentheyseeus")
$("#patient_medical_submit").on('click', function (e) {
    new_patient = $('#npatient').prop('checked') ? 1 : 0;
    exist_patient = $('#epatient').prop('checked') ? 1 : 0;
    patient3 = $('#patient').val()
    new_patient = $('#npatient').prop('checked') ? 1 : 0;
    exist_patient = $('#epatient').prop('checked') ? 1 : 0;
    patientname3 = $('#patientname').val()
    first_name = $('#first_name').val()
    surname = $('#surname').val()
    enr_num = $('#enr_num').val()
    enr_date = $('#enr_date').val()
    noncancer = $('#noncancer').prop('checked') ? 1 : 0;
    cancer = $('#cancer').prop('checked') ? 1 : 0;
    type_cancer = $('#type_cancer').val()
    s_site = $('#s_site').val()
    d_year = $('#d_year').val()
    d_by = $('#d_by').val()
    r_year = $('#r_year').val()
    re_year = $('#re_year').val()
    stage1 = $('#stage1').val()
    prognosis = $('#prognosis').val()
    chemotherapy_type = $('#chemotherapy_type').val()
    radiation_type = $('#radiation_type').val()
    immunotherapy_type = $('#immunotherapy_type').val()
    surgery = $('#surgery').val()
    type_of_non_cancer = $('#type_of_non_cancer').val()
    diag_year = $('#diag_year').val()
    diag_from = $('#diag_from').val()
    prognosis1 = $('#prognosis1').val()
    active_treatment = $('#active_treatment').val()
    alternative_therapies = $('#alternative_therapies').val()
    type_of_therapy1 = $('#type_of_therapy1').val()
    comorbidiities = $('#comorbidiities').val()
    allergens = $('#allergens').val()
    diagnosis1 = $('#diagnosis1').val()
    prognosis2 = $('#prognosis2').val()
    revealed_by = $('#revealed_by').val()
    diagnosis2 = $('#diagnosis2').val()
    prognosis3 = $('#prognosis3').val()
    revealed_by1 = $('#revealed_by1').val()
    site1 = $('#site1').val()
    i_score = $('#i_score').val()
    type1 = $('#type1').val()
    frequency = $('#frequency').val()
    aggravator = $('#aggravator').val()
    reliever = $('#reliever').val()
    impact_of = $('#impact_of').val()
    treatment1 = $('#treatment1').val()
    response1 = $('#response1').val()
    p_others = $('#p_others').val()
    height1 = $('#height1').val()
    weight1 = $('#weight1').val()
    blood_pressure = $('#blood_pressure').val()
    pulse = $('#pulse').val()
    temperature1 = $('#temperature1').val()
    spo2 = $('#spo2').val()
    pallor = $('#pallor').val()
    icterus = $('#icterus').val()
    clubbing = $('#clubbing').val()
    lymphadenopathy = $('#lymphadenopathy').val()
    oedema = $('#oedema').val()
    ambulation = $('#ambulation').val()
    cyanosis = $('#cyanosis').val()
    oral_examination = $('#oral_examination').val()
    pr = $('#pr').val()
    rr = $('#rr').val()
    general_appearance = $('#general_appearance').val()
    level_of_consciousness = $('#level_of_consciousness').val()
    alerts = $('#alerts').val()
    history_of_illness = $('#history_of_illness').val()
    systematic_and_local_examination = $('#systematic_and_local_examination').val()
    additional_doctors_notes = $('#additional_doctors_notes').val()

    if (new_patient == 0 && exist_patient == 0) {
        alert("Select New Patient or Existing Patient")
        return false
    }

    if (new_patient == 1 && (first_name == '' || surname == '')) {
        alert("First Name and Surname is Mandatory")
        return false
    }

    else if (exist_patient == 1 && (patient3 == '')) {
        alert('Patient is Mandatory')
        return false
    }

    e.preventDefault()

    payload = {
        "doctype": "Medical Details",
        "patient": patient3,
        "patient_name": patientname3,
        "first_name": first_name,
        "surname": surname,
        "enrolment_number": enr_num,
        "enrolment_date": enr_date,
        "non_cancer": noncancer,
        "if_cancer": cancer,
        "primary_site": type_cancer,
        "secondary_site": s_site,
        "diagnosed_year": d_year,
        "diagnosed_by": d_by,
        "recovered_year": r_year,
        "re_occured_year": re_year,
        "stage": stage1,
        "prognosis": prognosis,
        "chemotherapy": chemotherapy_type,
        "radiation_type": radiation_type,
        "immunotherapy_type": immunotherapy_type,
        "surgery": surgery,
        "type_of_non_cancer": type_of_non_cancer,
        "diagnosed_year1": diag_year,
        "diagnosed_from1": diag_from,
        "prognosis1": prognosis1,
        "is_on_active_treatment": active_treatment,
        "alternative_therapies": alternative_therapies,
        "comorbidiities": comorbidiities,
        "allergens": allergens,
        "diagnosis": diagnosis1,
        "prognosis2": prognosis2,
        "revealed_by": revealed_by,
        "diagnosis1": diagnosis2,
        "prognosis3": prognosis3,
        "revealed_by1": revealed_by1,
        "site": site1,
        "intensity_score": i_score,
        "type": type1,
        "frequency": frequency,
        "aggravator": aggravator,
        "reliever": reliever,
        "impact_of_pain_on_quality_of_life": impact_of,
        "treatment_history_analgesics_only": treatment1,
        "response_to_pain_medications": response1,
        "others": p_others,
        "height": height1,
        "weight": weight1,
        "blood_pressure": blood_pressure,
        "pulse": pulse,
        "temperature": temperature1,
        "spo2": spo2,
        "pallor": pallor,
        "icterus": icterus,
        "clubbing": clubbing,
        "lymphadenopathy": lymphadenopathy,
        "oedema": oedema,
        "ambulation": ambulation,
        "cyanosis": cyanosis,
        "oral_examination": oral_examination,
        "pr": pr,
        "rr": rr,
        "general_appearance": general_appearance,
        "level_of_consciousness": level_of_consciousness,
        "alerts": alerts,
        "history_of_illness": history_of_illness,
        "systematic_and_local_examination": systematic_and_local_examination,
        "additional_doctors_notes_on_enrollment": additional_doctors_notes
    }

    const sendMsg = (payload) => new Promise((resolve, reject) => {

        console.log(payload)

        if (payload.first_name === "" && payload.patient3 === "") {
            reject('send_failed')
        }

        else {
            console.log('payload==>', payload)


            // const sendMsg = (payload) => new Promise((resolve, reject) => {
            obj = JSON.parse(JSON.stringify(payload))
            navigator.serviceWorker.controller.postMessage({
                type: 'MEDICAL',
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
})