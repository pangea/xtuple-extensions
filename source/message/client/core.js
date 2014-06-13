(function () {
  "use strict";
  
  XT.extensions.message = {
    name: 'messages',
    label: '_message'.loc(),
    panels: [
      { name: 'messageList', kind: 'XV.MessageList', label: '_message'.loc() }
    ],
    handleNewMessage: function(newMessage) {
      console.log(newMessage);
    }
  };

}());

