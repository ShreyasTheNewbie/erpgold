# Copyright (c) 2024, shreyas and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class MetalRate(Document):
    @frappe.whitelist()
    def get_metal_list(self):
        metal_list = frappe.get_list("Purity", fields=["metal_type", "purity"])
        return metal_list


@frappe.whitelist()
def query(metal_type, purity, date):
    metal_rate = frappe.db.sql("""
                               SELECT metal_rate 
                               FROM `tabDaily Metal Rate` AS dmr 
                               INNER JOIN `tabMetal Rate` AS mr 
                               ON dmr.parent = mr.name 
                               WHERE dmr.docstatus = '1' 
                               AND metal_type = %s 
                               AND purity = %s 
                               AND mr.date = %s  
                               """, (metal_type, purity, date))

    if metal_rate:
        return metal_rate[0][0]
   

                             