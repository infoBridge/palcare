import frappe
import json
from frappe.model.document import Document

@frappe.whitelist()
def east_visit_high():
    visit_last_modified=[]
    last_visit=[]
    patients=[]
    patients_visit_list=frappe.get_list("Visit Details",filters={"zone": 'Zone 5 - East Mumbai',"care_priority": 'High'},fields={"modified","patient","patient_name"},limit= 4)
    print(patients_visit_list)
    for pat_vist in patients_visit_list:
        patients.append(pat_vist.patient)
    # For removing duplicate patients    
    sorted_patients=[*set(patients)]  
    for patient in sorted_patients:
        visit_list=frappe.get_list("Visit Details",filters={"patient":patient},fields={"modified","patient","patient_name","care_priority","zone"},limit= 4)
        if visit_list:
            visit_time=sorted(visit_list, key=lambda i: i["modified"], reverse=True)[0]
            visit_last_modified.append(visit_time) 
    for latest_visit in visit_last_modified:
        if latest_visit.care_priority == "High":
            last_visit.append(latest_visit)
    visit_latest=sorted(last_visit, key=lambda i: i["modified"], reverse=True)       
    return visit_latest

@frappe.whitelist()
def east_visit_priority_medium():
    care_medium_patients_list=[]
    medium_visit_last_modified=[]
    last_visit_medium=[]
    care_medium_visit=frappe.get_list("Visit Details",filters={"zone": 'Zone 5 - East Mumbai'},fields={"modified","patient","patient_name","care_priority"},limit= 4)
    for care_medium_patients in care_medium_visit:
        care_medium_patients_list.append(care_medium_patients.patient)
    sorted_patient_medium=[*set(care_medium_patients_list)] 
    for patients_medium in sorted_patient_medium:
        care_medium_visit_list=frappe.get_list("Visit Details",filters={"patient":patients_medium},fields={"modified","patient","patient_name","care_priority","zone"},limit= 4)
        if care_medium_visit_list:
            medium_visit_time=sorted(care_medium_visit_list, key=lambda i: i["modified"], reverse=True)[0]
            medium_visit_last_modified.append(medium_visit_time)
    for latest_visit_medium_care in medium_visit_last_modified:
        if latest_visit_medium_care.care_priority == "Medium":    
            last_visit_medium.append(latest_visit_medium_care)
    visit_care_medium=sorted(last_visit_medium, key=lambda i: i["modified"], reverse=True)       
    return visit_care_medium

@frappe.whitelist()
def east_visit_priority_low():
    care_low_patients_list=[]
    low_visit_last_modified=[]
    last_visit_low=[]
    care_low_visit=frappe.get_list("Visit Details",filters={"zone": 'Zone 5 - East Mumbai'},fields={"modified","patient","patient_name","care_priority"},limit= 4)
    for care_low_patients in care_low_visit:
        care_low_patients_list.append(care_low_patients.patient)
    sorted_patient_low=[*set(care_low_patients_list)] 
    for patients_low in sorted_patient_low:
        care_low_visit_list=frappe.get_list("Visit Details",filters={"patient":patients_low},fields={"modified","patient","patient_name","care_priority","zone"},limit= 4)
        if care_low_visit_list:
            low_visit_time=sorted(care_low_visit_list, key=lambda i: i["modified"], reverse=True)[0]
            low_visit_last_modified.append(low_visit_time)
    for latest_visit_low_care in low_visit_last_modified:
        if latest_visit_low_care.care_priority == "Low":    
            last_visit_low.append(latest_visit_low_care)
    visit_care_low=sorted(last_visit_low, key=lambda i: i["modified"], reverse=True)       
    return visit_care_low