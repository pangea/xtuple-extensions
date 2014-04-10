(function(){
  "use strict";

  XT.extensions.realEstate.initBuildingModel = function () {
    XM.RealEstateBuilding = XM.Document.extend({
      recordType: "XM.RealEstateBuilding",
      documentKey: "buildingName", // the natural key
      idAttribute: "buildingName" // the natural key
    });

    XM.RealEstateBuildingCollection = XM.Collection.extend({
      model: XM.RealEstateBuilding
    });
  };
}());
