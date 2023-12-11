// frappe.pages['medications'].on_page_load = function (wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'Medications',
// 		single_column: true
// 	});

// 	$(frappe.render_template("medications")).appendTo(page.main);;
// 	let med_img = frappe.render_template("med_img");

// 	let route=window.location.hash
	
// 	let split_hash=route.substring(1)

	

// 	frappe.db.get_list('Medication', {
// 		fields: ['image', 'patient', 'date'],
// 		filters: {
// 			patient:split_hash
			
// 		}
// 	}).then(records => {
// 		records.forEach(patient => {
// 			console.log('patient details',patient)
// 			var new_patient = $(med_img);
// 			// new_patient.find('.img1').html(`https://dev-palcare.frappe.cloud/files/eco.jpeg`);
			
// 			new_patient.find('.user1').html(patient.patient);
// 			new_patient.find('.date1').html(patient.date);
// 			new_patient.find('.card_img1').attr('id', `${patient.patient}_id`)
// 			new_patient.find(`#${patient.patient}_id`).attr('src', `https://dev-palcare.frappe.cloud${patient.image}`)
			
// 			$(".data").append(new_patient);


			

// 		});
// 	})

// }