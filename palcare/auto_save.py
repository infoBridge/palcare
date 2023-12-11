from dataclasses import fields
import json
from typing import Type
import frappe
from frappe.model.document import Document
from datetime import datetime,date
@frappe.whitelist()
# Fuction for passing data from patient to  patient draft
def save_patient_draft(id,patient_dict):
	patient_dict = json.loads(patient_dict) 
	pateint_id = json.loads(id) 
	draft= frappe.db.exists("Patient Form Draft",{
		'id': str(id),
	})
	print("draft",draft)
	if draft:
		patient_update=frappe.get_doc("Patient Form Draft",draft)
		patient_update.first_name=None if 'first_name' not in patient_dict else str(patient_dict['first_name'])
		patient_update.middle_name=None if 'middle_name' not in patient_dict else str(patient_dict['middle_name'])
		patient_update.sur_name=None if 'sur_name' not in patient_dict else str(patient_dict['sur_name'])
		patient_update.enrolment_number=None if 'enrolment_number' not in patient_dict else str(patient_dict['enrolment_number'])
		patient_update.salutation= None if 'salutation' not in patient_dict else str(patient_dict['salutation'])
		patient_update.address=None if 'address' not in patient_dict else str(patient_dict['address'])
		patient_update.locality= None if 'locality' not in patient_dict else str(patient_dict['locality'])
		patient_update.mobile_number=None if 'mobile_number' not in patient_dict else str(patient_dict['mobile_number'])
		patient_update.telephone_number= None if 'telephone_number' not in patient_dict else str(patient_dict['telephone_number'])
		patient_update.email=None if 'email' not in patient_dict else str(patient_dict['email'])
		patient_update.age=None if 'age' not in patient_dict else str(patient_dict['age'])
		patient_update.gender=None if 'gender' not in patient_dict else str(patient_dict['gender'])
		patient_update.number_of_family_members_in_the_same_house=None if 'number_of_family_members_in_the_same_house' not in patient_dict else str(patient_dict['number_of_family_members_in_the_same_house'])
		patient_update.primary_language= None if 'primary_language' not in patient_dict else str(patient_dict['primary_language'])
		patient_update.pan_no=None if 'pan_no' not in patient_dict else str(patient_dict['pan_no'])
		patient_update.aadhar_no=None if 'aadhar_no' not in patient_dict else str(patient_dict['aadhar_no'])
		patient_update.connection_to_patient=None if 'connection_to_patient' not in patient_dict else str(patient_dict['connection_to_patient'])
		patient_update.first_name1=None if 'first_name1' not in patient_dict else str(patient_dict['first_name1'])
		patient_update.middle_name1=None if 'middle_name1' not in patient_dict else str(patient_dict['middle_name1'])
		patient_update.sur_name1=None if 'sur_name1' not in patient_dict else str(patient_dict['sur_name1'])
		patient_update.locality1=None if 'locality1' not in patient_dict else str(patient_dict['locality1'])
		patient_update.	mobile_number1=None if 'mobile_number1' not in patient_dict else str(patient_dict['mobile_number1'])
		patient_update.telephone_number1=None if 'telephone_number1' not in patient_dict else str(patient_dict['telephone_number1'])
		patient_update.type_of_referral=None if 'type_of_referral' not in patient_dict else str(patient_dict['type_of_referral'])
		patient_update.telephone_number=None if 'telephone_number' not in patient_dict else str(patient_dict['telephone_number'])
		patient_update.email1=None if 'email1' not in patient_dict else str(patient_dict['email1'])
		patient_update.connection_to_patient1=None if 'connection_to_patient1' not in patient_dict else str(patient_dict['connection_to_patient1'])
		patient_update.fst_name2=None if 'fst_name2' not in patient_dict else str(patient_dict['fst_name2'])
		patient_update.mdl_name2=None if 'mdl_name2' not in patient_dict else str(patient_dict['mdl_name2'])
		patient_update.srname2=None if 'srname2' not in patient_dict else str(patient_dict['srname2'])
		patient_update.locality2=None if 'locality2' not in patient_dict else str(patient_dict['locality2'])
		patient_update.mobile_no2=None if 'mobile_no2' not in patient_dict else str(patient_dict['mobile_no2'])
		patient_update.emal2=None if 'emal2' not in patient_dict else str(patient_dict['emal2'])
		patient_update.con=None if 'con' not in patient_dict else str(patient_dict['con'])
		patient_update.first_name7=None if 'first_name7' not in patient_dict else str(patient_dict['first_name7'])
		patient_update.middle7=None if 'middle7' not in patient_dict else str(patient_dict['middle7'])
		patient_update.su7=None if 'su7' not in patient_dict else str(patient_dict['su7'])
		patient_update.locality7=None if 'locality7' not in patient_dict else str(patient_dict['locality7'])
		patient_update.mb7=None if 'mb7' not in patient_dict else str(patient_dict['mb7'])
		patient_update.tn7=None if 'tn7' not in patient_dict else str(patient_dict['tn7'])
		patient_update.email7=None if 'email7' not in patient_dict else str(patient_dict['email7'])
		patient_update.first_name2=None if 'first_name2' not in patient_dict else str(patient_dict['first_name2'])
		patient_update.middle_name2=None if 'middle_name2' not in patient_dict else str(patient_dict['middle_name2'])
		patient_update.sur_name2=None if 'sur_name2' not in patient_dict else str(patient_dict['sur_name2'])	
		patient_update.mobile_number2=None if 'mobile_number2' not in patient_dict else str(patient_dict['mobile_number2'])
		patient_update.telephone_number2=None if 'telephone_number2' not in patient_dict else str(patient_dict['telephone_number2'])
		patient_update.email2=None if 'email2' not in patient_dict else str(patient_dict['email2'])
		patient_update.first_name3=None if 'first_name3' not in patient_dict else str(patient_dict['first_name3'])
		patient_update.middle_name3=None if 'middle_name3' not in patient_dict else str(patient_dict['middle_name3'])
		patient_update.sur_name3=None if 'sur_name3' not in patient_dict else str(patient_dict['sur_name3'])
		patient_update.mobile_number3=None if 'mobile_number3' not in patient_dict else str(patient_dict['mobile_number3'])
		patient_update.telephone_number3=None if 'telephone_number3' not in patient_dict else str(patient_dict['telephone_number3'])
		patient_update.email3=None if 'email3' not in patient_dict else str(patient_dict['email3'])
		patient_update.first_name4=None if 'first_name4' not in patient_dict else str(patient_dict['first_name4'])
		patient_update.middle_name4=None if 'middle_name4' not in patient_dict else str(patient_dict['middle_name4'])
		patient_update.sur_name4=None if 'sur_name4' not in patient_dict else str(patient_dict['sur_name4'])
		patient_update.mobile_number4=None if 'mobile_number4' not in patient_dict else str(patient_dict['mobile_number4'])
		patient_update.telephone_number4=None if 'telephone_number4' not in patient_dict else str(patient_dict['telephone_number4'])
		patient_update.email4=None if 'email4' not in patient_dict else str(patient_dict['email4'])
		patient_update.first_name6=None if 'first_name6' not in patient_dict else str(patient_dict['first_name6'])
		patient_update.mid6=None if 'mid6' not in patient_dict else str(patient_dict['mid6'])
		patient_update.sur6=None if 'sur6' not in patient_dict else str(patient_dict['sur6'])
		patient_update.mb6=None if 'mb6' not in patient_dict else str(patient_dict['mb6'])
		patient_update.tn6=None if 'tn6' not in patient_dict else str(patient_dict['tn6'])
		patient_update.email6=None if 'email6' not in patient_dict else str(patient_dict['email6'])
		patient_update.priority=None if 'priority' not in patient_dict else str(patient_dict['priority'])
		patient_update.zone=None if 'zone' not in patient_dict else str(patient_dict['zone'])
		patient_update.pincode=None if 'pincode' not in patient_dict else str(patient_dict['pincode'])
		patient_update.pin_code1= None if 'pin_code1' not in patient_dict else str(patient_dict['pin_code1'])
		patient_update.pin_code2= None if 'pin_code2' not in patient_dict else str(patient_dict['pin_code2'])
		patient_update.pin_code3= None if 'pin_code3' not in patient_dict else str(patient_dict['pin_code3'])
		patient_update.pin_code4= None if 'pin_code4' not in patient_dict else str(patient_dict['pin_code4'])
		patient_update.pin_code5= None if 'pin_code5' not in patient_dict else str(patient_dict['pin_code5'])
		patient_update.pin_code6= None if 'pin_code6' not in patient_dict else str(patient_dict['pin_code6'])
		patient_update.pin_code7= None if 'pin_code7' not in patient_dict else str(patient_dict['pin_code7'])
		patient_update.marital_status=None if 'marital_status' not in patient_dict else str(patient_dict['marital_status'])
		patient_update.classification=None if 'classification' not in patient_dict else str(patient_dict['classification'])
		patient_update.employment=None if 'employment' not in patient_dict else str(patient_dict['employment'])
		patient_update.education=None if 'education' not in patient_dict else str(patient_dict['education'])
		patient_update.address1=None if 'address1' not in patient_dict else str(patient_dict['address1'])
		patient_update.adrs2=None if 'adrs2' not in patient_dict else str(patient_dict['adrs2'])
		patient_update.ad7=None if 'ad7' not in patient_dict else str(patient_dict['ad7'])
		patient_update.address2=None if 'address2' not in patient_dict else str(patient_dict['address2'])
		patient_update.address3=None if 'address3' not in patient_dict else str(patient_dict['address3'])
		patient_update.address4=None if 'address4' not in patient_dict else str(patient_dict['address4'])
		patient_update.ad6=None if 'ad6' not in patient_dict else str(patient_dict['ad6'])
		try:
			patient_dict['date_of_enrolment'] = datetime.strptime(patient_dict['date_of_enrolment'], '%d-%m-%Y')
			patient_update.date_of_enrolment=None if 'date_of_enrolment' not in patient_dict else (patient_dict['date_of_enrolment'])
		except:
			pass
		try:
			patient_dict['date_of_birth'] = datetime.strptime(patient_dict['date_of_birth'], '%d-%m-%Y')
			patient_update.date_of_enrolment=None if 'date_of_birth' not in patient_dict else (patient_dict['date_of_birth'])
		except:
			pass
		patient_update.save()
	else:	
		if 'first_name' not in patient_dict or 'sur_name' not in patient_dict:
			pass
		else:
			if 'date_of_enrolment' in patient_dict:
				patient_dict['date_of_enrolment'] = datetime.strptime(patient_dict['date_of_enrolment'], '%d-%m-%Y')
			else:
				patient_dict['date_of_enrolment'] = None
			if 'date_of_birth' in patient_dict:
				patient_dict['date_of_birth'] = datetime.strptime(patient_dict['date_of_birth'], '%d-%m-%Y')
			else:
				patient_dict['date_of_birth'] = None
			patient_draft = frappe.get_doc({
				'doctype': 'Patient Form Draft',
				'first_name': None if 'first_name' not in patient_dict else str(patient_dict['first_name']),
				'id': str(id),
				'middle_name': None if 'middle_name' not in patient_dict else str(patient_dict['middle_name']),
				'sur_name': None if 'sur_name' not in patient_dict else str(patient_dict['sur_name']),
				'date_of_enrolment': None if 'date_of_enrolment' not in patient_dict else (patient_dict['date_of_enrolment']),
				'enrolment_number': None if 'enrolment_number' not in patient_dict else str(patient_dict['enrolment_number']),
				'salutation': None if 'salutation' not in patient_dict else str(patient_dict['salutation']),
				'address': None if 'address' not in patient_dict else str(patient_dict['address']),
				'locality': None if 'locality' not in patient_dict else str(patient_dict['locality']),
				'mobile_number': None if 'mobile_number' not in patient_dict else str(patient_dict['mobile_number']),
				'telephone_number': None if 'telephone_number' not in patient_dict else str(patient_dict['telephone_number']),
				'email': None if 'email' not in patient_dict else str(patient_dict['email']),
				'date_of_birth': None if 'date_of_birth' not in patient_dict else (patient_dict['date_of_birth']),
				'age': None if 'age' not in patient_dict else str(patient_dict['age']),
				'gender': None if 'gender' not in patient_dict else str(patient_dict['gender']),
				'number_of_family_members_in_the_same_house': None if 'number_of_family_members_in_the_same_house' not in patient_dict else str(patient_dict['number_of_family_members_in_the_same_house']),
				'primary_language': None if 'primary_language' not in patient_dict else str(patient_dict['primary_language']),
				'pan_no': None if 'pan_no' not in patient_dict else str(patient_dict['pan_no']),
				'aadhar_no': None if 'aadhar_no' not in patient_dict else str(patient_dict['aadhar_no']),
				'connection_to_patient': None if 'connection_to_patient' not in patient_dict else str(patient_dict['connection_to_patient']),
				'first_name1': None if 'first_name1' not in patient_dict else str(patient_dict['first_name1']),
				'middle_name1': None if 'middle_name1' not in patient_dict else str(patient_dict['middle_name1']),
				'sur_name1': None if 'sur_name1' not in patient_dict else str(patient_dict['sur_name1']),
				'locality1': None if 'locality1' not in patient_dict else str(patient_dict['locality1']),
				'mobile_number1': None if 'mobile_number1' not in patient_dict else str(patient_dict['mobile_number1']),
				'telephone_number1': None if 'telephone_number1' not in patient_dict else str(patient_dict['telephone_number1']),
				'telephone_number': None if 'telephone_number' not in patient_dict else str(patient_dict['telephone_number']),
				'email1': None if 'email1' not in patient_dict else str(patient_dict['email1']),
				'connection_to_patient1': None if 'connection_to_patient1' not in patient_dict else str(patient_dict['connection_to_patient1']),
				'fst_name2': None if 'fst_name2' not in patient_dict else str(patient_dict['fst_name2']),
				'mdl_name2': None if 'mdl_name2' not in patient_dict else str(patient_dict['mdl_name2']),
				'srname2': None if 'srname2' not in patient_dict else str(patient_dict['srname2']),
				'locality2': None if 'locality2' not in patient_dict else str(patient_dict['locality2']),
				'mobile_no2': None if 'mobile_no2' not in patient_dict else str(patient_dict['mobile_no2']),
				'emal2': None if 'emal2' not in patient_dict else str(patient_dict['emal2']),
				'con': None if 'con' not in patient_dict else str(patient_dict['con']),
				'first_name7': None if 'first_name7' not in patient_dict else str(patient_dict['first_name7']),
				'middle7': None if 'middle7' not in patient_dict else str(patient_dict['middle7']),
				'su7': None if 'su7' not in patient_dict else str(patient_dict['su7']),
				'locality7': None if 'locality7' not in patient_dict else str(patient_dict['locality7']),
				'mb7':None if 'mb7' not in patient_dict else str(patient_dict['mb7']),
				'tn7':None if 'tn7' not in patient_dict else str(patient_dict['tn7']),
				'email7':None if 'email7' not in patient_dict else str(patient_dict['email7']),
				'first_name2':None if 'first_name2' not in patient_dict else str(patient_dict['first_name2']),	
				'middle_name2':None if 'middle_name2' not in patient_dict else str(patient_dict['middle_name2']),
				'sur_name2':None if 'sur_name2' not in patient_dict else str(patient_dict['sur_name2']),	
				'mobile_number2':None if 'mobile_number2' not in patient_dict else str(patient_dict['mobile_number2']),
				'telephone_number2': None if 'telephone_number2' not in patient_dict else str(patient_dict['telephone_number2']),
				'email2': None if 'email2' not in patient_dict else str(patient_dict['email2']),
				'first_name3': None if 'first_name3' not in patient_dict else str(patient_dict['first_name3']),
				'middle_name3': None if 'middle_name3' not in patient_dict else str(patient_dict['middle_name3']),
				'sur_name3': None if 'sur_name3' not in patient_dict else str(patient_dict['sur_name3']),
				'mobile_number3': None if 'mobile_number3' not in patient_dict else str(patient_dict['mobile_number3']),
				'telephone_number3': None if 'telephone_number3' not in patient_dict else str(patient_dict['telephone_number3']),
				'email3': None if 'email3' not in patient_dict else str(patient_dict['email3']),
				'first_name4': None if 'first_name4' not in patient_dict else str(patient_dict['first_name4']),
				'middle_name4': None if 'middle_name4' not in patient_dict else str(patient_dict['middle_name4']),
				'sur_name4': None if 'sur_name4' not in patient_dict else str(patient_dict['sur_name4']),
				'mobile_number4': None if 'mobile_number4' not in patient_dict else str(patient_dict['mobile_number4']),
				'telephone_number4': None if 'telephone_number4' not in patient_dict else str(patient_dict['telephone_number4']),
				'email4': None if 'email4' not in patient_dict else str(patient_dict['email4']),
				'first_name6': None if 'first_name6' not in patient_dict else str(patient_dict['first_name6']),
				'mid6': None if 'mid6' not in patient_dict else str(patient_dict['mid6']),
				'sur6': None if 'sur6' not in patient_dict else str(patient_dict['sur6']),
				'mb6': None if 'mb6' not in patient_dict else str(patient_dict['mb6']),
				'tn6': None if 'tn6' not in patient_dict else str(patient_dict['tn6']),
				'email6': None if 'email6' not in patient_dict else str(patient_dict['email6']),
				'priority': None if 'priority' not in patient_dict else str(patient_dict['priority']),
				'pincode': None if 'pincode' not in patient_dict else str(patient_dict['pincode']),
				'pin_code1': None if 'pin_code1' not in patient_dict else str(patient_dict['pin_code1']),
				'pin_code2': None if 'pin_code2' not in patient_dict else str(patient_dict['pin_code2']),
				'pin_code3': None if 'pin_code3' not in patient_dict else str(patient_dict['pin_code3']),
				'pin_code4': None if 'pin_code4' not in patient_dict else str(patient_dict['pin_code4']),
				'pin_code5': None if 'pin_code5' not in patient_dict else str(patient_dict['pin_code5']),
				'pin_code6': None if 'pin_code6' not in patient_dict else str(patient_dict['pin_code6']),
				'pin_code7':None if 'pin_code7' not in patient_dict else str(patient_dict['pin_code7']),
				'zone': None if 'zone' not in patient_dict else str(patient_dict['zone']),
				'marital_status': None if 'marital_status' not in patient_dict else str(patient_dict['marital_status']),
				'classification': None if 'classification' not in patient_dict else str(patient_dict['classification']),
				'employment': None if 'employment' not in patient_dict else str(patient_dict['employment']),
				'education': None if 'education' not in patient_dict else str(patient_dict['education']),
				'address1':None if 'address1' not in patient_dict else str(patient_dict['address1']),
				'adrs2':None if 'adrs2' not in patient_dict else str(patient_dict['adrs2']),
				'ad7':None if 'ad7' not in patient_dict else str(patient_dict['ad7']),
				'address2':None if 'address2' not in patient_dict else str(patient_dict['address2']),	
				'address3':None if 'address3' not in patient_dict else str(patient_dict['address3']),
				'address4':None if 'address4' not in patient_dict else str(patient_dict['address4']),	
				'ad6':None if 'ad6' not in patient_dict else str(patient_dict['ad6'])	
					})          
			patient_draft.insert()
			patient_draft.save()