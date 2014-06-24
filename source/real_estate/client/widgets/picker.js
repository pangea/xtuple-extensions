(function() {
  // .........................................................
  // LEASE TYPE
  //
  
  enyo.kind({
    name: "XV.LeaseTypePicker",
    kind: "XV.PickerWidget",
    collection: "XM.leaseTypes"
  });

  // .........................................................
  // UNITS CATEGORY
  //

  enyo.kind({
    name: "XV.UnitsCategoryPicker",
    kind: "XV.PickerWidget",
    collection: "XM.unitCategories"
  });

  // .........................................................
  // LEASES REASON FOR LEAVING
  //

  enyo.kind({
    name: "XV.LeasesReasonForLeavingPicker",
    kind: "XV.PickerWidget",
    collection: "XM.leaseReasonsForLeaving"
  });

  // .........................................................
  // LEASES STATUS
  //

  enyo.kind({
    name: "XV.LeasesStatusPicker",
    kind: "XV.PickerWidget",
    collection: "XM.leaseStatuses"
  });  

  // .........................................................
  // LEASES PUBLIC ASSISTANCE PROGRAM
  //

  enyo.kind({
    name: "XV.LeasesPublicAssistanceProgramPicker",
    kind: "XV.PickerWidget",
    collection: "XM.leasePublicAssistancePrograms"
  });  

}());
