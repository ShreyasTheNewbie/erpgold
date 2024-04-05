frappe.ui.form.on('Delivery Note',{
    posting_date:function(frm){
        frm.doc.items.forEach(function(i){
            fetchMetalRate(frm,i.doctype, i.name)      
        })
    },
})

frappe.ui.form.on('Delivery Note Item', {
    item_code:function(frm, cdt, cdn) {
        fetchMetalRate(frm,cdt,cdn)
    },
    custom_gross_weight: function(frm, cdt, cdn) {
        calculateNetWeight(frm, cdt, cdn);
        labourtype(frm, cdt, cdn);
    },
    custom_net_weight: function(frm, cdt, cdn) {
        calculateFineWeight(frm,cdt,cdn);
        // totalWeights(frm,cdt,cdn);
    },
    custom_less_weight:function(frm, cdt, cdn) {
        calculateNetWeight(frm,cdt,cdn);
        calculateFineWeight(frm,cdt,cdn);
    },
    custom_purity_percentage_:function(frm, cdt, cdn) {
        calculateFineWeight(frm,cdt,cdn);
        custom_gold_value(frm,cdt,cdn);
    },
    qty: function(frm, cdt, cdn) {
        // calculateNetWeight(frm, cdt, cdn);
        // calculateFineWeight(frm, cdt, cdn);
        custom_gold_value(frm, cdt, cdn);
        labourtype(frm, cdt, cdn);
    },
    custom_fine_weight:function(frm, cdt, cdn) {
        custom_gold_value(frm,cdt,cdn);
        // totalWeights(frm,cdt,cdn);
    },
    custom_gold_rate:function(frm, cdt, cdn) {custom_gold_value(frm,cdt,cdn)},
    custom_gold_value:function(frm, cdt, cdn) {calculateTotalAmount(frm,cdt,cdn)},
    custom_labour_type:function(frm, cdt, cdn) {labourtype(frm,cdt,cdn)},
    custom_sales_labour_rate:function(frm, cdt, cdn) {labourtype(frm,cdt,cdn)},
    custom_labour_amount: function(frm,cdt,cdn){calculateTotalAmount(frm,cdt,cdn)},
    custom_other_amount:function(frm, cdt, cdn) { calculateTotalAmount(frm,cdt,cdn)},
    custom_discount: function(frm, cdt, cdn) {calculateTotalAmount(frm,cdt,cdn)},
});

function calculateNetWeight(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var gross_weight = child.custom_gross_weight;
    var less_weight = child.custom_less_weight;
    var qty = child.qty;

   
    if (gross_weight !== undefined && less_weight !== undefined) {
        var net_weight = gross_weight - less_weight;
        frappe.model.set_value(cdt, cdn, 'custom_net_weight', net_weight);
        refresh_field('custom_net_weight');
    }
}

function calculateFineWeight(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var net_weight = child.custom_net_weight;
    var purity_percent = child.custom_purity_percentage_;
    var qty = child.qty;

    if (net_weight !== undefined && purity_percent !== undefined) {
        var fine_weight = net_weight / (purity_percent / 100);
        frappe.model.set_value(cdt, cdn, 'custom_fine_weight', fine_weight);
        refresh_field('custom_fine_weight');
    }
}

function custom_gold_value(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var fine_weight = child.custom_fine_weight;
    var goldrate = child.custom_gold_rate;
    var qty = child.qty;
    
    if (fine_weight !== undefined && goldrate !== undefined) {
        var gv = (fine_weight * (goldrate / 10));
        frappe.model.set_value(cdt, cdn, 'custom_gold_value', gv);
        refresh_field('custom_gold_value');
    }
}


function labourtype(frm, cdt, cdn){
    var child = locals[cdt][cdn];
    var custom_labour_type=child.custom_labour_type;
    var gross_weight = child.custom_gross_weight;
    var net_weight = child.custom_net_weight;
    var qty = child.qty;
    

    if (custom_labour_type === 'On Gross Weight Per Gram'){
        frappe.model.set_value(cdt, cdn, 'custom_sales_labour_rate', '1000');
        refresh_field('custom_sales_labour_rate')
        
        var custom_sales_labour_rate=child.custom_sales_labour_rate;
        var sla = (gross_weight * custom_sales_labour_rate) * qty
        frappe.model.set_value(cdt, cdn, 'custom_sales_labour_amount', sla);
        refresh_field('custom_sales_labour_amount')
    }
    else if (custom_labour_type === 'On Net Weight Per Gram'){
        frappe.model.set_value(cdt, cdn, 'custom_sales_labour_rate', '1200');
        refresh_field('custom_sales_labour_rate')

        var custom_sales_labour_rate=child.custom_sales_labour_rate;
        var sla = (net_weight * custom_sales_labour_rate) * qty
        frappe.model.set_value(cdt, cdn, 'custom_sales_labour_amount', sla);
        refresh_field('custom_sales_labour_amount')

    }
    else if (custom_labour_type === 'On Gold Value Percentage'  /*&& custom_gold_value !== undefined*/){
        frappe.model.set_value(cdt, cdn, 'custom_sales_labour_rate', '20');
        refresh_field('custom_sales_labour_rate')

        
        var custom_sales_labour_rate=child.custom_sales_labour_rate;
        var gold_value=child.custom_gold_value;
        var sla = gold_value * (custom_sales_labour_rate/100)
        frappe.model.set_value(cdt, cdn, 'custom_sales_labour_amount', sla);
        refresh_field('custom_sales_labour_amount')
    }
    else if(custom_labour_type === 'Flat Rate'){
        frappe.model.set_value(cdt, cdn, 'custom_sales_labour_rate', '10000');
        frm.refresh_field('custom_sales_labour_rate')


        var custom_sales_labour_rate=child.custom_sales_labour_rate;    
        var sla = (qty * custom_sales_labour_rate) 
        frappe.model.set_value(cdt, cdn, 'custom_sales_labour_amount', sla);
        refresh_field('custom_sales_labour_amount')
    }
}

function fetchMetalRate(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var custom_purity = child.custom_purity;
    var mt = child.custom_metal_type;
    var date = frm.doc.posting_date;
   
    if(mt && custom_purity){
        frm.call({        
            method: 'erpgold.erpgold.doctype.metal_rate.metal_rate.query',
            args: {   
                date: date, 
                metal_type : mt ,      
                purity: custom_purity,       
            },
            callback: function(r) {
                if (r.message){
                    frappe.model.set_value(cdt, cdn, 'custom_gold_rate', r.message);
                    console.log(r.message)
                    refresh_field('custom_gold_rate');
                }
                else {
                    frappe.model.set_value(cdt, cdn, 'custom_gold_rate', undefined);
                    frappe.throw("<h5><a href='http://127.0.0.1:8001/app/metal-rate' , style='color:#2490ef'>Metal Rate</a> is not available or not submitted.");
                }
            }
        });
    }
}

function calculateTotalAmount(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var gold_value = child.custom_gold_value;
    var other_amount = child.custom_other_amount || 0;
    var labour_amount = child.custom_sales_labour_amount || 0;
    var discount = child.custom_discount || 0;
    var total_amount = (gold_value + other_amount + labour_amount) - discount;
    frappe.model.set_value(cdt, cdn, 'custom_total_amount', total_amount);
    frappe.model.set_value(cdt, cdn, 'rate', total_amount);
    refresh_field("custom_total_amount")
}

// function totalWeights(frm,cdt,cdn){
//     var total_gross_weight =0;cd
//     var total_net_weight = 0;
//     var total_less_weight =0 ;
//     var total_fine_weight =0;
    
//     frm.doc.items.forEach(function(d) {
//         total_gross_weight += d.qty * d.custom_gross_weight || 0;
//         total_net_weight += d.qty * d.custom_net_weight || 0;
//         total_less_weight +=d.qty * d.custom_less_weight || 0;
//         total_fine_weight += d.qty * d.custom_fine_weight || 0;
//     });

//     frm.set_value('custom_total_gross_weight', total_gross_weight);
//     frm.set_value('custom_total_net_weight', total_net_weight);
//     frm.set_value('custom_total_less_weight', total_less_weight);
//     frm.set_value('custom_total_fine_weight', total_fine_weight);
// }

