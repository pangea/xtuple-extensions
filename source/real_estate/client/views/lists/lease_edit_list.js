(function(){
  "use strict";

  XT.extensions.realEstate.initLeaseEditList = function () {
    enyo.kind({
      name: "XV.RealEstateLeaseEditList",
      kind: "XV.ScrollableGroupbox",
      label: "_realEstateLeases".loc(),
      collection: "XM.RealEstateLeaseCollection",
      components: [
        {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
        {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
          { kind: 'XV.NumberWidget', attr: "unitId" },
          { kind: 'XV.NumberWidget', attr: "promoId" },
          { kind: "XV.DateWidget", attr: "createdAt" },
          { kind: 'XV.LeaseTypePicker', attr: "type" }
        ]}
      ]
    });
  };
}());
