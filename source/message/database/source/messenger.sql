SELECT xt.install_js('XM', 'Messenger', 'message', $$
  (function() {
    if(!XM.Messenger) { XM.Messenger = {}; }

    XM.Messenger.isDispatchable = true;

    XM.Messenger.deliver = function(recipient, message) {
      if(!recipient) { throw "Messages must have a recipient"; }
      if(!message) { throw "Message must have a message"; }

      if(DEBUG) {
        XT.debug('recipient = ', recipient);
        XT.debug('message = ', message);
      }
      
      var msgId = plv8.execute("SELECT postmessage($1, $2);", [recipient, message])[0].postmessage,
          msg = plv8.execute("SELECT * FROM xm.message WHERE id = $1;", [msgId])[0],
          notification = { action: 'message', content: msg };

      // Send notification back up to node so we can send the new message down
      // to the correct client
      if(DEBUG) {
        XT.debug('notification = ', JSON.stringify(notification));
      }
      // I don't understand why I can't use the same composition methods above here...
      plv8.execute("NOTIFY messenger, '" + JSON.stringify(notification) + "';");

      return msg;
    };

    XM.Messenger.getUsers = function() {
      return plv8.execute("SELECT usename FROM pg_user");
    };

    XM.Messenger.echo = function() {
      XT.debug('echo service hit', arguments);
      
      return arguments;
    };
  }());
$$);
