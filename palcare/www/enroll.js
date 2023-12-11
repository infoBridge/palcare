var broadcast = null

$('.navbar-brand').removeClass('navbar-brand')
if ('serviceWorker' in navigator) {

  window.addEventListener('load', function () {

    // broadcast = new BroadcastChannel('count-channel');

    // // Listen to the response
    // broadcast.onmessage = (event) => {
    //   console.log(event.data.payload, "broadcast message");

    // };

    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {


      console.log('sw success with scope:', registration.scope)

    }, function (err) {

      console.log('ServiceWorker registration failed:', err)
    })
      .catch((e) => {

        console.log(e, "failed")
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
    if (res.data && res.data.type === "ENROLL") {

      console.log("new message", res)
    }
  }

}

//Future date validation for enrolment date
$('#enrolment').on('change', () => {
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
      alert("Please Enter a valid Enrolment Date")
      if ($('#enrolment').val()) {
        $("#enrolment").val('n').trigger('change')
        $('.modal-backdrop.fade.show').hide();
        $('.modal').remove();
        $('.modal-backdrop').remove();
        $('body').removeClass("modal-open");
      }
    }
  }
  calculate($('#enrolment').val())
})
//Future date validation for enrolment date End

//Age caliculation
$('#dob').on('change', () => {
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
      alert("Please enter a valid Date of birth")
      if ($('#dob').val()) {
        $("#dob").val('n').trigger('change')
        $('.modal-backdrop.fade.show').hide();
        $('.modal').remove();
        $('.modal-backdrop').remove();
        $('body').removeClass("modal-open");
        $('#age').val(' ')
      }
    } else {
      $('#age').val(`${year}`)
    }
    if (year == 0) {
      $('#age').val(`${month} Months`)
    }
    if (month == 0) {
      $('#age').val(`${day} Days`)

    }
  }
  calculate($('#dob').val())
})
//Age calculation end

//Checkbox Function for 'Same as patient address and mobile number'
function myFunction() {
  if (document.getElementById('adrs').checked) {
    var address = document.getElementById('address').value;
    document.getElementById('address1').value = address;
  }
  else {
    document.getElementById('address1').value = "";
  }
}

function myFunction2() {
  if (document.getElementById('mobnum').checked) {
    var mobile = document.getElementById('mobile').value;
    document.getElementById('mobile_number1').value = mobile;
  }
  else {
    document.getElementById('mobile_number1').value = "";
  }
}

function myTelenum() {
  if (document.getElementById('telenum').checked) {
    var telephone = document.getElementById('telephone').value;
    document.getElementById('telephone_number1').value = telephone;
  }
  else {
    document.getElementById('telephone_number1').value = "";
  }
}

function myAddress() {
  if (document.getElementById('adr1').checked) {
    var address = document.getElementById('address').value;
    document.getElementById('adres1').value = address;
  }
  else {
    document.getElementById('adres1').value = "";
  }
}

function myMobl() {
  if (document.getElementById('moblnum').checked) {
    var mobile = document.getElementById('mobile').value;
    document.getElementById('mobl_num1').value = mobile;
  }
  else {
    document.getElementById('mobl_num1').value = "";
  }
}

function myTelephone() {
  if (document.getElementById('tele_num').checked) {
    var telephone = document.getElementById('telephone').value;
    document.getElementById('tele_phn1').value = telephone;
  }
  else {
    document.getElementById('tele_phn1').value = "";
  }
}

function myAddress1() {
  if (document.getElementById('adrss1').checked) {
    var address = document.getElementById('address').value;
    document.getElementById('ad7').value = address;
  }
  else {
    document.getElementById('ad7').value = "";
  }
}

function myMoble() {
  if (document.getElementById('moblnums').checked) {
    var mobile = document.getElementById('mobile').value;
    document.getElementById('mb7').value = mobile;
  }
  else {
    document.getElementById('mb7').value = "";
  }
}

function myTelephone1() {
  if (document.getElementById('tele_nums').checked) {
    var telephone = document.getElementById('telephone').value;
    document.getElementById('tn7').value = telephone;
  }
  else {
    document.getElementById('tn7').value = "";
  }
}
//Checkbox Function for 'Same as patient address and mobile number' End

//Mobile number validation
function myFunction1() {
  let x = document.getElementById("mobile").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Mobile Number");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 10) {
      alert("Mobile number of Patient should be 10 digits")
    }
  }
}

function myMob() {
  let x = document.getElementById("mobile_number1").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Mobile Number");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 10) {
      alert("Mobile number of Caregiver One should be 10 digits")
    }
  }
}

function myMob1() {
  let x = document.getElementById("mobl_num1").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Mobile Number");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 10) {
      alert("Mobile number of Caregiver Two should be 10 digits")
    }
  }
}

function myMob2() {
  let x = document.getElementById("mb7").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Mobile Number");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 10) {
      alert("Mobile number of Decision maker’s should be 10 digits")
    }
  }
}

function myMob3() {
  let x = document.getElementById("mobile_number2").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Mobile Number");
  }
  else if (x != '') {
    let length = x.length;

    if (length != 10) {
      alert("Mobile number of Referred By  should be 10 digits")
    }
  }
}

function myMob4() {
  let x = document.getElementById("mobile_number3").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Mobile Number");
  }
  else if (x != '') {
    let length = x.length;

    if (length != 10) {
      alert("Mobile number of General Physician’s should be 10 digits")
    }
  }
}

function myMob5() {
  let x = document.getElementById("mobile_number4").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Mobile Number");
  }
  else if (x != '') {
    let length = x.length;

    if (length != 10) {
      alert("Mobile number of Treating Onco Specialist should be 10 digits")
    }
  }
}

function myMob6() {
  let x = document.getElementById("mb6").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Mobile Number");
  }
  else if (x != '') {
    let length = x.length;

    if (length != 10) {
      alert("Mobile number of Treating Specialist’s should be 10 digits")
    }
  }
}
//Mobile number validation

//Name validation
$("#first_name").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});
$("#middle_name").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});
$("#surname").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#first_name1").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#middle_name1").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#surname1").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#fir_name1").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#mdle_name1").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#srname1").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#first_name7").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#middle7").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#su7").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#first_name2").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#middle_name2").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#sur_name2").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#first_name3").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#middle_name3").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#sur_name3").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#first_name4").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#middle_name4").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#sur_name4").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#first_name6").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#mid6").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});

$("#sur6").keypress(function (e) {
  var regex = new RegExp("^[a-zA-Z ]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
});
//Name validation End

//Pincode validation
function myPincode() {
  let x = document.getElementById("pin_code").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Pincode");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 6) {
      alert("Pincode of Patient should be 6 digits")
    }
  }
}

function myPincode1() {
  let x = document.getElementById("pin_code1").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Pincode");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 6) {
      alert("Pincode of Caregiver One's should be 6 digits")
    }
  }
}

function myPincode2() {
  let x = document.getElementById("pin_code2").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Pincode");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 6) {
      alert("Pincode of Caregiver Two's should be 6 digits")
    }
  }
}

function myPincode3() {
  let x = document.getElementById("pin_code3").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Pincode");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 6) {
      alert("Pincode of Decision maker’s should be 6 digits")
    }
  }
}

function myPincode4() {
  let x = document.getElementById("pin_code4").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Pincode");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 6) {
      alert("Pincode of Referred By should be 6 digits")
    }
  }
}

function myPincode5() {
  let x = document.getElementById("pin_code5").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Pincode");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 6) {
      alert("Pincode of General Physician’s should be 6 digits")
    }
  }
}

function myPincode6() {
  let x = document.getElementById("pin_code6").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Pincode");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 6) {
      alert("Pincode of Treating Onco Specialist should be 6 digits")
    }
  }
}

function myPincode7() {
  let x = document.getElementById("pin_code7").value;
  let text;
  if (isNaN(x)) {
    alert("This is not a valid  Pincode");
  }
  else if (x != '') {
    let length = x.length;
    if (length != 6) {
      alert("Pincode of Treating Specialist’s should be 6 digits")
    }
  }
}
//Pincode validation

//Function for Camera 
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

var mediaStream = null;
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

function clearPhoto(image) {
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

document.getElementById('patient_enroll_submit').onclick = (event) => {
  var first_name = $("#first_name").val()
  var surname = $('#surname').val()
  var enrolment = $('#enrolment').val()
  var zone = $('#zone').val()
  var address = $('#address').val()
  var mobile = $('#mobile').val()
  var first_name1 = $('#first_name1').val()
  var mobile_number1 = $('#mobile_number1').val()
  var canvas = document.getElementById("img_data");
  if (canvas.src != window.location.href) {
    if (first_name == "" || surname == "" || enrolment == "" || zone == "" || address == "" || mobile == "" || first_name1 == "" || mobile_number1 == "") {
    } else {
      image = canvas.src.replace("image/png", "image/octet-stream");
      var link = document.createElement('a');
      first_name = first_name ? first_name : "my-image.png"
      link.download = `${first_name} -Consent Form.png`;
      link.href = image;
      link.click();
      frappe.show_alert({
        message: __('Document Saved'),
        indicator: 'green'
      }, 10);
      location.reload(true);
    }
  }

  var canvas_c = document.getElementById("img_data1");
  if (canvas_c.src != window.location.href) {
    if (first_name == "" || surname == "" || enrolment == "" || zone == "" || address == "" || mobile == "" || first_name1 == "" || mobile_number1 == "") {
    } else {
      image = canvas_c.src.replace("image/png", "image/octet-stream");
      var Clink = document.createElement('a');
      first_name = first_name ? `${first_name}` : "my-image.png"
      Clink.download = `${first_name}.png`;
      Clink.id = "img_data1"
      Clink.href = image;
      Clink.click();
      frappe.show_alert({
        message: __('Document Saved'),
        indicator: 'green'
      }, 5);
      location.reload(true);
    }
  }
}
clearPhoto();
//Function for Camera End

let form_id = document.getElementById("game_of_throne")
$("#patient_enroll_submit").on('click', function (e) {
  salutation = $("#salutation").val()
  first_name = $('#first_name').val()
  middle_name = $('#middle_name').val()
  surname = $('#surname').val()
  enrolment_num = $('#enrolment_num').val()
  enrolment = $('#enrolment').val()
  priority = $('#priority').val()
  zone = $('#zone').val()
  address = $('#address').val()
  pin_code = $('#pin_code').val()
  locality = $('#locality').val()
  mobile = $('#mobile').val()
  telephone = $('#telephone').val()
  email = $('#email').val()
  dob = $('#dob').val()
  age = $('#age').val()
  gender = $('#gender').val()
  mstatus = $('#mstatus').val()
  classification = $('#classification').val()
  employment = $('#employment').val()
  education = $('#education').val()
  family_members = $('#family_members').val()
  primary_lan = $('#primary_lan').val()
  pan = $('#pan').val()
  aadhar = $('#aadhar').val()
  cp1 = $('#cp1').val()
  first_name1 = $('#first_name1').val()
  middle_name1 = $('#middle_name1').val()
  surname1 = $('#surname1').val()
  address1 = $('#address1').val()
  adrs = $('#adrs').prop('checked') ? 1 : 0;
  pin_code1 = $('#pin_code1').val()
  locality1 = $('#locality1').val()
  mobile_number1 = $('#mobile_number1').val()
  mobnum = $('#mobnum').prop('checked') ? 1 : 0;
  telephone_number1 = $('#telephone_number1').val()
  telenum = $('#telenum').prop('checked') ? 1 : 0;
  email1 = $('#email1').val()
  ctp1 = $('#ctp1').val()
  fir_name1 = $('#fir_name1').val()
  mdle_name1 = $('#mdle_name1').val()
  srname1 = $('#srname1').val()
  adres1 = $('#adres1').val()
  adr1 = $('#adr1').prop('checked') ? 1 : 0;
  pin_code2 = $('#pin_code2').val()
  lcalty1 = $('#lcalty1').val()
  mobl_num1 = $('#mobl_num1').val()
  moblnum = $('#moblnum').prop('checked') ? 1 : 0;
  tele_phn1 = $('#tele_phn1').val()
  tele_num = $('#tele_num').prop('checked') ? 1 : 0;
  patient_email1 = $('#patient_email1').val()
  con = $('#con').val()
  first_name7 = $('#first_name7').val()
  middle7 = $('#middle7').val()
  su7 = $('#su7').val()
  ad7 = $('#ad7').val()
  adrss1 = $('#adrss1').prop('checked') ? 1 : 0;
  pin_code3 = $('#pin_code3').val()
  locality7 = $('#locality7').val()
  mb7 = $('#mb7').val()
  moblnums = $('#moblnums').prop('checked') ? 1 : 0;
  tn7 = $('#tn7').val()
  tele_nums = $('#tele_nums').prop('checked') ? 1 : 0;
  email7 = $('#email7').val()
  first_name2 = $('#first_name2').val()
  middle_name2 = $('#middle_name2').val()
  sur_name2 = $('#sur_name2').val()
  address2 = $('#address2').val()
  pin_code4 = $('#pin_code4').val()
  mobile_number2 = $('#mobile_number2').val()
  telephone_number2 = $('#telephone_number2').val()
  email2 = $('#email2').val()
  type_of_referral = $('#type_of_referral').val()
  first_name3 = $('#first_name3').val()
  middle_name3 = $('#middle_name3').val()
  sur_name3 = $('#sur_name3').val()
  address3 = $('#address3').val()
  pin_code5 = $('#pin_code5').val()
  mobile_number3 = $('#mobile_number3').val()
  telephone_number3 = $('#telephone_number3').val()
  email3 = $('#email3').val()
  first_name4 = $('#first_name4').val()
  middle_name4 = $('#middle_name4').val()
  sur_name4 = $('#sur_name4').val()
  address4 = $('#address4').val()
  pin_code6 = $('#pin_code6').val()
  mobile_number4 = $('#mobile_number4').val()
  telephone_number4 = $('#telephone_number4').val()
  email4 = $('#email4').val()
  first_name6 = $('#first_name6').val()
  mid6 = $('#mid6').val()
  sur6 = $('#sur6').val()
  ad6 = $('#ad6').val()
  pin_code7 = $('#pin_code7').val()
  mb6 = $('#mb6').val()
  tn6 = $('#tn6').val()
  email6 = $('#email6').val()
  middle_name3 = $('#middle_name3').val()
  chronic = $('#the_patient_has_a_chronic_debilitating_disease').prop('checked') ? 1 : 0;
  place_care = $('#the_home_is_the_preferred_place_of_care').prop('checked') ? 1 : 0;
  home_env = $('#the_home_environment_is_appropriate_and_safe_for_patient').prop('checked') ? 1 : 0;
  home_staff = $('#the_home_environment_is_appropriate_and_safe_for_palcare_staff').prop('checked') ? 1 : 0;
  provide_care = $('#an_identified_primary_care_person_is_available_to_provide_care').prop('checked') ? 1 : 0;
  agree = $('#agreeable').prop('checked') ? 1 : 0;

  if (first_name == "") {
    alert("Please Enter Patient's First Name ")
  }
  else if (surname == "") {
    alert("Please Enter Patient's Surname ")
  }
  else if (enrolment == "") {
    alert("Please Enter Date of enrollment")
  }
  else if (zone == null || zone == "") {
    alert("Please Select Zone")
  }
  else if (address == "") {
    alert("Please Enter Address")
  }
  else if (mobile == "") {
    alert("Please Enter Patient Mobile Number")
  }
  else if (first_name1 == "") {
    alert("Please Enter Caregiver One's Name ")
  }
  else if (mobile_number1 == "") {
    alert("Please Enter Caregiver One's Mobile Number")
  }

  e.preventDefault()

  payload = {

    "doctype": "Patient",
    "salutation": salutation,
    "first_name": first_name,
    "middle_name": middle_name,
    "sur_name": surname,
    "enrolment_number": enrolment_num,
    "date_of_enrolment": enrolment,
    "priority": priority,
    "zone": zone,
    "address": address,
    "pin_code": pin_code,
    "locality": locality,
    "mobile_number": mobile,
    "telephone_number": telephone,
    "email": email,
    "date_of_birth": dob,
    "age": age,
    "gender": gender,
    "marital_status": mstatus,
    "classification": classification,
    "employment": employment,
    "education": education,
    "number_of_family_members_in_the_same_house": family_members,
    "primary_language": primary_lan,
    "pan_no": pan,
    "aadhar_no": aadhar,
    "connection_to_patient": cp1,
    "first_name1": first_name1,
    "middle_name1": middle_name1,
    "sur_name1": surname1,
    "address1": address1,
    "same_as_address": adrs,
    "pin_code1": pin_code1,
    "locality1": locality1,
    "mobile_number1": mobile_number1,
    "same_as_mobil": mobnum,
    "telephone_number1": telephone_number1,
    "same_as_tele": telenum,
    "email1": email1,
    "connection_to_patient1": ctp1,
    "fst_name2": fir_name1,
    "mdl_name2": mdle_name1,
    "srname2": srname1,
    "adrs2": adres1,
    "same_as_addr1": adr1,
    "pin_code2": pin_code2,
    "locality2": lcalty1,
    "mobile_no2": mobl_num1,
    "same_as_mob1": moblnum,
    "telephone_no2": tele_phn1,
    "same_as_tele1": tele_num,
    "emal2": patient_email1,
    "con": con,
    "first_name7": first_name7,
    "middle7": middle7,
    "su7": su7,
    "ad7": ad7,
    "same_as_addrss2": adrss1,
    "pin_code3": pin_code3,
    "locality7": locality7,
    "mb7": mb7,
    "same_as_mobil2": moblnums,
    "tn7": tn7,
    "same_as_telephn2": tele_nums,
    "email7": email7,
    "first_name2": first_name2,
    "middle_name2": middle_name2,
    "sur_name2": sur_name2,
    "address2": address2,
    "pin_code4": pin_code4,
    "mobile_number2": mobile_number2,
    "telephone_number2": telephone_number2,
    "email2": email2,
    "type_of_referral": type_of_referral,
    "first_name3": first_name3,
    "middle_name3": middle_name3,
    "sur_name3": sur_name3,
    "address3": address3,
    "pin_code5": pin_code5,
    "mobile_number3": mobile_number3,
    "telephone_number3": telephone_number3,
    "email3": email3,
    "first_name4": first_name4,
    "middle_name4": middle_name4,
    "sur_name4": sur_name4,
    "address4": address4,
    "pin_code6": pin_code6,
    "mobile_number4": mobile_number4,
    "telephone_number4": telephone_number4,
    "email4": email4,
    "first_name6": first_name6,
    "mid6": mid6,
    "sur6": sur6,
    "ad6": ad6,
    "mb6": mb6,
    "tn6": tn6,
    "email6": email6,
    "the_patient_has_a_chronic_debilitating_disease": chronic,
    "the_home_is_the_preferred_place_of_care": place_care,
    "the_home_environment_is_appropriate_and_safe_for_patient": home_env,
    "the_home_environment_is_appropriate_and_safe_for_palcare_staff": home_staff,
    "an_identified_primary_care_person_is_available_to_provide_care": provide_care,
    "agreeable": agree,
  }
  console.log("payload", payload)

  const sendMsg = (payload) => new Promise((resolve, reject) => {

    console.log(payload)

    if ((payload.first_name === "") || (payload.sur_name === "") || (payload.address === "") || (payload.enrolment === "") || (payload.zone === "") || (payload.mobile_number === "") || (payload.first_name1 === "") || (payload.mobile_number1 === "")) {
      reject('send_failed')
    }
    if (payload.mobile_number != '') {
      let length = payload.mobile_number.length;
      if (length != 10) {
        alert("Mobile number of Patient should be 10 digits")
        reject('send_failed')
      }
      else if (payload.mobile_number1 != '') {
        let length1 = payload.mobile_number1.length;
        if (length1 != 10) {
          alert("Mobile number of Caregiver 1 should be 10 digits")
          reject('send_failed')
        }
        else {
          console.log('payload==>', payload)
          obj = JSON.parse(JSON.stringify(payload))
          console.log(obj, "resolve object")

          navigator.serviceWorker.controller.postMessage({
            type: 'ENROLL',
            data: obj
          })
          // broadcast.postMessage({
          //   type: 'ENROLL',
          //   data: obj,
          // });
          resolve('sendMessage_succesful')
        }
      }
    }

  })

  // sendMsg()
  sendMsg(payload).then((e) => {
    form_id.reset()
    frappe.show_alert({
      message: __('Document Saved'),
      indicator: 'green'
    }, 5);

    game_of_throne

  })
    .catch(e => {
      frappe.show_alert({
        message: __('Document Not Saved,Please Try Again'),
        indicator: 'red'
      }, 5);
    })
})




