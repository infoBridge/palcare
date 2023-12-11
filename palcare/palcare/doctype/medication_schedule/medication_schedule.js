// Copyright (c) 2022, Tridz and contributors
// For license information, please see license.txt
let input = ''
let select = ''
let dob = new Date(),
	today = new Date(),
	calTime;
frappe.ui.form.on('Medication Schedule', {
	after_save: function (frm) {
		
		//Redirecting to Patient Details page After saving
		frappe.set_route(`/app/patient-details/#${frm.doc.patient_name}`)
		window.location.reload()
		//Redirecting to Patient Details page After saving End
		
	},
	onload: function (frm) {

		//Future Date Validation
		$("[data-fieldname='date']").on('change', 'input', function (e) {
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
					alert("Please Enter a valid Date")
					if ($("[data-fieldname='date']").find('input').val()) {
						$("[data-fieldname='date']").val('n').trigger('change')
						$('.modal-backdrop.fade.show').hide();
						$('.modal').remove();
						$('.modal-backdrop').remove();
						$('body').removeClass("modal-open");
					}
				}
			}
			calculate($("[data-fieldname='date']").find('input').val())
		})
		//Future Date Validation End

	}
});
