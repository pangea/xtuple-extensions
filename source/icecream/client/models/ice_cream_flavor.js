XT.extensions.icecream.initModels = function () {
  XM.IceCreamFlavor = XM.Document.extend({
    recordType: "XM.IceCreamFlavor",
    documentKey: "name", // the natural key
    idAttribute: "name" // the natural key
  });

  XM.IceCreamFlavorCollection = XM.Collection.extend({
    model: XM.IceCreamFlavor
  });
};
