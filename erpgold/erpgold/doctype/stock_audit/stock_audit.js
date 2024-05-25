// Copyright (c) 2024, shreyas and contributors
// For license information, please see license.txt

frappe.ui.form.on('Stock Audit', {

	onload: function (frm) {
		frm.get_field('stock_items').grid.cannot_add_rows = true;
		frm.get_field('not_in_stock').grid.cannot_add_rows = true;
		if (frm.is_new()) {
			frm.call({
				doc: frm.doc,
				method: 'items_in_stock',
				callback: function (r) {
					frm.set_df_property('total_items_in_stock', 'read_only', 1);
					if (r.message) {
						frm.clear_table("stock_items");
						$.each(r.message, function (Index, data) {
							var child = frm.add_child("stock_items");
							frappe.model.set_value(child.doctype, child.name, "item_code", data.item_code + " : " + data.item_name);
							frappe.model.set_value(child.doctype, child.name, "serial_nos", data.name);
							frappe.model.set_value(child.doctype, child.name, "qty", 1);
						});
						frm.refresh_field("stock_items");
					}
				}
			});
		}
	},
	scan_barcode: function (frm) {
		frm.refresh_field('not_in_stock');
		if (frm.doc.scan_barcode !== '') {
			var not_in_stock = frm.doc.not_in_stock.length;
			var not_found = frm.doc.total_not_found_items;
			frm.call({
				doc: frm.doc,
				method: 'serial',
				callback: function (r) {
					if (r.message) {
						var doc = frm.doc;
						var barcode = r.message[0].name;
						var status = r.message[0].status;
						var item_name = r.message[0].item_name;

						if (doc.scan_barcode) {
							doc.stock_items.forEach(function (d) {
								if (d.serial_nos === barcode) {
									if (d.checked !== 1) {
										d.checked = 1;
									}
									else {
										show_alert("Item <b>" + barcode + " : " + item_name + "</b> is already checked.", 'orange', 4);
										return;
									}
								}
							});
							refresh_field('stock_items');
						}
						if (status == 'Delivered') {
							r.message.forEach(function (i) {
								var existingRow = frm.doc.not_in_stock.find(function (row) {
									return row.serial_no === i.name;
								});
								if (!existingRow) {
									var row = frappe.model.add_child(frm.doc, 'Not in Stock', 'not_in_stock');
									frappe.model.set_value(row.doctype, row.name, 'serial_no', i.name);
									frappe.model.set_value(row.doctype, row.name, 'item_code', i.item_code + " : " + i.item_name);
									not_in_stock += 1;
									frm.set_value('total_not_in_stock_items', not_in_stock);
									show_alert("Item <b>" + i.name + " : " + i.item_name + "</b> is not in Stock & added in Not in Stock table", 'orange', 4);
									return;
								}
								else {
									show_alert("Item <b>" + i.name + " : " + i.item_name + "</b> is already added in Not in Stock table.", 'orange', 4);
									return;
								}
							});
						}
						if (status == 'Inactive') {
							show_alert("Item <b>" + barcode + " : " + item_name + "</b> is Not Found", 'orange', 5);
							not_found += 1;
							frm.set_value('total_not_found_items', not_found);
						}
					}
					frm.set_value('scan_barcode', '');frm.save()
				}
			});
		}
	},
});

function show_alert(msg , indicator , duration){
	frappe.show_alert({ message: msg, indicator: indicator }, duration);
}