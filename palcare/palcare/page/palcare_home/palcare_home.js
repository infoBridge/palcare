
frappe.pages['palcare-home'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: '',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js')
			.then(function (registration) {
				registration.addEventListener('updatefound', function () {
					// If updatefound is fired, it means that there's
					// a new service worker being installed.
					var installingWorker = registration.installing;
					console.log('A new service worker is being installed:',
						installingWorker);

					// You can listen for changes to the installing service worker's
					// state via installingWorker.onstatechange
				});
			})
			.catch(function (error) {
				console.log('Service worker registration failed:', error);
			});
	} else {
		console.log('Service workers are not supported.');
	}
	window.onload = function () {
		if (!window.location.hash) {
			window.location = window.location + '#loaded';
			window.location.reload();
		}
	}
	$(document).ready(function () {
		if (!window.location.hash) {
			window.location = window.location + '#loaded';
			window.location.reload();
		}
	})
	let container = $(frappe.render_template("card_container")).appendTo(page.main);
	let title = document.querySelector('.title-text')
	let bg = document.querySelector('.page-container')
	let page_head = document.querySelector('.page-head.drop-shadow')
	let head = document.querySelector('.page-head')
	let nav = document.querySelector('.navbar')

	let actions = x = document.querySelector('.page-actions')
	actions.style.display = "none"
	let titleText = document.querySelector('.page-title')
	titleText.style.display = "none"
	let headPwa = document.querySelector('.page-head-content')
	headPwa.style.justifyContent = "center"
	title.style.display = 'none'
	bg.style.backgroundColor = "#E5E5E5"
	head.style.backgroundColor = "#E5E5E5"
	nav.style.backgroundColor = "#E5E5E5"
	let card = frappe.render_template("card");

	//Hiding Enroll Button for b and c category users
	let role = frappe.user_roles
	let b_user = role.filter(word => word == 'B category');
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category" || b_user == "B category") && (admin != "Administrator")) {
		$('#home-id-enroll').attr('class', 'd-none')
		$('#home-enroll-para').attr('class', 'd-none')
	} else {
		$('#home-id-enroll').removeClass('d-none')
	}
	//Hiding Enroll Button for b and c category users End

	//Fetching Data for view/update patients part
	frappe.db.get_list('Patient', {
		fields: ['*'],
		limit: 8
	}).then(records => {
		records.map((x) => {
			var new_patient = $(card);
			new_patient.find('.palcare_home').attr('id', `patient_${x.name}`)
			if (x.photo_of_patient)
				new_patient.find('.ayman').attr('src', `${x.photo_of_patient}`)
			else
				new_patient.find('.ayman').attr('src', `${base_url}/files/Group%20539.png`)
			new_patient.find('.name').html(x.first_name)
			new_patient.find('.name1').html(x.sur_name == null ? " " : x.sur_name)
			$("body").on('click', `#patient_${x.name}`, () => {
				window.location = `${base_url}/app/patient-bio/#${x.name}`
			})
			$(".card-list").append(new_patient);
		});
	})
		.catch(error => {

			console.log(error)
		})

	//Fetching Data for view/update patients part End
	frappe.call({
		method: `palcare.palcare_home.last_doc`,
		callback: function (r) {
			r.message.forEach((x) => {
				var new_card_details = $(container);
				frappe.db.get_doc("Patient", x.patient).then(patient_photo => {
					if (patient_photo.photo_of_patient)
						$('.card-active').append(`<a id=p-d-${x.patient}   style="width:10%;>    
						<div class="card-item">
						<div style="width:65%;" class="mx-auto">   
							<div class="image" style="position:relative; overflow:hidden; padding-bottom:100%;">
							<img class="" style="position:absolute;width:100%;height:100%" src="${patient_photo.photo_of_patient}">
						</div>
						</div>
						<div class="name text-center">${x.patient_name}</div>
	
						</div></a>`)
					else
						$('.card-active').append(`<a id=p-d-${x.patient}  style="width:10%;>    
						<div class="card-item">
						<div style="width:65%;" class="mx-auto">   
							<div class="image" style="position:relative; overflow:hidden; padding-bottom:100%;">
							<img style="position:absolute;width:100%;height:100%" src="${base_url}/files/Group%20539.png">
						</div>
						</div>
						<div class="name text-center" style="">${x.patient_name}</div> 
						</div></a>`)
					$("body").on('click', `#p-d-${x.patient}`, () => {
						window.location = `${base_url}/app/patient-details/#${x.patient}`
					})
				})
			});
		}

	})


	//Fetching Data for directory of patients by priority part End

	let manifest = document.createElement('link')
	manifest.rel = "manifest"
	manifest.href = "/manifest.webmanifest"
	document.head.appendChild(manifest)
	let alertBox = document.createElement('div')
	alertBox.classList.add('alert', 'alert-dark', 'fade', 'show')
	alertBox.style.height = "inherit"
	alertText = document.createElement('p')
	alertText.classList.add('text-alert')
	alertText.style.padding = "inherit"
	alertText.style.fontWeight = "700"
	alertText.style.paddingRight - "30px"
	alertText.innerHTML = "Click the button to install Palcare PWA"
	let closeBtn = document.createElement('button')
	closeBtn.type = "button"
	closeBtn.classList.add('close')
	closeBtn.dataDismiss = "alert"
	closeBtn.ariaLabel = "Close"
	closeBtn.setAttribute("data-dismiss", "alert")
	closeBtn.style.paddingLeft = "45px"
	let btnSpan = document.createElement('span')
	btnSpan.ariaHidden = "true"
	btnSpan.innerHTML = "&times;"
	closeBtn.appendChild(btnSpan)
	let addBtn = document.createElement('button')
	addBtn.classList.add('btn', 'btn-outline-dark', 'pwa')
	addBtn.innerHTML = "Install App"
	addBtn.style.justifyContent = "center"
	addBtn.style.marginRight = "30px"
	addBtn.style.height = "45px"
	let pwa_head = document.querySelector('.page-head .page-head-content')
	pwa_head.appendChild(alertBox)
	alertBox.appendChild(alertText)
	alertBox.appendChild(addBtn)
	alertBox.appendChild(closeBtn)
	$('.alert').alert()
	let deferredPrompt;
	alertBox.style.display = 'none'
	window.addEventListener('beforeinstallprompt', (e) => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;
		// Update UI to notify the user they can add to home screen
		alertBox.style.display = 'flex'
		addBtn.addEventListener('click', (e) => {
			// hide our user interface that shows our A2HS button
			alertBox.style.display = 'none';
			// Show the prompt
			deferredPrompt.prompt();
			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
				} else {
					console.log('User dismissed the A2HS prompt');
				}
				deferredPrompt = null;
			});
		});
	});
}