frappe.pages['assessment-care'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Clinical Assessment/Care Plan',
		single_column: true
	});
	frappe.require('/assets/palcare/js/utils.js', () => {
		base_url = base_url
	})

	let feed = $(frappe.render_template("assessment_care")).appendTo(page.main);;
	
	let final_url=window.location.href
	let decode_url=decodeURIComponent(final_url)
	let split_url=decode_url.split("#")
	let split_hash=split_url[1]
	let assessment_care_pan = document.getElementById("assessment_care_pan")
	
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

	//Patient Against redirection
	frappe.db.get_doc('Patient', null, { name: split_hash }).then(rec => {
		assessment_care_pan.onchange = function (e) {
			if (document.getElementById('assessment_care_pan').value == "assessment_final_sum") {
				frappe.set_route(`/app/assessment_final_sum/#${rec.name}`)
				window.location.reload()
			}
			else if (document.getElementById('assessment_care_pan').value == "assessment-scoring-s") {
				frappe.set_route(`/app/assessment-scoring-s/#${rec.name}`)
				window.location.reload()
			}
			else {
				frappe.set_route(`/app/clinical-assesment/#${rec.name}`)
				window.location.reload()
			}
		}
	})
	//Patient Against redirection End

}