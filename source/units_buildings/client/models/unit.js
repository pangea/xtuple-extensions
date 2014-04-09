XT.extensions.unitsBuildings.initModels = function () {
  XM.Unit = XM.Document.extend({
    recordType: "XM.Unit",
    documentKey: "name", // the natural key
    idAttribute: "name"
  });

  XM.UnitCollection = XM.Collection.extend({
    model: XM.Unit
  });


};
