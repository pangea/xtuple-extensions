(function(){
  "use strict";

  XT.extensions.realEstate.initLeaseWorkspace = function () {
    enyo.kind({
      name: "XV.RealEstateLeaseWorkspace",
      kind: "XV.Workspace",
      title: "_realEstateLease".loc(),
      model: "XM.RealEstateLease",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
         fit: true, components: [
           {kind: "XV.ScrollableGroupbox", name: "mainPanel", components: [
             {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
             {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
               {kind: "XV.NumberWidget", attr: "unitId"},
               {kind: "XV.NumberWidget", attr: "promoId"},
               {kind: "XV.DateWidget", attr: "createdAt"},
               {kind: "XV.LeaseTypePicker", attr: "type" }
             ]}
           ]}
         ]}
      ]
    });

    XV.registerModelWorkspace("XM.RealEstateLease", "XV.RealEstateLeaseWorkspace");
  };
}());
