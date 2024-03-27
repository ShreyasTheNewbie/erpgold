// Copyright (c) 2024, shreyas and contributors
// For license information, please see license.txt

frappe.ui.form.on('Purity', {
    // refresh:function(frm){
        

    // },
    
	validate: function (frm) {
        var percentageValue = frm.doc.purity_percentage;

        if (percentageValue > 100) {
            frappe.throw(__('Purity Percentage cannot exceed 100%'));
            frappe.validated = false;
        }
        if (percentageValue == 0) {
            frappe.throw(__('Purity Percentage cannot be 0' ));
            frappe.validated = false;
        }
    }
	
});
