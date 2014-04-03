XT.extensions.icecream.initParameterWidget = function () {
  extensions = [
    {kind: "onyx.GroupboxHeader", content: "_iceCreamFlavor".loc()},
    {name: "iceCreamFlavor", label: "_favoriteFlavor".loc(),
      attr: "favoriteFlavor", defaultKind: "XV.IceCreamFlavorPicker"}
  ];

  XV.appendExtension("XV.ContactListParameters", extensions);
};
