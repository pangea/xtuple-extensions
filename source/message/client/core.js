(function () {
  "use strict";
  
  XT.extensions.message = {
    name: 'messages',
    label: '_message'.loc(),
    panels: [
      { name: 'messageList', kind: 'XV.MessageList', label: '_message'.loc() }
    ],
    handleNewMessage: function(newMessage) {
      if(!newMessage) { return; }
      var nav = XT.app.$.postbooks.getNavigator();

      nav.generateNewChatBox(newMessage.sender);
      nav.$.messageHolder.$[newMessage.sender + "ChatBox"].addChatMessage(newMessage);
    }
  };

}());

