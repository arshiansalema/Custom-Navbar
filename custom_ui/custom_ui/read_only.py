import frappe

LOGIN_ONLY_DOCTYPES = {
    "Read Only",
    "User",
    "Activity Log",
}

def validate_read_only(doc, method=None):
    if (
        frappe.flags.in_install
        or frappe.flags.in_migrate
        or frappe.flags.in_patch
        or frappe.flags.in_import
        or frappe.flags.in_setup_wizard
        or getattr(frappe.flags, "in_test", False)
        or doc.doctype in LOGIN_ONLY_DOCTYPES
    ):
        return

    # if frappe.session.user == "Administrator":
    #     return

    if frappe.db.get_single_value("Read Only", "make_read_only"):
        frappe.throw(
            "The system is currently in Read Only mode.",
        )