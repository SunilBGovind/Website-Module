// Copyright (c) 2019, test and contributors
// For license information, please see license.txt

frappe.ui.form.on('Contract Review', {
    onload: function(frm, cdt, cdn) {
        if (frm.doc.__islocal) {
            var current_date = frappe.datetime.get_today();
            frm.doc.date = current_date;
            frm.refresh_field("date");
        }

        if (frm.doc.repeat_order == 1 && frm.doc.__islocal) {
            fetch_repeat_order_questions(frm, cdt, cdn);
            set_fields_properties(frm);
        } else if (frm.doc.new_order == 1 && frm.doc.__islocal) {
            fetch_new_order_questions(frm, cdt, cdn);
            set_fields_properties(frm);
        } else if (frm.doc.new_order == 1 && !frm.doc.__islocal && frm.doc.docstatus == 0) {
            set_fields_properties(frm);
        } else if (frm.doc.repeat_order == 1 && !frm.doc.__islocal && frm.doc.docstatus == 0) {
            set_fields_properties(frm);
        }

        if (!frm.doc.customer) {// Making item list as empty: if customer is not selected.
            frm.set_query("item", function() {
                return {
                    "filters": [
                        ["Item", "item_code", "in", []]
                    ]
                }
            });
        }//end of if..
    },
    item: function(frm) {
        var item_code = frm.doc.item;
        if (frm.doc.item) {
            var revision_bom = fetch_revision_bom(item_code);
            console.log("Revision BOM......" + revision_bom);
            frm.doc.drawingno_and_revno = revision_bom;
            frm.refresh_field("drawingno_and_revno");
        }
    },
    customer_order_number: function(frm) {
        var so_items_list = [];
        var customer_order_number = frm.doc.customer_order_number;
        var so_details = fetch_so_details(customer_order_number);
        var so_items = so_details.items;
        $.each(so_items, function(i, d) {
            so_items_list.push(d.item_code);
        });

        frm.doc.customer = so_details.customer;
        frm.doc.project = so_details.project;
        frm.doc.customer_order_date = so_details.oa_date;
        frm.doc.item = [];
        frm.doc.drawingno_and_revno = "";
        frm.refresh_field("drawingno_and_revno");
        frm.refresh_field("item");
        frm.refresh_field("customer");
        frm.refresh_field("project");
        frm.refresh_field("customer_order_date");

        frm.set_query("item", function() {
            return {
                "filters": [
                    ["Item", "item_code", "in", so_items_list]
                ]
            }
        });
    },
    before_save: function(frm) {
        if (frm.doc.repeat_order == 0 && frm.doc.new_order == 0) {
            frappe.msgprint("Select any one of Repeat/New Order.");
            frm.set_df_property('contract_review_questionnaires', "hidden", true);
            frappe.validated = false;
        }
    },
    after_save: function(frm) {
        if (frm.doc.repeat_order == 1 || frm.doc.new_order == 1) {
            set_fields_properties(frm);
        }
    },
    repeat_order: function(frm, cdt, cdn) {
        if (frm.doc.repeat_order == 1) {
            frm.set_df_property('contract_review_questionnaires', "hidden", false);
            frm.doc.new_order = 0;
            frm.refresh_field("new_order");
            fetch_repeat_order_questions(frm, cdt, cdn);
            set_fields_properties(frm);
        }
    },
    new_order: function(frm, cdt, cdn) {
        if (frm.doc.new_order == 1) {
            frm.set_df_property('contract_review_questionnaires', "hidden", false);
            frm.doc.repeat_order = 0;
            frm.refresh_field("repeat_order");
            fetch_new_order_questions(frm, cdt, cdn);
            set_fields_properties(frm);
        }
    }
}); //end of Contract Review script..

function fetch_so_details(sales_order) {
    var so_details = {};
    frappe.call({
        method: "testing.testing.doctype.contract_review.contract_review.fetch_so_details",
        args: {
            "sales_order": sales_order
        },
        async: false,
        callback: function(r) {
            //console.log("so items........" + JSON.stringify(r.message));
            so_details = r.message;
        } //end of callback..
    }); //end of frappe call..
    return so_details;
} //end of fetch_so_items..

function fetch_revision_bom(item_code) {
    var revision_bom = 0;
    frappe.call({
        method: 'frappe.client.get_value',
        args: {
            doctype: "BOM",
            filters: {
                item: ["=", item_code],
                docstatus: ["!=", 2],
                amended_from: ["!=", "NULL"]
            },
            fieldname: ["name"]
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                revision_bom = r.message.name;
            }
        } //end of callback function..
    });
    return revision_bom;
} //end of fetch_revision_bom..

function set_fields_properties(frm) {
    var col_1 = frappe.meta.get_docfield("Contract Review Questionnaires", "data_1", frm.doc.name);
    col_1.read_only = 1;
    var col_2 = frappe.meta.get_docfield("Contract Review Questionnaires", "check_point", frm.doc.name);
    col_2.read_only = 1;

    refresh_field("data_1");
    refresh_field("check_point");
    frm.toggle_enable("contract_review_questionnaires", false);
    frm.refresh_field("contract_review_questionnaires");
} //end of set_fields_properties..

function fetch_repeat_order_questions(frm, cdt, cdn) {
    frappe.call({
        method: "testing.testing.doctype.contract_review.contract_review.fetch_repeat_order_questions",
        async: false,
        callback: function(r) {
            var questions = r.message;
            frm.clear_table("contract_review_questionnaires");
            frm.refresh_field("contract_review_questionnaires");
            $.each(questions, function(i, d) {
                var child = frm.add_child("contract_review_questionnaires");
                frappe.model.set_value(child.doctype, child.name, "check_point", d.check_point);
            });
        } //end of callback..
    }); //end of frappe call..
} //end of fetch_new_order_questions..

function fetch_new_order_questions(frm, cdt, cdn) {
    frappe.call({
        method: "testing.testing.doctype.contract_review.contract_review.fetch_new_order_questions",
        async: false,
        callback: function(r) {
            var questions = r.message;
            frm.clear_table("contract_review_questionnaires");
            frm.refresh_field("contract_review_questionnaires");
            $.each(questions, function(i, d) {
                var child = frm.add_child("contract_review_questionnaires");
                frappe.model.set_value(child.doctype, child.name, "data_1", d.data_1);
                frappe.model.set_value(child.doctype, child.name, "check_point", d.check_point);
            });
        } //end of callback..
    }); //end of frappe call..
} //end of fetch_new_order_questions..
