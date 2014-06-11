(function () {
  "use strict";
  
  XT.extensions.message.initMessageModel = function () {
    XM.MessageMessage = XM.Document.extend({
      recordType: "XM.MessageMessage", 
      documentKey: "sender", //the natural key
      idAttribute: "sender" //the natural key
    });
    
    XM.MessageMessageCollection = XM.Collection.extend({
      model: XM.MessageMessage
    });
  };
}());
