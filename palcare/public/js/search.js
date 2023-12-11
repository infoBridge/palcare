$(window).on('load', page_changed);
function page_changed(e) {

	$('.nav-item.dropdown.dropdown-help.dropdown-mobile.d-none.d-lg-block').removeClass('d-lg-block')
	// if ('serviceWorker' in navigator){
	//     navigator.serviceWorker.register('/service-worker.js');
	// }
	// let x = document.querySelector('.container')

	$("a[href='/app']").attr('href', '/app/palcare-home')
	$('.nav.navbar-nav.d-none.d-sm-flex').removeClass('d-sm-flex');

	//Higing offline forms from nav bar for c category
	$('[href*="enroll"]').addClass('m-select');
	let role = frappe.user_roles
	let b_user = role.filter(word => word == 'B category');
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((b_user == "B category") && (admin != "Administrator")) {
		$("a[href='/enroll']").attr('href', '/epas');
	}
	if ((result == "C category") && (admin != "Administrator")) {
		$('.m-select').hide();
	} else {
		$('.m-select').removeClass('d-none')
	}
	//Higing offline forms from nav bar for c category End 

	let logo_nav = document.querySelector('.navbar .navbar-brand')
	logo_nav.href = "/app/palcare-home"
	nav = document.querySelector('.navbar-home')
	let logo = document.querySelector('.app-logo')
	let button_primary = document.querySelector('.primary-action')
	let search_modal_btn = document.querySelector('.btn-modal-primary')
	logo.style.width = '100px'
	logo.style.height = '82px'
	let search_button = document.createElement('button')
	search_button.classList.add('btn', 'btn-primary', 'order')
	search_button.innerHTML = 'Patient Search'
	search_button.style.backgroundColor = '#395F6F !important'
	form = document.querySelector('.form-inline')
	form.appendChild(search_button)

	let back_button = document.createElement('i')
	if (window.location.pathname == '/app/palcare-home') {
		back_button.classList.add('fa', 'fa-angle-left', 'back-icon', 'd-none')
	}
	else {
		back_button.classList.add('fa', 'fa-angle-left', 'back-icon')
	}
	back_button.style.fontSize = '36px'
	let navbar_back = document.querySelector('.main-section header.navbar .container')
	navbar_back.prepend(back_button)
	back_button.onclick = function () {
		window.history.go(-1)
	}

	frappe.require('/assets/palcare/js/utils.js', () => {
		base_url = base_url
	})

	nav.onclick = function () {
		window.history.pushState({}, '', `${base_url}/app/palcare-home`)
		window.location.reload()		
	}

	search_button.style.marginRight = "3%"
	// 	search_button.append(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
	// 	<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
	// 	<path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
	// 	<path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
	//   </svg>`)

	search_button.onclick = function () {
		let d = new frappe.ui.Dialog({
			title: 'Search by',
			fields: [
				{
					label: 'First Name',
					fieldname: 'first_name',
					fieldtype: 'Data'
				},
				{
					label: 'Surname',
					fieldname: 'sur_name',
					fieldtype: 'Data'
				},
				{
					label: 'Enrolment Number',
					fieldname: 'enrolment_number',
					fieldtype: 'Data'
				},
				{
					label: 'Mobile Number',
					fieldname: 'mobile_number',
					fieldtype: 'Int'
				},
				{
					label: 'Locality',
					fieldname: 'locality',
					fieldtype: 'Data'
				},
				{
					label: 'Month of Enrolment',
					fieldname: 'enrolment_month',
					fieldtype: 'Select',
					options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
				},
			],
			primary_action_label: 'Search',

			primary_action(values) {			
				$("body").on('click', '.modal-footer button', function (e) {
					let object_value = { "first_name": "haj", "sur_name": "haj", "enrolment_number": "8787", "mobile_number": "9987", "enrolment_month": "27-03-97", "locality": "feroke" }
					let valueis = Object.keys(object_value);
					let url = ''
					const objArray = [];
					Object.keys(values).forEach(key =>
						// 	 objArray.push({
						// 	name: key,
						// 	rating: object_value[key]
						// })
						url = url + `${key}=${values[key]}&`
					);
					window.location.href = `${base_url}/app/search-result/q?${url}`
				})
				d.hide();
			}
		});
		d.show();
	}
};
