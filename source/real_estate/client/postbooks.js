(function () {
  "use strict";

  XT.extensions.realEstate.initPostbooks = function () {
    var module, relevantPrivileges;

    module = XT.extensions.realEstate;
    XT.app.$.postbooks.insertModule(module, 7);
    // XT.app.$.postbooks.insertUserMenuItem(module,[
    //   {content: 'Test', value: 'test', method: "test"},
    // ]);
    relevantPrivileges = [];

    XT.session.addRelevantPrivileges(module.name, relevantPrivileges);
    // module.test = function(){console.log( "test" );
  };
}());
