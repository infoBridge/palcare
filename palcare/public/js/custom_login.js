
if (window.location.pathname=='/login'){

let signup = document.querySelector('.sign-up-message')
signup.className += " d-flex justify-content-center"
let login_img = document.createElement('div')
login_img.classList.add('jimmy-s')

signup.appendChild(login_img)
$('.navbar.navbar-light.navbar-expand-lg .navbar-brand').removeClass('navbar-brand')
$('.nav-item.nav-link.btn-login-area .active').removeClass('active')
$('.nav-link.btn-login-area').hide();
$('.nav-item.dropdown').hide();
$('.nav.navbar-nav.d-none.d-sm-flex a').hide();
$('.nav.navbar-nav.d-none.d-sm-flex > li:first-child').hide();
$('.ml-auto.navbar-nav').hide();	

let img_tag = document.createElement('img')
// img_tag.src="https://dev-palcare.frappe.cloud/files/JSB-Logo-Color.png"
img_tag.src = "https://dev-palcare.frappe.cloud/files/JSB-Logo-Color.png"
img_tag.classList.add('jimmy-img')
// login_img.appendChild(img_tag)
login_img.prepend(img_tag)

}