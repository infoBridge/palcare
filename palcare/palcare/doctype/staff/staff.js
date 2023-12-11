// Copyright (c) 2022, Tridz and contributors
// For license information, please see license.txt

frappe.ui.form.on('Staff', {
	onload: function(frm) {

		//Mobile Number Validation
		$("[data-fieldname='mobile_number']").on('change', 'input', function (e) {
			let mobl = $("[data-fieldname='mobile_number']").find('input').val()
			if (isNaN(mobl)) {
				frappe.throw("Please enter a valid  Mobile Number")
			}
			else if (mobl != '') {
				let length = mobl.length;
				if (length != 10) {
					frappe.throw("Mobile number of Patient should be 10 digits")
				}
			}
		})
		//Mobile Number Validation

	}
});
