# Copyright (c) 2022, Tridz and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class EmotionalAndPsychosocialAssessment(Document):
	def validate(self):
		self.palcare_team_member_id_number=frappe.session.user
