frappe.listview_settings['Gold Ledger'] = {
	add_fields: ["item_code", "is_cancelled"],
	get_indicator: (doc) => {
		if (doc.is_cancelled === 1) {
            return [__("•"), "red", "is_cancelled,=,1"];
        }
        else {
            return [__("•"), "dark blue", "is_cancelled,=,No"];}
	}
};