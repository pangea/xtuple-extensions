XT.extensions.unitsBuildings.initPostbooks = function () {
  var panels, relevantPrivileges;

  panels = [
    {name: "pangeaUnitList", kind: "XV.PangeaUnitList"}
  ];
  XT.app.$.postbooks.appendPanels("setup", panels);
};
