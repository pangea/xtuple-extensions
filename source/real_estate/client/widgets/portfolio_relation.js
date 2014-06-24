(function() {
  "use strict";

  XT.extensions.realEstate.initPortfolioRelationWidget = function() {
    enyo.kind({
      name: 'XV.RealEstatePortfolioRelationWidget',
      kind: 'XV.RelationWidget',
      collection: "XM.RealEstatePortfolioCollection",
      list: "XV.RealEstatePortfolioList",
      keyAttribute: "name",
      descriptionKey: "name"
    });
  };
}());
