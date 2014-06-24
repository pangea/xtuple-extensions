(function(){
  "use strict";

  XT.extensions.realEstate.initLeaseEditList = function () {
    enyo.kind({     
      name: "XV.RealEstateLeaseEditList",
      kind: "XV.ScrollableGroupbox",
      label: "_realEstateLeases".loc(),
      collection: "XM.RealEstateLeaseCollection",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
             classes: "in-panel", components: [ 
               { kind: 'XV.NumberWidget', attr: "unitId" },
               { kind: 'XV.NumberWidget', attr: "crmacctId" },
               { kind: "XV.DateWidget", attr: "startDate" },
               { kind: "XV.DateWidget", attr: "endDate" },
               { kind: "XV.DateWidget", attr: "moveInDate" },          
               { kind: "XV.DateWidget", attr: "vacatedDate" },
               { kind: "XV.InputWidget", attr: "reasonForLeaving" },
               { kind: "XV.DateWidget", attr: "scheduledMoveOutDate" },
               { kind: "XV.InputWidget", attr: "status" },
               { kind: "XV.InputWidget", attr: "publicAssistanceProgram" },
               { kind: "XV.CheckboxWidget", attr: "movedWithin" },
               { kind: "XV.DateWidget", attr: "createdAt" },
               { kind: 'XV.LeaseTypePicker', attr: "type" }
             ]}
          ]}
        ]}
      ]
    });
  };
}());
