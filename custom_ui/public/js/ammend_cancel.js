frappe.ui.form.Form.prototype.savecancel = function (btn, callback, on_error) {
    let frm = this;

    let d = new frappe.ui.Dialog({
                    title: "Confirm",
                    fields: [
                        {
                            fieldtype: "HTML",
                            options: `
                                <div style="padding-bottom: 10px;">
                                    <p>Permanently Cancel ${frm.doc.name}</p>
                                </div>
                            `
                        },
                        {
                            label: "Reason",
                            fieldname: "remarks",
                            fieldtype: "Small Text"
                        }
                    ],
                    primary_action_label: "With Reason",
                    primary_action(values) {
                        console.log("Primary action started");

                        let name_value = d.get_value("remarks");
                        console.log("Reason:", name_value);

                        if (!name_value){
                            frappe.throw('Enter the Reason for cancellation');
                            return;
                        }

                        frappe.call({
                            method: "frappe.client.insert",
                            args: {
                                doc: {
                                    doctype: "Comment",
                                    comment_type: "Info",
                                    reference_doctype: frm.doc.doctype,
                                    reference_name: frm.doc.name,
                                    content: `<b style="color:red">Reason</b><br>${name_value}`
                                }
                            },
                            callback(r) {
                                console.log("Insert success", r);
                                d.hide();
                                frm.save("cancel");
                            },
                            error(r) {
                                console.log("Insert error", r);
                            }
                        });
                    },
                    secondary_action_label: "Without Reason",
                    secondary_action(value) {
                        let name_value = d.get_value("remarks");
                        console.log("Reason:", name_value);
                        
                        frappe.call({
                            method: "frappe.client.insert",
                            args: {
                                doc: {
                                    doctype: "Comment",
                                    comment_type: "Info",
                                    reference_doctype: frm.doc.doctype,
                                    reference_name: frm.doc.name,
                                    content: `<b style="color:red">Reason</b><br>${name_value}`
                                }
                            },
                            callback(r) {
                                console.log("Insert success", r);
                                d.hide();
                                frm.save("cancel");
                            },
                            error(r) {
                                console.log("Insert error", r);
                            }
                        });
                    }
                });
                d.show();

                
};