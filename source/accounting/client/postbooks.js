(function() {
  "use strict";
  
  XT.extensions.accounting.initPostbooks = function() {
    var accounting = XT.extensions.accounting,
    module = accounting.module,
    relevantPrivileges = accounting.relevantPrivileges;

    XT.app.$.postbooks.insertModule(module, 9);
    XT.session.addRelevantPrivileges(module.name, relevantPrivileges); 
  }
}());
