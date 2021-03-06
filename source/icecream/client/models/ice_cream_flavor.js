XT.extensions.icecream.initModels = function () {
  XM.IceCreamFlavor = XM.Document.extend({
    recordType: "XM.IceCreamFlavor",
    documentKey: "name", // the natural key
    idAttribute: "name",
    validate: function (attributes) {
      var params = {};
      if (attributes.calories <= 450 && attributes.name.indexOf('LITE ') !== 0) {
        return XT.Error.clone('icecream3001', { params: params });
      }
      // if our custom validation passes, then just test the usual validation
      return XM.Document.prototype.validate.apply(this, arguments);
    },
    bindEvents: function () {
      XM.Document.prototype.bindEvents.apply(this, arguments);
      this.on('change:calories', this.caloriesDidChange);
    },
    caloriesDidChange: function () {
      var calories = this.get("calories"),
        name = this.get("name");

      if (calories < 450 && name.indexOf('LITE ') !== 0) {
        // add the word lite as applicable
        this.set("name", 'LITE ' + name);
      } else if (calories >= 450 && name.indexOf('LITE ') === 0) {
        // get rid of the word lite if it's not applicable
        this.set("name", name.substring(5));
      }
    }
  });

  XM.IceCreamFlavorCollection = XM.Collection.extend({
    model: XM.IceCreamFlavor
  });


};
