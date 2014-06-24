(function(){
  "use strict";

  XT.extensions.realEstate.initBuildingEditList = function () {
    enyo.kind({
      name: "XV.RealEstateBuildingEditList",
      kind: "XV.ScrollableGroupbox",
      label: "_realEstateBuildings".loc(),
      collection: "XM.RealEstateBuildingCollection",
      components: [
        {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
        {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
          { kind: 'XV.InputWidget'    , attr: "buildingName" },
          {kind: "XV.RealEstatePortfolioRelationWidget", attr: "portfolio"},
          {kind: "XV.RealEstateZoneRelationWidget", attr: "zone"},
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
      ]
    });
  };
}());
