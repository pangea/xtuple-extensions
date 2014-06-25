(function () {

  XT.extensions.billing.initWorkspaces = function () {

    // ..........................................................
    // CONFIGURE
    //

    enyo.kind({
      name: "XV.BillingWorkspace",
      kind: "XV.Workspace",
      title: "_configure".loc() + " " + "_billing".loc(),
      model: "XM.Billing",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.NumberWidget", attr: "NextARMemoNumber",
                label: "_nextARMemoNumber".loc(), formatting: false},
              {kind: "XV.NumberWidget", attr: "NextCashRcptNumber",
                label: "_nextCashRcptNumber".loc(), formatting: false},
              {kind: "XV.ToggleButtonWidget", name: "hideApplyToBalance", attr: "HideApplyToBalance",
                label: "_hideApplyToBalance".loc()},
              {kind: "XV.ToggleButtonWidget", attr: "EnableCustomerDeposits",
                label: "_enableCustomerDeposits".loc()},
              {kind: "XV.ToggleButtonWidget", attr: "CreditTaxDiscount",
                label: "_creditTaxDiscount".loc(), formatting: false},
              {kind: "XV.AddressFieldsWidget",
                name: "address", attr:
                {name: "remitto_name", line1: "remitto_address1",
                  line2: "remitto_address2", line3: "remitto_address3",
                  city: "remitto_city", state: "remitto_state",
                  postalCode: "remitto_zipcode", country: "remitto_country"}
              },
              {kind: "XV.InputWidget", attr: "remitto_phone",
                label: "_phone".loc(), formatting: false},
              {kind: "XV.ToggleButtonWidget", attr: "AutoCreditWarnLateCustomers",
                label: "_autoCreditWarnLateCustomers".loc()},
              {kind: "XV.NumberSpinnerWidget", attr: "DefaultAutoCreditWarnGraceDays",
                label: "_defaultAutoCreditWarnGraceDays".loc()},
              {kind: "XV.NumberSpinnerWidget", attr: "RecurringInvoiceBuffer",
                label: "_recurringInvoiceBuffer".loc()},
              {kind: "XV.IncidentCategoryPicker", attr: "DefaultARIncidentStatus",
                label: "_defaultARIncidentStatus".loc()},
              {kind: "XV.ToggleButtonWidget", attr: "AutoCloseARIncident",
                label: "_autoCloseARIncident".loc()}
            ]}
          ]}
        ]}
      ]
    });
  };

  // ..........................................................
  // RECEIVABLE
  //
  enyo.kind({
    name: "XV.ReceivableWorkspace",
    kind: "XV.Workspace",
    title: "_receivable".loc(),
    model: "XM.Receivable",
    view: 'XM.ReceivableView',
    events: {
      onPrint: ""
    },
    components: [
      {kind: "Panels", arrangerKind: "CarouselArranger",
        fit: true, components: [
        {kind: "XV.Groupbox", name: "mainPanel", components: [
          {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
          {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
            classes: "in-panel", components: [
            {kind: "XV.SalesCustomerWidget", attr: "customer"},
            {kind: "XV.DateWidget", attr: "documentDate"},
            {kind: "XV.DateWidget", attr: "dueDate"},
            {kind: "XV.ReceivableTypePicker", attr: "documentType"},
            {kind: "XV.InputWidget", attr: "documentNumber"},
            {kind: "XV.InputWidget", attr: "orderNumber"},
            {kind: "XV.ReasonCodePicker", name: "reasonCodePicker", attr: "reasonCode", documentType: null},
            {kind: "onyx.GroupboxHeader", content: "_notes".loc()},
            {kind: "XV.TextArea", attr: "notes"},
            {kind: "onyx.GroupboxHeader", content: "_options".loc()},
            {kind: "XV.StickyCheckboxWidget", label: "_printOnPost".loc(),
              name: "printOnPost"}
          ]}
        ]},
        {kind: "XV.Groupbox", name: "settingsPanel", title: "_settings".loc(),
          components: [
          {kind: "onyx.GroupboxHeader", content: "_settings".loc()},
          {kind: "XV.ScrollableGroupbox", name: "settingsGroup", fit: true,
            classes: "in-panel", components: [
            {kind: "XV.BillingTermsPicker", attr: "terms"},
            {kind: "XV.SalesRepPicker", attr: "salesRep"},
            {kind: "XV.MoneyWidget",
              attr: {localValue: "amount", currency: "currency"},
              label: "_amount".loc(), effective: "documentDate"},
            {kind: "XV.MoneyWidget", attr: {localValue: "paid", currency: "currency"},
              label: "_paid".loc(), effective: "documentDate", currencyDisabled: true},
            {kind: "XV.MoneyWidget", attr: {localValue: "balance", currency: "currency"},
              label: "_balance".loc(), effective: "documentDate", currencyDisabled: true},
            {kind: "XV.MoneyWidget", attr: {localValue: "commission", currency: "currency"},
              label: "_commission".loc(), effective: "documentDate", currencyDisabled: true},
            // TODO: Move this under taxes
            {kind: "XV.MoneyWidget", attr: {localValue: "taxTotal"},
              label: "_taxTotal".loc(), name: "taxTotal", currencyShowing: false},
          ]}
        ]},
        {kind: "XV.ReceivableTaxBox", name: "taxes", attr: "taxes", title: "_taxes".loc()},
        {kind: "XV.ReceivableApplicationsListRelationsBox", attr: "applications", title: "_applications".loc()}
      ]}
    ],

    /**
      @see XM.ReceivableView
      @listens XM.ReceivableView#events
    */
    handlers: {
      onStatusChange: "statusChanged"
    },

    /**
      Only show taxes when the Receivable is not an invoice.

      Set DocumentType field on the ReasonCodePicker to handle
        filtering of ReasonCodes.
    */
    attributesChanged: function (model, options) {
      this.inherited(arguments);
      var documentType = this.value.get("documentType");
      if (!documentType) {
        return;
      }

      var isInvoice = documentType === XM.Receivable.INVOICE;
      this.$.taxTotal.setShowing(!isInvoice);
      this.$.taxes.setShowing(!isInvoice);

      if (documentType === XM.Receivable.CREDIT_MEMO) {
        this.$.reasonCodePicker.setDocumentType(XM.ReasonCode.CREDIT_MEMO);
      } else if (documentType === XM.Receivable.DEBIT_MEMO) {
        this.$.reasonCodePicker.setDocumentType(XM.ReasonCode.DEBIT_MEMO);
      }
    },

    /**
      The saveText property on the workspace will be 'Post' when
      the status of the object is READY_NEW and 'Save' for any other status.

      When the model is in a READY_NEW state a checkbox is visible
      that provides the option to 'Print on Post.'
    */
    statusChanged: function (inSender, inEvent) {
      var isNew = this.value.getStatus() === XM.Model.READY_NEW;
      if (isNew) {
        this.setSaveText("_post".loc());
      }
      this.$.printOnPost.setShowing(isNew);
    },

    /**
      When 'Print on Post' is checked,
      a standard form should be printed when posting.
    */
    save: function (options) {
      if (this.$.printOnPost.isChecked()) {
        this.doPrint();
      }
      this.inherited(arguments);
    }
  });

  XV.registerModelWorkspace("XM.Receivable", "XV.ReceivableWorkspace");
  XV.registerModelWorkspace("XM.ReceivableListItem", "XV.ReceivableWorkspace");

  enyo.kind({
    name: 'XV.SalesCategoryWorkspace',
    kind: 'XV.Workspace',
    view: 'XM.SalesCategoryView',
    title: '_salesCategory'.loc(),

    components: [
      {kind: 'Panels', arrangerKind: 'CarouselArranger',
        fit: true, components: [
        {kind: 'XV.Groupbox', name: 'mainPanel', components: [
          {kind: 'onyx.GroupboxHeader', content: '_overview'.loc()},
          {kind: 'XV.ScrollableGroupbox', name: 'mainGroup',
            classes: 'in-panel', components: [
            {kind: 'XV.InputWidget', attr: 'name'},
            {kind: 'XV.InputWidget', attr: 'description'},
            {kind: 'XV.CheckboxWidget', name: 'isActive', attr: 'isActive', disabled: true}
          ]}
        ]}
      ]}
    ],

    /**
     * @see XM.SalesCategoryView
     * @listens XM.SalesCategoryView#events
     */
    handlers: {
      onCanDeactivateChange: 'canDeactivateChanged',
      onModelReadyClean:     'modelReady'
    },

    /**
     * @listens onModelReadyClean
     */
    modelReady: function (inSender, inEvent) {
      if (this.value.get('isActive')) {
        inEvent.result.canDeactivate();
      }
      else {
        this.$.isActive.setDisabled(!this.value.canEdit('isActive'));
      }

      return true;
    },

    /**
     * @listens onCanDeactivateChange
     */
    canDeactivateChanged: function (inSender, canDeactivate) {
      this.$.isActive.setDisabled(!canDeactivate);

      return true;
    }
  });

  XV.registerModelWorkspace('XM.SalesCategory', 'XV.SalesCategoryWorkspace');

  /**
   * @class XV.CashReceiptWorkspace
   * @extends XV.Workspace
   * @presents XM.CashReceiptView
   */
  enyo.kind({
    name: 'XV.CashReceiptWorkspace',
    kind: 'XV.Workspace',
    view: 'XM.CashReceiptView',
    model: 'XM.CashReceipt',
    title: '_cashReceipt'.loc(),
    components: [
      {kind: 'Panels', arrangerKind: 'CarouselArranger',
          fit: true, components: [
        {kind: 'XV.Groupbox', name: 'mainPanel', components: [
          {kind: 'onyx.GroupboxHeader', content: '_overview'.loc()},
          {kind: 'XV.ScrollableGroupbox', name: 'mainGroup',
              classes: 'in-panel', components: [
            {kind: 'XV.InputWidget', attr: 'number'},
            {kind: 'XV.CheckboxWidget', attr: 'isPosted', label: '_posted'.loc()},
            {kind: 'XV.SalesCustomerWidget', attr: 'customer'},
            {kind: 'XV.BankAccountWidget', attr: 'bankAccount'},
            {kind: 'XV.FundsTypePicker', attr: 'fundsType', onSelect: 'fundsTypeSelected'},
            {kind: 'XV.CashReceiptApplyOptionsPicker',
              attr: 'useCustomerDeposit',
              onSelect: 'applyOptionSelected'
            },
            {tag: 'hr'},
            {kind: 'XV.DateWidget', attr: 'documentDate'},
            {kind: 'XV.DateWidget', attr: 'distributionDate'},
            {kind: 'XV.DateWidget', attr: 'applicationDate'},
            {tag: 'hr'},
            {kind: 'XV.MoneyWidget',
              name: 'balance',
              label: '_balance'.loc(),
              attr: { localValue: 'balance', currency: 'currency' },
              disableCurrency: true
            },
            {kind: 'XV.MoneyWidget',
              label: '_amount'.loc(),
              attr: { localValue: 'amount', currency: 'currency' },
              disableCurrency: true
            },
            {kind: 'XV.MoneyWidget',
              label: '_appliedAmount'.loc(),
              attr: { localValue: 'appliedAmount', currency: 'currency' },
              disableCurrency: true
            },
            {kind: 'onyx.GroupboxHeader', content: '_notes'.loc()},
            {kind: 'XV.TextArea', attr: 'notes'},
          ]}
        ]},
        {kind: 'XV.CashReceiptApplicationsBox', attr: 'lineItems'},
        {kind: 'XV.CreditCardBox', attr: 'customer.creditCards'}
      ]}
    ],

    /**
     * @see XM.CashReceiptView
     * @fires XM.CashReceiptView#events
     */
    handlers: {
      onDateChange: 'dateChanged',
      onBalanceChange: 'balanceChanged',
      newItem: 'newCashReceiptLineTapped'
    },

    newCashReceiptLineTapped: function (inSender, inEvent) {
      this.log(inEvent);
    },

    /**
     * @listens onBalanceChange
     */
    balanceChanged: function (inSender, inEvent) {
      this.$.balance.addRemoveClass('xv-balance-negative', this.value.get('balance') < 0);
    },

    /**
     * @listens onDateChange
     */
    dateChanged: function (inSender, inEvent) {
      // XXX also the DateWidget is broken and is mangling the dates. there seems
      // to be an off-by-one error in both directions, maybe it's a timezone issue.
      // #bug
      //
      // XXX I don't think this code makes sense. I need to revisit the spec
      // and figure out what's going on here
      /*
      if (moment(this.value.get('distributionDate'))
          .isBefore(this.value.get('applicationDate'))) {
        this.$.fundsTypePicker.setLabel('_recordReceiptAs'.loc());
      }
      else {
        this.$.fundsTypePicker.setLabel('_applyBalanceAs'.loc());
      }
      */
    }

  });

  XV.registerModelWorkspace('XM.CashReceipt', 'XV.CashReceiptWorkspace');
  XV.registerModelWorkspace('XM.CashReceiptRelation', 'XV.CashReceiptWorkspace');
  XV.registerModelWorkspace('XM.CashReceiptListItem', 'XV.CashReceiptWorkspace');

  /**
   * @class XV.CashReceiptReceivableWorkspace
   * @extends XV.Workspace
   * @presents XM.CashReceiptView
   */
  enyo.kind({
    name: 'XV.CashReceiptReceivableWorkspace',
    kind: 'XV.Workspace',
    view: 'XM.CashReceiptView',
    title: '_cashReceiptReceivable'.loc(),

    components: [
      {kind: 'Panels', arrangerKind: 'CarouselArranger',
          fit: true, components: [
        {kind: 'XV.Groupbox', name: 'mainPanel', components: [
          {kind: 'onyx.GroupboxHeader', content: '_overview'.loc()},
          {kind: 'XV.ScrollableGroupbox', name: 'mainGroup',
              classes: 'in-panel', components: [
            {kind: 'XV.InputWidget', attr: 'number'}
          ]}
        ]}
      ]}
    ]
  });

  XV.registerModelWorkspace('XM.CashReceiptLineListItem', 'XV.CashReceiptReceivableWorkspace');

}());
/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true, strict: false*/
/*global XT:true, XM:true, XV:true, enyo:true, Globalize: true, _:true*/

(function () {

  XT.extensions.purchasing.initWorkspaces = function () {

    var preferencesExtensions = [
      {kind: "XV.SitePicker", container: "mainGroup", attr: "PreferredWarehouse",
        label: "_defaultSite".loc() }
    ];
    XV.appendExtension("XV.UserPreferenceWorkspace", preferencesExtensions);

    // ..........................................................
    // CHARACTERISTIC
    //

    var extensions = [
      {kind: "XV.ToggleButtonWidget", attr: "isPurchaseOrders",
        label: "_purchaseOrders".loc(), container: "rolesGroup"},
    ];

    XV.appendExtension("XV.CharacteristicWorkspace", extensions);

    // ..........................................................
    // CONFIGURE
    //

    /* TODO:
      "BillDropShip",
      "EnableDropShipments",
      "NextVoucherNumber"
    */
    enyo.kind({
      name: "XV.PurchasingWorkspace",
      kind: "XV.Workspace",
      title: "_configure".loc() + " " + "_purchasing".loc(),
      model: "XM.Purchasing",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "onyx.GroupboxHeader", content: "_vendor".loc()},
              {kind: "XV.InputWidget", attr: "DefaultPOShipVia",
                label: "_defaultShipVia".loc()},
              {kind: "XV.ToggleButtonWidget", attr: "VendorChangeLog",
                label: "_changeLog".loc()},
              {kind: "onyx.GroupboxHeader", content: "_purchaseOrder".loc()},
              {kind: "XV.NumberPolicyPicker", attr: "PONumberGeneration",
                label: "_number".loc() + " " + "_policy".loc()},
              {kind: "XV.NumberWidget", attr: "NextPurchaseOrderNumber",
                label: "_nextNumber".loc(), formatting: false},
              {kind: "XV.ToggleButtonWidget", attr: "POChangeLog",
                label: "_changeLog".loc()},
              {kind: "XV.ToggleButtonWidget", attr: "RequireStdCostForPOItem"},
              {kind: "XV.ToggleButtonWidget", attr: "DefaultPrintPOOnSave"},
              {kind: "XV.ToggleButtonWidget", attr: "UseEarliestAvailDateOnPOItem"},
              {kind: "XV.ToggleButtonWidget", attr: "RequirePOTax"},
              {kind: "onyx.GroupboxHeader", content: "_purchaseRequest".loc()},
              {kind: "XV.NumberPolicyPicker", attr: "PrNumberGeneration",
                label: "_number".loc() + " " + "_policy".loc()},
              {kind: "XV.NumberWidget", attr: "NextPurchaseRequestNumber",
                label: "_nextNumber".loc(), formatting: false},
              {kind: "XV.ToggleButtonWidget", attr: "CopyPRtoPOItem"}
            ]}
          ]}
        ]}
      ]
    });

    // ..........................................................
    // ITEM
    //

    extensions = [
      {kind: "onyx.GroupboxHeader", content: "_purchasing".loc(),
        container: "settingsGroup"},
      {kind: "XV.PurchasePriceWidget", attr: "maximumDesiredCost",
        container: "settingsGroup"}
    ];

    XV.appendExtension("XV.ItemWorkspace", extensions);

    // ..........................................................
    // ITEM SITE
    //

    extensions = [
      {kind: "XV.Groupbox", name: "supplyPanel", title: "_supply".loc(),
        fit: true, components: [
        {kind: "onyx.GroupboxHeader", content: "_supply".loc()},
        {kind: "XV.CheckboxWidget", attr: "isPurchased", name: "isPurchased"}
      ], container: "panels"}
    ];

    XV.appendExtension("XV.ItemSiteWorkspace", extensions);

    // ..........................................................
    // ITEM SOURCE
    //

    enyo.kind({
      name: "XV.ItemSourceWorkspace",
      kind: "XV.Workspace",
      title: "_itemSource".loc(),
      model: "XM.ItemSource",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup",
              classes: "in-panel", fit: true, components: [
              {kind: "XV.ItemWidget", attr: "item"},
              {kind: "XV.VendorWidget", attr: "vendor"},
              {kind: "XV.CheckboxWidget", attr: "isActive"},
              {kind: "XV.CheckboxWidget", attr: "isDefault"},
              {kind: "XV.QuantityWidget", attr: "multipleOrderQuantity"},
              {kind: "XV.QuantityWidget", attr: "minimumOrderQuantity"},
              {kind: "XV.NumberSpinnerWidget", attr: "leadTime"},
              {kind: "XV.NumberSpinnerWidget", attr: "ranking"},
              {kind: "XV.DateWidget", attr: "effective",
                nullValue: XT.date.startOfTime(),
                nullText: "_always".loc()},
              {kind: "XV.DateWidget", attr: "expires",
                nullValue: XT.date.endOfTime(),
                nullText: "_never".loc()},
              {kind: "onyx.GroupboxHeader", content: "_notes".loc()},
              {kind: "XV.TextArea", attr: "notes", label: "_notes".loc()},
            ]}
          ]},
          {kind: "XV.Groupbox", name: "vendorPanel", title: "_vendor".loc(), components: [
            {kind: "onyx.GroupboxHeader", content: "_vendor".loc()},
            {kind: "XV.ScrollableGroupbox", name: "vendorGroup",
              classes: "in-panel", fit: true, components: [
              {kind: "XV.InputWidget", attr: "vendorItemNumber", label: "_number".loc()},
              {kind: "XV.UnitCombobox", attr: "vendorUnit", label: "_unit".loc(), showLabel: true},
              {kind: "XV.UnitRatioWidget", attr: "vendorUnitRatio", label: "_unitRatio".loc()},
              {kind: "XV.InputWidget", attr: "barcode"},
              {kind: "onyx.GroupboxHeader", content: "_description".loc()},
              {kind: "XV.TextArea", attr: "vendorItemDescription", label: "_description".loc()},
              {kind: "onyx.GroupboxHeader", content: "_manufacturer".loc()},
              {kind: "XV.ItemSourceManufacturerCombobox", attr: "manufacturerName", label: "_name".loc()},
              {kind: "XV.InputWidget", attr: "manufacturerItemNumber", label: "_number".loc()},
              {kind: "onyx.GroupboxHeader", content: "_description".loc()},
              {kind: "XV.TextArea", attr: "manufacturerItemDescription", fit: true}
            ]}
          ]},
          {kind: "XV.ItemSourcePriceBox", attr: "prices"}
        ]}
      ]
    });

    XV.registerModelWorkspace("XM.ItemSource", "XV.ItemSourceWorkspace");

    // TODO

    // ..........................................................
    // PURCHASE EMAIL PROFILE
    //

    enyo.kind({
      name: "XV.PurchaseEmailProfileWorkspace",
      kind: "XV.EmailProfileWorkspace",
      title: "_purchaseEmailProfile".loc(),
      model: "XM.PurchaseEmailProfile",
    });

    XV.registerModelWorkspace("XM.PurchaseEmailProfile", "XV.PurchaseEmailProfileWorkspace");

    // ..........................................................
    // PURCHASE TYPE
    //

    enyo.kind({
      name: "XV.PurchaseTypeWorkspace",
      kind: "XV.Workspace",
      title: "_purchaseType".loc(),
      model: "XM.PurchaseType",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup",
              classes: "in-panel", fit: true, components: [
              {kind: "XV.InputWidget", attr: "code"},
              {kind: "XV.CheckboxWidget", attr: "isActive"},
              {kind: "XV.InputWidget", attr: "description"},
              {kind: "XV.PurchaseEmailProfilePicker", attr: "emailProfile"},
              {kind: "XV.PurchaseTypeCharacteristicsWidget", attr: "characteristics"}
            ]}
          ]},
          {kind: "XV.PurchaseTypeWorkflowBox", attr: "workflow"}
        ]}
      ]
    });

    XV.registerModelWorkspace("XM.PurchaseType", "XV.PurchaseTypeWorkspace");

    // ..........................................................
    // PURCHASE ORDER
    //

    enyo.kind({
      name: "XV.PurchaseOrderWorkspace",
      kind: "XV.Workspace",
      title: "_purchaseOrder".loc(),
      model: "XM.PurchaseOrder",
      printOnSaveSetting: "DefaultPrintPOOnSave",
      headerAttrs: ["number", "-", "vendor.name"],
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.InputWidget", attr: "number"},
              {kind: "XV.DateWidget", attr: "orderDate"},
              {kind: "XV.DateWidget", attr: "releaseDate"},
              {kind: "XV.PurchaseOrderStatusPicker", attr: "status"},
              {kind: "onyx.GroupboxHeader", content: "_source".loc()},
              {kind: "XV.PurchaseVendorWidget", attr: "vendor"},
              {kind: "XV.VendorAddressWidget", attr: "vendorAddress",
                label: "_address".loc()},
              {kind: "XV.AddressFieldsWidget",
                name: "vendorAddressFieldsWidget", attr:
                {name: "vendorAddressCode",
                  line1: "vendorAddress1",
                  line2: "vendorAddress2", line3: "vendorAddress3",
                  city: "vendorCity", state: "vendorState",
                  postalCode: "vendorPostalCode", country: "vendorCountry"}
              },
              {kind: "XV.ContactWidget", attr: "vendorContact",
                name: "vendorContactWidget"},
              {kind: "onyx.GroupboxHeader", content: "_shipTo".loc()},
              {kind: "XV.SitePicker", attr: "site", showNone: false},
              {kind: "XV.AddressFieldsWidget",
                name: "destinationAddressWidget", attr:
                {line1: "shiptoAddress1",
                  line2: "shiptoAddress2", line3: "shiptoAddress3",
                  city: "shiptoCity", state: "shiptoState",
                  postalCode: "shiptoPostalCode", country: "shiptoCountry"}
              },
              {kind: "XV.ContactWidget", attr: "shiptoContact",
                name: "shiptoContactWidget"},
              {kind: "onyx.GroupboxHeader", content: "_notes".loc()},
              {kind: "XV.TextArea", attr: "notes", fit: true}
            ]}
          ]},
          {kind: "FittableRows", title: "_lineItems".loc(), name: "lineItemsPanel"},
          {kind: "XV.Groupbox", name: "settingsPanel", title: "_settings".loc(),
            components: [
            {kind: "onyx.GroupboxHeader", content: "_settings".loc()},
            {kind: "XV.ScrollableGroupbox", name: "settingsGroup",
                classes: "in-panel", fit: true, components: [
              {name: "settingsControl", components: [
                {kind: "XV.PurchaseOrderStatusPicker", attr: "status"},
                {kind: "XV.PurchaseTypePicker", attr: "purchaseType"},
                {kind: "XV.TermsPicker", attr: "terms"},
                {kind: "XV.TaxZonePicker", attr: "taxZone"},
                {kind: "XV.AgentPicker", attr: "agent"},
                {kind: "XV.InputWidget", attr: "incoterms"},
                {kind: "XV.ShipViaCombobox", attr: "shipVia"},
                {kind: "XV.PurchaseOrderCharacteristicsWidget", attr: "characteristics"},
              ]}
            ]}
          ]},
          {kind: "FittableRows", title: "_workflow".loc(), name: "workflowPanel"},
          {kind: "XV.PurchaseOrderCommentBox", attr: "comments"}
        ]}
      ],
      attributesChanged: function (inSender, inEvent) {
        this.inherited(arguments);
        this.vendorChanged();
      },
      controlValueChanged: function (inSender, inEvent) {
        this.inherited(arguments);
        if (inEvent.originator.name === "vendorWidget") {
          this.vendorChanged();
        }
      },
      create: function () {
        this.inherited(arguments);
        if (enyo.platform.touch) {
          this.$.lineItemsPanel.createComponents([
            {kind: "XV.PurchaseOrderLineBox", name: "purchaseOrderLineItemBox",
              attr: "lineItems", fit: true}
          ], {owner: this});
          this.$.workflowPanel.createComponents([
            {kind: "XV.PurchaseOrderWorkflowBox", attr: "workflow", fit: true}
          ], {owner: this});
        } else {
          this.$.lineItemsPanel.createComponents([
            {kind: "XV.PurchaseOrderLineGridBox", name: "purchaseOrderLineItemBox",
              attr: "lineItems", fit: true}
          ], {owner: this});
          this.$.workflowPanel.createComponents([
            {kind: "XV.PurchaseOrderWorkflowGridBox", attr: "workflow", fit: true}
          ], {owner: this});
        }
        this.processExtensions(true);
      },
      vendorChanged: function () {
        var vendor = this.$.purchaseVendorWidget.getValue();
        if (vendor) {
          this.$.vendorContactWidget.addParameter({
            attribute: ["account", "accountParent"],
            value: vendor.id
          }, true);

          this.$.vendorAddressWidget.setDisabled(false);
          this.$.vendorAddressWidget.addParameter({
            attribute: "vendor",
            value: vendor.id
          });
        } else {
          this.$.vendorContactWidget.removeParameter("account");
          this.$.vendorAddressWidget.setDisabled(true);
        }
      }
    });

    XV.registerModelWorkspace("XM.PurchaseOrder", "XV.PurchaseOrderWorkspace");
    XV.registerModelWorkspace("XM.PurchaseOrderWorkflow", "XV.PurchaseOrderWorkspace");
    XV.registerModelWorkspace("XM.PurchaseOrderRelation", "XV.PurchaseOrderWorkspace");
    XV.registerModelWorkspace("XM.PurchaseOrderListItem", "XV.PurchaseOrderWorkspace");

    // ..........................................................
    // PURCHASE ORDER WORKFLOW
    //

    enyo.kind({
      name: "XV.PurchaseOrderWorkflowWorkspace",
      kind: "XV.ChildWorkspace",
      title: "_purchaseOrderWorkflow".loc(),
      model: "XM.PurchaseOrderWorkflow",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          classes: "xv-top-panel", fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.InputWidget", attr: "name"},
              {kind: "XV.InputWidget", attr: "description"},
              {kind: "XV.PurchaseOrderWorkflowTypePicker", attr: "workflowType"},
              {kind: "XV.WorkflowStatusPicker", attr: "status"},
              {kind: "XV.PriorityPicker", attr: "priority", showNone: false},
              {kind: "XV.NumberSpinnerWidget", attr: "sequence"},
              {kind: "onyx.GroupboxHeader", content: "_schedule".loc()},
              {kind: "XV.DateWidget", attr: "dueDate"},
              {kind: "XV.DateWidget", attr: "startDate"},
              {kind: "XV.DateWidget", attr: "assignDate"},
              {kind: "XV.DateWidget", attr: "completeDate"},
              {kind: "onyx.GroupboxHeader", content: "_userAccounts".loc()},
              {kind: "XV.UserAccountWidget", attr: "owner"},
              {kind: "XV.UserAccountWidget", attr: "assignedTo"},
              {kind: "onyx.GroupboxHeader", content: "_notes".loc()},
              {kind: "XV.TextArea", attr: "notes", fit: true}
            ]}
          ]},
          {kind: "XV.Groupbox", name: "onCompletedPanel", title: "_completionActions".loc(),
            components: [
            {kind: "onyx.GroupboxHeader", content: "_onCompletion".loc()},
            {kind: "XV.ScrollableGroupbox", name: "completionGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.PurchaseOrderStatusPicker", attr: "completedParentStatus",
                noneText: "_noChange".loc(), label: "_nextStatus".loc()},
              {kind: "XV.DependenciesWidget",
                attr: {workflow: "parent.workflow", successors: "completedSuccessors"}}
            ]}
          ]},
          {kind: "XV.Groupbox", name: "onDeferredPanel", title: "_deferredActions".loc(),
            components: [
            {kind: "onyx.GroupboxHeader", content: "_onDeferred".loc()},
            {kind: "XV.ScrollableGroupbox", name: "deferredGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.PurchaseOrderStatusPicker", attr: "completedParentStatus",
                noneText: "_noChange".loc(), label: "_nextStatus".loc()},
              {kind: "XV.DependenciesWidget",
                attr: {workflow: "parent.workflow", successors: "deferredSuccessors"}}
            ]}
          ]}
        ]}
      ]
    });

    // ..........................................................
    // PURCHASE ORDER LINE
    //

    enyo.kind({
      name: "XV.PurchaseOrderLineWorkspace",
      kind: "XV.ChildWorkspace",
      title: "_purchaseOrderLine".loc(),
      model: "XM.PurchaseOrderLine",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          classes: "xv-top-panel", fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.InputWidget", attr: "lineNumber"},
              {kind: "XV.ItemSiteWidget", attr: {item: "item", site: "site"}},
              {kind: "XV.CheckboxWidget", attr: "isMiscellaneous"},
              {kind: "XV.ExpenseCategoryWidget", attr: "expenseCategory"},
              {kind: "XV.ProjectWidget", attr: "project"},
              {kind: "onyx.GroupboxHeader", content: "_quantity".loc()},
              {kind: "XV.QuantityWidget", attr: "quantity", label: "_ordered".loc()},
              {kind: "XV.QuantityWidget", attr: "toReceive"},
              {kind: "XV.QuantityWidget", attr: "received"},
              {kind: "XV.QuantityWidget", attr: "returned"},
              {kind: "XV.QuantityWidget", attr: "vouchered"},
              {kind: "onyx.GroupboxHeader", content: "_schedule".loc()},
              {kind: "XV.DateWidget", attr: "dueDate"},
              {kind: "onyx.GroupboxHeader", content: "_notes".loc()},
              {kind: "XV.TextArea", attr: "notes", fit: true}
            ]}
          ]},
          {kind: "XV.Groupbox", name: "pricePanel", title: "_price".loc(),
            components: [
            {kind: "onyx.GroupboxHeader", content: "_price".loc()},
            {kind: "XV.ScrollableGroupbox", name: "priceGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.MoneyWidget",
                attr: {localValue: "price", currency: "currency"},
                scale: XT.PURCHASE_PRICE_SCALE,
                label: "_unitPrice".loc(), currencyShowing: true,
                currencyDisabled: true},
              {kind: "XV.MoneyWidget",
                attr: {localValue: "extendedPrice", currency: "currency"},
                label: "_extendedPrice".loc(), currencyShowing: true,
                currencyDisabled: true},
              {kind: "XV.MoneyWidget",
                attr: {localValue: "freight", currency: "currency"},
                label: "_freight".loc(), currencyShowing: true,
                currencyDisabled: true},
              {kind: "onyx.GroupboxHeader", content: "_tax".loc()},
              {kind: "XV.TaxTypePicker", attr: "taxType"},
              {kind: "XV.MoneyWidget",
                attr: {localValue: "tax", currency: "currency"},
                scale: XT.PURCHASE_PRICE_SCALE,
                label: "_tax".loc(), currencyShowing: true,
                currencyDisabled: true},
              {kind: "XV.PurchaseOrderLineCharacteristicsWidget",
                attr: "characteristics"}
            ]}
          ]},
          {kind: "XV.Groupbox", name: "vendorPanel", title: "_itemSource".loc(),
            components: [
            {kind: "onyx.GroupboxHeader", content: "_vendor".loc()},
            {kind: "XV.ScrollableGroupbox", name: "itemSourceGroup", fit: true,
              classes: "in-panel", components: [
              {kind: "XV.ItemSourceWidget", label: "_number".loc(),
                attr: {itemSource: "itemSource", vendorItemNumber: "vendorItemNumber"}},
              {kind: "XV.InputWidget", attr: "vendorUnit", label: "_unit".loc()},
              {kind: "XV.InputWidget", attr: "vendorUnitRatio", label: "_unitRatio".loc()},
              {kind: "onyx.GroupboxHeader", content: "_description".loc()},
              {kind: "XV.TextArea", attr: "vendorItemDescription", label: "_description".loc()},
              {kind: "onyx.GroupboxHeader", content: "_manufacturer".loc()},
              {kind: "XV.ItemSourceManufacturerCombobox", attr: "manufacturerName", label: "_name".loc()},
              {kind: "XV.InputWidget", attr: "manufacturerItemNumber", label: "_itemNumber".loc()},
              {kind: "onyx.GroupboxHeader", content: "_description".loc()},
              {kind: "XV.TextArea", attr: "manufacturerItemDescription", fit: true}
            ]}
          ]},
          {kind: "XV.PurchaseOrderLineCommentBox", attr: "comments"}
        ]}
      ]
    });

  };
}());
