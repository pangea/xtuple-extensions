(function(){
  "use strict";

  XT.extensions.realEstate.initPostbooks = function () {
    var panels, relevantPrivileges;

    panels = [
      {name: "realEstateBuildingList", kind: "XV.RealEstateBuildingList"},
      {name: "realEstateUnitList", kind: "XV.RealEstateUnitList"}
    ];
    XT.app.$.postbooks.appendPanels("setup", panels);
  };  
}());
