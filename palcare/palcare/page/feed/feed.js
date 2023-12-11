frappe.pages['feed'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Feed',
		single_column: true
	});
	document.body.style.backgroundColor = '#F2F2F2'
	let nav = document.querySelector('.navbar')
	let bg = document.querySelector('.page-head')
	container_body = document.querySelector('.page-container')
	bg.style.backgroundColor = '#F2F2F2'
	container_body.style.backgroundColor = '#F2F2F2'
	nav.style.backgroundColor = '#F2F2F2'

	frappe.require('/assets/palcare/js/utils.js', () => {
		base_url = base_url
	})
	
	let route = window.location.hash
	let split_hash = route.substring(1)
	feed = $(frappe.render_template("feed_data")).appendTo(page.main);;
	let feed_data = frappe.render_template("feed");

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

	//Adding Patient Name To the Top of the Page
	frappe.db.get_list('Patient', {
		fields: ['*'], filters: {
			name: split_hash,
		}
	}).then(rec => {
		rec.forEach(patient => {
			var new_patient1 = $(feed);
			new_patient1.find('.patient_name').html(patient.sur_name == null ? patient.first_name : patient.middle_name != null ?
				(patient.middle_name == null ? " " : patient.first_name + " " + patient.middle_name + " " + patient.sur_name) : patient.first_name + " " + patient.sur_name);
		});
	})
	//Adding Patient Name To the Top of the Page End

	//Fuction for data fetching
	frappe.db.get_list('Comments', {
		fields: ['*'],
		filters: {
			patient:split_hash,		
		} 
	}).then(records => {
		records.forEach(patient1 => {
			var new_patient1 = $(feed_data);			
			var date = new Date(patient1.creation);
			if (frappe.session.user == patient1.owner) {
				$('.patient_feed').append(`<div class="container">
				<div class="card card-user card-left bg-light text-dark"><br>
					<div class="card-body1" style="margin-left: 3%;color:#0D3756;">${`
						${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}- ${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}
						
					`}</div>
					<div class="card-body3" style="margin-left: 3%;color:#0D3756;"> You ${patient1.subject}</div><br>
				</div>
			</div><br><br>`)
			}
			else {
				$('.patient_feed').append(`<div class="container">
				<div class="card card-left bg-light text-dark" style="margin-left:-0.5%;"><br>
					<div class="card-body1" style="margin-left: 3%;color:#0D3756;">${`
						${date.getUTCDate()}/${date.getUTCMonth()}/${date.getFullYear()}- ${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}	
					`}</div>
					<div class="card-body3" style="margin-left: 3%;color:#0D3756;"> ${patient1.owner} ${patient1.subject}</div><br>
				</div>
			</div><br><br>`)
			}
		});
	})
	//Fuction for data fetching End 
}