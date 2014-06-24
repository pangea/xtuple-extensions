(function(){
  "use strict";

  XT.extensions.realEstate = {
    name: "realEstate",
    label: "_realEstate".loc(),
    panels: [
      {name: "realEstatePortfolioList", kind: "XV.RealEstatePortfolioList"},
      {name: "realEstateZoneList", kind: "XV.RealEstateZoneList"},
      {name: "realEstateBuildingList", kind: "XV.RealEstateBuildingList"},
      {name: "realEstateUnitList", kind: "XV.RealEstateUnitList"},
      {name: "realEstateLeaseList", kind: "XV.RealEstateLeaseList"}
    ]
  };
}());
