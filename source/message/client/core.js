(function () {
  "use strict";
  
  XT.extensions.message = {
    name: 'messages',
    label: '_message'.loc(),
    panels: [
      { name: 'messageMessageList', kind: 'XV.MessageMessageList', label: '_message'.loc() }
    ]
  };

}());

