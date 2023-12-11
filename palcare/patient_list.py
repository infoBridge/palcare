import frappe

@frappe.whitelist(allow_guest=True)
def Patient():
    doc_name=frappe.get_list('Patient',pluck='name')
    return doc_name

@frappe.whitelist(allow_guest=True)
def Doctor():
    doc_name=frappe.get_list('Doctor',pluck='name')
    return doc_name

@frappe.whitelist(allow_guest=True)
def Nurse():
    doc_name=frappe.get_list('Nurse',pluck='name1')
    return doc_name

@frappe.whitelist(allow_guest=True)
def Counselor():
    doc_name=frappe.get_list('Counselor',pluck='name1')
    return doc_name

@frappe.whitelist(allow_guest=True)
def Counselor():
    doc_name=frappe.get_list('Allergens',pluck='name1')
    return doc_name

@frappe.whitelist(allow_guest=True)
def Counselor():
    doc_name=frappe.get_list('Comorbidiities',pluck='name1')
    return doc_name            
