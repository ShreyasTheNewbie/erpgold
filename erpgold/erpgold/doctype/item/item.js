// Copyright (c) 2024, shreyas and contributors
// For license information, please see license.txt

frappe.ui.form.on('Item', {
    is_jewellery_item: function(frm) {
        // When checkbox1 is checked, set checkbox2 to checked
        if (frm.doc.is_jewellery_item) {
            frm.set_value('maintain_jewellery_stock', 1); // 1 represents checked
        } else {
            frm.set_value('maintain_jewellery_stock', 0); // 0 represents unchecked
        }
    }

});

