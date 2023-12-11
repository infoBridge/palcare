# Copyright (c) 2022, Tridz and contributors
# For license information, please see license.txt

import frappe

from frappe.utils import date_diff
from frappe.model.document import Document
from datetime import date

class PatientSummaryCard(Document):
	
	def validate(self):
		self.user=frappe.session.user
		doc=frappe.get_doc('Patient',self.patient_name)
		cur_doc_date=self.date
		enroll_date=doc.date_of_enrolment

	def before_submit(self):
		doc=frappe.get_doc('Patient',self.patient_name)

	# Full Name creation
	def before_save(self):
		doc=frappe.get_doc('Patient',self.patient_name)
		self.patient = " ".join(filter(None, [doc.first_name,doc.middle_name, doc.sur_name]))
	# Full Name creation End
	
	# Calculating number of days with palcare
	def validate(self):
		self.user=frappe.session.user
		doc=frappe.get_doc('Patient',self.patient_name)
		cur_doc_date=self.date
		enroll_date=doc.date_of_enrolment
		diff=date_diff(cur_doc_date,enroll_date)
		self.no_of_days_with_palcare=diff
	# Calculating number of days with palcare End			
