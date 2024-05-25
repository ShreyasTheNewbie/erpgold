# import frappe
# from erpnext.stock.doctype.stock_ledger_entry.stock_ledger_entry import StockLedgerEntry
# class gl(StockLedgerEntry):
    # def on_submit(self):
#         pass
        # if self.serial_no != '':
        # pass
            # doc = frappe.get_doc(
            # {
            #     "doctype": "Gold Ledger",
                
            #     'posting_date' : self.posting_date,
            #     'voucher_type' : self.voucher_type,
            #     'voucher_no' : self.voucher_no,
            #     'voucher_detail_no' : self.voucher_detail_no,
            #     'item_code' : self.item_code,
            #     # 'purity' : g.custom_purity,
            #     'stock_uom' : self.stock_uom ,
                
            #     'serial_no': self.serial_no,
            #     'credit' : self.incoming_rate,
            #     'debit' : self.outgoing_rate,
            #     'warehouse' : self.warehouse,
            #     'fiscal_year' : self.fiscal_year,   
            # })
            # doc.submit()
            # super(gl, self).on_submit()
            
         
import frappe
from erpnext.accounts.utils import get_fiscal_year

@frappe.whitelist()
def make_gl_entry(self, method):
    for i in self.items :
        if i.serial_no != None and i.serial_no != "":
            doc=frappe.new_doc("Gold Ledger")
            doc.item_code = i.item_code
            doc.posting_date=self.posting_date,
            doc.voucher_type=self.doctype,
            if self.doctype in ["Purchase Receipt", "Purchase Invoice","Stock Entry"]:
                doc.credit_gold = i.custom_fine_weight
                doc.party_type = "Supplier"
                doc.party_ = self.supplier
                doc.credit = i.amount
                if self.doctype == "Stock Entry":
                    doc.warehouse = i.t_warehouse
                else:
                    doc.warehouse=i.warehouse,
                    doc.account_currency = self.currency
            else:
                doc.account_currency = self.currency
                doc.debit_gold = i.custom_fine_weight
                doc.party_type = "Customer"
                doc.party = self.customer
                doc.debit=i.amount
                doc.serial_no = i.serial_no
                doc.warehouse=i.warehouse,
            doc.serial_no = i.serial_no
            doc.voucher_no=self.name,
            doc.stock_uom = i.uom
            self.fiscal_year = get_fiscal_year(self.posting_date, company = 'ERPGold')[0]
            doc.save()
            print("\n"+str(self.fiscal_year))
    frappe.msgprint(("Gold Ledger entries created"),alert =True, indicator='green')


@frappe.whitelist()
def cancel_gl_entry(self,method):
    doc = frappe.get_list('Gold Ledger', filters={"voucher_no": self.name},pluck='name')
    print("\n" +str(doc))
    if doc:
        for i in doc:
            d= frappe.get_doc("Gold Ledger", i)
            d.db_set('is_cancelled', 1, update_modified=False)
        frappe.msgprint((f"Gold Ledger entries for {self.name} is cancelled"),alert =True, indicator='red')
        
        












#>>make gl entry on each sle
import frappe
@frappe.whitelist()
def make_gl_from_sle(self,method):
        if self.serial_no != '':
            doc=frappe.new_doc("Gold Ledger")
            doc.posting_date = self.posting_date,
            doc.voucher_type = self.voucher_type,
            doc.voucher_no = self.voucher_no,
            doc.voucher_detail_no = self.voucher_detail_no,
            doc.item_code = self.item_code,
            doc.stock_uom = self.stock_uom ,
            doc.serial_no =self.serial_no,  
            doc.serial_no= self.serial_no,
            doc.credit = self.incoming_rate,
            doc.debit = self.outgoing_rate,
            doc.warehouse = self.warehouse,
            doc.fiscal_year = self.fiscal_year,
            if self.voucher_type == 'Purchase Receipt':
                child_t = 'Purchase Receipt Item'
            elif self.voucher_type == 'Purchase Invoice':
                child_t = 'Purchase Invoice Item'
            elif self.voucher_type == 'Stock Entry':
                child_t = 'Stock Entry Detail'
            else:
                child_t = 'Delivery Note Item'
            item_info = frappe.db.get_all( child_t, filters={"parent": self.voucher_no ,"name":self.voucher_detail_no}, fields= ['custom_fine_weight'])
            if self.voucher_type in ["Purchase Receipt", "Purchase Invoice","Stock Entry"]:
                doc.credit_gold = item_info[0].custom_fine_weight
                doc.party_type = "Supplier"
            else:
                doc.debit_gold = item_info[0].custom_fine_weight
                doc.party_type = "Customer"
            doc.save()
            frappe.msgprint(("Gold Ledger entries created"),alert =True, indicator='green')
            
@frappe.whitelist()
def cancel_gl_entry_on_cancel_sle(self,method):
    doc = frappe.get_list('Gold Ledger', filters={"voucher_no": self.voucher_type},pluck='name')
    print("\n" +str(doc))
    if doc:
        for i in doc:
            d= frappe.get_doc("Gold Ledger", i)
            d.db_set('is_cancelled', 1, update_modified=False)
        frappe.msgprint((f"Gold Ledger entries for {self.name} is cancelled"),alert =True, indicator='red')