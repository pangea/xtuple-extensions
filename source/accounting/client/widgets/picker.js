/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true, strict: false*/
/*global XT:true, enyo:true, _:true*/

(function () {

  XT.extensions.billing.initPickers = function () {

    // ..........................................................
    // RECEIVABLE TYPES
    //

    enyo.kind({
      name: "XV.ReceivableTypePicker",
      kind: "XV.PickerWidget",
      collection: "XM.receivableTypes",
      showNone: false
    });

    /**
     * @class XV.FundsTypePicker
     * @extends XV.PickerWidget
     */
    enyo.kind({
      name: 'XV.FundsTypePicker',
      kind: 'XV.PickerWidget',
      collection: 'XM.fundsTypes',
      nameAttribute: 'label',
      label: '_fundsType'.loc(),
      showNone: false,
      published: {
        allowCreditCards: false
      },

      /**
       * @override
       * @see XV.FundsTypePicker#filter
       *
       * Decide based on session privileges whether to show credit card
       * options
       */
      create: function () {
        this.setAllowCreditCards(XT.session.privileges.get('ProcessCreditCards'));
        this.inherited(arguments);
      },

      /**
       * @override
       * @see XV.PickerWidget#filter
       */
      filter: function (models, options) {
        var that = this;

        return _.filter(models, function (model) {
          return that.allowCreditCards || !model.isCreditCard();
        });
      }
    });

    /**
     * @class XV.CashReceiptApplyOptionsPicker
     * @extends XV.PickerWidget
     */
    enyo.kind({
      name: 'XV.CashReceiptApplyOptionsPicker',
      kind: 'XV.PickerWidget',
      collection: 'XM.cashReceiptApplyOptions',
      nameAttribute: 'label',
      label: '_applyBalanceAs'.loc(),
      showNone: false,

      /**
       * @override
       * Decide based on session settings whether to display this widget
       */
      create: function () {
        this.inherited(arguments);
        this.setShowing(XT.session.settings.get('EnableCustomerDeposits'));
      }
    });
  };

}());
/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, trailing:true,
white:true, strict:false*/
/*global enyo:true, XT:true, XV:true, Globalize:true, XM:true */

(function () {

  XT.extensions.purchasing.initPickers = function () {

    // ..........................................................
    // ITEM SOURCE PRICE TYPE
    //

    enyo.kind({
      name: "XV.ItemSourcePriceTypePicker",
      kind: "XV.PickerWidget",
      collection: "XM.itemSourcePriceTypes",
      valueAttribute: "id",
      showNone: false
    });

    // ..........................................................
    // PURCHASE EMAIL PROFILE
    //

    enyo.kind({
      name: "XV.PurchaseEmailProfilePicker",
      kind: "XV.PickerWidget",
      label: "_emailProfile".loc(),
      collection: "XM.purchaseEmailProfiles"
    });

    // ..........................................................
    // PURCHASE ORDER STATUS
    //

    enyo.kind({
      name: "XV.PurchaseOrderStatusPicker",
      kind: "XV.PickerWidget",
      collection: "XM.purchaseOrderStatuses",
      showNone: false
    });

    // ..........................................................
    // PURCHASE ORDER WORKFLOW TYPE
    //

    enyo.kind({
      name: "XV.PurchaseOrderWorkflowTypePicker",
      kind: "XV.PickerWidget",
      collection: "XM.purchaseOrderWorkflowTypes",
      valueAttribute: "id",
      showNone: false
    });

    // ..........................................................
    // PURCHASE TYPE
    //

    enyo.kind({
      name: "XV.PurchaseTypePicker",
      kind: "XV.PickerWidget",
      collection: "XM.purchaseTypes",
      nameAttribute: "code"
    });

  };

}());
