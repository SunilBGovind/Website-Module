from __future__ import unicode_literals
import frappe
from frappe import _, throw, msgprint, utils
from frappe.utils import cint, flt, cstr, comma_or, getdate, add_days, getdate, rounded, date_diff, money_in_words
from frappe.model.mapper import get_mapped_doc
from frappe.model.naming import make_autoname
from erpnext.utilities.transaction_base import TransactionBase
from erpnext.accounts.party import get_party_account_currency
from frappe.desk.notifications import clear_doctype_notifications
from datetime import datetime
import json



@frappe.whitelist()
def fetch_sales_order_status_details(sales_order):
	print ("sales_order......testing............", sales_order)
	so_status_details = {'mreq_status': '', 'production_plan_status': '', 'work_order_status': ''}
	
	if sales_order:
		pp_details = frappe.db.sql("""select pp.status as status from `tabProduction Plan` pp, `tabProduction Plan Sales Order` pps where pps.sales_order= %s and pp.name=pps.parent""", sales_order, as_dict=1)

		mreq_details = frappe.db.sql("""select distinct(mr.status) as status from `tabMaterial Request` mr, `tabMaterial Request Item` mri where mri.sales_order= %s and mr.name=mri.parent""", sales_order, as_dict=1)

		wo_details = frappe.db.sql("""select status from `tabWork Order` where sales_order= %s""", sales_order, as_dict=1)
		
		if pp_details:
			status = pp_details[0]['status']
			so_status_details['production_plan_status'] = status

		if mreq_details:
			status = mreq_details[0]['status']
			so_status_details['mreq_status'] = status
			
		if wo_details:
			status = wo_details[0]['status']
			so_status_details['work_order_status'] = status

	return so_status_details


@frappe.whitelist()
def fetch_repeat_order_status(customer, items):
	status_flag = False
	so_items = json.loads(items)
	for item in so_items:
		records = frappe.db.sql(""" select so.name from `tabSales Order` so, `tabSales Order Item` soi where so.customer=%s and soi.item_code=%s and so.name=soi.parent and so.docstatus=1""", (customer, item), as_dict=1)

		if records:
			status_flag = True
		else:
			status_flag = False
			break
	return status_flag





