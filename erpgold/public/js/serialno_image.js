
// cur_frm.add_fetch("item_code", "item_name", "item_name")
// cur_frm.add_fetch("item_code", "description", "description")
// cur_frm.add_fetch("item_code", "item_group", "item_group")
cur_frm.add_fetch("item_code", "image", "custom_a_image")

frappe.ui.form.on('Serial No', {
	
	// setup(frm){
	// 	frm.call({        
	// 		method: 'erpgold.erpgold.override.serial_no.itemDetails',
	// 		args:{           
	// 			doc_no:frm.doc.purchase_document_no,            
	// 		},
	// 		callback: function(r) {
	// 			var data = r.message[0];
    //             var data = r.message[0];
	// 			frm.set_value("custom_metal_type",data.custom_metal_type);
	// 			frm.set_value("custom_size",data.custom_size);
	// 			frm.set_value("custom_purity",data.custom_purity);
	// 			frm.set_value("custom_purity_percentage",data.custom_purity_percentage_);
	// 			frm.set_value("custom_gross_weight",data.custom_gross_weight);
	// 			frm.set_value("custom_less_weight",data.custom_less_weight);
	// 			frm.set_value("custom_net_weight",data.custom_net_weight);
	// 			frm.set_value("custom_wastage",data.custom_wastage);
	// 			frm.set_value("custom_fine_weight",data.custom_fine_weight);
	// 			frm.set_value("custom_gold_rate",data.custom_gold_rate);
	// 			frm.set_value("custom_gold_value",data.custom_gold_value);
	// 			frm.set_value("custom_mrp_rate",data.custom_mrp_rate);
	// 			frm.set_value("custom_other_amount",data.custom_other_amount);
	// 			frm.set_value("custom_labour_type",data.custom_sales_labour_type);
	// 			frm.set_value("custom_sales_labour_rate",data.custom_value_added);
	// 			frm.set_value("custom_sales_labour_amount",data.custom_sales_labour_amount);
	// 			frm.set_value("custom_is_jewellery_item",data.custom_is_jewellery_item);
    //             // var field_values = {
    //             //     "cuatom_a_image":data.image,
    //             //     "custom_metal_type": data.custom_metal_type,
    //             //     "custom_size": data.custom_size,
    //             //     "custom_purity": data.custom_purity,
    //             //     "custom_purity_percentage": data.custom_purity_percentage_,
    //             //     "custom_gross_weight": data.custom_gross_weight,
    //             //     "custom_less_weight": data.custom_less_weight,
    //             //     "custom_net_weight": data.custom_net_weight,
    //             //     "custom_wastage": data.custom_wastage,
    //             //     "custom_fine_weight": data.custom_fine_weight,
    //             //     "custom_gold_rate": data.custom_gold_rate,
    //             //     "custom_gold_value": data.custom_gold_value,
    //             //     "custom_mrp_rate": data.custom_mrp_rate,
    //             //     "custom_other_amount": data.custom_other_amount,
    //             //     "custom_labour_type": data.custom_sales_labour_type,
    //             //     "custom_sales_labour_rate": data.custom_value_added,
    //             //     "custom_sales_labour_amount": data.custom_sales_labour_amount,
    //             //     "custom_is_jewellery_item": data.custom_is_jewellery_item
    //             // };
    //             // console.log("hhhhhhh")
    //             // frm.set_value(field_values);
	// 		},
	// 	});
	// },
});