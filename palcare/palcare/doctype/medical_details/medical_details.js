// Copyright (c) 2022, Tridz and contributors
// For license information, please see license.txt
let input = ''
let select = ''
let dob = new Date(),
	today = new Date(),
	calTime;
frappe.ui.form.on('Medical Details', {

	after_save: function (frm) {
		frappe.set_route("/palcare-home")
		window.location.reload()
	},
	onload: function (frm) {

		$(document).ready(function () {
			$('.modal-backdrop.fade.show').hide();
			$('.modal').remove();
			$('.modal-backdrop').remove();
			$('body').removeClass("modal-open");
		})

		$("[data-fieldname='patient_name']").on('click', 'input', function (e) {
			$("[data-fieldname='patient_name']").prop('readonly', true);
		})
		
		//Future Date validation
		$("[data-fieldname='enrolment_date']").on('change', 'input', function (e) {
			function calculate(input) {
				dob = new Date();
				today = new Date();
				let x = input.split("-");
				let reverseArray = x.reverse();
				dob.setDate(x[2]);
				dob.setMonth(x[1] - 1);
				dob.setFullYear(x[0]);
				let year, month, day;
				day = (function () {
					if (today.getDate() > dob.getDate()) {
						return today.getDate() - dob.getDate() - 1;
					}
					else if (today.getDate() == dob.getDate()) {
						return today.getDate() - dob.getDate();
					}
					else {
						let calDate = new Date(dob.getFullYear(), dob.getMonth() + 1, 0);
						return (today.getDate() + calDate.getDate()) - dob.getDate() - 1;
					}
				}());
				month = (function () {
					if (today.getMonth() >= dob.getMonth()) {
						if (today.getDate() >= dob.getDate()) {
							return today.getMonth() - dob.getMonth();
						}
						else {
							if ((today.getMonth() - 1) >= dob.getMonth()) {
								return (today.getMonth() - 1) - dob.getMonth();
							}
							else {
								return ((today.getMonth() - 1) + 12) - dob.getMonth();
							}
						}
					}
					else {
						if (today.getDate() >= dob.getDate()) {
							return (today.getMonth() + 12) - dob.getMonth();
						}
						else {
							return ((today.getMonth() - 1) + 12) - dob.getMonth();
						}
					}
				}());
				year = (function () {
					if (dob.getMonth() == today.getMonth()) {
						if (dob.getDate() > today.getDate()) {
							return (today.getFullYear() - 1) - dob.getFullYear();
						} else {
							return today.getFullYear() - dob.getFullYear();
						}
					} else {
						if (dob.getMonth() > today.getMonth()) {
							return (today.getFullYear() - 1) - dob.getFullYear();
						} else {
							return today.getFullYear() - dob.getFullYear();
						}
					}
				}());
				if (year < 0) {
					alert("Please Enter a valid Enrolment Date")
					if ($("[data-fieldname='enrolment_date']").find('input').val()) {
						$("[data-fieldname='enrolment_date']").val('n').trigger('change')
						$('.modal-backdrop.fade.show').hide();
						$('.modal').remove();
						$('.modal-backdrop').remove();
						$('body').removeClass("modal-open");
					}
				}
			}
			calculate($("[data-fieldname='enrolment_date']").find('input').val())
		})
		//Future Date Validation End

		//Adding Patient Name To the Top of the Page
		frappe.db.get_list('Patient', {
			fields: ['*'],
		}).then(records => {
			records.forEach(patient => {
				let com = cur_frm.doc.patient
				if (com == patient.name) {
					frm.set_value("patient_name", (patient.sur_name == null ? patient.first_name : patient.middle_name != null ?
						(patient.middle_name == null ? " " : patient.first_name + " " + patient.middle_name + " " + patient.sur_name) : patient.first_name + " " + patient.sur_name))
				}
			})
		})
		//Adding Patient Name To the Top of the Page End

	}
});
