# Copyright (c) 2022, Tridz and contributors
# For license information, please see license.txt


from calendar import month
from dataclasses import fields
from re import search
import frappe
import datetime
from datetime import date
from frappe.model.document import Document
from frappe.model.naming import getseries

class Patient(Document):
	
	# Enrolment Number Creation
	def before_naming(self):
		if not self.enrolment_number:
			enrol_num=frappe.get_doc('Enrolment number')
			self.enrolment_number=enrol_num.enrolment_number+1
			enrol_num.enrolment_number=enrol_num.enrolment_number+1
			enrol_num.save()	
	# Enrolment Number Creation End	

	# Full Name creation	
			self.full_name = " ".join(filter(None, [self.first_name, self.middle_name, self.sur_name]))
	# Full Name creation End
	
	# Patient Draft Deletion After saving
	def after_insert(self):
		draft_list =  frappe.db.get_all("Patient Form Draft",fields= ["name"],filters={"id": self.id})
		for draft_naming in draft_list:
			frappe.delete_doc("Patient Form Draft",draft_naming["name"])
			print("draft_naming",draft_naming["name"])
	# Patient Draft Deletion After saving End
			
	# Patient Draft Deletion After Updating		
	def on_update(self):
		draft_list =  frappe.db.get_all("Patient Form Draft",fields= ["name"],filters={"id": self.id})
		for draft_naming in draft_list:
			frappe.delete_doc("Patient Form Draft",draft_naming["name"])
	# Patient Draft Deletion After Updating End		
		
	# Setting Enrolment Moth For Patient search
	def before_save(self):
		date=str(self.date_of_enrolment)
		x = slice(5,-3)
		# strp_date=datetime.datetime.strptime(date, "%Y-%m-%d")
		month=date[x]	
		if month=='01':
			self.enrolment_month='January'
		if month=='02':
			self.enrolment_month='February'
		if month=='03':
			self.enrolment_month='March'
		if month=='04':
			self.enrolment_month='April'
		if month=='05':
			self.enrolment_month='May'
		if month=='06':
			self.enrolment_month='June'
		if month=='07':
			self.enrolment_month='July'
		if month=='08':
			self.enrolment_month='August'
		if month=='09':
			self.enrolment_month='September'
		if month=='10':
			self.enrolment_month='October'
		if month=='11':
			self.enrolment_month='November'
		if month=='12':
			self.enrolment_month='December'

		# enroll_date=self.date_of_enrolment
		# date_type=datetime.datetime.strptime(enroll_date,'%Y-%m-%d')
		# print(type(date_type))
		# date_today=datetime.datetime.today()
		# print(type(date_today))

		# if date_type>date_today:
		# 	frappe.throw("Please Enter a valid Enrolment Date")

		# Setting Enrolment Moth For Patient search End
		
