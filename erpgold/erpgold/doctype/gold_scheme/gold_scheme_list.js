frappe.listview_settings['Gold Scheme'] = {
	add_fields: [ "status"],
	get_indicator: (doc) => {
		if (doc.status === 'Active') {
            return [__("Active"), "green", "status,=,Active"];
        }
        else {
            return [__("Expired"), "gray", "status,=,Expired"];
	    }
    }
};