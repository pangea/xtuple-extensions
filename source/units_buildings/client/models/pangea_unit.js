XT.extensions.unitsBuildings.initModels = function () {
  XM.PangeaUnit = XM.Document.extend({
    recordType: "XM.PangeaUnit",
    documentKey: "unitName", // the natural key
    idAttribute: "unitName" // the natural key
  });

  XM.PangeaUnitCollection = XM.Collection.extend({
    model: XM.PangeaUnit
  });
};
