{
  "name": "accounting",
  "comment": "accounting extension",
  "loadOrder": 30,
  "databaseScripts": [
    //billing
    "xt/tables/rptdef.sql",
    "xm/javascript/billing.sql",
    "xm/javascript/cashrcpt.sql",
    "xm/javascript/invoice.sql",
    "xm/javascript/return.sql",
    "xm/javascript/receivable.sql",
    "xm/javascript/sales_category.sql",
    "xt/functions/ar_balance.sql",
    "xt/functions/ar_tax_total.sql",
    "xt/functions/cashrcpt.sql",
    "xt/views/receivable_invoice_return.sql",
    "xt/views/aropeninfo.sql",
    "xt/views/receivable_applications.sql",
    "xt/views/cashrcpt.sql",
    //purchasing
    "xt/functions/po_freight_subtotal.sql",
    "xt/functions/po_line_extended_price.sql",
    "xt/functions/po_line_tax.sql",
    "xt/functions/po_schedule_date.sql",
    "xt/functions/po_subtotal.sql",
    "xt/functions/po_tax_total.sql",
    "xt/functions/po_total.sql",
    "xt/trigger_functions/itemsrc_did_change.sql",
    "xt/tables/poemlprofile.sql",
    "xt/tables/powf.sql",
    "xt/tables/potype.sql",
    "xt/tables/potypewf.sql",
    "xt/tables/wftype.sql",
    "xt/tables/acttype.sql",
    "xt/tables/poheadext.sql",
    "xt/views/itemsrcmfg.sql",
    "xt/views/poheadinfo.sql",
    "xt/views/poiteminfo.sql",
    "xm/javascript/item_source.sql",
    "xm/javascript/purchasing.sql",
    "xm/javascript/purchase_order.sql",
    "public/tables/itemsrc.sql"
  ]
}
{
  "name": "sales",
  "comment": "Sales extension",
  "loadOrder": 20,
  "databaseScripts": [
    "xt/tables/acttype.sql",
    "xt/views/share_users_cust.sql",
    "xt/views/share_users_shipto.sql",
    "xt/tables/sharetype.sql"
  ]
}
