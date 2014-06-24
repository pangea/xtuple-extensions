(function(){
  "use strict";

  XT.extensions.realEstate.initPortfolioEditList = function () {
    enyo.kind({
      name: "XV.RealEstatePortfolioEditList",
      kind: "XV.ScrollableGroupbox",
      label: "_realEstatePortfolios".loc(),
      collection: "XM.RealEstatePortfolioCollection",
      components: [
        {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
        {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
          { kind: 'XV.InputWidget', attr: "name" },
          { kind: 'XV.InputWidget', attr: "accountId" },
          { kind: 'XV.DateWidget', attr: "createdAt" },
          { kind: "XV.InputWidget", attr: "bankAccount" },
          { kind: 'XV.DateWidget', attr: "accountingClosingDate" }
        ]}
      ]
    });
  };
}());
