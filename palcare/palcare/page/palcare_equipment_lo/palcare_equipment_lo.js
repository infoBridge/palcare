frappe.pages['palcare-equipment-lo'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Equipment Loaned',
		single_column: true
	});
	frappe.require('/assets/palcare/js/utils.js', () => {
		base_url = base_url
	})

	let feed = $(frappe.render_template("palcare_loaned")).appendTo(page.main);;
	let loaned_card = frappe.render_template("loaned_card");
	// let route = window.location.hash
	let eqp_url=window.location.href
	let decode_url=decodeURIComponent(eqp_url)
	let split_url=decode_url.split("#")
	// let split_hash = route.substring(1)
	let split_hash=split_url[1]
	let equipment = document.getElementById("eqpt")

	//Hiding Add(+) Button for c category users
	let role = frappe.user_roles
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category") && (admin != "Administrator")) {
		$('#eqpt').attr('class', 'd-none')
	} else {
		$('#eqpt').removeClass('d-none')
	}
	//Hiding Add(+) Button for c category users End

	// Fuction for Add(+) Button-Creating New Equipment loaned
	equipment.onclick = function () {
		frappe.route_options = { "patient_name": split_hash }
		frappe.set_route("equipment-loaned/new-equipment-loaned-1")
	}
	// Fuction for Add(+) Button-Creating New Equipment loaned End

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
	frappe.db.get_list('Equipment Loaned', {
		fields: ['*',],
		filters: {
			patient_name: split_hash
		}
	}).then(records => {
		if (records.length > 0) {
			records.forEach(patient => {
				var new_patient = $(loaned_card);
				new_patient.find('.loaned_date').html(patient.date);
				new_patient.find('.loaned_user').html(patient.user);
				new_patient.find('.card_loaned').attr('id', `${patient.patient}_id`)
				if (patient.image)
					new_patient.find(".card_loaned").attr('src', `${patient.image}`)

				else {
					new_patient.find('.card_loaned').hide();
					new_patient.find('.card').hide();
				}
				$(".loaned_pal").append(new_patient);

				//Removing view more button if there is no data
				$(document).ready(function () {
					let loaned_pal = document.getElementsByClassName('loaned_pal');
					if (loaned_pal.length > 0) {
						$('.eqp_list_btn').removeClass('d-none')
					}
				})
				//Removing view more button if there is no data End

			})
		}
		else {
			$(".loaned_pal").append(`<h3 style=text-align:center;>Nothing to show</h3>`)
		};
	})
	//Fuction For fetching data End

	//Fuction for 'View More' button
	$("body").on('click', '.eqp_list_btn', function (e) {
		frappe.set_route("List", "Equipment Loaned", { "patient_name": `${split_hash}` })
		const url = new URL(window.location);
		window.history.pushState({}, '', url);
	})
	//Fuction for 'View More' button End

}