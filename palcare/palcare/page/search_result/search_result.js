frappe.pages['search-result'].on_page_load = function(wrapper) {
	var object_array={}
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Your Search Result',
		single_column: true
	});

	frappe.require('/assets/palcare/js/utils.js',()=>{

		base_url=base_url
	})
	$(frappe.render_template("search_data")).appendTo(page.main);
	let data=frappe.render_template("search-result")
	let search_id=document.getElementById("patient-search")
	const params = new URLSearchParams(window.location.search)
//Patient Searching	 function
for (const param of params) {
  let b=param[1]
  let a1=param[0]
  if(param[0]=="first_name"){
	  object_array = {...object_array, first_name:param[1]};
  }else if(param[0]=="enrolment_number"){
	object_array = {...object_array, enrolment_number:param[1]};
}

else if(param[0]=="mobile_number"){
	object_array={...object_array,mobile_number:param[1]}
}

else if(param[0]=="sur_name"){
	object_array={...object_array,sur_name:param[1]}
}

else if(param[0]=="locality"){
	object_array={...object_array,locality:param[1]}
}

else if(param[0]=="enrolment_month"){
	object_array={...object_array,enrolment_month:param[1]}
}

}
//Patient Searching	 function End

//Fetching data to the page
frappe.db.get_list('Patient',{
	fields:["*"],
	filters:object_array
}).then(res=>{
	if(Object.keys(object_array).length===0){
		$(".search").append(`<h3 style=text-align:center;>Data not found</h3>`)
	
	}
	else if(res.length>0){
	res.forEach(patient=>{
		var card=$(data)
		card.find('.name1').html(patient.sur_name == null?patient.first_name:patient.middle_name != null ?
			 (patient.middle_name == null ? " " : patient.first_name + " " +patient.middle_name +  " " +patient.sur_name) : patient.first_name +  " " +patient.sur_name)
		card.find('.Entrollment_No').html(patient.enrolment_number)
		card.find('.Entrollment_Date').html(patient.date_of_enrolment)
		card.find('.Zone').html(patient.zone)
		card.find('.Gender').html(patient.gender)
		card.find('.age').html(patient.age)
		card.find('.Caregiver_name').html(patient.first_name1)
		card.find('.patient-search').attr('id',patient.enrolment_number)
		$(".search").append(card)
		$(`#${patient.enrolment_number}`).on('click',function(){
			frappe.set_route(`/app/patient-details/#${patient.name}`)
			window.location.reload()
		})
	})}
	else{
		$(".search").append(`<h3 style=text-align:center;>Data not found</h3>`)
	}
})
//Fetching data to the page

}