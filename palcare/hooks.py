from . import __version__ as app_version

app_name = "palcare"
app_title = "Palcare"
app_publisher = "Tridz"
app_description = "Palcare"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "info@tridz.com"
app_license = "MIT"
app_logo_url="https://dev-palcare.frappe.cloud/files/Palcare%20logo-curves-02.png"
# app_logo_url="https://dev-palcare.frappe.cloud/files/Palcare%20logo-curves-02.png"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/palcare/css/palcare.css"
# app_include_js = "/assets/palcare/js/palcare.js"
app_include_js = "/assets/palcare/js/sidebar.js"
app_include_js = "/assets/palcare/js/search.js"
app_include_css="/assets/palcare/css/custom.css"

# include js, css files in header of web template
#web_include_css = "/assets/palcare/css/custom.css"
# web_include_js = "/assets/palcare/js/palcare.js"

web_include_css="/assets/palcare/css/login_page.css"
web_include_js="/assets/palcare/js/custom_login.js"



# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "palcare/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"
# home_page = "palcare-home"



# website user home page (by Role)
# role_home_page = {
# 	"System Manager": "palcare-home"
# }
# role_home_page = {
# 	"System Manager": "palcare-home",
# 	"Administrator" : "/app/palcare-home"
# }



website_redirects=[
	{"source":"/app","target":"/app/palcare-home"},
	{"source":"/app/home","target":"/app/palcare-home"}
]

website_context={
	"splash_image":"/files/Palcare logo-curves-02.png"
}
# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "palcare.install.before_install"
# after_install = "palcare.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "palcare.uninstall.before_uninstall"
# after_uninstall = "palcare.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "palcare.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

doc_events = {
     "Patient": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update",
		

  	},

	  "Medical Details": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	  "Edmonton Symptom Assessment": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	   "Emotional And Psychosocial Assessment": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	  "Photos": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	  "Medication": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	  "Visit Details": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	   "Patient Summary Card": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	   "Equipment Loaned": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	   "Notes": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	   "Reports": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	}
	  ,
	   "Final Summary": {
               "after_insert":"palcare.comment.comment_hook",
			   "on_trash":"palcare.comment.comment_delete",
			   "on_update":"palcare.comment.comment_update"
			   
  	},
	  

}


# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"palcare.tasks.all"
# 	],
# 	"daily": [
# 		"palcare.tasks.daily"
# 	],
# 	"hourly": [
# 		"palcare.tasks.hourly"
# 	],
# 	"weekly": [
# 		"palcare.tasks.weekly"
# 	]
# 	"monthly": [
# 		"palcare.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "palcare.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "palcare.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "palcare.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]


# User Data Protection
# --------------------

user_data_fields = [
	{
		"doctype": "{doctype_1}",
		"filter_by": "{filter_by}",
		"redact_fields": ["{field_1}", "{field_2}"],
		"partial": 1,
	},
	{
		"doctype": "{doctype_2}",
		"filter_by": "{filter_by}",
		"partial": 1,
	},
	{
		"doctype": "{doctype_3}",
		"strict": False,
	},
	{
		"doctype": "{doctype_4}"
	}
]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"palcare.auth.validate"
# ]

