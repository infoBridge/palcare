frappe.pages['zone-mainland'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Directory of Patients by Priority',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})
	$(frappe.render_template("mainland")).appendTo(page.main);;
	let mainland_patient = frappe.render_template("mainland_patient");

	//Fetching data of high priority patients
	frappe.call({
		method: `palcare.palcare.page.zone_mainland.zone_mainland.main_visit_high`,
		callback: function (response_south_high) {
			if (response_south_high.message.length > 0) {
				response_south_high.message.forEach((visit) => {
					var new_patient = $(mainland_patient);
					frappe.db.get_doc("Patient", visit.patient).then(patient => {
						new_patient.find('.name1').html(patient.sur_name == null ? patient.first_name : patient.middle_name != null ?
							(patient.middle_name == null ? " " : patient.first_name + " " + patient.middle_name + " " + patient.sur_name) : patient.first_name + " " + patient.sur_name);
						new_patient.find('.Entrollment_No').html(patient.enrolment_number);
						new_patient.find('.Entrollment_Date').html(patient.date_of_enrolment);
						new_patient.find('.Zone').html(visit.zone);
						new_patient.find('.Gender').html(patient.gender);
						new_patient.find('.age').html(patient.age);
						new_patient.find('.Caregiver_name').html(patient.first_name1);
						new_patient.find('.details_btn').attr("id", patient.name);
						$(".high_mainland").append(new_patient);

					});
				})
			}
			else {
				$(".high_mainland").append(`<br><h3 style=text-align:center;>No Data Found</h3><hr style="width: 100%; border-top: 2px solid gray;">`)
			};
		}
	})
	//Fetching data of high priority patients End

	//Fuction for 'Details' button
	$("body").on('click', '.details_btn', function (e) {
		window.location = `${base_url}/app/patient-details/#${e.target.id}`
	})
	//Fuction for 'Details' button End

	//Fuction for 'View More' button
	$("body").on('click', '.high_main_btn', function (e) {
		frappe.set_route("List", "Visit Details", { "zone": "Zone 6 - Mainland", "care_priority": "High" })
	})
	//Fuction for 'View More' button End

	//Fetching data of medium priority patients

	frappe.call({
		method: `palcare.palcare.page.zone_mainland.zone_mainland.main_visit_priority_medium`,
		callback: function (response_south_high) {
			if (response_south_high.message.length > 0) {
				response_south_high.message.forEach((visit) => {
					var new_patient = $(mainland_patient);
					frappe.db.get_doc("Patient", visit.patient).then(patient => {
						new_patient.find('.name1').html(patient.sur_name == null ? patient.first_name : patient.middle_name != null ?
							(patient.middle_name == null ? " " : patient.first_name + " " + patient.middle_name + " " + patient.sur_name) : patient.first_name + " " + patient.sur_name);
						new_patient.find('.Entrollment_No').html(patient.enrolment_number);
						new_patient.find('.Entrollment_Date').html(patient.date_of_enrolment);
						new_patient.find('.Zone').html(visit.zone);
						new_patient.find('.Gender').html(patient.gender);
						new_patient.find('.age').html(patient.age);
						new_patient.find('.Caregiver_name').html(patient.first_name1);
						new_patient.find('.details_btn').attr("id", patient.name);
						$(".Medium_mainland").append(new_patient);
					})
				});
			}
			else {
				$(".Medium_mainland").append(`<br><h3 style=text-align:center;>No Data Found</h3><hr style="width: 100%; border-top: 2px solid gray;">`)
			};
		}
	})
	//Fetching data of medium priority patients End

	//Fuction for 'Details' button
	$("body").on('click', '.details_btn', function (e) {
		window.location = `${base_url}/app/patient-details/#${e.target.id}`
	})
	//Fuction for 'Details' button End

	//Fuction for 'View More' button
	$("body").on('click', '.medium_main_btn', function (e) {
		frappe.set_route("List", "Visit Details", { "zone": "Zone 6 - Mainland", "care_priority": "Medium" })
	})
	//Fuction for 'View More' button End

	//Fetching data of Low priority patients
	frappe.call({
		method: `palcare.palcare.page.zone_mainland.zone_mainland.main_visit_priority_low`,
		callback: function (response_south_high) {
			if (response_south_high.message.length > 0) {
				response_south_high.message.forEach((visit) => {
					var new_patient = $(mainland_patient);
					frappe.db.get_doc("Patient", visit.patient).then(patient => {
						new_patient.find('.name1').html(patient.sur_name == null ? patient.first_name : patient.middle_name != null ?
							(patient.middle_name == null ? " " : patient.first_name + " " + patient.middle_name + " " + patient.sur_name) : patient.first_name + " " + patient.sur_name);
						new_patient.find('.Entrollment_No').html(patient.enrolment_number);
						new_patient.find('.Entrollment_Date').html(patient.date_of_enrolment);
						new_patient.find('.Zone').html(visit.zone);
						new_patient.find('.Gender').html(patient.gender);
						new_patient.find('.age').html(patient.age);
						new_patient.find('.Caregiver_name').html(patient.first_name1);
						new_patient.find('.details_btn').attr("id", patient.name);
						$(".Low_mainland").append(new_patient);
					})
				});
			}
			else {
				$(".Low_mainland").append(`<br><h3 style=text-align:center;>No Data Found</h3><hr style="width: 100%; border-top: 2px solid gray;">`)
			};
		}
	})
	//Fetching data of Low priority patients End

	//Fuction for 'Details' button
	$("body").on('click', '.details_btn', function (e) {
		window.location = `${base_url}/app/patient-details/#${e.target.id}`
	})
	//Fuction for 'Details' button End

	//Fuction for 'View More' button
	$("body").on('click', '.low_main_btn', function (e) {
		frappe.set_route("List", "Visit Details", { "zone": "Zone 6 - Mainland", "care_priority": "Low" })
	})
	//Fuction for 'View More' button End
}