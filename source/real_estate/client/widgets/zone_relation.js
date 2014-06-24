(function() {
  "use strict";

  XT.extensions.realEstate.initZoneRelationWidget = function() {
    enyo.kind({
      name: 'XV.RealEstateZoneRelationWidget',
      kind: 'XV.RelationWidget',
      collection: "XM.RealEstateZoneCollection",
      list: "XV.RealEstateZoneList",
      keyAttribute: "name",
      descriptionKey: "name"
    });
  };
}());
