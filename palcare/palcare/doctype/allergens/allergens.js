// Copyright (c) 2023, Tridz and contributors
// For license information, please see license.txt

frappe.ui.form.on('Allergens', {
	onload: function (frm) {
		window.onload = function () {
			if (!window.location.hash) {
				window.location = window.location + '#loaded';
				window.location.reload();
			}
		}
	},
});
