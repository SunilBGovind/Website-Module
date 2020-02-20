// Copyright (c) 2019, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Joint Review Of Quality System', {
    onload: function(frm, cdt, cdn) {
        var current_date = frappe.datetime.get_today();
        frm.doc.date = current_date;
        frm.refresh_field("date");
        set_jrqs_questions(frm, cdt, cdn);
        set_fields_properties(frm);
    },
    customer: function(frm) {
        frm.doc.customer_representative_name = frm.doc.customer;
        frm.refresh_field("customer_representative_name");
    },
    kaynes_representative_name: function(frm) {
        var employee_id = frm.doc.kaynes_representative_name;
        var designation = fetch_kaynes_representative_designation(employee_id);
        frm.doc.kaynes_representative_designation = designation;
        frm.refresh_field("kaynes_representative_designation");
    },
    after_save: function(frm) {
        set_fields_properties(frm);
    }
}); //end of JRQS script..

function set_fields_properties(frm) {
    var col_1 = frappe.meta.get_docfield("JRQS Questionnaires", "data_1", frm.doc.name);
    col_1.read_only = 1;
    var col_2 = frappe.meta.get_docfield("JRQS Questionnaires", "customer_need_identification", frm.doc.name);
    col_2.read_only = 1;

    refresh_field("data_1");
    refresh_field("customer_need_identification");
    frm.toggle_enable("jrqs_questionnaires", false);
    frm.refresh_field("jrqs_questionnaires");
} //end of set_fields_properties..

function set_jrqs_questions(frm, cdt, cdn) {
    frappe.call({
        method: "testing.testing.doctype.joint_review_of_quality_system.joint_review_of_quality_system.fetch_jrqs_questions",
        async: false,
        callback: function(r) {
            var questions = r.message;
            frm.clear_table("jrqs_questionnaires");
            frm.refresh_field("jrqs_questionnaires");
            $.each(questions, function(i, d) {
                var child = frm.add_child("jrqs_questionnaires");
                frappe.model.set_value(child.doctype, child.name, "data_1", d.data_1);
                frappe.model.set_value(child.doctype, child.name, "customer_need_identification", d.customer_need_identification);
            });
        } //end of callback..
    }); //end of frappe call..
} //end of set_jrqs_questions..

function fetch_kaynes_representative_designation(employee_id) {
    var designation = "";
    frappe.call({
        method: 'frappe.client.get_value',
        args: {
            doctype: "Employee",
            filters: {
                name: ["=", employee_id]
            },
            fieldname: ["designation"]
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                designation = r.message.designation;
            }
        } //end of callback function..
    });
    return designation;
} //end of fetch_kaynes_representative_designation..
