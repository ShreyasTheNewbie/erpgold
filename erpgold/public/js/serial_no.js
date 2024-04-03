
// cur_frm.add_fetch("item_code", "item_name", "item_name")
// cur_frm.add_fetch("item_code", "description", "description")
// cur_frm.add_fetch("item_code", "item_group", "item_group")
cur_frm.add_fetch("item_code", "image", "custom_a_image")

frappe.ui.form.on('Serial No', {
	onload:function(frm){
		frm.set_read_only();
	}
});