(function() {
  "use strict";
  
  XT.extensions.message.initMessagesWorkspace = function () {
    enyo.kind({
      name: "XV.MessageMessageWorkspace",
      kind: "XV.Workspace",
      title: "_message".loc(),
      model: "XM.MessageMessage",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
         fit: true, components: [
           {kind: "XV.Groupbox", name: "mainPanel", components: [
             {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
             {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
               {kind: "XV.InputWidget", attr: "recipients"},
               {kind: "XV.TextArea", attr: "body"}
             ]}
           ]}
         ]}
      ],
      defaultAttributes: function() {
        return {
          sender : XM.currentUser.id,
          source: 'U'
        };
      }
    });

    XV.registerModelWorkspace("XM.MessageMessage", "XV.MessageMessageWorkspace");
  };

}());
