(function(){
  "use strict";

  XT.extensions.realEstate.initLeaseModel = function () {
    XM.RealEstateLease = XM.Document.extend({
      recordType: "XM.RealEstateLease",
      documentKey: "unitId", // the natural key
      idAttribute: "unitId" // the natural key
    });

    XM.RealEstateLeaseCollection = XM.Collection.extend({
      model: XM.RealEstateLease
    });
  };
}());
