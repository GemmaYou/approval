import DEFAULTS from "./default.js";
import { assign, checkStatus } from "./lib.js";
import methods from "./method.js";
import Nueip from "./nueip.js";
import "./style.scss";

class ApprovalTree {
  constructor(element, options = {}) {
    this.element = element;
    // 覆寫定義好的預設值
    this.options = assign({}, DEFAULTS, $.isPlainObject(options) && options);
    this.data = [];
    // 初始化
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
    let actGroup = $(
      `<div class="act-group ${
        data.length > self.options.perItem ? "flex-column" : "flex-row"
      }"></div>`
    );

    $.each(data, function (key, item) {
      let card = $(`<div class="act" id="act-${key}"></div>`);
      let actMiddle = $(`<div class="act-middle"></div>`);
      let addedBy = $(`<div class="addedBy"></div>`);
      if (item.added_by) {
        let addedByP = $(
          `<p>${item.added_by ? `加簽者﹔${item.added_by}` : ""}</p>`
        );
        addedBy.append(addedByP);

        addedByP.tooltip({
          animation: true,
          placement: "bottom",
          trigger: "hover",
          sanitize: false,
          title: item.added_by,
        });
      }
      if (item.added_remark) {
        let addedByI = $(
          `<i tabindex="0" class="far fa-comment-dots addedByToolTip"></i>`
        );
        addedByI.popover({
          title: "加簽說明",
          content: item.added_remark,
          animation: true,
          trigger: "focus",
        });
        addedBy.append(addedByI);
      }

      let approvalStatus = checkStatus(item.approval_status, key);
      let approverName = $(
        `<div class="approverName">${item.approver_name}</div>`
      );
      let approvalDate = $(
        `<div class="approvalDate">${item.approval_date}</div>`
      );
      let approverComment = $(
        `<div class="approverComment">${item.approver_comment}</div>`
      );
      let attachments = $(
        `<div class="attachments">${
          item.attachments.length === 0
            ? ""
            : `請參考附件 <i class="fas fa-paperclip"></i>`
        }</div>`
      );

      approvalStatus.actBref.append(approvalStatus.status);
      approvalStatus.actBref.append(approverName);
      approvalStatus.actBref.append(approvalDate);
      approvalStatus.actBref.append(approverComment);
      approvalStatus.actBref.append(attachments);
      card.append(actMiddle);
      card.append(approvalStatus.actNumber);
      card.append(approvalStatus.actBref);
      card.append(addedBy);

      actGroup.append(card);
    });

    ele.append(actGroup);

    // resize middle
    if (data.length <= self.options.perItem)
      actGroup.width(`${264 * data.length + 50}px`);

    if (self.element) $(self.element).append(ele);
    return ele;
  }

  openDialog() {
    const self = this;
    let data = self.createCardGroup(self.data);
    let dialog = Nueip.bootstrapDialog("簽核", data);
    dialog.open();
  }
}

assign(ApprovalTree.prototype, methods);
export default ApprovalTree;
