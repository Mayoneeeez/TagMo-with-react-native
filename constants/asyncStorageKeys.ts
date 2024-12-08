// Async Storageで保存されている値のkeyを列挙する

export const ASYNC_STORAGE_KEYS = {
  REMIND_TIME: "remindTime", // 設定済みのプッシュ通知時間
  ALARM_FLAG: "alarmFlag", // プッシュ通知の有効/無効
} as const;
