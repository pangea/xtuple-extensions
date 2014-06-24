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

  // unit categories
  var unitCategoryJson = [
    { id: "Residential", name: "_residential".loc() },
    { id: "Commercial", name: "_commercial".loc() }
  ];
  XM.UnitCategoryModel = Backbone.Model.extend({
  });
  XM.UnitCategoryCollection = Backbone.Collection.extend({
    model: XM.UnitCategoryModel
  });
  XM.unitCategories = new XM.UnitCategoryCollection();
  for (i = 0; i < unitCategoryJson.length; i++) {
    var unitCategory = new XM.UnitCategoryModel(unitCategoryJson[i]);
    XM.unitCategories.add(unitCategory);
  }

  // Lease Reasons For Leaving
  var leaseReasonForLeavingJson = [
    { id: "DECEASED", name: "_deceased".loc() },
    { id: "EVICTION_INHERITED", name: "_evictionInherited".loc() },
    { id: "EVICTION_ORGANIC", name: "_evictionOrganic".loc() },
    { id: "MOVED TO OTHER PANGEA UNIT", name: "_movedToOtherPangeaUnit".loc() },
    { id: "NEVER MOVED IN", name: "_neverMovedIn".loc() },
    { id: "NO CONTACT INFO", name: "_noContactInfo".loc() },
    { id: "Pangea_CCC_Check", name: "_pangeaCCCCheck".loc() },
    { id: "Pangea_EVC_Check", name: "_pangeaEVCCheck".loc() },
    { id: "Pangea_Other", name: "_pangeaOther".loc() },
    { id: "Pangea_Sold_BLDG", name: "_pangeaSoldBldg".loc() },
    { id: "Pangea_Tenant In Violation", name: "_pangeaTenantInViolation".loc() },
    { id: "Pangea_Unstable Bldg Departure", name: "_pangeaUnstableBldgDeparture".loc() },
    { id: "Tenant Move Out/Unsatisfied", name: "_tenantMoveOutUnsatisfied".loc() },
    { id: "Tenant_Change of Income", name: "_tenantChangeOfIncome".loc() },
    { id: "Tenant_Family_Situation", name: "_tenantFamilySituation".loc() },
    { id: "Tenant_Found_Another_APT", name: "_tenantFoundAnotherApt".loc() },
    { id: "Tenant_Lost Job", name: "_tenantLostJob".loc() },
    { id: "Tenant_Must Move Out Of City", name: "_tenantMustMoveOutOfCity".loc() },
    { id: "Tenant_Purchased Home", name: "_tenantPurchasedHome".loc() },
    { id: "Tenant_Unsatisfied_Maintenance", name: "_tenantUnsatisfiedMaintenance".loc() },
    { id: "Tenant_Unsatisfied_Neighbors", name: "_tenantUnsatisfiedNeighbors".loc() },
    { id: "Tenant_Unsatisfied_PM", name: "_tenantUnsatisfiedPM".loc() },
    { id: "Tenant_Unsatisfied_Rent Increase", name: "_tenantUnsatisfiedRentIncrease".loc() },
    { id: "Tenant_Unsatisfied_Safety", name: "_tenantUnsatisfiedSafety".loc() },
    { id: "Unable To Reach Tenant", name: "_unableToReachTenant".loc() }
  ];
  XM.LeaseReasonForLeavingModel = Backbone.Model.extend({
  });
  XM.LeaseReasonForLeavingCollection = Backbone.Collection.extend({
    model: XM.LeaseReasonForLeavingModel
  });
  XM.leaseReasonsForLeaving = new XM.LeaseReasonForLeavingCollection();
  for (i = 0; i < leaseReasonForLeavingJson.length; i++) {
    var leaseReasonForLeaving = new XM.LeaseReasonForLeavingModel(leaseReasonForLeavingJson[i]);
    XM.leaseReasonsForLeaving.add(leaseReasonForLeaving);
  }

  // Lease Statuses
  var leaseStatusJson = [
    { id: "Active", name: "_active".loc() },
    { id: "Eviction", name: "_eviction".loc() },
    { id: "Terminated", name: "_terminated".loc() }
  ];
  XM.LeaseStatusModel = Backbone.Model.extend({
  });
  XM.LeaseStatusCollection = Backbone.Collection.extend({
    model: XM.LeaseStatusModel
  });
  XM.leaseStatuses = new XM.LeaseStatusCollection();
  for (i = 0; i < leaseStatusJson.length; i++) {
    var leaseStatus = new XM.LeaseStatusModel(leaseStatusJson[i]);
    XM.leaseStatuses.add(leaseStatus);
  }

  // Lease Public Assistance Programs
  var leasePublicAssistanceProgramJson = [
    { id: "Other", name: "_other".loc() },
    { id: "Oak Park Rental Assistance", name: "_oakParkRentalAssistance".loc() },
    { id: "HACC", name: "_HACC".loc() },
    { id: "FeatherFist", name: "_featherFist".loc() },
    { id: "Chicago Dept of Human Svcs", name: "_chicagoDeptOfHumanSvcs".loc() },
    { id: "Heartland Alliance", name: "_heartlandAlliance".loc() },
    { id: "Catholic Charities", name: "_catholicCharities".loc() },
    { id: "Inner Voice", name: "_innerVoice".loc() },
    { id: "CCHC", name: "_CCHC".loc() },
    { id: "DFSS", name: "_DFSS".loc() },
    { id: "HAP", name: "_HAP".loc() },
    { id: "AFC Housing", name: "_AFCHousing".loc() },
    { id: "Pathways", name: "_pathways".loc() },
    { id: "Thresholds", name: "_thresholds".loc() },
    { id: "Park Forest Housing", name: "_parkForestHousing".loc() },
    { id: "Maywood Housing Authority", name: "_maywoodHousingAuthority".loc() },
    { id: "Section 8_IHA", name: "_section8IHA".loc() },
    { id: "Section 8_HABC", name: "_section8HABC".loc() },
    { id: "Unity Parenting", name: "_unityParenting".loc() },
    { id: "Low Income Housing Trust Fund", name: "_lowIncomeHousingTrustFund".loc() },
    { id: "TIP", name: "_TIP".loc() },
    { id: "DOWE", name: "_DOWE".loc() },
    { id: "Kaleidoscope Subsidy", name: "_kaleidoscopeSubsidy".loc() },
    { id: "Casa Central", name: "_casaCentral".loc() },
    { id: "Inter Faith", name: "_interFaith".loc() },
    { id: "HIP Program", name: "_HIPProgram".loc() },
    { id: "Chesapeake Connection", name: "_chesapeakeConnection".loc() },
    { id: "Housing Opportunity For Women", name: "_housingOpportunityForWomen".loc() },
    { id: "Beacon Therapeutic Homeless Services", name: "_beaconTherapeuticHomelessServices".loc() },
    { id: "Youth Outreach", name: "_youthOutreach".loc() },
    { id: "Williams Decree", name: "_williamDecree".loc() },
    { id: "Lawrence Hall Youth Services", name: "_lawrenceHallYouthServices".loc() },
    { id: "Children Bureau Inc.", name: "_childrenBureauInc".loc() },
    { id: "Project Plase", name: "_projectPlase".loc() },
    { id: "Metropolitan Family Services", name: "_metropolitanFamilyServices".loc() },
    { id: "Section 8", name: "_section8".loc() },
    { id: "SCRIE", name: "_SCRIE".loc() },
    { id: "TIC", name: "_TIC".loc() },
    { id: "Rent Control", name: "_rentControl".loc() },
    { id: "EDEN INC. - Shelter Care Plus", name: "_EDENIncShelterCarePlus".loc() },
    { id: "CLC", name: "_CLC".loc() },
    { id: "DHAP", name: "_DHAP".loc() },
    { id: "FEMA", name: "_FEMA".loc() },
    { id: "Harris County", name: "_harrisCounty".loc() }
  ];
  XM.LeasePublicAssistanceProgramModel = Backbone.Model.extend({
  });
  XM.LeasePublicAssistanceProgramCollection = Backbone.Collection.extend({
    model: XM.LeasePublicAssistanceProgramModel
  });
  XM.leasePublicAssistancePrograms = new XM.LeasePublicAssistanceProgramCollection();
  for (i = 0; i < leasePublicAssistanceProgramJson.length; i++) {
    var leasePublicAssistanceProgram = new XM.LeasePublicAssistanceProgramModel(leasePublicAssistanceProgramJson[i]);
    XM.leasePublicAssistancePrograms.add(leasePublicAssistanceProgram);
  }

}());
