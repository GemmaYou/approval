/**
 * NuEIP Core JS Namespace
 * 
 * Use this namespace to develop sub-library for application
 * 
 * @author Nick Tsai
 */
var Nueip = {};

// Alias Nueip & app
var app = Nueip;

'use strict';

/**
 * NuEIP bootstrap-dialog
 *
 * @param {string} title Title
 * @param {object|string} $body jQuery object or HTML string
 * @param {function} saveAction
 * @param {object} options
 *
 * @return {object} BootstrapDialog
 * 
 * @see
 * - https://nakupanda.github.io/bootstrap3-dialog/
 * - https://github.com/nakupanda/bootstrap3-dialog
 * 
 * @example
 * var $modalBody = $('<p>Body</p>').click(function() {
 *   console.log('click $modalBody');
 * });
 * var dialog = Nueip.bootstrapDialog('Title', $modalBody, function() {
 *   console.log('saveAction');
 * });
 * dialog.setSize(BootstrapDialog.SIZE_SMALL);
 * dialog.open();
 */
Nueip.bootstrapDialog = function(title, $body, saveAction, options) {
  var footerButtons = [{
    id: 'close',
    label: 'x',
    cssClass: 'btn-default',
    action: function(dialog) {
      dialog.close();
    },
  }];

  if (saveAction) {
    footerButtons.push({
      id: 'save',
      label: lang['v181'],
      cssClass: 'btn-primary',
      action: saveAction,
    });
  }

  var defaultOptions = {
    title: '<h4 class="modal-title">' + title + '</h4>',
    message: $body,
    buttons: footerButtons,
  };

  return new BootstrapDialog($.extend(true, defaultOptions, options || {}));
};

/**
 * JavaScript取得當前 行號、檔案名稱
 * 
 * 行號：__LINE__
 * 檔案：__FILE__
 * 使用範例：console.log(__LINE__, __FILE__);
 */
(function () {
  if (Error.captureStackTrace && Object.defineProperty) {
    var global = window;
  
    // 定義__STACK__
    Object.defineProperty(global, '__STACK__', {
      get: function () {
        try {
          var old = Error.prepareStackTrace;
          Error.prepareStackTrace = function (error, stack) {
            return stack;
          };
          
          var err = new Error();
          Error.captureStackTrace(err, arguments.callee);
          Error.prepareStackTrace = old;
          return err.stack;
        } catch(e) {
          console.log(e);
        }
      }
    });
    
    // 定義__LINE__
    Object.defineProperty(global, '__LINE__', {
      get: function () {
        try {
          return __STACK__.split(/\n+/)[2].replace(/(.*)\:(\d+)\:\d+\)$/,"$2");
        } catch(e) {
          console.log(e);
        }
      }
    });
    
    // 定義__FILE__
    Object.defineProperty(global, '__FILE__', {
      get: function () {
        try {
          return __STACK__.split(/\n+/)[2].replace(/(.+)\/([^\/]+)\.js(.*)/, "$2.js");
        } catch(e) {
          console.log(e);
        }
      }
    });
  }
})();

export default Nueip;