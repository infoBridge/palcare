let input = ''
let select = ''
let dob = new Date(),
	today = new Date(),
	calTime;

frappe.ui.form.on("Patient Form Draft", {
	before_load(frm) {

		const style = document.createElement('style');
		style.innerHTML = `
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
		  -webkit-appearance: none;
		  margin: 0;
		}
		
		/* Firefox */
		input[type=number] {
		  -moz-appearance: textfield;
		}
    `;

		// Mobile Number Validation
		document.head.appendChild(style);
		$("[data-fieldname='mobile_number']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
			$("[data-fieldname='mobile_number']").attr('max', '9999999999')
			$('input[type="number"]').each(function () {
				$(this).on('keyup', function () {
					if ($(this).val() > 9999999999) {
						let val = $(this).val().slice(0, 10);
						$(this).val(val);
					}
				});
			});

		})

		$("[data-fieldname='mobile_number1']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
			$("[data-fieldname='mobile_number1']").attr('max', '9999999999')
			$('input[type="number"]').each(function () {
				$(this).on('keyup', function () {
					if ($(this).val() > 9999999999) {
						let val = $(this).val().slice(0, 10);
						$(this).val(val);
					}
				});
			});
		})

		$("[data-fieldname='mobile_no2']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
			$("[data-fieldname='mobile_no2']").attr('max', '9999999999')
			$('input[type="number"]').each(function () {
				$(this).on('keyup', function () {
					if ($(this).val() > 9999999999) {
						let val = $(this).val().slice(0, 10);
						$(this).val(val);
					}
				});
			});
		})

		$("[data-fieldname='mb7']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
			$("[data-fieldname='mb7']").attr('max', '9999999999')
			$('input[type="number"]').each(function () {
				$(this).on('keyup', function () {
					if ($(this).val() > 9999999999) {
						let val = $(this).val().slice(0, 10);
						$(this).val(val);
					}
				});
			});
		})

		$("[data-fieldname='mobile_number2']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
			$("[data-fieldname='mobile_number2']").attr('max', '9999999999')
			$('input[type="number"]').each(function () {
				$(this).on('keyup', function () {
					if ($(this).val() > 9999999999) {
						let val = $(this).val().slice(0, 10);
						$(this).val(val);
					}
				});
			});
		})

		$("[data-fieldname='mobile_number3']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
			$("[data-fieldname='mobile_number3']").attr('max', '9999999999')
			$('input[type="number"]').each(function () {
				$(this).on('keyup', function () {
					if ($(this).val() > 9999999999) {
						let val = $(this).val().slice(0, 10);
						$(this).val(val);
					}
				});
			});
		})

		$("[data-fieldname='mobile_number4']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
			$("[data-fieldname='mobile_number4']").attr('max', '9999999999')
			$('input[type="number"]').each(function () {
				$(this).on('keyup', function () {
					if ($(this).val() > 9999999999) {
						let val = $(this).val().slice(0, 10);
						$(this).val(val);
					}
				});
			});
		})

		$("[data-fieldname='mb6']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
			$("[data-fieldname='mb6']").attr('max', '9999999999')
			$('input[type="number"]').each(function () {
				$(this).on('keyup', function () {
					if ($(this).val() > 9999999999) {
						let val = $(this).val().slice(0, 10);
						$(this).val(val);
					}
				});
			});
		})
		// Mobile Number Validation End

		//TelePhone Number Validation
		$("[data-fieldname='telephone_number']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='telephone_number1']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='telephone_no2']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='tn7']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='telephone_number2']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='telephone_number3']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='telephone_number4']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='tn6']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})
		// TelePhone Number Validation End

		//Pin Code Validation
		$("[data-fieldname='pincode']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='pin_code1']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='pin_code2']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='pin_code3']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='pin_code4']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='pin_code5']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='pin_code6']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

		$("[data-fieldname='pin_code7']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})
		//Pin Code Validation End

		$("[data-fieldname='number_of_family_members_in_the_same_house']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})
		$("[data-fieldname='aadhar_no']").on('click', 'input', function (e) {
			$(this).prop('type', 'number');
		})

	},
	refresh: function (frm) {
		$(".btn.btn-primary.btn-sm.primary-action").hide();
		$("[data-fieldname='id']").attr('class', 'd-none')

		//Patient Draft Function
		frm.add_custom_button('Proceed To Save', () => {
			frappe.call({
				method: 'palcare.pat_save.before_submit',
				args: {
					'doc': cur_frm.doc.name,
					'salutation': cur_frm.doc.salutation,
					'first_name': cur_frm.doc.first_name,
					'middle_name': cur_frm.doc.middle_name,
					'sur_name': cur_frm.doc.sur_name,
					'date_of_enrolment': cur_frm.doc.date_of_enrolment,
					'zone': cur_frm.doc.zone,
					'address': cur_frm.doc.address,
					'mobile_number': cur_frm.doc.mobile_number,
					'first_name1': cur_frm.doc.first_name1,
					'mobile_number1': cur_frm.doc.mobile_number1,
					'locality': cur_frm.doc.locality,
					'telephone_number': cur_frm.doc.telephone_number,
					'email': cur_frm.doc.email,
					'date_of_birth': cur_frm.doc.date_of_birth,
					'age': cur_frm.doc.age,
					'gender': cur_frm.doc.gender,
					'number_of_family_members_in_the_same_house': cur_frm.doc.number_of_family_members_in_the_same_house,
					'primary_language': cur_frm.doc.primary_language,
					'pan_no': cur_frm.doc.pan_no,
					'aadhar_no': cur_frm.doc.aadhar_no,
					'connection_to_patient': cur_frm.doc.connection_to_patient,
					'middle_name1': cur_frm.doc.middle_name1,
					'sur_name1': cur_frm.doc.sur_name1,
					'locality1': cur_frm.doc.locality1,
					'telephone_number1': cur_frm.doc.telephone_number1,
					'telephone_number': cur_frm.doc.telephone_number,
					'email1': cur_frm.doc.email1,
					'connection_to_patient1': cur_frm.doc.connection_to_patient1,
					'fst_name2': cur_frm.doc.fst_name2,
					'mdl_name2': cur_frm.doc.mdl_name2,
					'srname2': cur_frm.doc.srname2,
					'locality2': cur_frm.doc.locality2,
					'mobile_no2': cur_frm.doc.mobile_no2,
					'emal2': cur_frm.doc.emal2,
					'con': cur_frm.doc.con,
					'first_name7': cur_frm.doc.first_name7,
					'middle7': cur_frm.doc.middle7,
					'su7': cur_frm.doc.su7,
					'locality7': cur_frm.doc.locality7,
					'mb7': cur_frm.doc.mb7,
					'tn7': cur_frm.doc.tn7,
					'email7': cur_frm.doc.email7,
					'first_name2': cur_frm.doc.first_name2,
					'middle_name2': cur_frm.doc.middle_name2,
					'sur_name2': cur_frm.doc.sur_name2,
					'mobile_number2': cur_frm.doc.mobile_number2,
					'telephone_number2': cur_frm.doc.telephone_number2,
					'email2': cur_frm.doc.email2,
					'first_name3': cur_frm.doc.first_name3,
					'middle_name3': cur_frm.doc.middle_name3,
					'sur_name3': cur_frm.doc.sur_name3,
					'mobile_number3': cur_frm.doc.mobile_number3,
					'telephone_number3': cur_frm.doc.telephone_number3,
					'email3': cur_frm.doc.email3,
					'first_name4': cur_frm.doc.first_name4,
					'middle_name4': cur_frm.doc.middle_name4,
					'sur_name4': cur_frm.doc.sur_name4,
					'mobile_number4': cur_frm.doc.mobile_number4,
					'telephone_number4': cur_frm.doc.telephone_number4,
					'email4': cur_frm.doc.email4,
					'first_name6': cur_frm.doc.first_name6,
					'mid6': cur_frm.doc.mid6,
					'sur6': cur_frm.doc.sur6,
					'telephone_no2': cur_frm.doc.telephone_no2,
					'mb6': cur_frm.doc.mb6,
					'tn6': cur_frm.doc.tn6,
					'type_of_referral': cur_frm.doc.type_of_referral,
					'email6': cur_frm.doc.email6,
					'priority': cur_frm.doc.priority,
					'zone': cur_frm.doc.zone,
					'marital_status': cur_frm.doc.marital_status,
					'classification': cur_frm.doc.classification,
					'employment': cur_frm.doc.employment,
					'education': cur_frm.doc.education,
					'address1': cur_frm.doc.address1,
					'adrs2': cur_frm.doc.adrs2,
					'ad7': cur_frm.doc.ad7,
					'address2': cur_frm.doc.address2,
					'address3': cur_frm.doc.address3,
					'address4': cur_frm.doc.address4,
					'ad6': cur_frm.doc.ad6,
					'pincode': cur_frm.doc.pincode,
					'pin_code1': cur_frm.doc.pin_code1,
					'pin_code2': cur_frm.doc.pin_code2,
					'pin_code3': cur_frm.doc.pin_code3,
					'pin_code4': cur_frm.doc.pin_code4,
					'pin_code5': cur_frm.doc.pin_code5,
					'pin_code6': cur_frm.doc.pin_code6,
					'pin_code7': cur_frm.doc.pin_code7
				},
				callback: function () {
					location.reload();
				}
			});
		}).addClass("btn-draft").css({ 'background-color': '#395F6F', 'color': 'white' });
	},
	//Patient Draft Function End

	onload: function (frm) {
		$(document).ready(function () {
			cur_frm.refresh()
		});

		//Hiding Proceed To Save Button for B ang C category Users
		let role = frappe.user_roles
		let b_user = role.filter(word => word == 'B category');
		let result = role.filter(word => word == 'C category');
		let admin = role.filter(word => word == 'Administrator');
		if ((result == "C category" || b_user == "B category") && (admin != "Administrator")) {
			$('.custom-actions.hidden-xs.hidden-md').hide()
		} else {
			$('.btn-draft').removeClass('d-none')
		}
		//Hiding Proceed To Save Button for B ang C category Users

		//Before Save Madatory Field Validation
		frappe.db.get_list('Patient Form Draft', {
			fields: ['*'],
		}).then(records => {
			let com = cur_frm.doc.name
			$("body").on('click', '.btn-draft', function (e) {
				let count = 0;
				if (cur_frm.doc.date_of_enrolment == null) {
					count = count + 1
					alert("Please Enter Date of enrollment")
				}
				else if (cur_frm.doc.zone == null || cur_frm.doc.zone == "") {
					count = count + 1
					alert("Please Select Zone")
				}
				else if (cur_frm.doc.address == null) {
					count = count + 1
					alert("Please Enter Address")
				}
				else if (cur_frm.doc.mobile_number == null) {
					count = count + 1
					alert("Please Enter Mobile Number")
				}
				else if (cur_frm.doc.first_name1 == null) {
					count = count + 1
					alert("Please Enter Caregiver One's Name ")
				}
				else if (cur_frm.doc.mobile_number1 == null) {
					count = count + 1
					alert("Please Enter Caregiver One's Mobile Number")
				}
				if (count === 0) {
					frappe.db.delete_doc("Patient Form Draft", com)
					frappe.msgprint({
						title: __('Notification'),
						indicator: 'green',
						message: __('Patient Draft Form Completed successfully')
					});
					window.history.back()
				}
			})
		})
		//Before Save Madatory Field Validation

		//Future Date Validation 
		$("[data-fieldname='date_of_enrolment']").on('change', 'input', function (e) {
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
					if ($("[data-fieldname='date_of_enrolment']").find('input').val()) {
						$("[data-fieldname='date_of_enrolment']").val('n').trigger('change')
						$('.modal-backdrop.fade.show').hide();
						$('.modal').remove();
						$('.modal-backdrop').remove();
						$('body').removeClass("modal-open");
					}
				}
			}
			calculate($("[data-fieldname='date_of_enrolment']").find('input').val())
		})
		//Future Date Validation End

		// Mobile number validation
		$("[data-fieldname='mobile_number']").on('change', 'input', function (e) {
			let mob1 = $("[data-fieldname='mobile_number']").find('input').val()
			if (mob1 != '') {
				let length = mob1.length;
				if (length != 10) {
					frappe.throw("Mobile Number of Patient should be 10 Digits")
				}
			}
		})

		$("[data-fieldname='mobile_number1']").on('change', 'input', function (e) {
			let Caregiver_1_mob = $("[data-fieldname='mobile_number1']").find('input').val()
			if (Caregiver_1_mob != '') {
				let length = Caregiver_1_mob.length;
				if (length != 10) {
					frappe.throw("Mobile Number of Caregiver One should be 10 Digits")
				}
			}
		})

		$("[data-fieldname='mobile_no2']").on('change', 'input', function (e) {
			let Caregiver_2_mob = $("[data-fieldname='mobile_no2']").find('input').val()
			if (Caregiver_2_mob != '') {
				let length = Caregiver_2_mob.length;
				if (length != 10) {
					frappe.throw("Mobile Number of Caregiver Two Should be 10 Digits")
				}
			}
		})

		$("[data-fieldname='mb7']").on('change', 'input', function (e) {
			let Decision_1_mob = $("[data-fieldname='mb7']").find('input').val()
			if (Decision_1_mob != '') {
				let length = Decision_1_mob.length;
				if (length != 10) {
					frappe.throw("Mobile Number of Decision Maker Should be 10 Digits")
				}
			}
		})

		$("[data-fieldname='mobile_number2']").on('change', 'input', function (e) {
			let ref_1_mob = $("[data-fieldname='mobile_number2']").find('input').val()
			if (ref_1_mob != '') {
				let length = ref_1_mob.length;
				if (length != 10) {
					frappe.throw("Mobile Number in Referred By should be 10 Digits")
				}
			}
		})

		$("[data-fieldname='mobile_number3']").on('change', 'input', function (e) {
			let gp_mob = $("[data-fieldname='mobile_number3']").find('input').val()
			if (gp_mob != '') {
				let length = gp_mob.length;
				if (length != 10) {
					frappe.throw("Mobile Number of General Physician Should be 10 digits")
				}
			}
		})

		$("[data-fieldname='mobile_number4']").on('change', 'input', function (e) {
			let trs = $("[data-fieldname='mobile_number4']").find('input').val()
			if (trs != '') {
				let length = trs.length;
				if (length != 10) {
					frappe.throw("Mobile Number of Treating Onco Specialist Should be 10 Digits")
				}
			}
		})

		$("[data-fieldname='mb6']").on('change', 'input', function (e) {
			let tp = $("[data-fieldname='mb6']").find('input').val()
			if (tp != '') {
				let length = tp.length;
				if (length != 10) {
					frappe.throw("Mobile number of Treating Specialist should be 10 digits")
				}
			}
		})
		// Mobile number validation End

		// //Name Validation
		$(document).ready(function () {
			$("body").on('click', '.btn-draft', function (e) {
				let fname = $("[data-fieldname='first_name']").find('input').val()
				if (fname.indexOf(' ') >= 0) {
					let x_name = fname.replace(/ /g, '')
					frm.set_value("first_name", x_name)
				}

				let sname = $("[data-fieldname='sur_name']").find('input').val()
				if (sname.indexOf(' ') >= 0) {
					let s_name = sname.replace(/ /g, '')
					frm.set_value("sur_name", s_name)
				}
			})
			$("[data-fieldname='first_name']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='middle_name']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='sur_name']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='first_name1']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='middle_name1']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='sur_name1']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='fst_name2']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='mdl_name2']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='srname2']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='first_name7']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='middle7']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='su7']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='first_name2']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='middle_name2']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='sur_name2']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='first_name3']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='middle_name3']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='sur_name3']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='first_name4']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='middle_name4']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='sur_name4']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='first_name6']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='mid6']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
			$("[data-fieldname='sur6']").keypress(function (e) {
				var regex = new RegExp("^[a-zA-Z ]+$");
				var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
				if (regex.test(str)) {
					return true;
				}
				e.preventDefault();
				return false;
			});
		});
		// //Name Validation End

		//Pin Code Validation
		$("[data-fieldname='pincode']").on('change', 'input', function (e) {
			let pin1 = $("[data-fieldname='pincode']").find('input').val()
			if (pin1 != null) {
				let length = pin1.length;
				if (length != 6) {
					frappe.throw("Pincode of Patient should be 6 digits")
				}
			}
		})

		$("[data-fieldname='pin_code1']").on('change', 'input', function (e) {
			let pin2 = $("[data-fieldname='pin_code1']").find('input').val()
			if (pin2 != null) {
				let length = pin2.length;
				if (length != 6) {
					frappe.throw("Pincode of Caregiver One should be 6 digits")
				}
			}
		})

		$("[data-fieldname='pin_code2']").on('change', 'input', function (e) {
			let pin3 = $("[data-fieldname='pin_code2']").find('input').val()
			if (pin3 != null) {
				let length = pin3.length;
				if (length != 6) {
					frappe.throw("Pincode of Caregiver Two should be 6 digits")
				}
			}
		})

		$("[data-fieldname='pin_code3']").on('change', 'input', function (e) {
			let pin4 = $("[data-fieldname='pin_code3']").find('input').val()
			if (pin4 != null) {
				let length = pin4.length;
				if (length != 6) {
					frappe.throw("Pincode of Decision Maker Should be 6 Digits")
				}
			}
		})

		$("[data-fieldname='pin_code4']").on('change', 'input', function (e) {
			let pin5 = $("[data-fieldname='pin_code4']").find('input').val()
			if (pin5 != null) {
				let length = pin5.length;
				if (length != 6) {
					frappe.throw("Pincode in Referred By should be 6 digits")
				}
			}
		})

		$("[data-fieldname='pin_code5']").on('change', 'input', function (e) {
			let pin6 = $("[data-fieldname='pin_code5']").find('input').val()
			if (pin6 != null) {
				let length = pin6.length;
				if (length != 6) {
					frappe.throw("Pincode of General Physician should be 6 digits")
				}
			}
		})

		$("[data-fieldname='pin_code6']").on('change', 'input', function (e) {
			let pin7 = $("[data-fieldname='pin_code6']").find('input').val()
			if (pin7 != null) {
				let length = pin7.length;
				if (length != 6) {
					frappe.throw("Pincode of Treating Onco Specialist should be 6 digits")
				}
			}
		})

		$("[data-fieldname='pin_code7']").on('change', 'input', function (e) {
			let pin8 = $("[data-fieldname='pin_code7']").find('input').val()
			if (pin8 != null) {
				let length = pin8.length;
				if (length != 6) {
					frappe.throw("Pincode of Treating Specialist should be 6 digits")
				}
			}
		})
		//Pin Code Validation End

		//Checkbox Function for 'Same as patient address and mobile number'
		$("[data-fieldname='same_as_caregiver_ones_mobile_number']").change(function (e) {
			if (frm.doc.same_as_caregiver_ones_mobile_number == 1) {
				frm.set_value("mobile_no2", frm.doc.mobile_number1)
			} else {
				frm.set_value("mobile_no2", "")
			}
		})

		$("[data-fieldname='same_as_c_mobil2']").change(function (e) {
			if (frm.doc.same_as_c_mobil2 == 1) {
				frm.set_value("mb7", frm.doc.mobile_number1)
			} else {
				frm.set_value("mb7", "")
			}
		})

		$("[data-fieldname='same_as_address']").change(function (e) {
			if (frm.doc.same_as_address == 1) {
				frm.set_value("address1", frm.doc.address)

			} else {
				frm.set_value("address1", "")
			}
		})

		$("[data-fieldname='same_as_mobil']").change(function (e) {
			if (frm.doc.same_as_mobil == 1) {
				frm.set_value("mobile_number1", frm.doc.mobile_number)
			} else {
				frm.set_value("mobile_number1", "")
			}
		})

		$("[data-fieldname='same_as_tele']").change(function (e) {
			if (frm.doc.same_as_tele == 1) {
				frm.set_value("telephone_number1", frm.doc.telephone_number)
			} else {
				frm.set_value("telephone_number1", "")
			}
		})

		$("[data-fieldname='same_as_addr1']").change(function (e) {
			if (frm.doc.same_as_addr1 == 1) {
				frm.set_value("adrs2", frm.doc.address)
			} else {
				frm.set_value("adrs2", "")
			}
		})

		$("[data-fieldname='same_as_mob1']").change(function (e) {
			if (frm.doc.same_as_mob1 == 1) {
				frm.set_value("mobile_no2", frm.doc.mobile_number)
			} else {
				frm.set_value("mobile_no2", "")
			}
		})

		$("[data-fieldname='same_as_tele1']").change(function (e) {
			if (frm.doc.same_as_tele1 == 1) {
				frm.set_value("telephone_no2", frm.doc.telephone_number)
			} else {
				frm.set_value("telephone_no2", "")
			}
		})

		$("[data-fieldname='same_as_addrss2']").change(function (e) {
			if (frm.doc.same_as_addrss2 == 1) {
				frm.set_value("ad7", frm.doc.address)
			} else {
				frm.set_value("ad7", "")
			}
		})

		$("[data-fieldname='same_as_mobil2']").change(function (e) {
			if (frm.doc.same_as_mobil2 == 1) {
				frm.set_value("mb7", frm.doc.mobile_number)
			} else {
				frm.set_value("mb7", "")
			}
		})

		$("[data-fieldname='same_as_telephn2']").change(function (e) {
			if (frm.doc.same_as_telephn2 == 1) {
				frm.set_value("tn7", frm.doc.telephone_number)
			} else {
				frm.set_value("tn7", "")
			}
		})

		$("[data-fieldname='same_as_pin_code1']").change(function (e) {
			if (frm.doc.same_as_pin_code1 == 1) {
				frm.set_value("pin_code1", frm.doc.pincode)
			} else {
				frm.set_value("pin_code1", "")
			}
		})

		$("[data-fieldname='same_as_locality1']").change(function (e) {
			if (frm.doc.same_as_locality1 == 1) {
				frm.set_value("locality1", frm.doc.locality)
			} else {
				frm.set_value("locality1", "")
			}
		})

		$("[data-fieldname='same_as_pin_code2']").change(function (e) {
			if (frm.doc.same_as_pin_code2 == 1) {
				frm.set_value("pin_code2", frm.doc.pincode)
			} else {
				frm.set_value("pin_code2", "")
			}
		})

		$("[data-fieldname='same_as_locality2']").change(function (e) {
			if (frm.doc.same_as_locality2 == 1) {
				frm.set_value("locality2", frm.doc.locality)
			} else {
				frm.set_value("locality2", "")
			}
		})

		$("[data-fieldname='same_as_pin_code3']").change(function (e) {
			if (frm.doc.same_as_pin_code3 == 1) {
				frm.set_value("pin_code3", frm.doc.pincode)
			} else {
				frm.set_value("pin_code3", "")
			}
		})

		$("[data-fieldname='same_as_locality7']").change(function (e) {
			if (frm.doc.same_as_locality7 == 1) {
				frm.set_value("locality7", frm.doc.locality)
			} else {
				frm.set_value("locality7", "")
			}
		})

		//Checkbox Function for 'Same as patient address and mobile number'end 

		//Age Calculation
		$("[data-fieldname='date_of_birth']").on('change', 'input', function (e) {
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
					alert("Please enter a valid Date of birth")
					if ($("[data-fieldname='date_of_birth']").find('input').val()) {
						$("[data-fieldname='date_of_birth']").val('n').trigger('change')
						$('.modal-backdrop.fade.show').hide();
						$('.modal').remove();
						$('.modal-backdrop').remove();
						$('body').removeClass("modal-open");
					}
				} else {
					frm.set_value("age", year + " Year " + day + ' Days')
				}
				if (year == 0) {
					frm.set_value("age", month + ' Month')
				}
				if (month == 0) {
					frm.set_value("age", day + ' Days')
				}
			}
			calculate($("[data-fieldname='date_of_birth']").find('input').val())
		})
		//Age Calculation End
	}


});
