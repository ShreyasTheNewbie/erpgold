import frappe
@frappe.whitelist()
def custom_update_serial_nos_after_submit(self, method):
    for i in self.items:
        fixed =frappe.db.get_value("Item", i.item_code, "is_fixed_asset")
        if fixed != 1:
            serial = i.serial_no
            ser = serial.split('\n')
            for s in ser:
                    if s == '' or s == None:
                        continue
                    else:
                        doc = frappe.get_doc('Serial No', s)
                        doc.custom_size = i.custom_size
                        doc.custom_a_image = i.image
                        doc.custom_metal_type = i.custom_metal_type
                        doc.custom_purity = i.custom_purity
                        doc.custom_purity_percentage = i.custom_purity_percentage
                        doc.custom_gross_weight = i.custom_gross_weight
                        doc.custom_less_weight = i.custom_less_weight
                        doc.custom_net_weight = i.custom_net_weight
                        doc.custom_wastage = i.custom_wastage
                        doc.custom_fine_weight = i.custom_fine_weight
                        doc.custom_gold_rate = i.custom_gold_rate
                        doc.custom_gold_value = i.custom_gold_value
                        doc.custom_mrp_rate = i.custom_mrp_rate
                        doc.custom_other_amount = i.custom_other_amount
                        doc.custom_sales_labour_type = i.custom_sales_labour_type
                        doc.custom_sales_labour_amount = i.custom_sales_labour_amount
                        doc.custom_is_jewellery_item = i.custom_is_jewellery_item
                        doc.save()


