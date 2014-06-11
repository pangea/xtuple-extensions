(function() {
  "use strict";

  XT.extensions.message.initMessageList = function() {
    enyo.kind({
      name: "XV.MessageMessageList",
      kind: "XV.List",
      label: "_messageList".loc(),
      collection: "XM.MessageMessageCollection",
      query: { 
        orderBy: [
	        { attribute: 'id' }
        ]
      },
      components: [
        { kind: "XV.ListItem", components: [
	        { kind: "FittableColumns", components: [
	          { kind: "XV.ListColumn", classes: "short",
 	            components: [
	              { kind: "XV.ListAttr", attr: "sender", isKey: true }
              ]
            },
            { kind: "XV.ListColumn", classes: "short",
              components: [ 
                { kind: "XV.ListAttr", attr: "recipients" }
              ]
            },
            { kind: "XV.ListColumn",
              components: [
              	{ kind: "XV.ListAttr", attr: "body"}
              ]
            }
          ]
          }
        ]}
      ]
    });
  };
}());
