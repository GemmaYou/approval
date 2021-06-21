(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ApprovalTree = factory());
}(this, (function () { 'use strict';

    // Options
    var DEFAULTS = {
      // 活動紀錄來源資料
      data: [],
      // 預設卡片顯示數
      perItem: 4
    };

    /**
     * Extend object
     * @param {*} target - The target object to extend.
     * @param {*} args - The rest objects for merging to the target object.
     * @returns {Object} The extended object.
     */
    const assign = Object.assign || function assign(target, ...args) {
      if ($.isPlainObject(target) && args.length > 0) {
        args.forEach(arg => {
          if ($.isPlainObject(arg)) {
            Object.keys(arg).forEach(key => {
              target[key] = arg[key];
            });
          }
        });
      }

      return target;
    };
    /**
     * Extend object
     * @param {String} status - 簽核狀態
     * @param {Number} key - 簽核關卡
     * @returns {Object} data - 三項 element
     */

    const checkStatus = function (status, key) {
      let data;

      switch (status) {
        case 'pending':
          data = {
            actNumber: $(`<div class="act-number pending">${key}</div>`),
            actBref: $(`<div class="act-bref pending"></div>`),
            status: $(`<div class="status">處理中</div>`)
          };
          break;

        case 'approved':
          data = {
            actNumber: $(`<div class="act-number approved">&#10003</div>`),
            actBref: $(`<div class="act-bref approved"></div>`),
            status: $(`<div class="status">審核通過</div>`)
          };
          break;

        case 'rejected':
          data = {
            actNumber: $(`<div class="act-number rejected">X</div>`),
            actBref: $(`<div class="act-bref rejected"></div>`),
            status: $(`<div class="status">不通過</div>`)
          };
          break;

        case 'queueing':
          data = {
            actNumber: $(`<div class="act-number queueing">${key}</div>`),
            actBref: $(`<div class="act-bref queueing"></div>`),
            status: $(`<div class="status">待處理</div>`)
          };
          break;

        case 'start':
          data = {
            actNumber: $(`<div class="act-number start">${key}</div>`),
            actBref: $(`<div class="act-bref start"></div>`),
            status: $(`<div class="status">送出申請</div>`)
          };
          break;
      }

      return data;
    };

    var methods = {
      /*
       * 動態設置 ApprovalTree 選項參數
       * @param {Object} [options] - 更新預設參數
       */
      setOptions(setOpt = {}) {
        let {
          options
        } = this;
        const currentOptions = assign({}, options, $.isPlainObject(setOpt) && setOpt);
        this.init(currentOptions);
      },

      /*
       * destroy ApprovalTree
       */
      destroy() {
        let ele = document.querySelector(this.element);

        while (ele.firstChild) {
          ele.removeChild(ele.firstChild);
        }
      }

    };

    /**
     * NuEIP Core JS Namespace
     * 
     * Use this namespace to develop sub-library for application
     * 
     * @author Nick Tsai
     */
    var Nueip = {}; // Alias Nueip & app
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


    Nueip.bootstrapDialog = function (title, $body, saveAction, options) {
      var footerButtons = [{
        id: 'close',
        label: 'x',
        cssClass: 'btn-default',
        action: function (dialog) {
          dialog.close();
        }
      }];

      if (saveAction) {
        footerButtons.push({
          id: 'save',
          label: lang['v181'],
          cssClass: 'btn-primary',
          action: saveAction
        });
      }

      var defaultOptions = {
        title: '<h4 class="modal-title">' + title + '</h4>',
        message: $body,
        buttons: footerButtons
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
        var global = window; // 定義__STACK__

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
            } catch (e) {
              console.log(e);
            }
          }
        }); // 定義__LINE__

        Object.defineProperty(global, '__LINE__', {
          get: function () {
            try {
              return __STACK__.split(/\n+/)[2].replace(/(.*)\:(\d+)\:\d+\)$/, "$2");
            } catch (e) {
              console.log(e);
            }
          }
        }); // 定義__FILE__

        Object.defineProperty(global, '__FILE__', {
          get: function () {
            try {
              return __STACK__.split(/\n+/)[2].replace(/(.+)\/([^\/]+)\.js(.*)/, "$2.js");
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    })();

    class ApprovalTree {
      constructor(element, options = {}) {
        this.element = element; // 覆寫定義好的預設值

        this.options = assign({}, DEFAULTS, $.isPlainObject(options) && options);
        this.data = []; // 初始化

        this.init(this.options);
      }
      /*
       * 初始化 ApprovalTree
       * @param {Object} [options] - 預設參數
       */


      init(options = {}) {
        this.options = options;
        this.data = options.data;
        this.createCardGroup(options.data);
      }
      /*
       * 渲染資料
       * @param {Object} [data] - data
       */


      createCardGroup(data = []) {
        if (data.length === 0) return;
        const self = this;
        let ele = $(`<div id="approvalTree"></div>`);
        let actGroup = $(`<div class="act-group ${data.length > self.options.perItem ? "flex-column" : "flex-row"}"></div>`);
        $.each(data, function (key, item) {
          let card = $(`<div class="act" id="act-${key}"></div>`);
          let actMiddle = $(`<div class="act-middle"></div>`);
          let addedBy = $(`<div class="addedBy"></div>`);

          if (item.added_by) {
            let addedByP = $(`<p>${item.added_by ? `加簽者﹔${item.added_by}` : ""}</p>`);
            addedBy.append(addedByP);
            addedByP.tooltip({
              animation: true,
              placement: 'bottom',
              trigger: 'hover',
              sanitize: false,
              title: item.added_by
            });
          }

          if (item.added_remark) {
            let addedByI = $(`<i tabindex="0" class="far fa-comment-dots addedByToolTip"></i>`);
            addedByI.popover({
              title: '加簽說明',
              content: item.added_remark,
              animation: true,
              trigger: 'focus'
            });
            addedBy.append(addedByI);
          }

          let actTriangle = $(`<div class="act-triangle">${data.length > self.options.perItem ? "&#9666" : "&#9650"}</div>`);
          let approvalStatus = checkStatus(item.approval_status, key);
          let approverName = $(`<div class="approverName">${item.approver_name}</div>`);
          let approvalDate = $(`<div class="approvalDate">${item.approval_date}</div>`);
          let approverComment = $(`<div class="approverComment">${item.approver_comment}</div>`);
          let attachments = $(`<div class="attachments">${item.attachments.length === 0 ? '' : `請參考附件 <i class="fas fa-paperclip"></i>`}</div>`);
          approvalStatus.actBref.append(approvalStatus.status);
          approvalStatus.actBref.append(approverName);
          approvalStatus.actBref.append(approvalDate);
          approvalStatus.actBref.append(approverComment);
          approvalStatus.actBref.append(attachments);
          card.append(actMiddle);
          card.append(actTriangle);
          card.append(approvalStatus.actNumber);
          card.append(approvalStatus.actBref);
          card.append(addedBy);
          actGroup.append(card);
        });
        ele.append(actGroup); // resize middle

        if (data.length <= self.options.perItem) actGroup.width(`${264 * data.length + 50}px`);
        if (self.element) $(self.element).append(ele);
        return ele;
      }

      openDialog() {
        const self = this;
        let data = self.createCardGroup(self.data);
        let dialog = Nueip.bootstrapDialog('簽核', data);
        dialog.open();
      }

    }

    assign(ApprovalTree.prototype, methods);

    return ApprovalTree;

})));
