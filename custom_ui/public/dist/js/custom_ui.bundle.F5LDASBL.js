(() => {
  // ../custom_ui/custom_ui/public/js/custom_ui.bundle.js
  $(document).ready(function() {
    $(document).on("click", 'button:contains("Help"), a:contains("Help")', function() {
      setTimeout(() => {
        let helpLinks = document.querySelector("#help-links");
        if (!helpLinks) {
          return;
        }
        document.querySelectorAll(".custom-help-item").forEach((el) => el.remove());
        let route = frappe.get_route();
        let doctype = route[1];
        frappe.call({
          method: "custom_ui.api.get_help_content",
          args: { doctype },
          callback: function(r) {
            let data = r.message || {};
            if (data.external_url) {
              helpLinks.insertAdjacentHTML("beforeend", `
                            <a class="dropdown-item custom-help-item" href="${data.external_url}" target="_blank">
                                Customization in ${doctype || "General"}
                            </a>
                        `);
            }
          }
        });
      }, 100);
    });
  });
})();
//# sourceMappingURL=custom_ui.bundle.F5LDASBL.js.map
