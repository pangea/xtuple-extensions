(function() {
  "use strict";

  XT.extensions.accounting = {
    module: {
      name: "accounting",
      label: "_accounting",
      panels: [
        { name: "money_in", kind: "XV.CashReceiptList" }
      ]
    },
    relevantPrivileges: []
  };


}());


