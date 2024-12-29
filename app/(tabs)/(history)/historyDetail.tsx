/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonHeader } from "@/components/header/CommonHeader";
import { HOME_VALUE } from "@/constants/appConstants";
import { COMMON_MESSAGE, HISTORYDETAIL_MESSAGE } from "@/constants/message";
import DBApi from "@/services/database/DBApi";
import { LoadListContext } from "@/app/_layout";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import utility from "@/utils/Utility";
import { useLocalSearchParams, useRouter } from "expo-router";
import RNPickerSelect from "react-native-picker-select";

type RegisteredProps = {
  id: string;
  transaction_date: Date;
  payment_location: string;
  category: string;
  payment_method: string;
  amount: string;
  memo: string;
};

const HistoryDetail: React.FC = () => {
  const { items } = useLocalSearchParams();
  const item: RegisteredProps = items ? JSON.parse(items as string) : null;
  const router = useRouter();

  const { loadList, setLoadList } = useContext(LoadListContext);
  const [formData, setFormData] = useState<RegisteredProps>({
    id: item.id,
    transaction_date: new Date(item.transaction_date), // デフォルトで現在の日付をセット
    payment_location: item.payment_location,
    category: item.category,
    payment_method: item.payment_method,
    amount: item.amount,
    memo: item.memo,
  });

  const handleFieldChange = (field: keyof RegisteredProps, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const date = selectedDate || item.transaction_date;
    handleFieldChange("transaction_date", date);
  };

  const onUpdateHistory = async () => {
    Alert.alert(
      HISTORYDETAIL_MESSAGE.BUTTON_UPDATE.CLICK_START.HEADER,
      HISTORYDETAIL_MESSAGE.BUTTON_UPDATE.CLICK_START.MESSAGE,
      [
        {
          text: COMMON_MESSAGE.BUTTON.PATTERN_NO,
          style: "cancel",
        },
        {
          text: COMMON_MESSAGE.BUTTON.PATTERN_YES,
          onPress: async () => {
            await DBApi.updateAmountList(formData);
            await setLoadList(!loadList);
            // await navigation.navigate("History");
            await router.back();
            await Alert.alert(
              HISTORYDETAIL_MESSAGE.BUTTON_UPDATE.CLICK_END.MESSAGE.toString(),
            );
          },
        },
      ],
      { cancelable: false },
    );
  };

  const onDeleteHistory = async () => {
    Alert.alert(
      HISTORYDETAIL_MESSAGE.BUTTON_DELETE.CLICK_START.HEADER,
      HISTORYDETAIL_MESSAGE.BUTTON_DELETE.CLICK_START.MESSAGE,
      [
        {
          text: COMMON_MESSAGE.BUTTON.PATTERN_NO,
          style: "cancel",
        },
        {
          text: COMMON_MESSAGE.BUTTON.PATTERN_YES,
          onPress: async () => {
            await DBApi.deleteAmountList(item.id);
            await setLoadList(!loadList);
            // await navigation.navigate("History");
            await router.back();
            await Alert.alert(
              HISTORYDETAIL_MESSAGE.BUTTON_DELETE.CLICK_END.MESSAGE,
            );
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <CommonHeader
          title={HISTORYDETAIL_MESSAGE.TITLE}
          hasLeftButton={true}
          hasRightButton={true}
          leftFontAwesomeName={"chevron-left"}
          leftcolor={"black"}
          onLeftPress={() => router.back()}
          rightFontAwesomeName={"trash"}
          rightcolor={"red"}
          onRightPress={onDeleteHistory}
        />
        <View style={styles.inputRow}>
          <Text style={styles.label}>{HISTORYDETAIL_MESSAGE.label_1}:</Text>
          <View style={styles.datePickerWrapper}>
            <DateTimePicker
              style={styles.inputDate}
              value={formData.transaction_date}
              mode="date"
              display={Platform.OS === "ios" ? "compact" : "default"}
              onChange={onChangeDate}
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>{HISTORYDETAIL_MESSAGE.label_2}:</Text>
          <TextInput
            style={styles.input}
            value={formData.amount}
            placeholder={utility.formatNumberWithCommas(item.amount)}
            keyboardType="numeric"
            // placeholderTextColor="#888"
            onChangeText={(value) => handleFieldChange("amount", value)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>{HISTORYDETAIL_MESSAGE.label_3}:</Text>
          <RNPickerSelect
            items={[
              {
                label: HOME_VALUE.CATEGORY.BUTTON_1.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_1.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_2.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_2.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_3.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_3.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_4.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_4.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_5.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_5.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_6.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_6.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_7.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_7.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_8.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_8.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_9.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_9.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_10.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_10.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_11.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_11.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_12.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_12.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_13.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_13.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_14.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_14.TEXT,
              },
              {
                label: HOME_VALUE.CATEGORY.BUTTON_15.TEXT,
                value: HOME_VALUE.CATEGORY.BUTTON_15.TEXT,
              },
            ]}
            placeholder={{
              label: item.category,
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputIOS: styles.input,
            }}
            value={formData.category}
            onValueChange={(value) => handleFieldChange("category", value)}
          />
        </View>

        <View style={styles.memoContainer}>
          <Text style={styles.label}>{HISTORYDETAIL_MESSAGE.label_4}:</Text>
          <TextInput
            style={styles.memoInput}
            value={formData.memo}
            placeholder={HISTORYDETAIL_MESSAGE.PLAICEHOLDER_MEMO}
            multiline
            placeholderTextColor="#888"
            onChangeText={(value) => handleFieldChange("memo", value)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={onUpdateHistory}
          >
            <Text style={styles.buttonText}>
              {HISTORYDETAIL_MESSAGE.BUTTON_UPDATE.DISPLAY}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF", // 背景を白に
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
  },
  datePickerWrapper: {
    height: 70,
  },
  dateButton: {
    color: "#888",
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    width: 80,
    color: "#333",
    fontWeight: "bold", // ラベルを太字に
  },
  input: {
    flex: 1,
    borderColor: "#E0E0E0", // 淡い灰色の枠線
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    pointerEvents: "box-none",
  },
  inputDate: {
    flex: 1,
    borderColor: "#E0E0E0", // 淡い灰色の枠線
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10, // 上下の余白を少し小さくする
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    height: 40, // 高さを小さくしてコンパクトに
  },
  memoContainer: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
  },
  memoInput: {
    flex: 1,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlignVertical: "top",
    backgroundColor: "#F9F9F9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4CAF50", // 保存ボタンを緑に
  },
  deleteButton: {
    backgroundColor: "#F44336", // 削除ボタンを赤に
  },
});

export default HistoryDetail;
