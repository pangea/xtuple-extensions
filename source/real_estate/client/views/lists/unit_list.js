(function(){
  "use strict";

  XT.extensions.realEstate.initUnitList = function () {
    enyo.kind({
      name: "XV.RealEstateUnitList",
      kind: "XV.List",
      label: "_realEstateUnits".loc(),
      collection: "XM.RealEstateUnitCollection",
      query: {orderBy: [
        {attribute: 'id'}
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
               {kind: "XV.ListAttr", attr: "building.buildingName"}
             ]}
          ]}
        ]}
      ]
    });
  };
}());
