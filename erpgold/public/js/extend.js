frappe.ui.form.on('Item', {
	
	custom_is_jewellery_item: function(frm) {
        if (frm.doc.custom_is_jewellery_item) {
            frm.set_value('custom_maintain_jewellery_stock', 1); 
        } else {
            frm.set_value('custom_maintain_jewellery_stock', 0); 
        }
    }
});