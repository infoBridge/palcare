# Copyright (c) 2022, Tridz and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class EdmontonSymptomAssessment(Document):
	def validate(self):
		self.name_of_palcare_team_member=frappe.session.user

