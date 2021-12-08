// Data
module.exports = [
  {
    // (第一筆資料為申請者，建立第 0 關使用)
    id: "",
    approval_status: "start",
    approval_date: "2020-09-30 17:04:28",
    approver_name: "綺多 Cheadle",
    approver_comment: `【急件】此為全面性的影響請安排急件處理。
    邏輯應調整為"如有多個電子表單附件，簽核時都要顯示出來"(跟目前【家班】還有【費用申請】的邏輯一樣) `,
    added_by: "加簽者加簽者加簽者加簽者加簽者加簽者",
    added_remark:
      "testestesttestestesttestestesttestestesttestestesttestestesttestestesttestestesttestestesttestestest",
    attachments: [],
  },
  {
    // 簽核關卡資料 ID
    id: "3695811",
    // 簽核關卡狀態 (pending|approved|rejected|queueing|*start)
    // - pending 待簽核
    // - approved 通過
    // - rejected 不通過
    // - queueing 在隊列中 (還未開放簽核，需等前面關卡的待簽核者簽通過，下一個關卡的 queueing 才會變成 pending
    // - start 第一筆資料使用 (申請者)
    approval_status: "pending",
    // 簽核日期 (簽核狀態為 approved 或 rejected 才有資料)
    approval_date: "",
    // 簽核者名稱
    approver_name: "待簽核",
    // 簽核說明
    approver_comment: "",
    // 加簽者
    added_by: "test",
    // 加簽說明
    added_remark:
      "testestesttestestesttestestesttestestesttestestesttestestesttestestesttestestesttestestesttestestest",
    // 簽核附件
    attachments: [0, 1, 2],
  },
  {
    // (第一筆資料為申請者，建立第 0 關使用)
    id: "2222222",
    approval_status: "approved",
    approval_date: "2021-05-05 17:04:28",
    approver_name: "通過",
    approver_comment: "",
    added_by: "加簽者加簽者加簽者加簽者加簽者加簽者",
    added_remark:
      "testestesttestestesttestestesttestestesttestestesttestestesttestestesttestestesttestestesttestestest",
    attachments: [],
  },
  {
    // (第一筆資料為申請者，建立第 0 關使用)
    id: "3333333",
    approval_status: "rejected",
    approval_date: "2020-05-06 17:04:28",
    approver_name: "不通過",
    approver_comment: "",
    added_by: "不通過不通過",
    added_remark: "不通過不通過",
    attachments: [],
  },
  {
    // (第一筆資料為申請者，建立第 0 關使用)
    id: "4444444",
    approval_status: "queueing",
    approval_date: "",
    approver_name: "在隊列中",
    approver_comment: "",
    added_by: "",
    added_remark: "",
    attachments: [],
  },
  {
    // (第一筆資料為申請者，建立第 0 關使用)
    id: "",
    approval_status: "start",
    approval_date: "2020-09-30 17:04:28",
    approver_name: "綺多 Cheadle",
    approver_comment: `【急件】此為全面性的影響請安排急件處理。
  邏輯應調整為"如有多個電子表單附件，簽核時都要顯示出來"(跟目前【家班】還有【費用申請】的邏輯一樣) `,
    added_by: "",
    added_remark: "",
    attachments: [],
  },
  {
    // (第一筆資料為申請者，建立第 0 關使用)
    id: "",
    approval_status: "start",
    approval_date: "2020-09-30 17:04:28",
    approver_name: "綺多 Cheadle",
    approver_comment: `【急件】此為全面性的影響請安排急件處理。
  邏輯應調整為"如有多個電子表單附件，簽核時都要顯示出來"(跟目前【家班】還有【費用申請】的邏輯一樣) `,
    added_by: "",
    added_remark: "",
    attachments: [],
  },
];
