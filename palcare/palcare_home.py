import frappe
import json
import os
from frappe.model.document import Document
from urllib.parse import urlparse, parse_qs
@frappe.whitelist()
def last_doc():
    visit_last_modified=[]
    last_visit=[]
    patients=[]
    patients_visit_list=frappe.get_list("Visit Details",filters={"care_priority": 'High'},fields={"modified","patient","patient_name"},limit= 21)
    for pat_vist in patients_visit_list:
        patients.append(pat_vist.patient)
    # For removing duplicate patients    
    sorted_patients=[*set(patients)]  
    for patient in sorted_patients:
        visit_list=frappe.get_list("Visit Details",filters={"patient":patient},fields={"modified","patient","patient_name","care_priority"})
        if visit_list:
            visit_time=sorted(visit_list, key=lambda i: i["modified"], reverse=True)[0]
            visit_last_modified.append(visit_time) 
    for latest_visit in visit_last_modified:
        if latest_visit.care_priority == "High":
            last_visit.append(latest_visit)
    visit_latest=sorted(last_visit, key=lambda i: i["modified"], reverse=True)       
    return visit_latest 
            
