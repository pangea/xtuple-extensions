(function(){
  "use strict";

  XT.extensions.realEstate.initPortfolioWorkspace = function () {
    enyo.kind({
      name: "XV.RealEstatePortfolioWorkspace",
      kind: "XV.Workspace",
      title: "_realEstatePortfolio".loc(),
      model: "XM.RealEstatePortfolio",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger", fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup",
             classes: "in-panel", components: [ 
               { kind: 'XV.InputWidget', attr: "name" },
               { kind: "XV.DateWidget", attr: "createdAt" },
               { kind: "XV.InputWidget", attr: "bankAccount" },
               { kind: 'XV.DateWidget', attr: "accountingClosingDate" }
             ]}
          ]}
        ]}
      ]
    });
    XV.registerModelWorkspace("XM.RealEstatePortfolio", "XV.RealEstatePortfolioWorkspace");
  };
}());
