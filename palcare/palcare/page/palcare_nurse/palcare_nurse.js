frappe.pages['palcare-nurse'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Notes',
		single_column: true
	});

	let feed = $(frappe.render_template("data_nurse")).appendTo(page.main);;
	let nurse_pal = frappe.render_template("nurse_pal");
	// let route = window.location.hash
	let nurse_url=window.location.href
	let decode_url=decodeURIComponent(nurse_url)
	let split_url=decode_url.split("#")
	let split_hash=split_url[1]
	// let split_hash = route.substring(1)
	let note = document.getElementById("pal-note")
	let Coun1 = document.getElementById("coun1")
	let docms = document.getElementById("docms")

	//Hiding Add(+) Button for c category users
	let role = frappe.user_roles
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category") && (admin != "Administrator")) {
		$('#pal-note').attr('class', 'd-none')
		$('#docms').attr('class', 'd-none')


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

	//Patient Against redirection to docters note and counsellor note page
	frappe.db.get_doc('Patient', null, { name: split_hash }).then(rec => {
		Coun1.onchange = function (e) {
			if (document.getElementById('coun1').value == "palcare-note_display") {
				frappe.set_route(`/app/palcare-note_display/#${rec.name}`)
				window.location.reload()

			}
			else if (document.getElementById('coun1').value == "palcare-notes") {
				frappe.set_route(`/app/palcare-notes/#${rec.name}`)
				window.location.reload()

			}
			else {
				frappe.set_route(`/app/palcare-counsellor/#${rec.name}`)
				window.location.reload()
			}
		}
	})
	//Patient Against redirection to docters note and counsellor note page end

	//Fuction For fetching data
	frappe.db.get_list('Notes', {
		fields: ['*',],
		filters: {
			patient_name: split_hash,
			note_type: 'Nurse'
		},limit:100,
	}).then(records => {
		if (records.length > 0) {
			records.forEach(patient => {
				var new_patient = $(nurse_pal);
				new_patient.find('.nurse_note').html(patient.nurse_note);
				new_patient.find('.docter_date').html(patient.date);
				new_patient.find('.docter_user').html(patient.user);
				new_patient.find('.dcom').attr("id", patient.patient_name);
				$(".notes2").append(new_patient);

				//Removing Edit button if there is no data
				$(document).ready(function () {
					let isnotes2 = document.getElementsByClassName('notes2');
					if (isnotes2.length > 0) {
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
			$(".notes2").append(`<h3 style=text-align:center;>Nothing to show</h3>`)
		};
	})
	//Fuction For fetching data End

	//Fuction for 'View More' button
	$("body").on('click', '.dcom', function (e) {
		let enroll_num = document.getElementById("docter_user").textContent
		frappe.set_route("List", "Notes", { "patient_name": `${split_hash}`, "note_type": "Nurse" })
		const url = new URL(window.location);
		window.history.pushState({}, '', url);
	})
	//Fuction for 'View More' button End
}