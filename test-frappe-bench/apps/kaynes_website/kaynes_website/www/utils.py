from __future__ import unicode_literals
import frappe, json, os, re
from frappe.utils.file_manager import save_file

@frappe.whitelist(allow_guest=True)
def make_lead(name,email,phoneno,services,captchaCode,message):
	print ("name......testing............", name)
	#company = frappe.db.get_single_value("Global Defaults", "default_company")
	print ("entering....session user...", frappe.session.user)
	outerJson_Transfer = {
		"lead_name": name,
		"doctype": "Lead",
		"email_id": email,
		"mobile_no": phoneno,
		"services": services,
		"captcha_code": captchaCode,
		"message": message
		}
			
	doc = frappe.new_doc("Lead")
	doc.update(outerJson_Transfer)
	doc.insert(ignore_permissions=True)
	doc.save()
	ret = doc.doctype

@frappe.whitelist(allow_guest=True)
def make_job_applicant(params):
	temp_params = json.loads(params)
	print ("......testing.........params...", temp_params)

	if temp_params:
		name = temp_params['name']
		email = temp_params['email']
		phoneno = temp_params['phoneno']
		name = temp_params['name']
		address = temp_params['address']
		work_experience = temp_params['work_experience']
		position_applied_for = temp_params['position_applied_for']
		key_skills = temp_params['key_skills']
		expected_salary = temp_params['expected_salary']
		captchaCode = temp_params['captchaCode']
		outerJson_Transfer = {
			"applicant_name": name,
			"doctype": "Job Applicant",
			"email_id": email,
			"phone": phoneno,
			"address": address,
                        "work_experience": work_experience,
                        "captcha_code": captchaCode,
                        "position_applied_for": position_applied_for,
                        "key_skills": key_skills,
                        "expected_salary": expected_salary
		}
			
		doc = frappe.new_doc("Job Applicant")
		doc.update(outerJson_Transfer)
		doc.insert(ignore_permissions=True)
		doc.save()
		ret = doc.doctype
		return doc.name


@frappe.whitelist(allow_guest=True)
def attach_file(filedata,doc):
	if filedata:
		filedata_json = json.loads(filedata)
		filedata_list = list(filedata_json["files_data"])
		for file_details in filedata_list:	      
			filedoc = save_file(file_details["filename"], file_details["dataurl"],"Job Applicant", doc, decode=True, is_private=1)


@frappe.whitelist(allow_guest=True)
def checkPatternMatch(pattern,language):
	root_dir = ''
	TAG_RE = re.compile(r'<[^>]+>')
	render_template_list = {}

	if language == "en":
		root_dir = '../../test-frappe-bench/apps/kaynes_website/kaynes_website/www/en'
	elif language == "ja":
		root_dir = '../../test-frappe-bench/apps/kaynes_website/kaynes_website/www/ja'

	for (root, dirs, files) in os.walk(root_dir, onerror=None):
		for filename in files:
			file_path = os.path.join(root, filename)

			if 'nggallery' not in str(file_path) and 'page' not in str(file_path) and 'wp-json' not in str(file_path) and 'wp-content' not in str(file_path) and 'render_template' not in str(file_path) and 'profile/index.js' not in str(file_path) and 'careers/index.js' not in str(file_path) and 'contact-us/index.js' not in str(file_path):
				with open(file_path, 'rb') as file_content:
					for line in file_content:
						try:
							line = line.decode('utf-8')
						except ValueError:
							continue

						if re.search(pattern, line, re.IGNORECASE):
							file_url = str(file_path.split('/www')[1])
							if '<p>' in line and '<p><img' not in line or '</p>' in line or '<h1>' in line or '<li> <a' not in line and '<a title' not in line and '<a href' not in line and '<li>' in line or '<strong>' in line or '<td>' in line:
								line = TAG_RE.sub('', line)#removing html attributes from line.
								line = line.strip()
								render_template_list[file_url] = line
								break

	print ("render_template_list....................", render_template_list)						
	return render_template_list
