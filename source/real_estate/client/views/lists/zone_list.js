(function(){
  "use strict";

  XT.extensions.realEstate.initZoneList = function () {
    enyo.kind({
      name: "XV.RealEstateZoneList",
      kind: "XV.List",
      label: "_realEstateZones".loc(),
      collection: "XM.RealEstateZoneCollection",
      query: {orderBy: [
        {attribute: 'id'}
      ]},
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "name", isKey: true}
             ]}
          ]}
        ]}
      ]
    });
  };
}());
