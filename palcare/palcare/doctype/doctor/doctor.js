// Copyright (c) 2022, Tridz and contributors
// For license information, please see license.txt

frappe.ui.form.on('Doctor', {
	onload: function (frm) {
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
		document.head.appendChild(style);

		// Mobile Number Validation
		$("[data-fieldname='mobile_number']").on('change', 'input', function (e) {
			let mobl1 = $("[data-fieldname='mobile_number']").find('input').val()
			if (mobl1 != '') {
				let length = mobl1.length;
				if (length != 10) {
					frappe.throw("Mobile number of Patient should be 10 digits")
				}
			}
		})
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
		// Mobile Number Validation End

	}
});
