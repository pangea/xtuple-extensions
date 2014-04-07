XT.extensions.icecream.initPostbooks = function () {
  var panels, relevantPrivileges;

  panels = [
    {name: "iceCreamFlavorList", kind: "XV.IceCreamFlavorList"}
  ];
  XT.app.$.postbooks.appendPanels("setup", panels);
};
