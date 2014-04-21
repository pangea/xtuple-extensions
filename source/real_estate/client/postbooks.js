(function () {

  XT.extensions.realEstate.initPostbooks = function () {
    var module, relevantPrivileges;

    module = XT.extensions.realEstate;
    XT.app.$.postbooks.insertModule(module, 7);

    relevantPrivileges = [];

    XT.session.addRelevantPrivileges(module.name, relevantPrivileges);
  };
}());
