import frappe
@frappe.whitelist()
def custom_update_serial_nos_after_submit(controller, parentfield):
    
    field = ["custom_size", "custom_metal_type", "custom_purity", "custom_purity_percentage", "custom_gross_weight", "custom_less_weight",
             "custom_net_weight", "custom_westage", "custom_fine_weight", "custom_gold_rate", "custom_gold_value", "custom_mrp_rate", 
             "custom_other_amount", "custom_sales_labour_type", "custom_sales_labour_rate", "custom_sales_labour_amount", "custom_is_jewellery_item"]
    sle = frappe.db.get_all('Stock Ledger Entry', filters={"voucher_no": controller.name, "voucher_type": controller.doctype}, fields=['serial_no'])

    if "Stock Entry" == controller.doctype:
        data = frappe.db.get_all('Stock Entry Detail', filters={"parent": controller.name}, fields=field)
    elif "Purchase Receipt" == controller.doctype:
        data = frappe.db.get_all('Purchase Receipt Item', filters={"parent": controller.name}, fields=field)
    elif "Purchase Invoice" == controller.doctype:
        data = frappe.db.get_all('Purchase Invoice Item', filters={"parent": controller.name}, fields=field)
    else:
        frappe.msgprint("Not Available Serial No for this doctype")

    for record in data: 
            target_doc = frappe.get_doc('Serial No', sle)
            target_doc.custom_size = record.custom_size
            target_doc.custom_metal_type = record.custom_metal_type
            target_doc.custom_purity = record.custom_purity
            target_doc.custom_purity_percentage = record.custom_purity_percentage
            target_doc.custom_gross_weight = record.custom_gross_weight
            target_doc.custom_less_weight = record.custom_less_weight
            target_doc.custom_net_weight = record.custom_net_weight
            target_doc.custom_westage = record.custom_westage
            target_doc.custom_fine_weight = record.custom_fine_weight
            target_doc.custom_gold_rate = record.custom_gold_rate
            target_doc.custom_gold_value = record.custom_gold_value
            target_doc.custom_mrp_rate = record.custom_mrp_rate
            target_doc.custom_other_amount = record.custom_other_amount
            target_doc.custom_labour_type = record.custom_sales_labour_type
            target_doc.custom_sales_labour_rate = record.custom_sales_labour_rate
            target_doc.custom_sales_labour_amount = record.custom_sales_labour_amount
            target_doc.custom_is_jewellery_item = record.custom_is_jewellery_item
            target_doc.save()



# import frappe
# from frappe import _


# @frappe.whitelist()
# def itemDetails(doc_no):  
          
#     stock_entries = frappe.db.get_all("Purchase Receipt Item", filters={"parent": doc_no}, fields = ["image","custom_size","custom_metal_type","custom_purity","custom_purity_percentage_","custom_gross_weight","custom_less_weight","custom_net_weight","custom_wastage","custom_fine_weight","custom_gold_rate","custom_gold_value","custom_mrp_rate","custom_other_amount","custom_sales_labour_type","custom_value_added","custom_sales_labour_amount","custom_is_jewellery_item"])
#     if stock_entries:
#         return stock_entries  
    
        
    # stock_entries1 = frappe.db.get_all("Stock Entry Detail", filters={"parent": doc_no}, fields=["custom_size","custom_metal_type","custom_purity","custom_purity_percentage","custom_gross_weight","custom_less_weight","custom_net_weight","custom_westage","custom_fine_weight","custom_gold_rate","custom_gold_value","custom_mrp_rate","custom_other_amount","custom_sales_labour_type","custom_value_added","custom_sales_labour_amount","custom_is_jewellery_item"])
    # if stock_entries1:
    #     return stock_entries1






# # my_custom_app/my_custom_module/custom_methods.py
# import frappe
# from erpnext.stock.doctype.purchase_receipt.purchase_receipt import PurchaseReceipt

# class CustomPurchaseReceipt(PurchaseReceipt):
#     def update_serial_nos_after_submit(self, controller, parentfield):
#         stock_ledger_entries = frappe.db.sql(
#             """select voucher_detail_no, serial_no, actual_qty, warehouse
#             from `tabStock Ledger Entry` where voucher_type=%s and voucher_no=%s""",
#             (controller.doctype, controller.name),
#             as_dict=True,
#         )

#         if not stock_ledger_entries:
#             return

#         for d in controller.get(parentfield):
#             if d.serial_no:
#                 continue

#             update_rejected_serial_nos = (
#                 True
#                 if (
#                     controller.doctype in ("Purchase Receipt", "Purchase Invoice", "Subcontracting Receipt")
#                     and d.rejected_qty
#                 )
#                 else False
#             )
#             accepted_serial_nos_updated = False

#             if controller.doctype == "Stock Entry":
#                 warehouse = d.t_warehouse
#                 qty = d.transfer_qty
#             elif controller.doctype in ("Sales Invoice", "Delivery Note"):
#                 warehouse = d.warehouse
#                 qty = d.stock_qty
#             else:
#                 warehouse = d.warehouse
#                 qty = (
#                     d.qty
#                     if controller.doctype in ["Stock Reconciliation", "Subcontracting Receipt"]
#                     else d.stock_qty
#                 )
#             for sle in stock_ledger_entries:
#                 if sle.voucher_detail_no == d.name:
#                     if (
#                         not accepted_serial_nos_updated
#                         and qty
#                         and abs(sle.actual_qty) == abs(qty)
#                         and sle.warehouse == warehouse
#                         and sle.serial_no != d.serial_no
#                     ):
#                         d.serial_no = sle.serial_no
#                         frappe.db.set_value(d.doctype, d.name, "serial_no", sle.serial_no)
#                         accepted_serial_nos_updated = True
#                         if not update_rejected_serial_nos:
#                             break
#                     elif (
#                         update_rejected_serial_nos
#                         and abs(sle.actual_qty) == d.rejected_qty
#                         and sle.warehouse == d.rejected_warehouse
#                         and sle.serial_no != d.rejected_serial_no
#                     ):
#                         d.rejected_serial_no = sle.serial_no
#                         frappe.db.set_value(d.doctype, d.name, "rejected_serial_no", sle.serial_no)
#                         update_rejected_serial_nos = False
#                         if accepted_serial_nos_updated:
#                             break

#         # Call the original method to retain the original behavior
#         super().update_serial_nos_after_submit(controller, parentfield)

# # Define get_child_table_doctype function once
# def get_child_table_doctype(parent_doctype):
#     child_table_map = {
#         "Sales Invoice": "Sales Invoice Item",
#         "Delivery Note": "Delivery Note Item",
#         "Purchase Receipt": "Purchase Receipt Item",
#     }
#     return child_table_map.get(parent_doctype, None)  # Return None if parent_doctype is not found

# # Remaining functions are as before

# def set_custom_fields_in_serial_number(serial_number, custom_fields):
#     # Set custom fields in the serial number document
#     for field, value in custom_fields.items():
#         frappe.db.set_value("Serial No", serial_number, field, value)

# def get_custom_fields_from_child_table(controller, item_name):
#     doctype = get_child_table_doctype(controller.doctype)
#     if doctype:
#         custom_fields = frappe.db.get_all(
#             doctype,
#             filters={"parent": controller.name, "name": item_name},
#             fields=[
#                 "image",
#                 "custom_size",
#                 "custom_metal_type",
#                 "custom_purity",
#                 "custom_purity_percentage_",
#                 "custom_gross_weight",
#                 "custom_less_weight",
#                 "custom_net_weight",
#                 "custom_wastage",
#                 "custom_fine_weight",
#                 "custom_gold_rate",
#                 "custom_gold_value",
#                 "custom_mrp_rate",
#                 "custom_other_amount",
#                 "custom_sales_labour_type",
#                 "custom_value_added",
#                 "custom_sales_labour_amount",
#                 "custom_is_jewellery_item",
#             ],
#         )

#         if custom_fields:
#             serial_number = controller.get("serial_no")  # Assuming serial_no is present in controller document
#             if serial_number:
#                 set_custom_fields_in_serial_number(serial_number, custom_fields[0])
#             else:
#                 frappe.msgprint("Serial number not found in controller document.")
#         else:
#             frappe.msgprint("No custom fields found.")
#     else:
#         frappe.msgprint("Child table doctype not found.")
        