XT.extensions.realEstate.initPostbooks = function () {
  var panels, relevantPrivileges;

  panels = [
    {name: "realEstateUnitList", kind: "XV.RealEstateUnitList"}
  ];
  XT.app.$.postbooks.appendPanels("setup", panels);
};
