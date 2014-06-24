(function() {
  "use strict";

  XT.extensions.accounting = {
    module: {
      name: "accounting",
      label: "_accounting".loc(),
      panels: [
        { name: "cashReceipts", kind: "XV.CashReceiptList", label: '_cashReceipts'.loc() },
        { name: "salesOrders", kind: "XV.SalesOrderList", label: '_salesOrders'.loc() },
        { name: "invoices", kind: "XV.InvoiceList", label: '_invoices'.loc() }
      ]
    },
    relevantPrivileges: []
  };


}());


