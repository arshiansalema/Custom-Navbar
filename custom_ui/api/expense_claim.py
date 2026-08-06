import frappe
from frappe.utils import flt


@frappe.whitelist()
def get_advances(employee):

    filters = {
        "employee": employee,
        "docstatus": 1,
    }

    advances = frappe.get_all(
        "Employee Advance",
        filters=filters,
        fields=[
            "name",
            "purpose",
            "posting_date",
            "paid_amount",
            "claimed_amount",
            "return_amount",
            "advance_account",
            "status",
        ],
    )

    result = []

    for row in advances:

        if row.status in [
            "Claimed",
            "Returned",
            "Partly Claimed and Returned",
        ]:
            continue

        expense_claims = frappe.get_all(
            "Expense Claim Advance",
            filters={
                "employee_advance": row.name,
            },
            fields=["allocated_amount"],
        )

        claimed_amount = sum(
            flt(d.allocated_amount)
            for d in expense_claims
        )

        unclaimed_amount = (
            flt(row.paid_amount)
            - claimed_amount
        )

        if unclaimed_amount > 0:

            row.claimed_amount = claimed_amount
            row.unclaimed_amount = unclaimed_amount

            result.append(row)

    return result