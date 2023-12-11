# Copyright (c) 2022, Tridz and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class VisitDetails(Document):
	# Full Name creation	
	def before_save(self):
		doc=frappe.get_doc('Patient',self.patient)
		self.patient_name = " ".join(filter(None, [doc.first_name,doc.middle_name, doc.sur_name]))	

		
