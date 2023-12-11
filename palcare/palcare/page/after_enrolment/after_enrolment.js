// frappe.pages['after-enrolment'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Medications',
// 		single_column: true
// 	});

	frappe.require('/assets/palcare/js/utils.js',()=>{

		base_url=base_url
	})


// 	$(frappe.render_template("after_enrol")).appendTo(page.main);;
// 	let card_after = frappe.render_template("card_after");

// 	frappe.db.get_list('Medication', {
// 		fields: ['image', 'patient', 'date'],
// 		filters: {
// 			medication_type: 'Medications by PALCARE after Enrolment'
// 		}
// 	}).then(records => {
// 		records.forEach(patient => {
// 			console.log('patient details',patient)
// 			var new_patient = $(card_after);
// 			// new_patient.find('.img1').html(`https://dev-palcare.frappe.cloud/files/eco.jpeg`);

			
// 			new_patient.find('.date2').html(patient.date);
// 			new_patient.find('.user2').html(patient.patient);
// 			new_patient.find('.card_img2').attr('id', `${patient.patient}_id`)
// 			new_patient.find(`#${patient.patient}_id`).attr('src', `https://dev-palcare.frappe.cloud${patient.image}`)

// 			$(".enrol_after").append(new_patient);

			
			
			
// 		});
// 	})
// }