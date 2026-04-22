import frappe

@frappe.whitelist()
def get_help_content(doctype=None):

    # Clean doctype input
    if doctype in [None, "", "List", "Form"]:
        doctype = None

    # Try specific doctype
    if doctype:
        doc = frappe.get_all(
            "Help Content",
            filters={"reference_doctype": doctype},
            fields=["help_content", "external_url"],
            order_by="modified desc",
            limit=1
        )

        if doc:
            return doc[0]

    # Fallback to default
    default = frappe.get_all(
        "Help Content",
        filters={"is_default": 1},
        fields=["help_content", "external_url"],
        order_by="modified desc",
        limit=1
    )

    return default[0] if default else {}