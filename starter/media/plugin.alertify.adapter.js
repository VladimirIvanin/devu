/** AlertifyJS config */
alertify.defaults.theme = {
  ok: "button is-primary",
  cancel: "button",
};
alertify.defaults.transition = "fade";
alertify.defaults.glossary = {
  ok: 'OK',
  cancel: Site.messages.button_close || 'cancel',
  send: Site.messages.button_submit || 'send',
  title: 'Модалка'
};

alertify.defaults.notifier = {
  delay: 10,
  position: 'top-right'
};

alertify.defaults.preventBodyShift = true;

/** DEFAULT EVENTS */

/** compares */
EventBus.subscribe('add_item:insales:compares', function (data) {
  alertify.notify(Site.messages.productAddedToComparison, 'success');
});

EventBus.subscribe('remove_item:insales:compares', function (data) {
  alertify.notify(Site.messages.productRemovedFromComparison, 'success');
});

EventBus.subscribe('overload:insales:compares', function (data) {
  alertify.notify(Site.messages.maximumNumberOfComparable, 'warning');
});

/** cart */
EventBus.subscribe('add_items:insales:cart', function (data) {
  alertify.success(Site.messages.productAddedToCart)
});

EventBus.subscribe('delete_items:insales:cart', function (data) {
  alertify.notify(Site.messages.productRemovedFromCart, 'warning')
});

/** AlertifyJS extended */

(function (alertify, $, _, window, document) {
  /**
   * Получаем целевой блок
   */
  function getTraget (instance) {
    var self = this;
    var _content = instance.elements.content;
    var _target = instance.get('target');

    var $target = $(_content).find(_target);

    return $target;
  }

  alertify.sendMessage || alertify.dialog('sendMessage', function factory() {
    function send (instance) {
      var $form = getTraget(instance);
      var _message = $form.serializeObject();

      Shop.sendMessage(_message)
        .done(function (_response) {
          alertify.success(_response.notice);
          instance.close();
        })
        .fail(function (_response) {
          _.forEach(_response.errors, function (error) {
            alertify.error(val[0]);
          });
        });
    };

    function validate (instance) {
      var self = this;

      return validateForm(getTraget(instance));
    };

    return {
      main: function (params) {
        this.setting(params);
      },

      setup: function () {
        return {
          buttons: [
            {
              text: alertify.defaults.glossary.send || alertify.defaults.glossary.ok,
              key: 13,
              invokeOnClose: false,
              className: alertify.defaults.theme.ok
            },
            {
              text: alertify.defaults.glossary.cancel,
              key: 27,
              invokeOnClose: true,
              className: alertify.defaults.theme.cancel
            }
          ],
          focus: { element: 0 },
          options: {
            maximizable: false,
            resizable: false,
            movable: false
          }
        }
      },
      prepare: function () {},
      settings: {
        target: ''
      },
      settingUpdated: function (key, oldValue, newValue) {
        switch (key) {
          case 'target':
            this.setContent($(newValue).clone()[0]);
            break;
          default:

        }
      },
      callback: function (closeEvent) {
        var self = this;
        var errors;

        switch (closeEvent.index) {
          case 0:
            closeEvent.cancel = true;

            errors = validate(self, closeEvent);

            if (errors.length) {
              return false
            }

            send(self);
            break;
        }
      }
    };
  });

  alertify.panel || alertify.dialog('panel', function factory() {
    function closePanel (event) {
      var self = event.data;

      if ($(this).width() >= self.get('hideAfter')) {
        self.close();
      }
    };

    function onResize (modal) {
      $(window).on('resize', modal, closePanel);
    };

    function offResize (modal) {
      $(window).off('resize', closePanel);
    }

    return {
      main: function (params) {
        this.setting(params);
      },
      setup: function () {
        return {
          options: {
            title: '',
            modal: true,
            movable: false,
            resizable: false,
            maximizable: false,
          }
        }
      },
      settings: {
        target: null,
        panel: null,
        position: null,
        hideAfter: 764,
        onopen: null,
      },
      prepare: function () {},
      build: function () {
        $(this.elements.root).addClass('ajs-panel-placeholder');
        $(this.elements.dialog).addClass('ajs-panel');
        $(this.elements.header).hide();
        $(this.elements.footer).hide();
      },
      settingUpdated: function (key, oldValue, newValue) {
        switch (key) {
          case 'position':
          case 'classes':
            $(this.elements.dialog)
              .removeClass(oldValue)
              .addClass(newValue);
            break;
          case 'target':
            this.setContent($(newValue).clone()[0]);
            break;
        }
      },
      callback: function (closeEvent) {
      },
      hooks: {
        onshow: function () {
          var self = this;
          onResize(self);
          var _onopen = self.get('onopen');

          if (typeof window[_onopen] === 'function') {
            window[_onopen].call($(self.elements.dialog));
          }
        },
        onclose: function () {
          offResize(this);
        }
      }
    }
  });
})(alertify, jQuery, _, window, document);

$(function () {
  $(document).on('click', '[data-type]', function (event) {
    event.preventDefault();

    var options = $(this).data();
    alertify[options.type](options);
  });
})
