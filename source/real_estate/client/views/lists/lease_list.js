(function(){
  "use strict";

  XT.extensions.realEstate.initLeaseList = function () {
    enyo.kind({
      name: "XV.RealEstateLeaseList",
      kind: "XV.List",
      label: "_realEstateLeases".loc(),
      collection: "XM.RealEstateLeaseCollection",
      query: {orderBy: [
        {attribute: 'id'}
      ]},
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "unitId", isKey: true}
             ]},
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "promoId"}
             ]},
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "type"}
             ]}
          ]}
        ]}
      ]
    });
  };
}());
