frappe.pages['palcare-notes'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Notes',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})

	let feed=$(frappe.render_template("note_data")).appendTo(page.main);;
	let care_notes = frappe.render_template("care_notes");
	// let route = window.location.hash
	let note_url=window.location.href
	let decode_url=decodeURIComponent(note_url)
	let split_url=decode_url.split("#")
	// let split_hash = route.substring(1)
	let split_hash=split_url[1]
	let note = document.getElementById("pal-note")
	let Nurse1 = document.getElementById("nurse1")
	let dcoms = document.getElementById("dcoms")

	//Hiding Add(+) Button for c category users
	let role = frappe.user_roles
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category") && (admin != "Administrator")) {
		$('#pal-note').attr('class', 'd-none')
		$('#dcoms').attr('class', 'd-none')
	} 
	//Hiding Add(+) Button for c category users End 

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

	// Fuction for Add(+) Button-Creating New note
	note.onclick = function () {
		frappe.route_options = { "patient_name": split_hash }
		frappe.set_route("notes/new-notes-1")
	}
	// Fuction for Add(+) Button-Creating New note End

	//Patient Against redirection to counsellor note and nurse note page
	frappe.db.get_doc('Patient', null, { name: split_hash }).then(rec => {
		Nurse1.onchange = function (e) {
			if (document.getElementById('nurse1').value == "palcare-note_display") {
				frappe.set_route(`/app/palcare-note_display/#${rec.name}`)
				window.location.reload()

			}
			else if (document.getElementById('nurse1').value == "palcare-nurse") {
				frappe.set_route(`/app/palcare-nurse/#${rec.name}`)
				window.location.reload()

			}
			else {
				frappe.set_route(`/app/palcare-counsellor/#${rec.name}`)
				window.location.reload()

			}
		}
	})
	//Patient Against redirection to counsellor note and nurse note page End

	//Fuction For fetching data
	frappe.db.get_list('Notes', {
		fields: ['*',],
		filters: {
			patient_name: split_hash,
			note_type: 'Doctor'
		},limit:100,
	}).then(records => {
		if (records.length > 0) {
			records.forEach(patient => {
				var new_patient = $(care_notes);
				new_patient.find('.doctors_note').html(patient.doctors_note);
				new_patient.find('.docter_date').html(patient.date);
				new_patient.find('.docter_user').html(patient.user);
				new_patient.find('.dcom').attr("id", patient.patient_name);
				
				$(".notes1").append(new_patient);

				//Removing Edit button if there is no data
				$(document).ready(function () {
					let isnotes1 = document.getElementsByClassName('notes1');
					if (isnotes1.length > 0) {
						$('.dcom').removeClass('d-none')
					}
					$(function() {
						$('textarea').each(function() {
							$(this).height($(this).prop('scrollHeight'));
						});
					});
				})
				//Removing Edit button if there is no data End

			});
		} else {
			$(".notes1").append(`<h3 style=text-align:center;>Nothing to show</h3>`)
		};
	})
	//Fuction For fetching data End

	//Fuction for 'View More' button
	$("body").on('click', '.dcom', function (e) {
		let enroll_num = document.getElementById("docter_user").textContent
		frappe.set_route("List", "Notes", { "patient_name": `${split_hash}`, "note_type": "Doctor" })
		const url = new URL(window.location);
		window.history.pushState({}, '', url);
	})
	//Fuction for 'View More' button End
}