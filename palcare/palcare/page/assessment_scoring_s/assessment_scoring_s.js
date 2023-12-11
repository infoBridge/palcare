frappe.pages['assessment-scoring-s'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Clinical Assessment/Care Plan',
		single_column: true
	});

	let feed = $(frappe.render_template("scoring_sheet")).appendTo(page.main);;
	let card_scoring = frappe.render_template("card_scoring");
	let pal_memberid = frappe.render_template("pal_memberid");
	let esas_url=window.location.href
	let decode_url=decodeURIComponent(esas_url)
	let split_url=decode_url.split("#")
	// let route = window.location.hash
	// let split_hash = route.substring(1)
	let split_hash=split_url[1]
	let Finalsum = document.getElementById("final-sum")
	let Plan = document.getElementById("plan")
	let esas = document.getElementById("esas")

	frappe.require('/assets/palcare/js/utils.js', () => {

		base_url = base_url
	})

	//Hiding Add(+) Button for c category users
	let role = frappe.user_roles
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category") && (admin != "Administrator")) {
		$('#esas').attr('class', 'd-none')
	} else {
		$('#esas').removeClass('d-none')
	}
	//Hiding Add(+) Button for c category users End

	// Fuction for Add(+) Button-Creating New edmonton symptom assessment
	esas.onclick = function () {
		frappe.route_options = { "patient_name": split_hash }
		frappe.set_route("edmonton-symptom-assessment/new-edmonton-symptom-assessment-1")
	}
	// Fuction for Add(+) Button-Creating New edmonton symptom assessment

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
		Finalsum.onchange = function (e) {
			if (document.getElementById('final-sum').value == "assessment-care") {
				frappe.set_route(`/app/assessment-care/#${rec.name}`)
				window.location.reload()
			}
			else if (document.getElementById('final-sum').value == "assessment_final_sum") {
				frappe.set_route(`/app/assessment_final_sum/#${rec.name}`)
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
		frappe.db.get_list('Edmonton Symptom Assessment', {
			fields: ["*"],
			filters: {
				patient_name: split_hash
			}
		}).then(doc => {
			doc.forEach(patient => {
				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.pain_score);
				$(".score").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.dyspnoea);
				$(".score_dyspnoea").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.nausea__vomiting);
				$(".score_nausea").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.appetite);
				$(".score_appetite").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.sleep);
				$(".score_sleep").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.bladder);
				$(".score_bladder").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.bowel);
				$(".score_bowel").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.skin);
				$(".score_skin").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.oral_assessment1);
				$(".score_oral").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.pressure_injuries1);
				$(".score_pressure").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.tired);
				$(".score_tired").append(new_card);

				var new_card = $(card_scoring);
				new_card.find('.score1').html(patient.date);
				new_card.find('.score2').html(patient.name_of_palcare_team_member);
				$(".memb").append(new_card);

				$(document).ready(function () {
					let score_tired = document.getElementsByClassName('score_tired');
					if (score_tired.length > 0) {
						$('.sco_list_btn').removeClass('d-none')
					}
				})

				var member_name = $(pal_memberid);
				member_name.find('.member1').html(patient.name_of_palcare_team_member);
				$(".flex-container1").append(member_name);
			});
		})
	}
	catch {
		frappe.msgprint(__('Nothing to show'));
	}
	//Fetching data to the page End

	//Function for (!) button on click popup
	$(document).ready(function () {
		$("#show-popup-btn-score").click(function () {
			$("#popup-container-score").show();
		})
		$("#close-btn-score").click(function () {
			$("#popup-container-score").hide();
		})
	})

	$(document).ready(function () {
		$("#show-popup-btn-score1").click(function () {
			$("#popup-container-score1").show();
		})
		$("#close-btn-score1").click(function () {
			$("#popup-container-score1").hide();
		})
	})

	$(document).ready(function () {
		$("#show-popup-btn-score2").click(function () {
			$("#popup-container-score2").show();
		})
		$("#close-btn-score2").click(function () {
			$("#popup-container-score2").hide();
		})
	})

	$(document).ready(function () {
		$("#show-popup-btn-score3").click(function () {
			$("#popup-container-score3").show();
		})
		$("#close-btn-score3").click(function () {
			$("#popup-container-score3").hide();
		})
	})

	$(document).ready(function () {
		$("#show-popup-btn-score4").click(function () {
			$("#popup-container-score4").show();
		})
		$("#close-btn-score4").click(function () {
			$("#popup-container-score4").hide();
		})
	})
	//Function for (!) button on click popup End

	//Fuction for View More Button
	$("body").on('click', '.sco_list_btn', function (e) {
		frappe.set_route("List", "Edmonton Symptom Assessment", { "patient_name": `${split_hash}` })
		const url = new URL(window.location);
		window.history.pushState({}, '', url);
	})


}