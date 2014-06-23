// We're overwriting the default CommentBoxItem to add additional functionality
(function() {
  enyo.kind(/** @lends XV.CommentBoxItem# */{
    name: "XV.CommentBoxItem",
    classes: "xv-comment-box",
    published: {
      value: null
    },
    events: {
      onCommentBoxItemEdit: ""
    },
    handlers: {
      ontap: "openEditableArea",
      onValueChange: "controlValueChanged",
      onCommentBoxItemEdit: "commentBoxItemEdit"
    },
    components: [
      {name: "header", formatter: "formatHeader",
       classes: "xv-comment-box-label"},
      {attr: "text", name: "textBlock", formatter: "formatText", allowHtml: true,
       classes: "xv-comment-box-textblock"},
      // Editing widgets
      {kind: "XV.CommentTypePicker", name: "commentType",
       attr: "commentType", showing: false},      
      {kind: "XV.TextArea", name: 'textArea', attr: "text",
       showing: false, showBorder: true, onkeypress: "findMention"}
    ],
    users: [],
    properties: [
      'boxSizing',
      'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
      'height',
      'overflowX',
      'overflowY',  // copy the scrollbar for IE

      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',

      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',

      // https://developer.mozilla.org/en-US/docs/Web/CSS/font
      'fontStyle',
      'fontVariant',
      'fontWeight',
      'fontStretch',
      'fontSize',
      'lineHeight',
      'fontFamily',

      'textAlign',
      'textTransform',
      'textIndent',
      'textDecoration',  // might not make a difference, but better be safe

      'letterSpacing',
      'wordSpacing'
    ],
    isFirefox: !(window.mozInnerScreenX == null),
    mirrorDiv: null, 
    computed: null, 
    style: null,    
    tagCount: 0,
    create: function () {
      this.inherited(arguments); 
      var users = new XM.UserAccountRelationCollection(),
          excludeValues = ["xtuple","pangea_api","postgres","admin","beryl"],
          filteredUsers = [];

      // fetch users and create and array based off that
      // iterate over and exclude any values matching in excludeValues
      // then wipe the list and repopulate it with names and render
      users.fetch({ 
        success: function() { 
          for(var i = 0; i < users.models.length; i++){
            if(!(excludeValues.indexOf(users.models[i].id) != -1)){
              filteredUsers.push(users.models[i].id);
            }
          }
        }
      });
      this.users = filteredUsers;
    },
    getCaretCoordinates: function (element, position) {
      // mirrored div
      this.mirrorDiv = document.getElementById(element.nodeName + '--mirror-div');
      

      if (!this.mirrorDiv) {
        this.mirrorDiv = document.createElement('div');
        this.mirrorDiv.id = element.nodeName + '--mirror-div';
        document.body.appendChild(this.mirrorDiv);
      }

      this.style = this.mirrorDiv.style;
      this.computed = getComputedStyle(element);


      // default textarea styles
      this.style.whiteSpace = 'pre-wrap';
      if (element.nodeName !== 'INPUT')
        this.style.wordWrap = 'break-word';  // only for textarea-s

      // position off-screen
      this.style.position = 'absolute';  // required to return coordinates properly
      this.style.top = element.offsetTop + parseInt(this.computed.borderTopWidth) + 'px';
      this.style.left = "400px";
      this.style.visibility = 'hidden';

      // transfer the element's properties to the div
      this.properties.forEach(function (prop) {
        this.style[prop] = this.computed[prop];
      }.bind(this));

      if (this.isFirefox) {
        this.style.width = parseInt(this.computed.width) - 2 + 'px'  // Firefox adds 2 pixels to the padding - https://bugzilla.mozilla.org/show_bug.cgi?id=753662
        // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
        if (element.scrollHeight > parseInt(this.computed.height))
          this.style.overflowY = 'scroll';
      } else {
        this.style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
      }  

      this.mirrorDiv.textContent = element.value.substring(0, position);
      // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
      if (element.nodeName === 'INPUT')
        this.mirrorDiv.textContent = this.mirrorDiv.textContent.replace(/\s/g, "\u00a0");

      var span = document.createElement('span');
      // Wrapping must be replicated *exactly*, including when a long word gets
      // onto the next line, with whitespace at the end of the line before (#7).
      // The  *only* reliable way to do that is to copy the *entire* rest of the
      // textarea's content into the <span> created at the caret position.
      // for inputs, just '.' would be enough, but why bother?
      span.textContent = element.value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
      span.style.backgroundColor = "lightgrey";
      this.mirrorDiv.appendChild(span);

      var coordinates = {
        top: span.offsetTop + parseInt(this.computed['borderTopWidth']),
        left: span.offsetLeft + parseInt(this.computed['borderLeftWidth'])
      };

      return coordinates;
    },
    /**
     */
    findMention: function (inSender, inEvent) {
      // If keypressed is @
      if(inEvent.keyCode == 64 && !this.selectBox) {
        var t = inEvent.target,
            select = document.createElement('select');

        for(var i = 0; i < this.users.length; i++) {
          var opt = this.users[i],
              el = document.createElement("option");

          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
        };

        //['change', 'blur'].forEach(function(evt) {
        select.addEventListener('blur', function(e) {
          t.value = t.value + select.value + ' ';
          e.target.parentNode.removeChild(e.target);
          this.selectBox = null;

          t.selectionStart = t.selectionEnd = t.value.length;
        }.bind(this));
        //});

        select.style.position = 'absolute';
        t.parentNode.insertBefore(select, t.nextSibling);

        var coordinates = this.getCaretCoordinates(t, t.selectionEnd);

        select.style.top = t.offsetTop - t.scrollTop + coordinates.top + 'px';
        select.style.left = t.offsetLeft - t.scrollLeft + coordinates.left + 10 + 'px';
        
        t.value = t.value + '@'; // fuck da police!
        select.focus();

        this.selectBox = select;
      }
    },
    /**
     When a box gets opened, we want to close unless that box is us.
     This will get hit on the bubble up and the waterfall down, but
     the waterfall down is the only time it will do anything, if it
     was actually originated by someone else.
     */
    commentBoxItemEdit: function (inSender, inEvent) {
      if (this.id !== inEvent.originator.id) {
        this.hideEditableArea();
      }
    },
    /**
     Catch events from constituent widgets and update the model
     */
    controlValueChanged: function (inSender, inEvent) {
      var attr = inSender.getAttr(),
          value = inSender.getValue(),
          attributes = {},
          model = this.getValue();
      attributes[attr] = value;
      model.set(attributes);
      return true;
    },
    /**
     Formats the text that goes at the top of each comment
     */
    formatHeader: function (value, view, model) {
      var values = [
        Globalize.format(model.get('created'), 'd'),
        Globalize.format(model.get('created'), 't'),
        model.get('createdBy'),
        model.getValue('commentType.name')
      ];
      return values.join(' ');
    },
    /**
     @todo Document the formatText method.
     */
    formatText: function (value, view, model) {
      var text = value ? value.replace(/</g, "&lt;").replace(/\r?\n/g, "<br>\n") : value;
      view.addRemoveClass("disabled", model.isReadOnly());
      return "\n<blockquote>" + text + "</pre></blockquote><hr>";
    },
    /**
     Transition from editable mode to read-only mode
     */
    hideEditableArea: function (inSender, inEvent) {
      var value = this.getValue(),
          text = this.formatText(value.get('text'), this, value);
      this.$.textBlock.setContent(text);
      this.$.textBlock.show();
      this.$.textArea.hide();
      this.$.commentType.hide();
    },
    /**
     When the user wants to make a new comment, we open it up for them
     and initialize it.
     */
    initializeNew: function () {
      if (this.value.getStatus() === XM.Model.READY_NEW) {
        this.setCommentTypeFilter();
        this.openEditableArea();
      }
    },
    /**
     Transition from read-only mode to editable mode
     */
    openEditableArea: function () {
      var that = this,
          model = this.getValue(),
          header = this.$.header,
          textInput = this.$.textArea.$.input,
          typeChanged = function () {
            var headerText = that.formatHeader(null, that, model);
            textInput.setDisabled(false);
            textInput.focus();
            header.setContent(headerText);
            model.off('change:commentType', typeChanged);
          };
      if (model.isReadOnly()) { return; }
      this.$.textBlock.hide();
      this.$.textArea.show();
      this.$.commentType.show();
      if (this.value.isReadOnly("commentType")) {
        this.$.commentType.setDisabled(true);
      }
      if (model.get('commentType')) {
        textInput.focus();
      } else {
        textInput.setDisabled(true);
        model.on('change:commentType', typeChanged);
      }
      this.doCommentBoxItemEdit();
    },
    /**
     Apply the filter that dictates which comment types
     are pertinent to this business object.
     */
    setCommentTypeFilter: function () {
      var value = this.getValue(),
          commentType = this.$.commentType;
      commentType.filter = function (models) {
        return _.filter(models, function (model) {
          var sourcesModels,
              sourcesAttrs,
              sources,
              attrs,
              sourceNames;
          sourcesModels = model.get('sources').models;
          sourcesAttrs = _.pluck(sourcesModels, 'attributes');
          sources = _.pluck(sourcesAttrs, 'source');
          attrs = _.pluck(sources, 'attributes');
          sourceNames = _.pluck(attrs, 'name');
          return _.find(sourceNames, function (name) {
            return name === value.sourceName;
          });
        });
      };
      commentType.buildList();
    },
    /**
     We disable this view by disabling all its subcomponents.
     */
    setDisabled: function (isDisabled) {
      var i,
          components = this.getComponents(),
          comp;

      for (i = 0; i < components.length; i++) {
        comp = components[i];
        if (comp.setDisabled) {
          comp.setDisabled(isDisabled);
        }
      }
    },
    /**
     @todo Document the valueChanged method.
     */
    valueChanged: function () {
      var i,
          model = this.getValue(),
          status = model ? model.getStatus() : null,
          K = XM.Model,
          controls = _.filter(this.$, function (obj) {
            return obj.attr || obj.formatter;
          }),
          control,
          label,
          attr,
          value;
      for (i = 0; i < controls.length; i++) {
        control = controls[i];
        attr = control.attr;
        label = ("_" + attr).loc();
        value = attr ? model.getValue(attr) : null;
        value = control.formatter ?
          this[control.formatter](value, control, model) : value;
        if (control.setValue) {
          control.setValue(value, {silent: true});
        } else {
          control.setContent(value);
        }
        if (model.isReadOnly() || !model.canUpdate()) {
          this.setDisabled(true);
        }
      }
    }
  });
  
}());
