# Copyright (c) 2024, shreyas and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document

class StockAudit(Document):
    @frappe.whitelist()
    def items_in_stock(self):
        self.total_items_in_stock = frappe.db.count('Serial No', {'status': 'Active'})
        # items = frappe.db.get_all('Stock Ledger Entry', filters={'is_cancelled': 0 , "serial_no": ["!=", ""], 'actual_qty': [">", 0]}, fields=['item_code', 'actual_qty', 'serial_no'])
        items = frappe.db.get_all('Serial No', filters={"status": "Active"}, fields=['name','item_code','item_name', #  'custom_gross_weight','custom_less_weight','custom_net_weight','custom_fine_weight'
                                                                                     ])
        return items

    @frappe.whitelist()
    def serial(self):
        sn = frappe.db.get_all('Serial No', filters={'name': self.scan_barcode,}, fields=['name', 'status' , 'item_code' , 'item_name'])
        if sn:
            return sn
        else: 
            return False
        

