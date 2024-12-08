import { useCallback, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { COMMON_MESSAGE } from "@/constants/message";
import { ASYNC_STORAGE_KEYS } from "@/constants/asyncStorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePushNotification = () => {
  const [granted, setGranted] = useState(true);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    const f = async (): Promise<void> => {
      // 現在の権限を取得
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // grantedは「許可済み」それ以外の時は、権限をリクエストする
      if (existingStatus !== "granted") {
        // 上の画像のメッセージが表示される
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      console.log("finalStatus = ");
      console.log(finalStatus);

      if (finalStatus !== "granted") {
        // 拒否された時のフラグを取得しておく
        setGranted(false);
        return;
      }
    };

    f();
  }, []);

  const scheduleNotificationAsync = useCallback(
    async (weekday: number, hour: number, minute: number) => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: COMMON_MESSAGE.NOTIFICATION_MESSAGE.TITLE,
          body: COMMON_MESSAGE.NOTIFICATION_MESSAGE.BODY,
        },
        trigger: {
          weekday,
          hour,
          minute,
          repeats: true,
          channelId: "new-emails",
        },
      });
    },
    [],
  );

  // プッシュ通知をONにする
  const onAlarm = async (alarmFlag: boolean, remindTime: Date) => {
    // まず現在設定されているスケジュールを全て削除
    await Notifications.cancelAllScheduledNotificationsAsync();

    // 日~月に設定する場合
    await Promise.all(
      [1, 2, 3, 4, 5, 6, 7].map(async (item) => {
        await scheduleNotificationAsync(
          item,
          remindTime.getHours(),
          remindTime.getMinutes(),
        );
      }),
    );

    // 通知時間保存
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.REMIND_TIME,
      remindTime.toISOString(),
    );

    // 通知設定状態保存
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.ALARM_FLAG,
      alarmFlag.toString(),
    );
  };

  // プッシュ通知をOFFにする
  const offAlarm = async (alarmFlag: boolean) => {
    // 現在設定されているスケジュールを全て削除
    await Notifications.cancelAllScheduledNotificationsAsync();

    // 通知設定状態保存
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.ALARM_FLAG,
      alarmFlag.toString(),
    );
  };

  return { granted, onAlarm, offAlarm };
};
