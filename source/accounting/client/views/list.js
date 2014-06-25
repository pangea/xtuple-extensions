XT.extensions.accounting.initLists = function () {
  'use strict';

  /**
   * @class XV.SalesCategory
   * @see XM.SalesCategoryCollection
   */
  enyo.kind({
    name: 'XV.SalesCategoryList',
    kind: 'XV.List',
    view: 'XM.SalesCategoryView',
    label: '_salesCategories'.loc(),
    collection: 'XM.SalesCategoryCollection',

    components: [
      {kind: 'XV.ListItemDecorator', components: [
        {name: 'listItem', kind: 'XV.SalesCategoryListItem'}
      ]}
    ]

  });

  XV.registerModelList('XM.SalesCategory', 'XV.SalesCategoryList');

  /**
   * @class XV.CashReceiptList
   * @see XM.CashReceiptListItemCollection
   */
  enyo.kind({
    name: 'XV.CashReceiptList',
    kind: 'XV.List',
    view: 'XM.CashReceiptView',
    label: '_cashReceipts'.loc(),
    collection: 'XM.CashReceiptListItemCollection',
    parameterWidget: 'XV.CashReceiptListParameters',
    components: [
      {kind: 'XV.ListItemDecorator', components: [
        {name: 'listItem', kind: 'XV.CashReceiptListItem'}
      ]}
    ]
  });
  XV.registerModelList('XM.CashReceiptListItem', 'XV.CashReceiptList');

  //
  // ..........................................................
  // RECEIVABLES
  //

  enyo.kind({
    name: "XV.ReceivableList",
    kind: "XV.List",
    view: 'XM.ReceivableView',
    label: "_receivables".loc(),
    collection: "XM.ReceivableListItemCollection",
    parameterWidget: "XV.ReceivableListParameters",
    allowPrint: true,
    multiSelect: true,
    showDeleteAction: false,
    query: {orderBy: [
      {attribute: 'documentNumber'}
    ]},
    newActions: [
      {name: "creditMemo", label: "_miscCreditMemo".loc(), allowNew: false, defaults: {
        documentType: XM.Receivable.CREDIT_MEMO
      }},
      {name: "debitMemo", label: "_miscDebitMemo".loc(), allowNew: false, defaults: {
        documentType: XM.Receivable.DEBIT_MEMO
      }}
    ],
    actions: [
      {name: "open", privilege: "ViewAROpenItems", prerequisite: "canOpen",
        method: "openReceivable", notify: false, isViewMethod: true}
    ],
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "short", components: [
            {kind: "XV.ListAttr", attr: "documentType", formatter: "formatDocumentType"}
          ]},
          {kind: "XV.ListColumn", classes: "third", components: [
            {kind: "XV.ListAttr", attr: "isPosted", formatter: "formatPosted"}
          ]},
          {kind: "XV.ListColumn", classes: "money", components: [
            {kind: "XV.ListAttr", attr: "documentNumber"}
          ]},
          {kind: "XV.ListColumn", classes: "descr", components: [
            {kind: "XV.ListAttr", attr: "customer.name"}
          ]},
          {kind: "XV.ListColumn", classes: "money", components: [
            {kind: "XV.ListAttr", attr: "documentDate"}
          ]},
          {kind: "XV.ListColumn", classes: "money", components: [
            {kind: "XV.ListAttr", attr: "dueDate"} // format this
          ]},
          {kind: "XV.ListColumn", classes: "money", components: [
            {kind: "XV.ListAttr", attr: "amount", formatter: "formatMoney"}
          ]},
          {kind: "XV.ListColumn", classes: "money", components: [
            {kind: "XV.ListAttr", attr: "paid", formatter: "formatMoney"}
          ]},
          {kind: "XV.ListColumn", classes: "money", components: [
            {kind: "XV.ListAttr", attr: "balance", formatter: "formatMoney"}
          ]}
        ]}
      ]}
    ],
    /**
      Format the money fields with the specified
        currency on the model.
    */
    formatMoney: function (value, view, model) {
      var currency = model ? model.get("currency") : false,
        scale = XT.locale.moneyScale;
      return currency ? currency.format(value, scale) : "";
    },
    /**
      Set the text value that is associated with the
        letter document type.
    */
    formatDocumentType: function (value, view, model) {
      var K = XM.Receivable,
        type = model ? model.get('documentType') : null;
      // TODO: change color depending on type
      switch (type) {
      case K.INVOICE:
        return "_invoice".loc();
      case K.DEBIT_MEMO:
        return "_debitMemo".loc();
      case K.CREDIT_MEMO:
        return "_creditMemo".loc();
      case K.CUSTOMER_DEPOSIT:
        return "_customerDeposit".loc();
      }
      return "";
    },
    formatPosted: function (value, view, model) {
      var posted = model ? model.get('isPosted') : null;
      return posted ? "_yes".loc() : "_no".loc();
    },
    openReceivable: function (inEvent) {
      var model = inEvent.model;

      this.doWorkspace({
        workspace: this.getWorkspace(),
        id: model.id,
        allowNew: false
      });
    }
  });

  XV.registerModelList('XM.Receivable', 'XV.ReceivableList');

  enyo.kind({
    name: "XV.ItemSourceList",
    kind: "XV.List",
    label: "_itemSources".loc(),
    collection: "XM.ItemSourceCollection",
    query: {orderBy: [
      {attribute: "vendorItemNumber"},
      {attribute: "vendor.name"}
    ]},
    parameterWidget: "XV.ItemSourceListParameters",
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "name-column", components: [
            {kind: "FittableColumns", components: [
              {kind: "XV.ListAttr", attr: "vendorItemNumber", isKey: true,
               placeholder: "_noVendorNumber".loc()}
            ]},
            {kind: "XV.ListAttr", attr: "vendor.name"}
          ]},
          {kind: "XV.ListColumn", classes: "right-column", components: [
            {kind: "XV.ListAttr", attr: "vendorUnit"},
            {kind: "XV.ListAttr", attr: "isDefault",
             formatter: "formatDefault"}
          ]},
          {kind: "XV.ListColumn", classes: "first",
           components: [
             {kind: "FittableColumns", components: [
               {kind: "XV.ListAttr", attr: "item.number", classes: "italic"},
               {kind: "XV.ListAttr", attr: "item.inventoryUnit.name", fit: true,
                classes: "right"}
             ]},
             {kind: "XV.ListAttr", formatter: "formatDescription"}
           ]},
          {kind: "XV.ListColumn", classes: "last", components: [
            {kind: "XV.ListAttr", attr: "effective"},
            {kind: "XV.ListAttr", attr: "expires"}
          ]}
        ]}
      ]}
    ],
    formatDefault: function (value) {
      return value ? "_default".loc() : "";
    },
    formatDescription: function (value, view, model) {
      var item = model.get("item"),
          descrip1 = item.get("description1") || "",
          descrip2 = item.get("description2") || "",
          sep = descrip2 ? " - " : "";
      return descrip1 + sep + descrip2;
    }
  });

  XV.registerModelList("XM.ItemSource", "XV.ItemSourceList");

  // ..........................................................
  // PURCHASE EMAIL PROFILE
  //

  enyo.kind({
    name: "XV.PurchaseEmailProfileList",
    kind: "XV.EmailProfileList",
    label: "_purchaseEmailProfiles".loc(),
    collection: "XM.PurchaseEmailProfileCollection"
  });

  // ..........................................................
  // PURCHASE ORDER
  //

  enyo.kind({
    name: "XV.PurchaseOrderList",
    kind: "XV.List",
    label: "_purchaseOrders".loc(),
    collection: "XM.PurchaseOrderListItemCollection",
    parameterWidget: "XV.PurchaseOrderListParameters",
    multiSelect: true,
    actions: [
      {name: "release", privilege: "ReleasePurchaseOrders",
       prerequisite: "canRelease", method: "doRelease",
       notify: false},
      {name: "unrelease", privilege: "ReleasePurchaseOrders",
       prerequisite: "canUnrelease",
       method: "doUnrelease", notify: false}
    ],
    query: {orderBy: [
      {attribute: 'number'}
    ]},
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "first", components: [
            {kind: "FittableColumns", components: [
              {kind: "XV.ListAttr", attr: "number", isKey: true, fit: true},
              {kind: "XV.ListAttr", attr: "getPurchaseOrderStatusString",
               style: "padding-left: 24px"},
              {kind: "XV.ListAttr", attr: "orderDate",
               classes: "right"}
            ]},
            {kind: "FittableColumns", components: [
              {kind: "XV.ListAttr", attr: "vendor.name"},
              {kind: "XV.ListAttr", attr: "total", formatter: "formatTotal",
               classes: "right"}
            ]}
          ]},
          {kind: "XV.ListColumn", classes: "last", components: [
            {kind: "XV.ListAttr", attr: "site.code"},
            {kind: "XV.ListAttr", formatter: "formatShipto"}
          ]}
        ]}
      ]}
    ],
    formatTotal: function (value, view, model) {
      var currency = model ? model.get("currency") : false,
          scale = XT.locale.moneyScale;
      return currency ? currency.format(value, scale) : "";
    },
    formatShipto: function (value, view, model) {
      var city = model.get("shiptoCity"),
          state = model.get("shiptoState"),
          country = model.get("shiptoCountry");
      return XM.Address.formatShort(city, state, country);
    }
  });

  // ..........................................................
  // PURCHASE TYPE
  //

  enyo.kind({
    name: "XV.PurchaseTypeList",
    kind: "XV.List",
    label: "_purchaseTypes".loc(),
    collection: "XM.PurchaseTypeCollection",
    query: {orderBy: [
      {attribute: 'code'}
    ]},
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "short",
           components: [
             {kind: "XV.ListAttr", attr: "code", isKey: true}
           ]},
          {kind: "XV.ListColumn", classes: "last", fit: true, components: [
            {kind: "XV.ListAttr", attr: "description"}
          ]}
        ]}
      ]}
    ]
  });

  enyo.kind({
    name: "XV.SalesHistoryList",
    kind: "XV.List",
    label: "_salesHistory".loc(),
    collection: "XM.SalesHistoryCollection",
    parameterWidget: "XV.SalesHistoryListParameters",
    query: {orderBy: [
      {attribute: 'id'}
    ]},
    components: [
      {kind: "XV.ListItem", components: [
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "first", components: [
            {kind: "XV.ListAttr", attr: "customer.number", isKey: true},
            {kind: "XV.ListAttr", attr: "salesRep.name"}
          ]},
          {kind: "XV.ListColumn", classes: "first", components: [
            {kind: "XV.ListAttr", attr: "orderNumber"},
            {kind: "XV.ListAttr", attr: "shipDate"}
          ]}
        ]},
        {kind: "FittableColumns", components: [
          {kind: "XV.ListColumn", classes: "last", fit: true, components: [
            {kind: "XV.ListAttr", attr: "quantityShipped"},
            {kind: "XV.ListAttr", attr: "unitPrice" }
          ]}
        ]}
      ]}
    ]
  });

  XV.registerModelList("XM.SalesHistory", "XV.SalesHistoryList");

};
/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true, strict:false*/
/*global XM:true, _:true, XT:true, XV:true, enyo:true, Globalize:true*/
