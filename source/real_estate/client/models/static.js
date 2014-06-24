(function () {
  "use strict";

  // These are hard coded collections that may be turned into tables at a later date
  var i,
    K;

  // Lease Type
  var leaseTypeJson = [
    { id: "Residential", name: "_residential".loc() },
    { id: "Commercial", name: "_commercial".loc() }
  ];
  XM.LeaseTypeModel = Backbone.Model.extend({
  });
  XM.LeaseTypeCollection = Backbone.Collection.extend({
    model: XM.LeaseTypeModel
  });
  XM.leaseTypes = new XM.LeaseTypeCollection();
  for (i = 0; i < leaseTypeJson.length; i++) {
    var leaseType = new XM.LeaseTypeModel(leaseTypeJson[i]);
    XM.leaseTypes.add(leaseType);
  }

}());
