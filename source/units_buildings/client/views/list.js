XT.extensions.unitsBuildings.initList = function () {
  enyo.kind({
    name: "XV.PangeaUnitList",
    kind: "XV.List",
    label: "_pangeaUnit".loc(),
    collection: "XM.PangeaUnitCollection",
    query: {orderBy: [
      {attribute: 'unitName'}
    ]},
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "short",
            components: [
            {kind: "XV.ListAttr", attr: "unitName", isKey: true},
            {kind: "XV.ListAttr", attr: "id"},
            {kind: "XV.ListAttr", attr: "buildingId"}
          ]}
        ]}
      ]}
    ]
  });
};
