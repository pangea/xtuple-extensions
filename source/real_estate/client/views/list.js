(function(){
  "use strict";

  XT.extensions.realEstate.initList = function () {
    enyo.kind({
      name: "XV.RealEstateUnitList",
      kind: "XV.List",
      label: "_realEstateUnits".loc(),
      collection: "XM.RealEstateUnitCollection",
      query: {orderBy: [
        {attribute: 'unitName'}
      ]},
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "unitName", isKey: true}
             ]},
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "id"}
             ]},
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "buildingId"}
             ]}
          ]}
        ]}
      ]
    });

    enyo.kind({
      name: "XV.RealEstateBuildingList",
      kind: "XV.List",
      label: "_realEstateBuildings".loc(),
      collection: "XM.RealEstateBuildingCollection",
      published: {
        headerComponents: [
          {kind: "onyx.Button", name: "partyHard", content: "_logout".loc(),
           ontap: "backTapped"}
        ]
      },
      query: {orderBy: [
        {attribute: 'buildingName'}
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
               {kind: "XV.ListAttr", attr: "zoneId"}
             ]}
          ]}
        ]}
      ]
    });
  };
}());
