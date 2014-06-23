(function() {
  "use strict";

  XT.extensions.accounting = {
    module: {
      name: "accounting",
      label: "_accounting".loc(),
      panels: [
        { name: "cashReceipts", kind: "XV.CashReceiptList", label: '_cashReceipts'.loc() },
        { name: "invoices", kind: "XV.InvoiceList", label: '_salesHistory'.loc() }
      ]
    },
    relevantPrivileges: []
  };


}());


