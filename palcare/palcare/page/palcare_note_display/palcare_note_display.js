frappe.pages['palcare-note_display'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Notes',
		single_column: true
	});
	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})

	let feed=$(frappe.render_template("note_display")).appendTo(page.main);;
		// let route = window.location.hash
	let note_url=window.location.href
	let decode_url=decodeURIComponent(note_url)
	let split_url=decode_url.split("#")
	// let split_hash = route.substring(1)
	let split_hash=split_url[1]
	let empty_note_display = document.getElementById("empty_note_display")

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

	
	//Patient Against redirection to counsellor note and nurse note page
	frappe.db.get_doc('Patient', null, { name: split_hash }).then(rec => {
		empty_note_display.onchange = function (e) {
			if (document.getElementById('empty_note_display').value == "palcare-notes") {
				frappe.set_route(`/app/palcare-notes/#${rec.name}`)
				window.location.reload()
			}
			else if(document.getElementById('empty_note_display').value == "palcare-nurse") {
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
	
}