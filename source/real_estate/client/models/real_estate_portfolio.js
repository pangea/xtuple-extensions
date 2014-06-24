(function(){
  "use strict";

  XT.extensions.realEstate.initPortfolioModel = function () {
    XM.RealEstatePortfolio = XM.Document.extend({
      recordType: "XM.RealEstatePortfolio",
      documentKey: "name", // the natural key
      idAttribute: "name" // the natural key
    });

    XM.RealEstatePortfolioCollection = XM.Collection.extend({
      model: XM.RealEstatePortfolio
    });
  };
}());
