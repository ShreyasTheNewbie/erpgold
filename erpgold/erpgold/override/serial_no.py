
import frappe

@frappe.whitelist()
def custom_update_serial_nos_after_submit(controller, parentfield):
    field = ["custom_size", "image", "custom_metal_type", "custom_purity", "custom_purity_percentage", 
             "custom_gross_weight", "custom_less_weight", "custom_net_weight", "custom_wastage", 
             "custom_fine_weight", "custom_gold_rate", "custom_gold_value", "custom_mrp_rate", 
             "custom_other_amount", "custom_sales_labour_type",# "custom_sales_labour_rate"*/, 
             "custom_sales_labour_amount", "custom_is_jewellery_item"]


    # #get all items from item table
    # itm = frappe.db.get_all('Stock Ledger Entry', filters={"voucher_no": controller.name, "voucher_type": controller.doctype}, fields=['item_code'])
    # print("\n" +str(itm))
    # #for each item check if item has serial no
    # for item in itm:
    #     s=frappe.db.get_value("Item",filters={"item_code":item.item_code , "has_serial_no":'1'},fieldname="item_code")
    #     # print("\n" +str(s))
    #     #if has serial no no then proceed to generate serial no doc
    #     if(s):  
    #         #for each serialized item >>>>
    #         print("\n" +s)
    sle = frappe.db.get_all('Stock Ledger Entry', filters={"voucher_no": controller.name, "voucher_type": controller.doctype,}, fields=['serial_no', 'item_code', 'voucher_detail_no'])
    print("\n" +str(sle))
    for sle1 in sle: 
        vd = sle1['voucher_detail_no'].split('\n')
        for v in vd:
         if sle1['serial_no'] is not None:  # Check if serial_no is not None
            serial_numbers = sle1['serial_no'].split('\n')
            
            for serial_no in serial_numbers:
                if serial_no == '':
                    continue  # Skip empty serial numbers
                else:
                    serial_doc = frappe.get_doc('Serial No', serial_no)
                    if "Stock Entry" == controller.doctype:
                        data = frappe.db.get_all('Stock Entry Detail', filters={"parent": controller.name,"name":v , "item_code": sle1.item_code}, fields=field)
                    elif "Purchase Receipt" == controller.doctype:
                        data = frappe.db.get_all('Purchase Receipt Item', filters={"parent": controller.name, "name":v ,"item_code": sle1.item_code}, fields=field)
                    elif "Purchase Invoice" == controller.doctype:
                        data = frappe.db.get_all('Purchase Invoice Item', filters={"parent": controller.name,"name":v , "item_code": sle1.item_code}, fields=field)
                    else:
                        frappe.msgprint("Not Available Serial No for this doctype")
                        return

                    for record in data:
                        # Update Serial No document with data from voucher
                        serial_doc.custom_size = record.custom_size
                        serial_doc.custom_a_image = record.image
                        serial_doc.custom_metal_type = record.custom_metal_type
                        serial_doc.custom_purity = record.custom_purity
                        serial_doc.custom_purity_percentage = record.custom_purity_percentage
                        serial_doc.custom_gross_weight = record.custom_gross_weight
                        serial_doc.custom_less_weight = record.custom_less_weight
                        serial_doc.custom_net_weight = record.custom_net_weight
                        serial_doc.custom_wastage = record.custom_wastage
                        serial_doc.custom_fine_weight = record.custom_fine_weight
                        serial_doc.custom_gold_rate = record.custom_gold_rate
                        serial_doc.custom_gold_value = record.custom_gold_value
                        serial_doc.custom_mrp_rate = record.custom_mrp_rate
                        serial_doc.custom_other_amount = record.custom_other_amount
                        serial_doc.custom_labour_type = record.custom_sales_labour_type
                        serial_doc.custom_sales_labour_rate = record.custom_sales_labour_rate
                        serial_doc.custom_sales_labour_amount = record.custom_sales_labour_amount
                        serial_doc.custom_is_jewellery_item = record.custom_is_jewellery_item

                        # Save the changes to the serial number document
                        serial_doc.save()
            
                        
                        