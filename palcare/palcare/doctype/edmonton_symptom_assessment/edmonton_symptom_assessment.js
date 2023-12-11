// Copyright (c) 2022, Tridz and contributors
// For license information, please see license.txt
let input = ''
let select = ''
let dob = new Date(),
	today = new Date(),
	calTime;
frappe.ui.form.on('Edmonton Symptom Assessment', {
	after_save: function (frm) {

		//Redirecting to Patient Details page After saving
		frappe.set_route(`/app/patient-details/#${frm.doc.patient_name}`)
		window.location.reload()
		//Redirecting to Patient Details page After saving End

	},
	onload: function (frm) {
		$("[data-fieldname='patient']").on('click', 'input', function (e) {
			$("[data-fieldname='patient']").prop('readonly', true);
		})
		// Future Date validation
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
				frappe.db.get_list('Patient', {
					fields: ['*'],

				}).then(records => {
					records.forEach(med => {
						let com = cur_frm.doc.patient_name
						if (com == med.name) {
							let coms = new Date(med.date_of_enrolment)
							let coms1 = new Date(cur_frm.doc.date)
							let enr_date = med.date_of_enrolment
							let [year, month, day] = enr_date.split('-');
							let result = [day, month, year].join('/');
							const date = coms
							day = (function () {
								if (coms1.getDate() > coms.getDate()) {
									return coms1.getDate() - coms.getDate() - 1;
								}
								else if (coms1.getDate() == coms.getDate()) {
									return coms1.getDate() - coms.getDate();
								}
								else {
									let calDate = new Date(coms.getFullYear(), coms.getMonth() + 1, 0);
									return (coms1.getDate() + calDate.getDate()) - coms.getDate() - 1;
								}
							}());
							month = (function () {
								if (coms1.getMonth() >= coms.getMonth()) {
									if (coms1.getDate() >= coms.getDate()) {
										return coms1.getMonth() - coms.getMonth();
									}
									else {
										if ((coms1.getMonth() - 1) >= coms.getMonth()) {
											return (coms1.getMonth() - 1) - coms.getMonth();
										}
										else {
											return ((coms1.getMonth() - 1) + 12) - coms.getMonth();
										}
									}
								}
								else {
									if (coms1.getDate() >= coms.getDate()) {
										return (coms1.getMonth() + 12) - coms.getMonth();
									}
									else {
										return ((coms1.getMonth() - 1) + 12) - coms.getMonth();
									}
								}
							}());
							year = (function () {
								if (coms.getMonth() == coms1.getMonth()) {
									if (coms.getDate() > coms1.getDate()) {
										return (coms1.getFullYear() - 1) - coms.getFullYear();
									} else {
										return coms1.getFullYear() - coms.getFullYear();
									}
								} else {
									if (coms.getMonth() > coms1.getMonth()) {
										return (coms1.getFullYear() - 1) - coms.getFullYear();
									} else {
										return coms1.getFullYear() - coms.getFullYear();
									}
								}
							}());
							if (year < 0) {
								alert("Date Can't be Before Date Of Enrolment:-" + result)
								if ($("[data-fieldname='date']").find('input').val()) {
									$("[data-fieldname='date']").val('n').trigger('change')
									$('.modal-backdrop.fade.show').hide();
									$('.modal').remove();
									$('.modal-backdrop').remove();
									$('body').removeClass("modal-open");
								}
							}
						}
					})
				})
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
		//End of Future Date Validation

		//Adding Patient To the Top of the Page
		frappe.db.get_list('Patient', {
			fields: ['*'],

		}).then(records => {
			records.forEach(patient => {
				let com = cur_frm.doc.patient_name
				if (com == patient.name) {
					frm.set_value("patient", (patient.sur_name == null ? patient.first_name : patient.middle_name != null ?
						(patient.middle_name == null ? " " : patient.first_name + " " + patient.middle_name + " " + patient.sur_name) : patient.first_name + " " + patient.sur_name))
				}

			})
		})
		//Adding Patient To the Top of the Page End
	}
});
