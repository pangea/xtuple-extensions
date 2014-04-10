(function(){
  "use strict";

  XT.extensions.realEstate.initWorkspace = function () {
    enyo.kind({
      name: "XV.RealEstateUnitWorkspace",
      kind: "XV.Workspace",
      title: "_realEstateUnits".loc(),
      model: "XM.RealEstateUnit",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
         fit: true, components: [
           {kind: "XV.ScrollableGroupbox", name: "mainPanel", components: [
             {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
             {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
               {kind: "XV.InputWidget", attr: "unitName"},
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

    enyo.kind({
      name: "XV.RealEstateBuildingWorkspace",
      kind: "XV.Workspace",
      title: "_realEstateBuildings".loc(),
      model: "XM.RealEstateBuilding",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
         fit: true, components: [
           {kind: "XV.ScrollableGroupbox", name: "mainPanel", components: [
             {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
             {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
              { kind: 'XV.InputWidget'    , attr: "buildingName" },
              { kind: 'XV.NumberWidget'   , attr: "portfolioId" },
              { kind: 'XV.NumberWidget'   , attr: "zoneId" },
              { kind: 'XV.NumberWidget'   , attr: "buildingTypeId" },
              { kind: 'XV.NumberWidget'   , attr: "officeId" },
              { kind: 'XV.NumberWidget'   , attr: "promoId" },
              { kind: 'XV.NumberWidget'   , attr: "parkingVendorId" },
              { kind: 'XV.DateWidget'     , attr: "assetAcquisitionDate" },
              { kind: 'XV.DateWidget'     , attr: "assetSaleDate" },
              { kind: 'XV.InputWidget'    , attr: "category" },
              { kind: 'XV.NumberWidget'   , attr: "totalArea" },
              { kind: 'XV.NumberWidget'   , attr: "floors" },
              { kind: 'XV.InputWidget'    , attr: "address" },
              { kind: 'XV.InputWidget'    , attr: "city" },
              { kind: 'XV.InputWidget'    , attr: "state" },
              { kind: 'XV.NumberWidget'   , attr: "zipCode" },
              { kind: 'XV.InputWidget'    , attr: "neighborhood" },
              { kind: 'XV.InputWidget'    , attr: "communityName" },
              { kind: 'XV.CheckboxWidget' , attr: "leasingAgencyApproved" },
              { kind: 'XV.NumberWidget'   , attr: "unitCount" }
             ]}
           ]}
         ]}
      ]
    });

    XV.registerModelWorkspace("XM.RealEstateBuilding", "XV.RealEstateBuildingWorkspace");
    XV.registerModelWorkspace("XM.RealEstateUnit", "XV.RealEstateUnitWorkspace");
  };
}());
