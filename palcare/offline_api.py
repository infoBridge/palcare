from email.policy import default
import queue
import time
import frappe
from frappe import request
import json
from frappe.utils.background_jobs import enqueue

def otherForms(other_forms_filter):
    for forms in other_forms_filter:
        if forms['data']['first_name']!='' and forms['data']['surname']!='':

            doc=frappe.db.get_list('Patient',filters={'first_name':forms['data']['first_name'],'sur_name':forms['data']['surname']})
            doc_name=doc[0]['name']

            if (forms['type']=='EPAS' or forms['type'] =='VISIT' or forms['type'] == 'MEDICAL'):
                
                forms['data']['patient']=doc_name
                forms['data']['patient_name']= forms['data']['first_name']

            else:
                forms['data']['patient_name']=doc_name
                forms['data']['patient']=forms['data']['first_name']    
            del forms['data']['first_name']
            del forms['data']['surname']

            form_doc=frappe.get_doc(forms['data'])
            form_doc.insert(ignore_permissions=True)
        else:
            form_doc=frappe.get_doc(forms['data'])
            form_doc.insert(ignore_permissions=True)

def saveForm(doc_data):
    new_doc=frappe.get_doc(doc_data)
    new_doc.insert(ignore_permissions=True)


@frappe.whitelist(allow_guest=True)
def enrolment(*args,**kwargs):
    data=json.loads(frappe.request.data)
    print(data,"new test")
    enroll_filter=list(filter(lambda x:x['type']=='ENROLL',data))
    print(enroll_filter,"check loop")
    epas_filter=list(filter(lambda y:y['type']=='EPAS',data))
    esas_filter=list(filter(lambda y:y['type']=='ESAS',data))
    medical_filter=list(filter(lambda y:y['type']=='MEDICAL',data))
    notes_filter=list(filter(lambda y:y['type']=='NOTES',data))
    summary_filter=list(filter(lambda y:y['type']=='SUMMARY',data))
    final_filter=list(filter(lambda y:y['type']=='FINAL',data))
    visit_filter=list(filter(lambda y:y['type']=='VISIT',data))
    print(epas_filter,"check loop bro ;)")

    if enroll_filter !=[]:
        a = []
        for enroll in enroll_filter:
            print(enroll['data'],"enroll loop")
            a.append(enroll['data'])
            doc_data=enroll['data']
            enqueue(saveForm,queue="default",doc_data=doc_data)
        print(a)
    if epas_filter !=[]:
        enqueue(otherForms,queue="default",other_forms_filter=epas_filter)
    if esas_filter !=[]:
        enqueue(otherForms,queue="default", other_forms_filter=esas_filter)
    if medical_filter !=[]:
        enqueue(otherForms,queue="default", other_forms_filter=medical_filter)
    if notes_filter !=[]:
        enqueue(otherForms,queue="default", other_forms_filter=notes_filter)
    if summary_filter !=[]:
        enqueue(otherForms,queue="default", other_forms_filter=summary_filter)
    if final_filter !=[]:
        enqueue(otherForms,queue="default", other_forms_filter=final_filter)
    if visit_filter !=[]:
        enqueue(otherForms,queue="default", other_forms_filter=visit_filter)
    
    

# @frappe.whitelist(allow_guest=True)
# def epas(*args,**kwargs):
#     data=json.loads(frappe.request.data)
    
#     if data['first_name']!='' and data['surname']!='':
        
#         doc=frappe.get_all('Patient',filters=[{'first_name':data['first_name'],'sur_name':data['surname']}],fields=['name'])
#         doc_name=doc[0]['name']
#         data['patient']=doc_name
        
#         del data['first_name']
#         del data['surname']
#         print(data,"epas data")
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)
#         print(new_doc,"epas doc")
#     else:
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)
#         new_doc.save

#     return new_doc

# @frappe.whitelist(allow_guest=True)

# def esas(*args,**kwargs):
#     data=json.loads(frappe.request.data)

#     if data['first_name']!='' and data['surname']!='':
        
#         doc=frappe.get_all('Patient',filters={'first_name':data['first_name'],'sur_name':data['surname']},fields=['name'],ignore_permissions=True)
#         doc_name=doc[0]['name']
#         data['patient_name']=doc_name
#         del data['first_name']
#         del data['surname']
#         print(data,"esas")
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)
#         print(new_doc,"epas doc")

#     else:
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)
#         new_doc.save
#     return new_doc


# @frappe.whitelist(allow_guest=True)

# def visit(*args,**kwargs):

#     data=json.loads(frappe.request.data)
#     if data['first_name']!='' and data['surname']!='':
#         time.sleep(60)
#         doc=frappe.get_all('Patient',filters={'first_name':data['first_name'],'sur_name':data['surname']},fields=['name'],ignore_permissions=True)
#         doc_name=doc[0]['name']
#         data['patient']=doc_name
#         del data['first_name']
#         del data['surname']
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)

#         new_doc.save
#     else:
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)
#         new_doc.save

#     return new_doc

# @frappe.whitelist(allow_guest=True)

# def finalSummary(*args,**kwargs):

#     data=json.loads(frappe.request.data)
    

#     if data['first_name']!='' and data['surname']!='':
#         time.sleep(60)
#         doc=frappe.get_all('Patient',filters={'first_name':data['first_name'],'sur_name':data['surname']},fields=['name'],ignore_permissions=True)
#         doc_name=doc[0]['name']
#         data['patient_name']=doc_name
#         del data['first_name']
#         del data['surname']
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)

#         new_doc.save
#     else:
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)
#         new_doc.save

#     return new_doc

# @frappe.whitelist(allow_guest=True)

# def patientSummary(*args,**kwargs):

#     data=json.loads(frappe.request.data)
    

#     if data['first_name']!='' and data['surname']!='':
#         time.sleep(60)
#         doc=frappe.get_all('Patient',filters={'first_name':data['first_name'],'sur_name':data['surname']},fields=['name'],ignore_permissions=True)
#         doc_name=doc[0]['name']
#         data['patient_name']=doc_name
#         del data['first_name']
#         del data['surname']
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)

#         new_doc.save
#     else:
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)
#         new_doc.save

#     return new_doc

# @frappe.whitelist(allow_guest=True)

# def medical(*args,**kwargs):

#     data=json.loads(frappe.request.data)
    

#     if data['first_name']!='' and data['surname']!='':
#         time.sleep(60)
#         doc=frappe.get_all('Patient',filters={'first_name':data['first_name'],'sur_name':data['surname']},fields=['name'],ignore_permissions=True)

#         doc_name=doc[0]['name']
        
#         data['patient']=doc_name
#         del data['first_name']
#         del data['surname']
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)

#         new_doc.save
#     else:
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)
#         new_doc.save

#     return new_doc

# @frappe.whitelist(allow_guest=True)

# def notes(*args,**kwargs):

#     data=json.loads(frappe.request.data)
    

#     if data['first_name']!='' and data['surname']!='':
#         time.sleep(60)
#         doc=frappe.get_all('Patient',filters={'first_name':data['first_name'],'sur_name':data['surname']},fields=['name'],ignore_permissions=True)
#         doc_name=doc[0]['name']
#         data['patient_name']=doc_name
#         del data['first_name']
#         del data['surname']
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)

#         new_doc.save
#     else:
#         new_doc=frappe.get_doc(data)
#         new_doc.insert(ignore_permissions=True)
#         new_doc.save

#     return new_doc


@frappe.whitelist(allow_guest=True)
def token():
    return frappe.local.session.data.csrf_token




