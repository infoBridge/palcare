frappe.pages['zone-all_zone'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Directory Of Active Patients',
		single_column: true
	});
	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})
	$(frappe.render_template("all_zone")).appendTo(page.main);;

	let all_zone_patient = frappe.render_template("all_zone_patient");

	//Fetching data of high priority patients
	frappe.call({
		method: `palcare.palcare.page.zone_all_zone.zone_all_zone.all_visit_priority_high`,
		callback: function (response_south_high) {
			if (response_south_high.message.length > 0) {
				response_south_high.message.forEach((visit) => {
					var patient_all = $(all_zone_patient);
					frappe.db.get_doc("Patient", visit.patient).then(patient_list => {
						patient_all.find('.name1').html(patient_list.sur_name == null ? patient_list.first_name : patient_list.middle_name != null ?
							(patient_list.middle_name == null ? " " : patient_list.first_name + " " + patient_list.middle_name + " " + patient_list.sur_name) : patient_list.first_name + " " + patient_list.sur_name);
						patient_all.find('.Entrollment_No').html(patient_list.enrolment_number);
						patient_all.find('.Entrollment_Date').html(patient_list.date_of_enrolment);
						patient_all.find('.Zone').html(visit.zone);
						patient_all.find('.Gender').html(patient_list.gender);
						patient_all.find('.age').html(patient_list.age);
						patient_all.find('.Caregiver_name').html(patient_list.first_name1);
						patient_all.find('.details_btn').attr("id", patient_list.name);
						$(".high_south").append(patient_all);
					});
				})
			}
			else {
				$(".high_south").append(`<br><h3 style=text-align:center;>No Data Found</h3><hr style="width: 100%; border-top: 2px solid gray;">`)
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
	$("body").on('click', '.high_south_btn', function (e) {
		frappe.set_route("List", "Visit Details", { "care_priority": "High" })
	})
	//Fuction for 'View More' button End

	//Fetching data of medium priority patients
	frappe.call({
		method: `palcare.palcare.page.zone_all_zone.zone_all_zone.all_visit_priority_medium`,
		callback: function (response_south_high) {
			if (response_south_high.message.length > 0) {
				response_south_high.message.forEach((visit) => {
					var patient_all = $(all_zone_patient);
					frappe.db.get_doc("Patient", visit.patient).then(patient_list => {
						patient_all.find('.name1').html(patient_list.sur_name == null ? patient_list.first_name : patient_list.middle_name != null ?
							(patient_list.middle_name == null ? " " : patient_list.first_name + " " + patient_list.middle_name + " " + patient_list.sur_name) : patient_list.first_name + " " + patient_list.sur_name);
						patient_all.find('.Entrollment_No').html(patient_list.enrolment_number);
						patient_all.find('.Entrollment_Date').html(patient_list.date_of_enrolment);
						patient_all.find('.Zone').html(visit.zone);
						patient_all.find('.Gender').html(patient_list.gender);
						patient_all.find('.age').html(patient_list.age);
						patient_all.find('.Caregiver_name').html(patient_list.first_name1);
						patient_all.find('.details_btn').attr("id", patient_list.name);
						$(".Medium_south").append(patient_all);
					});
				})
			}
			else {
				$(".Medium_south").append(`<br><h3 style=text-align:center;>No Data Found</h3><hr style="width: 100%; border-top: 2px solid gray;">`)
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
	$("body").on('click', '.medium_south_btn', function (e) {
		frappe.set_route("List", "Visit Details", { "care_priority": "Medium" })
	})
	//Fuction for 'View More' button End

	//Fetching data of Low priority patients
	frappe.call({
		method: `palcare.palcare.page.zone_all_zone.zone_all_zone.all_visit_priority_low`,
		callback: function (response_south_high) {
			if (response_south_high.message.length > 0) {
				response_south_high.message.forEach((visit) => {
					var patient_all = $(all_zone_patient);
					frappe.db.get_doc("Patient", visit.patient).then(patient_list => {
						patient_all.find('.name1').html(patient_list.sur_name == null ? patient_list.first_name : patient_list.middle_name != null ?
							(patient_list.middle_name == null ? " " : patient_list.first_name + " " + patient_list.middle_name + " " + patient_list.sur_name) : patient_list.first_name + " " + patient_list.sur_name);
						patient_all.find('.Entrollment_No').html(patient_list.enrolment_number);
						patient_all.find('.Entrollment_Date').html(patient_list.date_of_enrolment);
						patient_all.find('.Zone').html(visit.zone);
						patient_all.find('.Gender').html(patient_list.gender);
						patient_all.find('.age').html(patient_list.age);
						patient_all.find('.Caregiver_name').html(patient_list.first_name1);
						patient_all.find('.details_btn').attr("id", patient_list.name);
						$(".Low_south").append(patient_all);
					});
				})
			}
			else {
				$(".Low_south").append(`<br><h3 style=text-align:center;>No Data Found</h3><hr style="width: 100%; border-top: 2px solid gray;">`)
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
	$("body").on('click', '.low_south_btn', function (e) {
		frappe.set_route("List", "Visit Details", { "care_priority": "Low" })
	})
	//Fuction for 'View More' button End

}
