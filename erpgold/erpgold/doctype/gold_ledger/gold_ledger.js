// Copyright (c) 2024, shreyas and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gold Ledger', {
	onload: function(frm) {
		$(".menu-btn-group").hide();
		if(!frm.is_new()) {
			frm.disable_save()
		}
		let fields = ["posting_date", "item_code" , "stock_uom" ,"purity" ,"purity_percentage" ,"serial_no" ,"warehouse","party_type","party_","party","debit","debit_gold","credit_gold","credit","account_currency", "debit_in_account_currency","credit_in_account_currency","voucher_type","voucher_no","fiscal_year","is_cancelled"
		];
		for (let f of fields) {
			frm.set_df_property(f, "read_only", true);
		}
	},
});
