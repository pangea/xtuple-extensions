(function(){
  "use strict";

  XT.extensions.realEstate = {
    name: "realEstate",
    label: "_realEstate".loc(),
    panels: [
      {name: "realEstateBuildingList", kind: "XV.RealEstateBuildingList"},
      {name: "realEstateUnitList", kind: "XV.RealEstateUnitList"}
    ]
  };
}());
