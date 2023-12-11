frappe.pages['palcare-reports'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Reports',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})

	let feed=$(frappe.render_template("pal_reports")).appendTo(page.main);;
	let report_card = frappe.render_template("report_card");
	// let route = window.location.hash
	let report_url=window.location.href
	let decode_url=decodeURIComponent(report_url)
	let split_url=decode_url.split("#")
	// let split_hash = route.substring(1)
	let split_hash=split_url[1]
	report_page = document.getElementById("report-page")

	//Hiding Add(+) Button for c category users
	let role = frappe.user_roles
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category") && (admin != "Administrator")) {
		$('#report-page').attr('class', 'd-none')
	} else {
		$('#report-page').removeClass('d-none')
	}
	//Hiding Add(+) Button for c category users End 

	// Fuction for Add(+) Button-Creating New report
	report_page.onclick = function () {
		frappe.route_options = { "patient_name": split_hash }
		frappe.set_route('reports/new-reports-1')
	}
	// Fuction for Add(+) Button-Creating New reports end

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

	//Fuction For fetching data
	frappe.db.get_list('Reports', {
		fields: ['*',],
		filters: {
			patient_name: split_hash
		}
	}).then(records => {
		if (records.length > 0) {
			records.forEach(patient => {
				var new_patient = $(report_card);
				new_patient.find('.report_date').html(patient.date);
				new_patient.find('.report_user').html(patient.user);
				new_patient.find('.card_report').attr('id', `${patient.patient}_id`)
				if (patient.image)
					new_patient.find('.card_report').attr('src', `${patient.image}`)
				else{
					new_patient.find('.card_report').hide();
					new_patient.find('.card').hide();
				}
				$(".report_pal").append(new_patient);

				//Removing List button if there is no data
				$(document).ready(function () {
					let report_pal = document.getElementsByClassName('report_pal');
					if (report_pal.length > 0) {
						$('.repo_list_btn').removeClass('d-none')
					}
				})
				//Removing List button if there is no data End
			})
		}
		else {
			$(".report_pal").append(`<h3 style=text-align:center;>Nothing to show</h3>`)
		};
	})
	//Fuction For fetching data End

	//Fuction for 'View More' button
	$("body").on('click', '.repo_list_btn', function (e) {
		frappe.set_route("List", "Reports", { "patient_name": `${split_hash}`})
		const url = new URL(window.location);
		window.history.pushState({}, '', url);
	})
	//Fuction for 'View More' button End

}