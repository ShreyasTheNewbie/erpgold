frappe.ui.form.on("Purchase Order Item", "metal_type", function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    var metal_type = d.custom_metal_type; // Replace "custom_metal_type" with your actual custom field name for metal type
    var purity = d.custom_purity; // Replace "custom_purity" with your actual custom field name for purity

    if (metal_type && purity) {
        frappe.call({
            method: "erpgold.erpgold.public.js.pur.get_custom_gold_rate",
            args: {
                metal_type: metal_type,
                purity: purity
            },
            callback: function(r) {
                if (r.message) {
                    frappe.model.set_value(cdt, cdn, "custom_gold_rate", r.message);
                }
            }
        });
    }
});
