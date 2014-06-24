(function(){
  "use strict";

  XT.extensions.realEstate.initZoneWorkspace = function () {
    enyo.kind({
      name: "XV.RealEstateZoneWorkspace",
      kind: "XV.Workspace",
      title: "_realEstateZone".loc(),
      model: "XM.RealEstateZone",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
         fit: true, components: [
           {kind: "XV.ScrollableGroupbox", name: "mainPanel", components: [
             {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
             {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
               {kind: "XV.InputWidget", attr: "name"},
               {kind: "XV.DateWidget", attr: "createdAt"}
             ]}
           ]}
         ]}
      ]
    });

    XV.registerModelWorkspace("XM.RealEstateZone", "XV.RealEstateZoneWorkspace");
  };
}());
