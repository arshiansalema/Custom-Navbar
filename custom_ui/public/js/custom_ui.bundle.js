$(document).ready(function () {

    // When user clicks Help
    $(document).on('click', 'button:contains("Help"), a:contains("Help")', function () {

        setTimeout(() => {

            let helpLinks = document.querySelector('#help-links');

            if (!helpLinks) {
                return;
            }

            document.querySelectorAll('.custom-help-item').forEach(el => el.remove());

            let route = frappe.get_route();
            let doctype = route[1];

            frappe.call({
                method: "custom_ui.api.get_help_content",
                args: { doctype: doctype },
                callback: function (r) {

                    let data = r.message || {};

                    // External Docs
                    if (data.external_url) {
                        helpLinks.insertAdjacentHTML("afterbegin", `
                            <a class="dropdown-item custom-help-item" href="${data.external_url}" target="_blank">
                                Customization in${doctype || "General"}
                            </a>
                        `);
                    help_menu.appendChild(custom_item);
                    }
                }
            });

        }, 400); // VERY IMPORTANT delay

    });

});

 