(() => {
  // ../custom_ui/custom_ui/public/js/custom_ui.bundle.js
  $(document).ready(function() {
    $(document).on("click", 'button:contains("Help"), a:contains("Help")', function() {
      setTimeout(() => {
        let helpLinks = document.querySelector("#help-links");
        if (!helpLinks) {
          console.log("\u274C helpLinks not found");
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
              helpLinks.insertAdjacentHTML("afterbegin", `
                            <a class="dropdown-item custom-help-item" href="${data.external_url}" target="_blank">
                                Customizations in ${doctype || "General"}
                            </a>
                        `);
              help_menu.appendChild(custom_item);
            }
          }
        });
      }, 400);
    });
  });
})();
//# sourceMappingURL=custom_ui.bundle.URNP2NHG.js.map
