(function() {
  "use strict";
  
  var lang = XT.stringsFor('en_US', {
    '_accounting' : 'Accounting',
    '_cashReceipts' : 'Cash Receipts',
    '_tenantLedgers' : 'Tenant Ledgers',
    '_invoices' : 'Invoices',
    '_salesOrders' : 'Sales Orders'
  });

  if(typeof(exports) !== 'undefined') {
    exports.language = lang;
  }
}());
