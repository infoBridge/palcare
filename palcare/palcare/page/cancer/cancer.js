frappe.pages['cancer'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Medical Details',
		single_column: true
	});
	$(frappe.render_template("cancer")).appendTo(page.main);;
	let cancer_details = frappe.render_template("cancer_details");
	let route=window.location.hash
	let split_hash=route.substring(1)
	frappe.db.get_list('Medical Details', {
		fields: ["*"],}).then(records => {
		records.forEach(medical_details => {
			var new_medical_details = $(cancer_details);
			new_medical_details.find('.type_of_cancer').html(medical_details.type_of_cancer);
			new_medical_details.find('.diagnosed_year').html(medical_details.diagnosed_year);
			// new_medical_details.find('.revealed_by').html(medical_details.revealed_by);
			new_medical_details.find('.diagnosed_year').html(medical_details.diagnosed_year);
			new_medical_details.find('.primary_site').html(medical_details.primary_site);
			new_medical_details.find('.secondary_site').html(medical_details.secondary_site);
			new_medical_details.find('.metastasised_to').html(medical_details.metastasised_to);
			new_medical_details.find('.recovered_year').html(medical_details.recovered_year);
			new_medical_details.find('.re_occured_year').html(medical_details.re_occured_year);
			new_medical_details.find('.stage').html(medical_details.stage);
			new_medical_details.find('.prognosis').html(medical_details.prognosis);
			new_medical_details.find('.alternative_therapy').html(medical_details.alternative_therapy);
			$(".details_of_cancer").append(new_medical_details);

		});		
	})
}