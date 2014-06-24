(function(){
  "use strict";

  XT.extensions.realEstate.initBuildingList = function () {
    enyo.kind({
      name: "XV.RealEstateBuildingList",
      kind: "XV.List",
      label: "_realEstateBuildings".loc(),
      collection: "XM.RealEstateBuildingCollection",
      query: {orderBy: [
        {attribute: 'id'}
      ]},
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "buildingName", isKey: true}
             ]},
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "id"}
             ]},
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "portfolio.name"}
             ]},
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "zone.name"}
             ]}
          ]}
        ]}
      ]
    });
  };
}());
