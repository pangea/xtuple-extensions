(function(){
  "use strict";

  XT.extensions.message.initPostbooks = function() {
    var module, relevantPrivileges;

    module = XT.extensions.message;

    XT.app.$.postbooks.insertModule(module, 8);
    relevantPrivileges = [];

    XT.session.addRelevantPrivileges(module.name, relevantPrivileges);

  };
}());
