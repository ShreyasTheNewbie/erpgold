
// cur_frm.add_fetch("item_code", "item_name", "item_name")
// cur_frm.add_fetch("item_code", "description", "description")
// cur_frm.add_fetch("item_code", "item_group", "item_group")
cur_frm.add_fetch("item_code", "image", "custom_a_image")

frappe.ui.form.on('Serial No', {
	onload: function(frm) {
		frm.disable_save();
		let fields = ["custom_size", "image", "custom_metal_type", "custom_purity", "custom_purity_percentage",
			"custom_gross_weight", "custom_less_weight", "custom_net_weight", "custom_wastage",
			"custom_fine_weight", "custom_gold_rate", "custom_gold_value", "custom_mrp_rate",
			"custom_other_amount", "custom_sales_labour_type",
			"custom_sales_labour_amount", "custom_is_jewellery_item","custom_sales_labour_type","custom_sales_labour_rate", "custom_labour_rate","custom_a_image","custom_labour_type"
		];
		
		for (let f of fields) {
			frm.set_df_property(f, "read_only", true);
		}
		// cur_frm.fields.forEach(function(l){ cur_frm.set_df_property(l.df.fieldname, 'read_only', 1); });
	}
});