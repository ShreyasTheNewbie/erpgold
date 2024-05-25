// Copyright (c) 2024, shreyas and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gold Ledger', {
	onload: function(frm) {
		$(".menu-btn-group").hide();
		if(!frm.is_new()) {
			frm.disable_save()
			$('.primary-action').prop('hidden', true);
		}
		cur_frm.fields.forEach(function(l){ cur_frm.set_df_property(l.df.fieldname, 'read_only', 1); });
	},
});
