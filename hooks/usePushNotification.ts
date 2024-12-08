import { useCallback, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { COMMON_MESSAGE } from "@/constants/message";
import { ASYNC_STORAGE_KEYS } from "@/constants/asyncStorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePushNotification = () => {
  const [granted, setGranted] = useState(true);
  // const [scheduledNotifications, setScheduledNotifications] = useState<any[]>(
  //   [],
  // );

  // console.log(scheduledNotifications);

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

  // //
  // useEffect(() => {
  //   const getScheduledNotifications = async () => {
  //     const notifications =
  //       await Notifications.getAllScheduledNotificationsAsync();
  //     setScheduledNotifications(notifications);

  //     notifications.forEach((notification, index) => {
  //       const { trigger } = notification;

  //       // trigger.type を確認して処理を分岐
  //       if (trigger?.type === "calendar") {
  //         const calendarTrigger =
  //           trigger as Notifications.CalendarNotificationTrigger;
  //         const { dateComponents } = calendarTrigger;

  //         const year = dateComponents.year ?? new Date().getFullYear();
  //         const month = dateComponents.month ?? 1;
  //         const day = dateComponents.day ?? 1;
  //         const hour = dateComponents.hour ?? 0;
  //         const minute = dateComponents.minute ?? 0;
  //         const second = dateComponents.second ?? 0;

  //         const date = new Date(year, month - 1, day, hour, minute, second);

  //         console.log(`Notification ${index + 1}:`);
  //         console.log(`Title: ${notification.content.title}`);
  //         console.log(`Time: ${date.toLocaleString()}`);
  //         console.log("---");
  //       } else {
  //         console.log(`Notification ${index + 1}: Unsupported trigger type`);
  //       }
  //     });
  //   };

  //   getScheduledNotifications();
  // }, []);

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
