frappe.pages['visiters-list'].on_page_load = function (wrapper) {

	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Visit Details',
		single_column: true
	});

	$(frappe.render_template("visiters_list")).appendTo(page.main);;

	let visiters_list = frappe.render_template("visiters_details");
	
	let route=window.location.hash
	let split_hash=route.substring(1)

	// let y = frappe.db.get_list('Visit Details', {
	// 	fields: ["*"],}).then(palca_staff => {
	// 		let staf=frappe.db.get_list('Palcare Staff',palca_staff.palcare_staff)
	// 		let sta=frappe.db.get_list('Staff',palca_staff.name)
	// 		console.log(sta,"staff")})

	let x = frappe.db.get_doc('Visit Details','VISIT00001')
	.then(staff_list => {
		let pal_staff = staff_list.palcare_staff
		pal_staff.forEach(doc=>{
			console.log(doc.staff)
		
		console.log('pal_staff:',staff_list.palcare_staff)
		flag=true

	
	frappe.db.get_list('Visit Details', {
		fields: ["*"],
		filters:{
			patient:split_hash
		}}).then(records => {
		records.forEach(visit_details => {
			var new_visiter = $(visiters_list);
			new_visiter.find('.visit_date').html(visit_details.visit_date);
			new_visiter.find('.visit_time').html(visit_details.visit_time);
			new_visiter.find('.Docter_in_Charge').html(visit_details.doctor_in_charge);
			new_visiter.find('.Gender').html(visit_details.visited_by);
			new_visiter.find('.Counselor').html(visit_details.counselor);
			new_visiter.find('.Palcare_Staff').html(doc.staff);
			new_visiter.find('.Other').attr("id", visit_details.other);
			new_visiter.find('.Enrolment').html(visit_details.enrolment);
			new_visiter.find('.followup').html(visit_details.follow_up);
			new_visiter.find('.breavement').html(visit_details.bereavement);
			new_visiter.find('.Other_Doc').html(visit_details.other_doctor);
			new_visiter.find('.Nurse_in_Charge').html(visit_details.nurse_in_charge);
			new_visiter.find('.other_nur').html(visit_details.other_nurse);
			new_visiter.find('.date').html(visit_details.date);
			new_visiter.find('.by_whom').html(visit_details.by_whom);
			let pall_staff=visit_details.palcare_staff
			$(".visiters").append(new_visiter);

		});
		
	})
})
 })	
} 