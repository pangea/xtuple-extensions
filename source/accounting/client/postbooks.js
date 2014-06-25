(function() {
  "use strict";
  
  XT.extensions.accounting.initPostbooks = function() {
    var module = {
        name: XT.extensions.billing.name,
        label: "_accounting".loc(),
        panels: [
          {name: "billing_customerList", kind: "XV.CustomerList"},
          {name: "invoiceList", kind: "XV.InvoiceList"},
          {name: "returnList", kind: "XV.ReturnList"},
          {name: "receivableList", kind: "XV.ReceivableList"},
          {name: "cashReceiptList", kind: "XV.CashReceiptList"}
        ]
      },
      relevantPrivileges = [
        "ApplyARMemos",
        "ConfigureAR",
        "CreateNewCurrency",
        "DeleteItemMasters",
        "EditAROpenItem",
        "MaintainBankAccounts",
        "MaintainCashReceipts",
        "MaintainCreditMemos",
        "MaintainCurrencies",
        "MaintainCustomerEmailProfiles",
        "MaintainCustomerMasters",
        "MaintainCustomerGroups",
        "MaintainIncidentCategories",
        "MaintainItemMasters",
        "MaintainItemGroups",
        "MaintainMiscInvoices",
        "MaintainReasonCodes",
        "MaintainSalesCategories",
        "MaintainShipVias",
        "MaintainTerms",
        "OverrideTax",
        "PostARDocuments",
        "PostCashReceipts",
        "PostMiscInvoices",
        "PrintCreditMemos",
        "PrintInvoices",
        "ViewAROpenItems",
        "ViewCashReceipts",
        "ViewCreditMemos",
        "ViewCustomerMasters",
        "ViewCustomerGroups",
        "ViewItemMasters",
        "ViewMiscInvoices",
        "ViewSalesCategories",
        "ViewShipVias",
        "VoidPostedARCreditMemos",
        "VoidPostedCashReceipts",
        "VoidPostedInvoices"
      ],
      configuration = {
        model: "XM.billing",
        name: "_billing".loc(),
        description: "_billingDescription".loc(),
        workspace: "XV.BillingWorkspace"
      },
      salesPanels,
      setupPanels = [
        {name: "bankAccountList", kind: "XV.BankAccountList"},
        {name: "customerEmailProfileList", kind: "XV.CustomerEmailProfileList"},
        {name: "fileList", kind: "XV.FileList"},
        {name: "itemList", kind: "XV.ItemList"},
        {name: "itemGroupList", kind: "XV.ItemGroupList"},
        {name: "reasonCodeList", kind: "XV.ReasonCodeList"},
        {name: "salesCategoryList", kind: "XV.SalesCategoryList"},
        {name: "termsList", kind: "XV.TermsList"}
      ];

    XT.app.$.postbooks.appendPanels("setup", setupPanels);
    if (XT.extensions.sales) {
      salesPanels = [
        {name: "sales_invoiceList", kind: "XV.InvoiceList"}
      ];
      XT.app.$.postbooks.appendPanels("sales", salesPanels);
    }

    XM.configurations.add(new XM.ConfigurationModel(configuration));
    XT.app.$.postbooks.insertModule(module, 0);
    XT.session.addRelevantPrivileges(XT.extensions.billing.name, relevantPrivileges);
  };

}());
/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true, strict:false*/
/*global XT:true, XV:true, XM:true, enyo:true*/

(function () {

  XT.extensions.purchasing.initPostbooks = function () {
    var module, panels, relevantPrivileges;

    // ..........................................................
    // APPLICATION
    //
    panels = [
      {name: "honorificList", kind: "XV.HonorificList"},
      {name: "expenseCategoryList", kind: "XV.ExpenseCategoryList"},  
      {name: "itemList", kind: "XV.ItemList"},
      {name: "itemGroupList", kind: "XV.ItemGroupList"},
      {name: "classCodeList", kind: "XV.ClassCodeList"},
      {name: "unitList", kind: "XV.UnitList"},
      {name: "stateList", kind: "XV.StateList"},
      {name: "countryList", kind: "XV.CountryList"},
      {name: "purchaseEmailProfileList", kind: "XV.PurchaseEmailProfileList"},
      {name: "purchaseTypeList", kind: "XV.PurchaseTypeList"}
    ];

    XT.app.$.postbooks.appendPanels("setup", panels);

    module = {
      name: "purchasing",
      label: "_purchasing".loc(),
      panels: [
        {name: "ItemSourceList", kind: "XV.ItemSourceList"},
        {name: "purchaseOrderList", kind: "XV.PurchaseOrderList"},
        {name: "activityList", kind: "XV.ActivityList"}
      ]
    };
    XT.app.$.postbooks.insertModule(module, 0);

    relevantPrivileges = [
      "EditOthersComments",
      "EditOwnComments",
      "DeleteItemMasters",
      "MaintainAddresses",
      "MaintainCommentTypes",
      "MaintainCountries",
      "MaintainClassCodes",
      "MaintainExpenseCategories",
      "MaintainTitles",
      "MaintainItemGroups",
      "MaintainItemMasters",
      "MaintainPurchaseEmailProfiles",
      "MaintainPurchaseTypes",
      "MaintainPurchaseOrders",
      "MaintainStates",
      "MaintainUOMs",
      "ViewClassCodes",
      "ViewItemMasters",
      "ViewPurchaseOrders",
      "ViewUOMs",
      "ViewTitles",
    ];
    XT.session.addRelevantPrivileges(module.name, relevantPrivileges);

    XM.configurations.add(new XM.ConfigurationModel({
      model: "XM.purchasing",
      name: "_purchasing".loc(),
      description: "_purchasing".loc(),
      workspace: "XV.PurchasingWorkspace"
    }));

  };
}());
