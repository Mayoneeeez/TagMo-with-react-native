// メッセージをまとめる

export const COMMON_MESSAGE = {
  APP_TITLE: "TagMo",
  BUTTON: {
    PATTERN_YES: "OK",
    PATTERN_NO: "CANCEL",
  },
  NOTIFICATION_MESSAGE: {
    TITLE: "今日使ったお金は記録した？",
    BODY: "毎日コツコツ記録していこう",
  },
} as const;

export const HISTORY_MESSAGE = {
  BUTTON_DELETE: {
    DISPLAY: "削除",
    CLICK_START: {
      HEADER: "データ削除",
      MESSAGE: "選択されたデータが削除されますが、よろしいですか？",
    },
    CLICK_END: {
      MESSAGE: "削除が完了しました",
    },
  },

  SEARCH_PERIOD_MESSAGE: {
    START_DATE: "表示期間開始日",
    END_DATE: "表示期間終了日",
  },

  MORDAL_MESSAGE: {
    CLOSE: "閉じる",
  },
} as const;

export const HISTORYDETAIL_MESSAGE = {
  TITLE: "項目詳細",
  label_1: "日付",
  label_2: "金額",
  label_3: "カテゴリ",
  label_4: "メモ",
  PLAICEHOLDER_MEMO: "メモを入力",
  BUTTON_UPDATE: {
    DISPLAY: "保存",
    CLICK_START: {
      HEADER: "入力内容の保存",
      MESSAGE: "入力内容を保存しますか？",
    },
    CLICK_END: {
      MESSAGE: "保存が完了しました",
    },
  },
  BUTTON_DELETE: {
    CLICK_START: {
      HEADER: "項目削除",
      MESSAGE: "この項目を削除しますか？",
    },
    CLICK_END: {
      MESSAGE: "削除が完了しました",
    },
  },
} as const;

export const SETTINGS_MESSAGE = {
  UPDATE_MESSAGE: "設定を更新しました",
  REMINDER: "リマインダ",
  BUTTON_UPDATE: "設定更新",
};
