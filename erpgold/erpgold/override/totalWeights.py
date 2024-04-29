# custom_methods.py
import frappe
@frappe.whitelist()
def total_weights(doc, method):
    total_gross_weight = 0
    total_net_weight = 0
    total_less_weight = 0
    total_fine_weight = 0

    for item in doc.items:
        total_gross_weight += item.qty * (item.custom_gross_weight or 0)
        total_net_weight += item.qty * (item.custom_net_weight or 0)
        total_less_weight += item.qty * (item.custom_less_weight or 0)
        total_fine_weight += item.qty * (item.custom_fine_weight or 0)

    doc.custom_total_gross_weight = total_gross_weight
    doc.custom_total_net_weight = total_net_weight
    doc.custom_total_less_weight = total_less_weight
    doc.custom_total_fine_weight = total_fine_weight