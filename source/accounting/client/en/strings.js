(function() {
  "use strict";
  
  var lang = XT.stringsFor('en_US', {
    '_accounting' : 'Accounting',
    '_cashReceipts' : 'Cash Receipts',
    '_tenantLedgers' : 'Tenant Ledgers',
    '_salesHistory' : 'Sales History'
  });

  if(typeof(exports) !== 'undefined') {
    exports.language = lang;
  }
}());
