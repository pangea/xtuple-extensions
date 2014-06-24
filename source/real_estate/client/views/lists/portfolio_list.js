(function(){
  "use strict";

  XT.extensions.realEstate.initPortfolioList = function () {
    enyo.kind({
      name: "XV.RealEstatePortfolioList",
      kind: "XV.List",
      label: "_realEstatePortfolios".loc(),
      collection: "XM.RealEstatePortfolioCollection",
      query: {orderBy: [
        {attribute: 'id'}
      ]},
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "name", isKey: true}
             ]},
            {kind: "XV.ListColumn", classes: "short",
             components: [
               {kind: "XV.ListAttr", attr: "id"}
             ]}
          ]}
        ]}
      ]
    });
  };
}());
