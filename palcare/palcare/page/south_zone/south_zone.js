frappe.pages['south-zone'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Directory of Patients by Priority',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})
	$(frappe.render_template("south_zone")).appendTo(page.main);;

	let south_patient = frappe.render_template("south_patient");

	//Fetching data of high priority patients

	//Fetching data of high priority patients End
	frappe.call({
		method: `palcare.palcare.page.south_zone.south_zone.last_visit_high`,
		callback: function (r) {
			if (r.message.length > 0) {
				r.message.forEach((visit) => {
					// console.log(visit)
					var patient_south = $(south_patient);
					frappe.db.get_doc("Patient", visit.patient).then(patient_list => {
						patient_south.find('.name1').html(patient_list.sur_name == null ? patient_list.first_name : patient_list.middle_name != null ?
							(patient_list.middle_name == null ? " " : patient_list.first_name + " " + patient_list.middle_name + " " + patient_list.sur_name) : patient_list.first_name + " " + patient_list.sur_name);
						patient_south.find('.Entrollment_No').html(patient_list.enrolment_number);
						patient_south.find('.Entrollment_Date').html(patient_list.date_of_enrolment);
						patient_south.find('.Zone').html(visit.zone);
						patient_south.find('.Gender').html(patient_list.gender);
						patient_south.find('.age').html(patient_list.age);
						patient_south.find('.Caregiver_name').html(patient_list.first_name1);
						patient_south.find('.details_btn').attr("id", patient_list.name);
						$(".high_south").append(patient_south);
					});

				});
			} else {
				$(".high_south").append(`<br><h3 style=text-align:center;>No Data Found</h3><hr style="width: 100%; border-top: 2px solid gray;">`)
			};
		}
	})

	//Fuction for 'Details' button
	$("body").on('click', '.details_btn', function (e) {
		window.location = `${base_url}/app/patient-details/#${e.target.id}`
	})
	//Fuction for 'Details' button End

	//Fuction for 'View More' button
	$("body").on('click', '.high_south_btn', function (e) {
		frappe.set_route("List", "Visit Details", { "zone": "Zone 3 - West Mumbai - South", "care_priority": "High" })
	})
	//Fuction for 'View More' button End


	//Fetching data of medium priority patients
	frappe.call({
		method: `palcare.palcare.page.south_zone.south_zone.last_visit_priority_medium`,
		callback: function (response) {
			if (response.message.length > 0) {
				response.message.forEach((visit_medium) => {
					var patient_south = $(south_patient);
					frappe.db.get_doc("Patient", visit_medium.patient).then(patient_list => {
						patient_south.find('.name1').html(patient_list.sur_name == null ? patient_list.first_name : patient_list.middle_name != null ?
							(patient_list.middle_name == null ? " " : patient_list.first_name + " " + patient_list.middle_name + " " + patient_list.sur_name) : patient_list.first_name + " " + patient_list.sur_name);
						patient_south.find('.Entrollment_No').html(patient_list.enrolment_number);
						patient_south.find('.Entrollment_Date').html(patient_list.date_of_enrolment);
						patient_south.find('.Zone').html(visit_medium.zone);
						patient_south.find('.Gender').html(patient_list.gender);
						patient_south.find('.age').html(patient_list.age);
						patient_south.find('.Caregiver_name').html(patient_list.first_name1);
						patient_south.find('.details_btn').attr("id", patient_list.name);
						$(".Medium_south").append(patient_south);
					});

				});
			} else {
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
		frappe.set_route("List", "Visit Details", { "zone": "Zone 3 - West Mumbai - South", "care_priority": "Medium" })
	})
	//Fuction for 'View More' button End

	//Fetching data of Low priority patients
	frappe.call({
		method: `palcare.palcare.page.south_zone.south_zone.last_visit_priority_low`,
		callback: function (response_low) {
			if (response_low.message.length > 0) {
				response_low.message.forEach((visit_low) => {
					var patient_south = $(south_patient);
					frappe.db.get_doc("Patient", visit_low.patient).then(patient_list => {
						patient_south.find('.name1').html(patient_list.sur_name == null ? patient_list.first_name : patient_list.middle_name != null ?
							(patient_list.middle_name == null ? " " : patient_list.first_name + " " + patient_list.middle_name + " " + patient_list.sur_name) : patient_list.first_name + " " + patient_list.sur_name);
						patient_south.find('.Entrollment_No').html(patient_list.enrolment_number);
						patient_south.find('.Entrollment_Date').html(patient_list.date_of_enrolment);
						patient_south.find('.Zone').html(visit_low.zone);
						patient_south.find('.Gender').html(patient_list.gender);
						patient_south.find('.age').html(patient_list.age);
						patient_south.find('.Caregiver_name').html(patient_list.first_name1);
						patient_south.find('.details_btn').attr("id", patient_list.name);
						$(".Low_south").append(patient_south);
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
		frappe.set_route("List", "Visit Details", { "zone": "Zone 3 - West Mumbai - South", "care_priority": "Low" })
	})
	//Fuction for 'View More' button End

}	
