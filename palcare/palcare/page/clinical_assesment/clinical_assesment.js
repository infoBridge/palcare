frappe.pages['clinical-assesment'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Clinical Assessment/Care Plan',
		single_column: true
	});
	let feed = $(frappe.render_template("assesment")).appendTo(page.main);;
	let card_assessment = frappe.render_template("card_assessment");
	let member_id = frappe.render_template("member_id");

	frappe.require('/assets/palcare/js/utils.js', () => {
		base_url = base_url
	})

	// let route = window.location.hash
	let clinical_url=window.location.href
	let decode_url=decodeURIComponent(clinical_url)
	let split_url=decode_url.split("#")
	let split_hash=split_url[1]
	// let split_hash = route.substring(1)
	let epas = document.getElementById("epas")
	let Scoringsheet = document.getElementById("scoring-sheet")
	let Finalsum = document.getElementById("final-sum")

	//Hiding Add(+) Button for c category users
	let role = frappe.user_roles
	let result = role.filter(word => word == 'C category');
	let admin = role.filter(word => word == 'Administrator');
	if ((result == "C category") && (admin != "Administrator")) {
		$('#epas').attr('class', 'd-none')
	} else {
		$('#epas').removeClass('d-none')
	}
	//Hiding Add(+) Button for c category users End

	// Fuction for Add(+) Button-Creating New emotional-and-psychosocial-assessment
	epas.onclick = function () {
		frappe.route_options = { "patient": split_hash }
		frappe.set_route("emotional-and-psychosocial-assessment/new-emotional-and-psychosocial-assessment-1")
	}
	// Fuction for Add(+) Button-Creating New emotional-and-psychosocial-assessment End

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
				frappe.set_route(`/app/assessment_final_sum/#${rec.name}`)
				window.location.reload()
			}
		}
	})
	//Patient Against redirection End 

	//Fetching data to the page End
	try {
		frappe.db.get_list('Emotional And Psychosocial Assessment', {
			fields: ["*"],
			filters: {
				patient: split_hash
			},
		}).then(doc => {
			doc.forEach(patient => {
				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.family_s_ns);
				$(".assessmet_details").append(new_card);

				var new_card1 = $(card_assessment);
				new_card1.find('.name1').html(patient.date);
				new_card1.find('.name2').html(patient.community_s_ns);
				$(".community").append(new_card1);

				var new_card2 = $(card_assessment);
				new_card2.find('.name1').html(patient.date);
				new_card2.find('.name2').html(patient.family_s_sf_df);
				$(".func").append(new_card2);

				var new_card3 = $(card_assessment);
				new_card3.find('.name1').html(patient.date);
				new_card3.find('.name2').html(patient.insight_into_illness);
				$(".insight").append(new_card3);

				var new_card4 = $(card_assessment);
				new_card4.find('.name1').html(patient.date);
				new_card4.find('.name2').html(patient.withdrawn);
				$(".with_drawn").append(new_card4);

				var new_card5 = $(card_assessment);
				new_card5.find('.name1').html(patient.date);
				new_card5.find('.name2').html(patient.easy);
				$(".easyto_talk").append(new_card5);

				var new_card6 = $(card_assessment);
				new_card6.find('.name1').html(patient.date);
				new_card6.find('.name2').html(patient.slurred);
				$(".slurred_speech").append(new_card6);

				var new_card7 = $(card_assessment);
				new_card7.find('.name1').html(patient.date);
				new_card7.find('.name2').html(patient.clear);
				$(".clear_speech").append(new_card7);

				var new_card8 = $(card_assessment);
				new_card8.find('.name1').html(patient.date);
				new_card8.find('.name2').html(patient.unable);
				$(".unable_to_talk").append(new_card8);

				var new_card10 = $(card_assessment);
				new_card10.find('.name1').html(patient.date);
				new_card10.find('.name2').html(patient.talk);
				$(".talk_easy").append(new_card10);

				var new_card9 = $(card_assessment);
				new_card9.find('.name1').html(patient.date);
				new_card9.find('.name2').html(patient.shock);
				$(".stage-patient").append(new_card9);

				var new_card11 = $(card_assessment);
				new_card11.find('.name1').html(patient.date);
				new_card11.find('.name2').html(patient.others_1);
				$(".communication").append(new_card11);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.denial);
				$(".denail-patient").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.hope);
				$(".hope-patient").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.acceptance);
				$(".accept-patient").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.others_2);
				$(".others-patient").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.sad);
				$(".emo_sad").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.anger);
				$(".emo_anger").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.guilt);
				$(".emo_guilt").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.shame);
				$(".emo_shame").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.depr);
				$(".emo_depression").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.suicide);
				$(".emo_suicidal").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.others);
				$(".emo_others").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.of_death);
				$(".fear_death").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.of_severe_pain_of_leaving_family_behind);
				$(".fear_severe").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.of_meeting_god);
				$(".fear_meeting").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.others_specify_in_notes);
				$(".fear_others").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.angry_with_god);
				$(".spir_angry").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.broken_relationships);
				$(".spir_broken").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.forgiveness);
				$(".spir_forgiveness").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.belief_in_after_life);
				$(".spir_belief").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.others_specify_in_notes_section);
				$(".spir_others").append(new_card);

				var new_card = $(card_assessment);
				new_card.find('.name1').html(patient.date);
				new_card.find('.name2').html(patient.palcare_team_member_id_number);
				$(".spir_id").append(new_card);

				$(document).ready(function () {
					let spir_others = document.getElementsByClassName('spir_others');
					if (spir_others.length > 0) {
						$('.clc_list_btn').removeClass('d-none')
					}
				})

				var new_card = $(member_id);
				new_card.find('.flex-item-left').html(patient.palcare_team_member_id_number);
				$(".flex-container").append(new_card);

			})
		})
	}
	catch {
		frappe.msgprint(__('Nothing to show'));
	}
	//Fetching data to the page End

	//Function for (!) button on click popup
	$(document).ready(function () {
		$("#show-popup-btn").click(function () {
			$("#popup-container").show();
		})

		$("#close-btn").click(function () {
			$("#popup-container").hide();
		})
	})

	$(document).ready(function () {
		$("#show-popup-btn1").click(function () {
			$("#popup-container1").show();
		})

		$("#close-btn1").click(function () {
			$("#popup-container1").hide();
		})
	})

	$(document).ready(function () {
		$("#show-popup-btn2").click(function () {
			$("#popup-container2").show();
		})

		$("#close-btn2").click(function () {
			$("#popup-container2").hide();
		})
	})

	$(document).ready(function () {
		$("#show-popup-btn3").click(function () {
			$("#popup-container3").show();
		})

		$("#close-btn3").click(function () {
			$("#popup-container3").hide();
		})
	})
	//Function for (!) button on click popup End

	//Fuction for View More Button
	$("body").on('click', '.clc_list_btn', function (e) {
		frappe.set_route("List", "Emotional And Psychosocial Assessment", { "patient": `${split_hash}` })
		const url = new URL(window.location);
		window.history.pushState({}, '', url);
	})

}
