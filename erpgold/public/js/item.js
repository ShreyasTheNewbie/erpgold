frappe.ui.form.on('Item', {
	
	custom_is_jewellery_item: function(frm) {
        if (frm.doc.custom_is_jewellery_item) {
            frm.set_value('custom_maintain_jewellery_stock', 1); 
        } else {
            frm.set_value('custom_maintain_jewellery_stock', 0); 
        }
    },
    custom_purity_percentage_:function(frm,doc){
        if(frm.is_dirty()){
            puritypercentage(frm,doc);
        }
    },
    
});
function puritypercentage(frm, doc){
    doc=cur_frm.doc
    var custom_purity_percentage_ = doc.custom_purity_percentage_
    
    frm.set_value("custom_purity_percentage", custom_purity_percentage_)
    refresh_field("custom_purity_percentage");
}