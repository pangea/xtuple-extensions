XT.extensions.realEstate.initModels = function () {
  XM.RealEstateUnit = XM.Document.extend({
    recordType: "XM.RealEstateUnit",
    documentKey: "unitName", // the natural key
    idAttribute: "unitName" // the natural key
  });

  XM.RealEstateUnitCollection = XM.Collection.extend({
    model: XM.RealEstateUnit
  });
};
