frappe.pages['photo'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Photos',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})

	let feed = $(frappe.render_template("pal_photo")).appendTo(page.main);;
	let photo_card = frappe.render_template("photo_card");
	let palcare_photos = document.getElementById("palcare-photos")
	// let route = window.location.hash
	let photo_url=window.location.href
	let decode_url=decodeURIComponent(photo_url)
	let split_url=decode_url.split("#")
	// let split_hash = route.substring(1)
	let split_hash=split_url[1]

	//Hiding Add(+) Button for c category users
	let role = frappe.user_roles
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category") && (admin != "Administrator")) {
		$('#palcare-photos').attr('class', 'd-none')
	} else {
		$('#palcare-photos').removeClass('d-none')
	}
	//Hiding Add(+) Button for c category users End

	// Fuction for Add(+) Button-Creating New photo
	palcare_photos.onclick = function () {
		frappe.route_options = { "patient_name": split_hash }
		frappe.set_route("photos/new-photos-1")
	}
	// Fuction for Add(+) Button-Creating New photo end

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
	frappe.db.get_list('Photos', {
		fields: ['*',],
		filters: {
			patient_name: split_hash
		}
	}).then(records => {
		if (records.length > 0) {
			records.forEach(patient => {
				var new_patient = $(photo_card);
				frappe.db.get_list('Patient', {
					fields: ['*'],
				}).then(rec => {
					rec.forEach(medical => {
						if (patient.patient_name == medical.name) {
							new_patient.find('.patient_name').html(medical.sur_name == null ? medical.first_name : medical.middle_name != null ?
								(medical.middle_name == null ? " " : medical.first_name + " " + medical.middle_name + " " + medical.sur_name) : medical.first_name + " " + medical.sur_name);
						}
					})
				})
				new_patient.find('.photo_user').html(patient.user);
				new_patient.find('.photo_date').html(patient.uploaded_on);
				new_patient.find('.card_photo').attr('id', `${patient.patient}_id`)
				if (patient.image)
					new_patient.find('.card_photo').attr('src', `${patient.image}`)
				else {
					new_patient.find('.card_photo').hide();
					new_patient.find('.card').hide();
				}
				$(".photo_pal").append(new_patient);

				//Removing List button if there is no data
				$(document).ready(function () {
					let photo_pal = document.getElementsByClassName('photo_pal');
					if (photo_pal.length > 0) {
						$('.photo_list_btn').removeClass('d-none')
					}
				})
				//Removing List button if there is no data End
			})
		}
		else {
			$(".photo_pal").append(`<h3 style=text-align:center;>Nothing to show</h3>`)
		};

	})
	//Fuction For fetching data End

	//Fuction for 'View More' button
	$("body").on('click', '.photo_list_btn', function (e) {
		frappe.set_route("List", "Photos", { "patient_name": `${split_hash}` })
		const url = new URL(window.location);
		window.history.pushState({}, '', url);
	})
	//Fuction for 'View More' button End

}