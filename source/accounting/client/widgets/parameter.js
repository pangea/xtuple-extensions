(function () {

  XT.extensions.billing.initParameters = function () {

    // ..........................................................
    // RECEIVABLE
    //

    enyo.kind({
      name: "XV.ReceivableListParameters",
      kind: "XV.ParameterWidget",
      defaultParameters: function () {
        return {
          showDebits: true,
          showCredits: true,
          asOfDate: new Date()
        };
      },
      components: [
        {kind: "onyx.GroupboxHeader", content: "_receivable".loc()},
        {name: "number", label: "_number".loc(), attr: "documentNumber", defaultKind: "XV.NumberWidget"},
        {name: "asOfDate", label: "_asOf".loc(), attr: "closeDate", defaultKind: "XV.DateWidget",
          getParameter: function () {
            var param;
            if (this.getValue()) {
              param = [{
                attribute: this.getAttr(),
                operator: '>=',
                value: this.getValue(),
                includeNull: true
              },
              {
                attribute: "documentDate",
                operator: '<=',
                value: this.getValue(),
                includeNull: true
              }];
            }
            return param;
          }
        },
        {kind: "onyx.GroupboxHeader", content: "_show".loc()},
        {name: "showUnposted", label: "_unposted".loc(),
          attr: "isPosted", defaultKind: "XV.CheckboxWidget",
          getParameter: function () {
            var param;
            if (!this.getValue()) {
              param = {
                attribute: this.getAttr(),
                operator: '=',
                value: true
              };
            }
            return param;
          }
        },
        {name: "showClosed", label: "_closed".loc(),
          attr: "closeDate", defaultKind: "XV.CheckboxWidget",
          getParameter: function () {
            var param;
            if (!this.getValue()) {
              param = {
                attribute: this.getAttr(),
                operator: '=',
                value: null,
                includeNull: true
              };
            }
            return param;
          }
        },
        // TODO: ***These are not working
        {name: "showDebits", label: "_debits".loc(),
          attr: "documentType", defaultKind: "XV.CheckboxWidget",
          getParameter: function () {
            var param;
            if (!this.getValue()) {
              param = {
                attribute: this.getAttr(),
                operator: '!=',
                value: 'D'
              };
            }
            return param;
          }
        },
        {name: "showCredits", label: "_credits".loc(),
          attr: "documentType", defaultKind: "XV.CheckboxWidget",
          getParameter: function () {
            var param;
            if (!this.getValue()) {
              param = {
                attribute: this.getAttr(),
                operator: '!=',
                value: 'C'
              };
            }
            return param;
          }
        },
        {kind: "onyx.GroupboxHeader", content: "_customer".loc()},
        {name: "customer", attr: "customer", label: "_customer".loc(),
          defaultKind: "XV.SalesCustomerWidget"},
        {name: "customerType", attr: "customer.customerType", label: "_customerType".loc(),
          defaultKind: "XV.CustomerTypePicker"},
        // // TODO:
        // //   - Type Pattern (text)
        // //   - Group
        {kind: "onyx.GroupboxHeader", content: "_dueDate".loc()},
        {name: "fromDate", label: "_fromDate".loc(), attr: "dueDate", operator: ">=",
          defaultKind: "XV.DateWidget"},
        {name: "toDate", label: "_toDate".loc(), attr: "dueDate", operator: "<=",
          defaultKind: "XV.DateWidget"},
        {kind: "onyx.GroupboxHeader", content: "_documentDate".loc()},
        {name: "fromDocDate", label: "_fromDate".loc(), attr: "documentDate", operator: ">=",
          defaultKind: "XV.DateWidget"},
        {name: "toDocDate", label: "_toDate".loc(), attr: "documentDate", operator: "<=",
          defaultKind: "XV.DateWidget"}
      ],
      /**
        The As Of parameter will only be enabled when unposted and closed are unchecked.
        Otherwise it will be set to the current date and disabled.
      */
      parameterChanged: function (inSender, inEvent) {
        if (inSender.name === "showClosed" || inSender.name === "showUnposted") {
          //both must be unchecked for enabled date
          var unchecked = this.$.showClosed.getValue() || this.$.showUnposted.getValue();
          this.$.asOfDate.$.input.setDisabled(unchecked);
        }
      },
    });


    enyo.kind({
      name: "XV.CashReceiptListParameters",
      kind: "XV.ParameterWidget",
      defaultParameters: function () {
        return {
          showPosted: true
        };
      }
    });
  };
}());
/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true, strict: false*/
/*global XT:true, XM:true, XV:true, enyo:true*/

(function () {

  XT.extensions.purchasing.initParameters = function () {

    // ..........................................................
    // ACTIVITY
    //

    XV.ActivityListParameters.prototype.activityTypes.purchasing = [
      {type: "PurchaseOrder", label: "_orders".loc()},
      {type: "PurchaseOrderWorkflow", label: "_workflow".loc()}
    ];

    // ..........................................................
    // ITEM SOURCE LIST
    //

    enyo.kind({
      name: "XV.ItemSourceListParameters",
      kind: "XV.ParameterWidget",
      components: [
        {kind: "onyx.GroupboxHeader", content: "_itemSource".loc()},
        {name: "item", label: "_item".loc(), attr: "item", defaultKind: "XV.ItemWidget"},
        {name: "vendor", label: "_vendor".loc(), attr: "vendor", defaultKind: "XV.VendorWidget"},
        {kind: "onyx.GroupboxHeader", content: "_show".loc()},
        {name: "showInactive", label: "_inactive".loc(), attr: "isActive", defaultKind: "XV.CheckboxWidget",
          getParameter: function () {
            var param;
            if (!this.getValue()) {
              param = {
                attribute: this.getAttr(),
                value: true
              };
            }
            return param;
          }
        },
        {name: "showFuture", label: "_future".loc(), attr: "effective", defaultKind: "XV.CheckboxWidget",
          getParameter: function () {
            var param;
            if (!this.getValue()) {
              param = {
                attribute: this.getAttr(),
                operator: "<=",
                value: XT.date.today()
              };
            }
            return param;
          }
        },
        {name: "showExpired", label: "_expired".loc(), attr: "expires", defaultKind: "XV.CheckboxWidget",
          getParameter: function () {
            var param,
              today = XT.date.today(),
              tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            if (!this.getValue()) {
              param = {
                attribute: this.getAttr(),
                operator: ">=",
                value: tomorrow
              };
            }
            return param;
          }
        }
      ]
    });

    // ..........................................................
    // PURCHASE ORDER LIST
    //

    enyo.kind({
      name: "XV.PurchaseOrderListParameters",
      kind: "XV.ParameterWidget",
      characteristicsRole: "isPurchaseOrders",
      defaultParameters: function () {
        return {
          user: XM.currentUser,
          isUnreleased: true,
          isOpen: true
        };
      },
      components: [
        {kind: "onyx.GroupboxHeader", content: "_purchaseOrder".loc()},
        {name: "number", label: "_number".loc(), attr: "number"},
        {name: "vendor", label: "_vendor".loc(), attr: "vendor", defaultKind: "XV.VendorWidget"},
        {kind: "onyx.GroupboxHeader", content: "_show".loc()},
        {name: "isUnreleased", label: "_unreleased".loc(), defaultKind: "XV.CheckboxWidget"},
        {name: "isOpen", label: "_open".loc(), defaultKind: "XV.CheckboxWidget"},
        {name: "isClosed", label: "_closed".loc(), defaultKind: "XV.CheckboxWidget"},
        {kind: "onyx.GroupboxHeader", content: "_orderDate".loc()},
        {name: "fromOrderDate", label: "_fromDate".loc(), attr: "orderDate", operator: ">=",
          filterLabel: "_from".loc() + " " + "_orderDate".loc() + " " + "_date".loc(),
          defaultKind: "XV.DateWidget"},
        {name: "toDueDate", label: "_toDate".loc(), attr: "orderDate", operator: "<=",
          filterLabel: "_to".loc() + " " + "_orderDate".loc() + " " + "_date".loc(),
          defaultKind: "XV.DateWidget"}
      ],
      getParameters: function () {
        var params = this.inherited(arguments),
          K = XM.PurchaseOrder,
          param = {},
          value = [];
        if (this.$.isUnreleased.getValue()) {
          value.push(K.UNRELEASED_STATUS);
        }
        if (this.$.isOpen.getValue()) {
          value.push(K.OPEN_STATUS);
        }
        if (this.$.isClosed.getValue()) {
          value.push(K.CLOSED_STATUS);
        }
        if (value.length) {
          param.attribute = "status";
          param.operator = "ANY";
          param.value = value;
          params.push(param);
        }
        return params;
      }
    });

  };

}());
/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true*/
/*global XT:true, XM:true, _:true, enyo:true, Globalize:true*/

(function () {

  XT.extensions.sales.initParameters = function () {

    // ..........................................................
    // ACTIVITY
    //

    XV.ActivityListParameters.prototype.activityTypes.sales = [
      {type: "SalesOrder", label: "_salesOrders".loc()},
      {type: "SalesOrderWorkflow", label: "_orderWorkflow".loc()}
    ];

    // ..........................................................
    // SALES HISTORY
    //

    enyo.kind({
      name: "XV.SalesHistoryListParameters",
      kind: "XV.ParameterWidget",
      components: [
        {kind: "onyx.GroupboxHeader", content: "_salesHistory".loc()},
        {name: "customer", attr: "customer", label: "_customer".loc(), defaultKind: "XV.CustomerProspectWidget"},
        {name: "salesRep", attr: "salesRep", label: "_salesRep".loc(), defaultKind: "XV.SalesRepPicker"},
      ]
    });
  };

}());
