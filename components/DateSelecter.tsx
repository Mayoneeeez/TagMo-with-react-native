import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { HISTORY_MESSAGE } from "@/constants/message";

type DateSelecterProps = {
  onDatesChange: (startDate: Date | null, endDate: Date | null) => void;
};

export const DateSelecter: React.FC<DateSelecterProps> = (
  dateSelecterProps: DateSelecterProps,
) => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"start" | "end" | null>(null);

  const onChangeStart = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ): void => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  const onChangeEnd = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ): void => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  const onModalOpen = (modalType: "start" | "end" | null): void => {
    setModalVisible(true);
    setModalType(modalType);
  };

  const onModalClose = (): void => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Group 1: Start Date */}
      <View style={styles.group}>
        <Text style={styles.label}>
          {HISTORY_MESSAGE.SEARCH_PERIOD_MESSAGE.START_DATE}
        </Text>
        <Button
          onPress={() => {
            onModalOpen("start");
          }}
          title={startDate.toLocaleDateString()}
          color="#4CAF50"
        />
        {modalType === "start" && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onModalClose}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContentStart}>
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="spinner"
                  onChange={onChangeStart}
                  textColor="#000" // 常に黒に設定
                />
                <Button
                  title={HISTORY_MESSAGE.MORDAL_MESSAGE.CLOSE}
                  onPress={() => {
                    setModalVisible(false);
                    dateSelecterProps.onDatesChange(startDate, endDate);
                  }}
                  color="#4CAF50"
                />
              </View>
            </View>
          </Modal>
        )}
      </View>

      {/* Group 2: End Date */}
      <View style={styles.group}>
        <Text style={styles.label}>
          {HISTORY_MESSAGE.SEARCH_PERIOD_MESSAGE.END_DATE}
        </Text>
        <Button
          onPress={() => {
            onModalOpen("end");
          }}
          title={endDate.toLocaleDateString()}
          color="#F44336"
        />
        {modalType === "end" && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onModalClose}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContentEnd}>
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="spinner"
                  onChange={onChangeEnd}
                  textColor="#000" // 常に黒に設定
                />
                <Button
                  title={HISTORY_MESSAGE.MORDAL_MESSAGE.CLOSE}
                  onPress={() => {
                    setModalVisible(false);
                    dateSelecterProps.onDatesChange(startDate, endDate);
                  }}
                  color="#F44336"
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
  },
  group: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 5,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentStart: {
    width: 300,
    padding: 16,
    backgroundColor: "#e6ffe6",
    borderRadius: 8,
    alignItems: "center",
  },
  modalContentEnd: {
    width: 300,
    padding: 16,
    backgroundColor: "#f5dedc",
    borderRadius: 8,
    alignItems: "center",
  },
});
