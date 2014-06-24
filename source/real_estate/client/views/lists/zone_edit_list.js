(function(){
  "use strict";

  XT.extensions.realEstate.initZoneEditList = function () {
    enyo.kind({
      name: "XV.RealEstateZoneEditList",
      kind: "XV.ScrollableGroupbox",
      title: "_realEstateZone".loc(),
      collection: "XM.RealEstateZoneCollection",
      components: [
        {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
        {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
          {kind: "XV.InputWidget", attr: "name"},
          {kind: "XV.DateWidget", attr: "createdAt"}
        ]}
      ]
    });
  };
}());
