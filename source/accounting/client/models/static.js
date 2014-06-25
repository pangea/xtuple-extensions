/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XM:true, Backbone:true */

(function () {
  "use strict";

  XT.extensions.billing.initStaticModels = function () {
    // These are hard coded collections that may be turned into tables at a later date
    var i, K;

    // Receivable Types
    K = XM.Receivable;
    var receivableTypeJson = [
      { id: K.INVOICE, name: "_invoice".loc() },
      { id: K.DEBIT_MEMO, name: "_debitMemo".loc() },
      { id: K.CREDIT_MEMO, name: "_creditMemo".loc() },
      { id: K.CUSTOMER_DEPOSIT, name: "_customerDeposit".loc() }
    ];
    XM.ReceivableTypeModel = Backbone.Model.extend({});
    XM.ReceivableTypeCollection = Backbone.Collection.extend({
      model: XM.ReceivableTypeModel
    });
    XM.receivableTypes = new XM.ReceivableTypeCollection();
    for (i = 0; i < receivableTypeJson.length; i++) {
      var receivableType = new XM.ReceivableTypeModel(receivableTypeJson[i]);
      XM.receivableTypes.add(receivableType);
    }

    /**
    * @enum
    * Funds Types
    */
    XM.FundsTypeEnum = {
      C: 'CHECK',
      T: 'CERTIFIED_CHECK',
      K: 'CASH',
      M: 'MASTERCARD',
      V: 'VISA',
      A: 'AMERICAN_EXPRESS',
      D: 'DISCOVER',
      R: 'OTHER_CREDIT_CARD',
      W: 'WIRE_TRANSFER',
      O: 'OTHER'
    };

    /**
    * @class XM.FundsType
    * @extends Backbone.Model
    */
    XM.FundsType = XM.StaticModel.extend({

      /**
       * Returns true if the given fundsType is a credit card type, false
       * otherwise.
       */
      isCreditCard: function () {
        return _.contains([ 'M', 'V', 'A', 'D', 'R' ], this.id);
      }
    });

    XM.fundsTypes = new XM.EnumMapCollection(
      XM.FundsTypeEnum, { model: XM.FundsType }
    );
          
    /**
     * @enum
     * Cash Receipt Balance Application Options.
     */
    XM.CashReceiptApplyOptionEnum = {
      0: 'APPLY_BALANCE_TO_CREDIT_MEMO',
      1: 'APPLY_BALANCE_TO_CUSTOMER_DEPOSIT'
    };

    XM.cashReceiptApplyOptions = new XM.EnumMapCollection(
      XM.CashReceiptApplyOptionEnum
    );
  };
}());
/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true */

(function () {
  "use strict";

  XT.extensions.purchasing.initStaticModels = function () {
    var K = XM.ItemSourcePrice,
     i;

    // Item Source Price Types
    var itemSourcePriceTypesJson = [
      { id: K.TYPE_NOMINAL, name: "_nominal".loc() },
      { id: K.TYPE_DISCOUNT, name: "_discount".loc() }
    ];
    XM.ItemSourcePriceTypeModel = Backbone.Model.extend({
    });
    XM.ItemSourcePriceTypeCollection = Backbone.Collection.extend({
      model: XM.ItemSourcePriceTypeModel
    });
    XM.itemSourcePriceTypes = new XM.ItemSourcePriceTypeCollection();
    for (i = 0; i < itemSourcePriceTypesJson.length; i++) {
      var itemSourcePriceType = new XM.ItemSourcePriceTypeModel(itemSourcePriceTypesJson[i]);
      XM.itemSourcePriceTypes.add(itemSourcePriceType);
    }

    // Purchase Order
    K = XM.PurchaseOrder;
    var purchaseOrderStatusesJson = [
      { id: K.UNRELEASED_STATUS, name: "_unreleased".loc() },
      { id: K.OPEN_STATUS, name: "_open".loc() },
      { id: K.CLOSED_STATUS, name: "_closed".loc() }
    ];
    XM.PurchaseOrderStatusModel = Backbone.Model.extend({
    });
    XM.PurchaseOrderStatusCollection = Backbone.Collection.extend({
      model: XM.PurchaseOrderStatusModel
    });
    XM.purchaseOrderStatuses = new XM.PurchaseOrderStatusCollection();
    for (i = 0; i < purchaseOrderStatusesJson.length; i++) {
      var purchaseOrderStatus = new XM.PurchaseOrderStatusModel(purchaseOrderStatusesJson[i]);
      XM.purchaseOrderStatuses.add(purchaseOrderStatus);
    }

    // Purchase Order Workflow
    K = XM.PurchaseOrderWorkflow;
    var purchaseOrderWorkflowTypeJson = [
      { id: K.TYPE_OTHER, name: "_other".loc() }
    ];
    XM.PurchaseOrderWorkflowTypeModel = Backbone.Model.extend({});
    XM.PurchaseOrderWorkflowTypeCollection = Backbone.Collection.extend({
      model: XM.PurchaseOrderWorkflowTypeModel
    });
    XM.purchaseOrderWorkflowTypes = new XM.PurchaseOrderWorkflowTypeCollection();
    _.each(purchaseOrderWorkflowTypeJson, function (obj) {
      XM.purchaseOrderWorkflowTypes.add(new XM.PurchaseOrderWorkflowTypeModel(obj));
    });

  };

}());
/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true, console:true */

(function () {
  "use strict";

  XT.extensions.sales.initStaticModels = function () {

    // These are hard coded collections that may be turned into tables at a later date
    var i;

    // Invoice Date Sources
    var invoiceDateSourceJson = [
      { id: "currdate", name: "_currentDate".loc() },
      { id: "shipdate", name: "_shipDate".loc() },
      { id: "scheddate", name: "_scheduledDate".loc() }
    ];
    XM.InvoiceDateSourceModel = Backbone.Model.extend({
    });
    XM.InvoiceDateSourceCollection = Backbone.Collection.extend({
      model: XM.InvoiceDateSourceModel
    });
    XM.invoiceDateSources = new XM.InvoiceDateSourceCollection();
    for (i = 0; i < invoiceDateSourceJson.length; i++) {
      var invoiceDateSource = new XM.InvoiceDateSourceModel(invoiceDateSourceJson[i]);
      XM.invoiceDateSources.add(invoiceDateSource);
    }

    // Line Item Edit Behaviors
    var lineItemEditBehaviorJson = [
      { id: 3, name: "_update".loc() },
      { id: 1, name: "_doNotUpdate".loc() },
      { id: 2, name: "_prompt".loc() }
    ];
    XM.LineItemEditBehaviorModel = Backbone.Model.extend({
    });
    XM.LineItemEditBehaviorCollection = Backbone.Collection.extend({
      model: XM.LineItemEditBehaviorModel
    });
    XM.lineItemEditBehaviors = new XM.LineItemEditBehaviorCollection();
    for (i = 0; i < lineItemEditBehaviorJson.length; i++) {
      var lineItemEditBehavior = new XM.LineItemEditBehaviorModel(lineItemEditBehaviorJson[i]);
      XM.lineItemEditBehaviors.add(lineItemEditBehavior);
    }

    // Price Effective Dates
    var priceEffectiveDateJson = [
      { id: "CurrentDate", name: "_current".loc() },
      { id: "OrderDate", name: "_order".loc() },
      { id: "ScheduleDate", name: "_scheduled".loc() }
    ];
    XM.PriceEffectiveDateModel = Backbone.Model.extend({
    });
    XM.PriceEffectiveDateCollection = Backbone.Collection.extend({
      model: XM.PriceEffectiveDateModel
    });
    XM.priceEffectiveDates = new XM.PriceEffectiveDateCollection();
    for (i = 0; i < priceEffectiveDateJson.length; i++) {
      var priceEffectiveDate = new XM.PriceEffectiveDateModel(priceEffectiveDateJson[i]);
      XM.priceEffectiveDates.add(priceEffectiveDate);
    }
  };

}());
