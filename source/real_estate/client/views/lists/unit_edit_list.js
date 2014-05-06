(function(){
  "use strict";

  XT.extensions.realEstate.initUnitEditList = function () {
    enyo.kind({
      name: "XV.RealEstateUnitEditList",
      kind: "XV.ScrollableGroupbox",
      title: "_realEstateUnit".loc(),
      collection: "XM.RealEstateUnitCollection",
      components: [
        {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
        {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
          {kind: "XV.InputWidget", attr: "unitName"},
          {kind: "XV.RealEstateBuildingRelationWidget", attr: "building"},
          {kind: "XV.NumberWidget", attr: "unitTypeId"},
          {kind: "XV.DateWidget", attr: "createdAt"},
          {kind: "XV.InputWidget", attr: "category"},
          {kind: "XV.NumberWidget", attr: "totalArea"},
          {kind: "XV.NumberWidget", attr: "floorNumber"},
          {kind: "XV.InputWidget", attr: "address"},
          {kind: "XV.InputWidget", attr: "city"},
          {kind: "XV.InputWidget", attr: "state"},
          {kind: "XV.NumberWidget", attr: "zipCode"},
          {kind: "XV.InputWidget", attr: "majorIntersection"},
          {kind: "XV.NumberWidget", attr: "bedrooms"},
          {kind: "XV.NumberWidget", attr: "bathrooms"},
          {kind: "XV.NumberWidget", attr: "targetRent"},
          {kind: "XV.NumberWidget", attr: "targetDeposit"},
          {kind: "XV.NumberWidget", attr: "leaseID"}
        ]}
      ]
    });
  };
}());
