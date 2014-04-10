XT.extensions.icecream.initPicker = function () {
  enyo.kind({
    name: "XV.IceCreamFlavorPicker",
    kind: "XV.PickerWidget",
    collection: "XM.iceCreamFlavors"
  });
};
