# Copyright (c) 2022, Tridz and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class PatientFormDraft(Document):

	# Full Name creation
	def before_naming(self):
		self.full_name = " ".join(filter(None, [self.first_name, self.middle_name, self.sur_name]))
	# Full Name creation End	
