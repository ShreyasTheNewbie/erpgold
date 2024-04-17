frappe.ui.form.on('Item', {
	
	custom_is_jewellery_item: function(frm) {
        if (frm.doc.custom_is_jewellery_item) {
            frm.set_value('custom_maintain_jewellery_stock', 1); 
        } else {
            frm.set_value('custom_maintain_jewellery_stock', 0); 
        }
    },
    custom_purity:function(frm){
        if(frm.doc.custom_purity === '24k'){
            frm.set_value('custom_purity_percentage_','99.99');
        }
        else if(frm.doc.custom_purity === '22k'){
            frm.set_value("custom_purity_percentage_",'91.66');
        }
        else if(frm.doc.custom_purity === '18k'){
            frm.set_value("custom_purity_percentage_",'75');
        }
        else if(frm.doc.custom_purity === '16k'){
            frm.set_value("custom_purity_percentage_",'66.66');
        }
        else if(frm.doc.custom_purity === '999'){
            frm.set_value("custom_purity_percentage_",'99.9');
        }
        else if(frm.doc.custom_purity === '995'){
            frm.set_value("custom_purity_percentage_",'99.5');
        }
        frm.refresh_field('custom_purity_percentage_');
        
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