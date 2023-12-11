# Copyright (c) 2022, Tridz and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class FinalSummary(Document):
	def validate(self):
		self.team_member=frappe.session.user