(function () {

  XT.extensions.realEstate.initPostbooks = function () {
    var module, relevantPrivileges;

    module = {
      name: "realEstate",
      label: "_realEstate".loc(),
      panels: [
        {name: "realEstateBuildingList", kind: "XV.RealEstateBuildingList"},
        {name: "realEstateUnitList", kind: "XV.RealEstateUnitList"}
      ]
    };
    XT.app.$.postbooks.insertModule(module, 7);

    
    relevantPrivileges = [
    ];
    XT.session.addRelevantPrivileges(module.name, relevantPrivileges);
  };
}());
