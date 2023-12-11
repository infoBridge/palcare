frappe.pages['medi-schedule'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Medications',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})

	let feed = $(frappe.render_template("medic_schedule")).appendTo(page.main);
	let schedule_card = frappe.render_template("schedule_card");
	// let route = window.location.hash
	let med_url=window.location.href
	let decode_url=decodeURIComponent(med_url)
	let split_url=decode_url.split("#")
	// let split_hash = route.substring(1)
	let split_hash=split_url[1]
	let schedule = document.getElementById("sched")

	//Hiding Add(+) Button for c category users
	let role = frappe.user_roles
	let b_user = role.filter(word => word == 'B category');
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category") && (admin != "Administrator")) {
		$('#sched').attr('class', 'd-none')
	} else {
		$('#sched').removeClass('d-none')
	}
	//Hiding Add(+) Button for c category users End

	// Fuction for Add(+) Button-Creating New Medication
	schedule.onclick = function () {
		frappe.route_options = { "patient": split_hash }
		frappe.set_route("medication/new-medication-1")
	}
	// Fuction for Add(+) Button-Creating New Medication End
	
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

	//Fetching data of medication on enrolment
	frappe.db.get_list('Medication', {
		fields: ['*'],
		filters: {
			patient: split_hash,
		
		}
	}).then(records => {
		if (records.length > 0) {
		records.forEach(patient => {
			var new_patient = $(schedule_card);
			new_patient.find('.date3').html(patient.date);
			new_patient.find('.user3').html(patient.user);
			new_patient.find('.type3').html(patient.medication_type);
			new_patient.find('.card_img3').attr('id', `${patient.patient}_id`)
			if (patient.image) {
				new_patient.find('.card_img3').attr('src', `${patient.image}`)
			}
			else {
				new_patient.find('.card_img3').hide();
				new_patient.find('.cardd').hide();
			}
			$(".medic").append(new_patient);
			$(document).ready(function () {
				let loaned_pal = document.getElementsByClassName('medic');
				if (loaned_pal.length > 0) {
					$('.med_list_btn').removeClass('d-none')
				}
			})
		})
	
	}
	else {
		$(".medic").append(`<br><h3 style=text-align:center;>No Data Found</h3><hr style="width: 100%; border-top: 2px solid gray;">`)
	};
	})
	//Fetching data of medication on enrolment End

	/	//Fuction for 'View More' button
	$("body").on('click', '.med_list_btn', function (e) {
		frappe.set_route("List", "Medication", {"patient": `${split_hash}`})
		const url = new URL(window.location);
		window.history.pushState({}, '', url);
	})
	//Fuction for 'View More' button End

}