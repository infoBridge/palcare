frappe.pages['assessment_final_sum'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Clinical Assessment/Care Plan',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js', () => {
		base_url = base_url
	})

	let feed = $(frappe.render_template("final_summery")).appendTo(page.main);;
	let card_final = frappe.render_template("card_final");
	// let route = window.location.hash
	// let split_hash = route.substring(1)
	let final_url=window.location.href
	let decode_url=decodeURIComponent(final_url)
	let split_url=decode_url.split("#")
	let split_hash=split_url[1]
	let Scoringsheet = document.getElementById("scoring-sheet")
	let Plan = document.getElementById("plan")

	//Hiding Add(+) Button for c category users
	let final_sum = document.getElementById("final-sum")
	let role = frappe.user_roles
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category") && (admin != "Administrator")) {
		$('#final-sum').attr('class', 'd-none')
	} else {
		$('#final-sum').removeClass('d-none')
	}
	//Hiding Add(+) Button for c category users End

	// Fuction for Add(+) Button-Creating New Final summary 
	final_sum.onclick = function () {
		frappe.route_options = { "patient_name": split_hash }
		frappe.set_route("final-summary/new-final-summary-1")
	}
	// Fuction for Add(+) Button-Creating New Final summary End

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
		Scoringsheet.onchange = function (e) {
			if (document.getElementById('scoring-sheet').value == "assessment-care") {
				frappe.set_route(`/app/assessment-care/#${rec.name}`)
				window.location.reload()
			}
			else if (document.getElementById('scoring-sheet').value == "assessment-scoring-s") {
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

	//Fetching data to the page
	try {
		frappe.db.get_list('Final Summary', {
			fields: ["*"],
			filters: {
				patient_name: split_hash
			}
		}).then(doc => {
			doc.forEach(patient => {
				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.care_priority_hml);
				$(".card_care").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.visit_frequency);
				$(".card_visit").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.strong_opioids);
				$(".card_strong").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.anti_depressants);
				$(".card_anti").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.pain_score);
				$(".card_pain").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.nausea_score);
				$(".card_nausea").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.dyspnoea_score);
				$(".card_dsypnoea").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.ghq);
				$(".card_ghq").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.family_support);
				$(".card_family").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.family_func);
				$(".card_functional").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.caregiver);
				$(".card_caregiver").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.patient_insight);
				$(".card_patients").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.communication_pattern);
				$(".card_pattern").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.karnofsky);
				$(".card_karnofsky").append(new_card);

				var new_card = $(card_final);
				new_card.find('.final1').html(patient.date);
				new_card.find('.final2').html(patient.team_member);
				$(".mem").append(new_card);

				$(document).ready(function () {
					let card_karnofsky = document.getElementsByClassName('card_karnofsky');
					if (card_karnofsky.length > 0) {
						$('.asm_list_btn').removeClass('d-none')
					}
				})
			});
		})
	}
	catch {
		frappe.msgprint(__('Nothing to show'));
	}
	//Fetching data to the page End

	//Fuction for View More Button
	$("body").on('click', '.asm_list_btn', function (e) {
		frappe.set_route("List", "Final Summary", { "patient_name": `${split_hash}` })
		const url = new URL(window.location);
		window.history.pushState({}, '', url);
	})

}