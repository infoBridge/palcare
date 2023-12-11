frappe.pages['patient-details'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Patient Details',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})
	let hash_val="#"
	let container = $(frappe.render_template("index")).appendTo(page.main);
	document.body.style.backgroundColor = '#F2F2F2'
	let nav = document.querySelector('.navbar')
	let bg = document.querySelector('.page-head')
	container_body = document.querySelector('.page-container')
	bg.style.backgroundColor = '#F2F2F2'
	container_body.style.backgroundColor = '#F2F2F2'
	nav.style.backgroundColor = '#F2F2F2'
	// let route = window.location.hash
	let details_url=window.location.href
	let decode_url=decodeURIComponent(details_url)
	let split_url=decode_url.split("#")
	let split_hash = split_url[1]
	let aa = window.location.href
	let mm = aa.search
	let details = document.getElementById("gdetails")
	let carePlan = document.getElementById("care-plan")
	let reportId = document.getElementById("report")
	let medicalId = document.getElementById("medicaldetails")
	let equipment = document.getElementById("equipment")
	let visit = document.getElementById("visit")
	let notes = document.getElementById("notes")
	let summary = document.getElementById("patientsummary")
	let med = document.getElementById("medication")
	let photos = document.getElementById("photos")
	let patient_name = document.getElementById("patient-id")
	let template = $(frappe.render_template("index"))

	//Adding Patient Name To the Top of the Page
	
	frappe.db.get_list('Patient', {
		fields: ['*'],
		filters: {
			name: split_hash
		}
	}).then(res => {
		res.forEach(record => {
			patient_name.innerHTML = (record.sur_name == null ? record.first_name : record.middle_name != null ?
				(record.middle_name == null ? " " : record.first_name + " " + record.middle_name + " " + record.sur_name) : record.first_name + " " + record.sur_name);
		})
	})
	//Adding Patient Name To the Top of the Page End

	//Patient agaist redirection to patient bio page
	$("body").on('click', '.patient-bio-btn', function (e) {
		window.location = `${base_url}/app/patient-bio/#${split_hash}`
		const url = new URL(window.location);
		url.searchParams.set(`${base_url}/app/`, `${base_url}/app/patient-bio/#${split_hash}`);
		window.history.pushState({}, '', url);
	})
	//Patient agaist redirection to patient bio page End

	//Patient agaist redirection to patient details page
	$("body").on('click', '.patient-details-btn', function (e) {
		window.location = `${base_url}/app/patient-details/#${split_hash}`
		const url = new URL(window.location);
		url.searchParams.set(`${base_url}/app/`, `${base_url}/app/patient-details/#${split_hash}`);
		window.history.pushState({}, '', url);
	})
	//Patient agaist redirection to patient details page End

	//Patient agaist redirection to feed page
	$("body").on('click', '.patient-feed-btn', function (e) {
		window.location = `${base_url}/app/feed/#${split_hash}`
		const url = new URL(window.location);
		url.searchParams.set(`${base_url}/app/`, `${base_url}/app/feed/#${split_hash}`);
		window.history.pushState({}, '', url);
	})
	//Patient agaist redirection to feed page End

	//Patient Against redirection to patient details
	details.onclick = function () {
		// window.history.pushState({}, '', `${base_url}/app/patient/${split_hash}`)
		frappe.set_route(`/app/patient/${split_hash}`)
		
	}
	//Patient Against redirection to patient details End

	//Patient Against redirection to Clincical assessment page
	carePlan.onclick = function () {
		// window.history.pushState({}, '', `${base_url}/app/clinical-assesment/#${split_hash}`)
		let clnic_url=decodeURIComponent(`/app/assessment-care/#${split_hash}`)
		frappe.set_route(clnic_url)
	}
	//Patient Against redirection to Clincical assessment page End

	//Patient Against redirection to reports page
	reportId.onclick = function () {
		let report_url=decodeURIComponent(`/app/palcare-reports/#${split_hash}`)
		frappe.set_route(report_url)
		// window.history.pushState({}, '', `${base_url}/app/palcare-reports/#${split_hash}`)
	}
	//Patient Against redirection to reports page End

	//Patient Against redirection to Medical details
	medicalId.onclick = function () {
		frappe.set_route("List", "Medical Details", { "patient": split_hash })
	}
	//Patient Against redirection to Medical details page End

	//Patient Against redirection to euipment loaned
	equipment.onclick = function () {
		// window.history.pushState({}, '', `${base_url}/app/palcare-equipment-lo/#${split_hash}`)
		let eqp_url=decodeURIComponent(`/app/palcare-equipment-lo/#${split_hash}`)
		frappe.set_route(eqp_url)
	}
	//Patient Against redirection to euipment loaned page End

	//Patient Against redirection to visit details
	visit.onclick = function () {
		frappe.set_route("List", "Visit Details", { "patient": split_hash })
	}
	//Patient Against redirection to visit details page End

	//Patient Against redirection to notes pages
	notes.onclick = function () {
		// window.history.pushState({}, '', `${base_url}/app/palcare-notes/#${split_hash}`)
		let note_url=decodeURIComponent(`/app/palcare-note_display/#${split_hash}`)
		frappe.set_route(note_url)
		
	}
	//Patient Against redirection to notes page End

	//Patient Against redirection to patient summary page
	summary.onclick = function () {
		frappe.set_route("List", "Patient Summary Card", { "patient_name": split_hash })
	}
	//Patient Against redirection to patient summary page End

	//Patient Against redirection to medical schedule page
	med.onclick = function () {
		// window.history.pushState({}, '', `${base_url}/app/medi-schedule/#${split_hash}`)
		let med_url=decodeURIComponent(`/app/medi-schedule/#${split_hash}`)
		frappe.set_route(med_url)
	}
	//Patient Against redirection to medical schedule page End

	//Patient Against redirection to Photo page
	photos.onclick = function () {
		// window.history.pushState({}, '', `${base_url}/app/photo/#${split_hash}`)
		let photo_url=decodeURIComponent(`/app/photo/#${split_hash}`)
		console.log(photo_url)
		frappe.set_route(photo_url)
		
	}
	//Patient Against redirection to Photo page End

}