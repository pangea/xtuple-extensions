XT.extensions.icecream.initWorkspace = function () {
  enyo.kind({
    name: "XV.IceCreamFlavorWorkspace",
    kind: "XV.Workspace",
    title: "_iceCreamFlavor".loc(),
    model: "XM.IceCreamFlavor",
    components: [
      {kind: "Panels", arrangerKind: "CarouselArranger",
        fit: true, components: [
        {kind: "XV.Groupbox", name: "mainPanel", components: [
          {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
          {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
            {kind: "XV.InputWidget", attr: "name"},
            {kind: "XV.InputWidget", attr: "description"},
            {kind: "XV.NumberWidget", attr: "calories"}
          ]}
        ]}
      ]}
    ]
  });

  XV.registerModelWorkspace("XM.IceCreamFlavor", "XV.IceCreamFlavorWorkspace");


  var extensions = [
    {kind: "onyx.GroupboxHeader", container: "mainGroup", content: "_iceCreamFlavor".loc()},
    {kind: "XV.IceCreamFlavorPicker", container: "mainGroup", attr: "favoriteFlavor" }
  ];

  XV.appendExtension("XV.ContactWorkspace", extensions);

};
