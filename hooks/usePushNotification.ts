import { useCallback, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { COMMON_MESSAGE } from "@/constants/message";

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

  // 保存ボタンが押された時
  const onPressDone = useCallback(
    async (onToggle: boolean, remindTime: Date) => {
      // ①まず現在設定されているスケジュールを全て削除する
      await Notifications.cancelAllScheduledNotificationsAsync();

      // トグルがオフの時時間は設定しない
      if (onToggle) {
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
      }
    },
    [scheduleNotificationAsync],
  );

  return { granted, onPressDone };
};
