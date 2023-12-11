frappe.pages['patient-bio'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Patient Bio',
		single_column: true
	});
	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})

	let route = window.location.hash
	let split_hash = route.substring(1)
	$(frappe.render_template("patient_bio_details")).appendTo(page.main);;
	let patient_lists = frappe.render_template("patient_bio");

	//Fuction For fetching data
	frappe.db.get_list('Patient', {
		fields: ['*'],
		filters: {
			name: split_hash
		}
	}).then(records => {
		records.forEach(patient => {
			var new_patient = $(patient_lists);
			new_patient.find('.names').html(patient.sur_name == null ? patient.first_name : patient.middle_name != null ?
				(patient.middle_name == null ? " " : patient.first_name + " " + patient.middle_name + " " + patient.sur_name) : patient.first_name + " " + patient.sur_name);
			new_patient.find('.Entrollment_No').html(patient.enrolment_number);
			new_patient.find('.Entrollment_No').html(patient.enrolment_number);
			new_patient.find('.Entrollment_Date').html(patient.date_of_enrolment);
			new_patient.find('.zone').html(patient.zone);
			new_patient.find('.Gender').html(patient.gender);
			new_patient.find('.age').html(patient.age);
			new_patient.find('.address').html(patient.address);
			new_patient.find('.contact_number').html(patient.mobile_number);
			new_patient.find('.caregiver_name').html(
				patient.sur_name1 == null ? patient.first_name1 : patient.middle_name1 != null ?
					(patient.middle_name1 == null ? " " : patient.first_name1 + " " + patient.middle_name1 + " " + patient.sur_name1) : patient.first_name1 + " " + patient.sur_name1);
			new_patient.find('.Marital_status').html(patient.marital_status);
			new_patient.find('.Primary_Language').html(patient.primary_language);
			frappe.db.get_list('Medical Details', {
				fields: ['*'],
			}).then(rec => {
				rec.forEach(medical => {
					if (patient.name == medical.patient) {
						console.log(medical.allergens, medical.comorbidiities)
						new_patient.find('.Diagnosis').html(medical.non_cancer == 1 ? "Non Cancer" : medical.if_cancer == 1 ? "Cancer" : "");
						console.log(medical.allergens)
						if (medical.allergens) {
							frappe.msgprint({
								title: __('Alert'),
								indicator: 'red',
								message: __('Patient has comorbidiities and allergies')
							});
						} else if (medical.comorbidiities) {
							frappe.msgprint({
								title: __('Alert'),
								indicator: 'red',
								message: __('Patient has comorbidiities and allergies')
							});
						}
						else {
						}
					}
				})
			})
			new_patient.find('.Referred_by').html(patient.first_name2);
			new_patient.find('.GPs_Name').html(patient.first_name3);
			new_patient.find('.Contact_Number2').html(patient.mobile_number3);
			new_patient.find('.Treat_Specialist').html(patient.first_name6);
			new_patient.find('.Oncologist_Name').html(patient.first_name4);
			new_patient.find('.Contact_Number3').html(patient.mobile_number4);
			if (patient.photo_of_patient)
				new_patient.find('.ayman').attr('src', `${patient.photo_of_patient}`)
			else
				new_patient.find('.ayman').hide();
			$('.ayman').hide();
			new_patient.find('.patient_name').html(patient.sur_name == null ? patient.first_name : patient.middle_name != null ?
				(patient.middle_name == null ? " " : patient.first_name + " " + patient.middle_name + " " + patient.sur_name) : patient.first_name + " " + patient.sur_name);

			$(".patient_bio_details").append(new_patient);

		});
	})
	//Fuction For fetching data End

	//Patient agaist redirection to patient bio page
	$("body").on('click', '.patient-bio-btn', function (e) {
		window.location = `${base_url}/app/patient-bio/#${split_hash}`
		const url = new URL(window.location);
		url.searchParams.set(`${base_url}/app/`, `${base_url}/app/patient-bio/#${split_hash}`);
		window.history.pushState({}, '', url);
	})
	//Patient agaist redirection to patient bio page End

	//Patient agaist redirection to patient details page
	$("body").on('click', '.patient-details-btn', function (e) {
		window.location = `${base_url}/app/patient-details/#${split_hash}`
		const url = new URL(window.location);
		url.searchParams.set(`${base_url}/app/`, `${base_url}/app/patient-details/#${split_hash}`);
		window.history.pushState({}, '', url);
	})
	//Patient agaist redirection to patient details page End

	//Patient agaist redirection to feed page
	$("body").on('click', '.patient-feed-btn', function (e) {
		window.location = `${base_url}/app/feed/#${split_hash}`
		const url = new URL(window.location);
		url.searchParams.set(`${base_url}/app/`, `${base_url}/app/feed/#${split_hash}`);
		window.history.pushState({}, '', url);
	})
	//Patient agaist redirection to feed page End

}