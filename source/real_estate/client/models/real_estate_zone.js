(function(){
  "use strict";

  XT.extensions.realEstate.initZoneModel = function () {
    XM.RealEstateZone = XM.Document.extend({
      recordType: "XM.RealEstateZone",
      documentKey: "name", // the natural key
      idAttribute: "name" // the natural key
    });

    XM.RealEstateZoneCollection = XM.Collection.extend({
      model: XM.RealEstateZone
    });
  };
}());
