(function(){
  "use strict";

  XT.extensions.realEstate.initWorkspace = function () {
    enyo.kind({
      name: "XV.RealEstateWorkspace",
      kind: "XV.Workspace",
      title: "_realEstate".loc(),
      model: "XM.RealEstateUnit",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
         fit: true, components: [
           {kind: "XV.ScrollableGroupbox", name: "mainPanel", components: [
             {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
             {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
               {kind: "XV.InputWidget", attr: "unitName"},
               {kind: "XV.NumberWidget", attr: "id"},
               {kind: "XV.NumberWidget", attr: "buildingId"},
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
           ]}
         ]}
      ]
    });

    XV.registerModelWorkspace("XM.RealEstateUnit", "XV.RealEstateWorkspace");
  };
}());
