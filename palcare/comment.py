from ast import Not
import frappe 


# @frappe.whitelist()
def comment_hook(doc,event):
    # not frappe.db.exists('Visit Details',doc.patient)
    cmnts = frappe.new_doc('Comments')
    
    if doc.doctype =='Patient':
        p_name = doc.name
    elif doc.doctype =='Final Summary' or doc.doctype =='Edmonton Symptom Assessment' or doc.doctype =='Reports' or doc.doctype =='Equipment Loaned' or doc.doctype =='Notes' or doc.doctype =='Photos' or doc.doctype =='Patient Summary Card' :
        p_name = doc.patient_name
    elif doc.doctype=='Visit Details' or doc.doctype=='Emotional And Psychosocial Assessment' or doc.doctype=='Medication' or doc.doctype=='Medical Details' :
        p_name = doc.patient
    not frappe.db.exists('Visit Details',p_name)
    cmnts.patient = p_name
    cmnts.date = doc.creation
    cmnts.user=doc.owner
    cmnts.doctype_name=doc.doctype
    cmnts_data="added a {}".format(cmnts.doctype_name )
    cmnts.subject=cmnts_data
    cmnts.save()

def comment_delete(doc,event):
    comnt_del = frappe.new_doc('Comments')
    if doc.doctype =='Patient':
        p_name = doc.name
    elif doc.doctype =='Final Summary' or doc.doctype =='Edmonton Symptom Assessment' or doc.doctype =='Reports' or doc.doctype =='Equipment Loaned' or doc.doctype =='Notes' or doc.doctype =='Photos' or doc.doctype =='Patient Summary Card' :
        p_name = doc.patient_name
    elif doc.doctype=='Visit Details' or doc.doctype=='Emotional And Psychosocial Assessment' or doc.doctype=='Medication' or doc.doctype=='Medical Details' :
        p_name = doc.patient
   
    comnt_del.patient = p_name
    
    comnt_del.date = doc.creation
    comnt_del.user = doc.owner
    comnt_del.doctype_name = doc.doctype
    patint_del="Deleted a {}".format(comnt_del.doctype_name)
    comnt_del.subject=patint_del
    comnt_del.save()
    

def comment_update(doc,event):
    comnt_up = frappe.new_doc('Comments')
    if doc.doctype =='Patient':
        p_name = doc.name
    elif doc.doctype =='Final Summary' or doc.doctype =='Edmonton Symptom Assessment' or doc.doctype =='Reports' or doc.doctype =='Equipment Loaned' or doc.doctype =='Notes' or doc.doctype =='Photos' or doc.doctype =='Patient Summary Card' :
        p_name = doc.patient_name
    elif doc.doctype=='Visit Details' or doc.doctype=='Emotional And Psychosocial Assessment' or doc.doctype=='Medication' or doc.doctype=='Medical Details' :
        p_name = doc.patient
    
    frappe.db.exists('Visit Details',p_name)
    comnt_up.patient = p_name
    
    comnt_up.date = doc.creation
    comnt_up.user = doc.owner
    comnt_up.doctype_name = doc.doctype
    patint_up="Updated a {}".format(comnt_up.doctype_name)
    comnt_up.subject=patint_up
    comnt_up.save()
    