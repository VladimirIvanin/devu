(function ($, window, document) {
  var StyleSelect = function(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this._options = options;

    this.init();

    return this;
  }

  StyleSelect.prototype.init = function () {
    var self = this;
    var $parent = self.$elem.parent();

    if (self.$elem.is('[name="variant_id"]')) {
      return false;
    }

    if (!$parent.hasClass('select-wrapper')) {
      self.$elem
        .addClass('select-field')
        .wrap('<div class="select-wrapper" />');
      self.elem._StyleSelect = self;
    }
  };

  $.fn.styleSelect = function (options) {
    return this.each(function () {
      if (!this._StyleSelect) {
        this._StyleSelect = new StyleSelect(this, options);
      };
    });
  }
})(jQuery, window, document);
