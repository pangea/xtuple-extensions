XT.extensions.icecream.initList = function () {
  enyo.kind({
    name: "XV.IceCreamFlavorList",
    kind: "XV.List",
    label: "_iceCreamFlavors".loc(),
    collection: "XM.IceCreamFlavorCollection",
    query: {orderBy: [
      {attribute: 'name'}
    ]},
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "short",
            components: [
            {kind: "XV.ListAttr", attr: "name", isKey: true},
            {kind: "XV.ListAttr", attr: "description"}
          ]},
          {kind: "XV.ListColumn", classes: "last", fit: true, components: [
            {kind: "XV.ListAttr", attr: "calories"}
          ]}
        ]}
      ]}
    ]
  });
};
