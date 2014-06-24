(function() {
  "use strict";

  XT.extensions.realEstate.initBuildingRelationWidget = function() {
    enyo.kind({
      name: 'XV.RealEstateBuildingRelationWidget',
      kind: 'XV.RelationWidget',
      collection: "XM.RealEstateBuildingCollection",
      list: "XV.RealEstateBuildingList",
      keyAttribute: "buildingName",
      descriptionKey: "name"
    });
  };
}());
