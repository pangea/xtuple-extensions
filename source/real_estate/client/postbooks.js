(function () {
  "use strict";

  XT.extensions.realEstate.initPostbooks = function () {
    var module, relevantPrivileges;

    module = XT.extensions.realEstate;
    XT.app.$.postbooks.insertModule(module, 7);
    XT.app.$.postbooks.insertUserMenuItem(module,[
      {content: 'Party', value: 'party', method: "test"},
      {content: 'Party2', value: 'party2', method: "test2"}
    ]);
    relevantPrivileges = [];

    XT.session.addRelevantPrivileges(module.name, relevantPrivileges);
    module.test = function(){console.log( "test" );
};
    module.test2 = function(){console.log( "test2" );
};
  };
}());
