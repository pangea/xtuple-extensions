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
          notification = { action: 'message', content: '%s' },
          notifySql = XT.format("NOTIFY %1$I, '%2$s';", ['message', JSON.stringify(notification)]);

      // For some reason, single quotes are never escaped properly.
      // All the documentation says that format should properly escape single
      // quotes, but it never seems to work in practice.  This, on the other
      // hand, seems to work just fine.
      notifySql = XT.format(notifySql, [JSON.stringify(msg).replace(/'/g, "''")]);

      // Send notification back up to node so we can send the new message down
      // to the correct client
      if(DEBUG) {
        XT.debug('notification = ', JSON.stringify(notification));
        XT.debug('notifySql = ', notifySql);
      }

      plv8.execute(notifySql);

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
