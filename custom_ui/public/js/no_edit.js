frappe.router.on("change", async () => {
    console.log("Route changed");

    const value = await frappe.db.get_single_value(
        "Read Only",
        "make_read_only"
    );

    if (frappe.get_route()[0] === "Form" && value === 1){
        console.log("Condition TRUE");
        cur_frm.disable_form();
        console.log("Form disabled");
    }
});