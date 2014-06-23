(function() {
  "use strict";

  XT.extensions.accounting = {
    module: {
      name: "accounting",
      label: "_accounting".loc(),
      panels: [
        { name: "moneyIn", kind: "XV.CashReceiptList", label: '_moneyIn'.loc() }
      ]
    },
    relevantPrivileges: []
  };


}());


