# -*- coding: utf-8 -*-
# Copyright (c) 2019, test and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ContractReview(Document):
	pass



@frappe.whitelist()
def fetch_so_details(sales_order):
	so_doc = frappe.get_doc("Sales Order", sales_order)
	return so_doc

@frappe.whitelist()
def fetch_repeat_order_questions():
	questions = frappe.db.sql("""select check_point from `tabRepeat Order Questions` order by idx""", as_dict=1)
	print ("questions.................", questions)
	return questions

@frappe.whitelist()
def fetch_new_order_questions():
	questions = frappe.db.sql("""select data_1,check_point from `tabNew Order Questions` order by idx""", as_dict=1)
	return questions
