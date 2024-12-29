import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from "react-native";
import { SquareButtonInAmount } from "@/components/SquareButtonInAmount";
import { RouteProp, useRoute } from "@react-navigation/native";
import { HOME_VALUE } from "@/constants/appConstants";
import { CommonHeader } from "@/components/header/CommonHeader";
import { AMOUNT_MESSAGE } from "@/constants/message";

const NEXT_SCREEN = "Category";

type ListItemProps = {
  shopName: string;
  shopLocationName: string;
};

type RootParamList = {
  Home: undefined;
  Amount: { item: ListItemProps };
};

type RegisteredProps = {
  transaction_date?: Date;
  payment_location: string;
  category: string;
  payment_method: string;
  amount: string;
};

// const ListItem: React.FC<ListItemProps> = ({ title, distance }) => (
//   <View style={styles.listItem}>
//     <Text style={styles.title}>{title}</Text>
//     <Text style={styles.distance}>{distance}</Text>
//   </View>
// );

const Amount: React.FC = ({ navigation }: any) => {
  const [amount, setAmount] = useState(""); //入力金額
  const route = useRoute<RouteProp<RootParamList, "Amount">>(); //Home画面から変数を受ける

  const [registeredProps, setRegisteredProps] = useState<RegisteredProps>({
    payment_location:
      (route.params.item.shopName ?? "") +
      " " +
      (route.params.item.shopLocationName ?? ""),
    category: "",
    payment_method: "",
    amount: "0",
  });

  useEffect(() => {
    setRegisteredProps((prev) => ({
      ...prev,
      amount: amount,
    }));
  }, [amount]);

  const squareButtonColor: string = "#495B6D";

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <CommonHeader
          title={AMOUNT_MESSAGE.TITLE}
          hasLeftButton={true}
          hasRightButton={false}
          leftFontAwesomeName={"chevron-left"}
          leftcolor={"black"}
          onLeftPress={() => navigation.pop()}
        />
        <View style={styles.amountContainer}>
          <Text style={styles.currency}>¥</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            placeholder={"0"}
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <View style={styles.buttonGroup}>
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName={HOME_VALUE.AMOUNT.BUTTON_1.ICON_NAME}
            text={HOME_VALUE.AMOUNT.BUTTON_1.TEXT}
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName={HOME_VALUE.AMOUNT.BUTTON_2.ICON_NAME}
            text={HOME_VALUE.AMOUNT.BUTTON_2.TEXT}
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName={HOME_VALUE.AMOUNT.BUTTON_3.ICON_NAME}
            text={HOME_VALUE.AMOUNT.BUTTON_3.TEXT}
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
        </View>
        <View style={styles.buttonGroup}>
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName={HOME_VALUE.AMOUNT.BUTTON_4.ICON_NAME}
            text={HOME_VALUE.AMOUNT.BUTTON_4.TEXT}
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName={HOME_VALUE.AMOUNT.BUTTON_5.ICON_NAME}
            text={HOME_VALUE.AMOUNT.BUTTON_5.TEXT}
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName={HOME_VALUE.AMOUNT.BUTTON_6.ICON_NAME}
            text={HOME_VALUE.AMOUNT.BUTTON_6.TEXT}
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
        </View>
        <View style={styles.buttonGroup}>
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName={HOME_VALUE.AMOUNT.BUTTON_7.ICON_NAME}
            text={HOME_VALUE.AMOUNT.BUTTON_7.TEXT}
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName={HOME_VALUE.AMOUNT.BUTTON_8.ICON_NAME}
            text={HOME_VALUE.AMOUNT.BUTTON_8.TEXT}
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
          <SquareButtonInAmount
            color={squareButtonColor}
            iconName={HOME_VALUE.AMOUNT.BUTTON_9.ICON_NAME}
            text={HOME_VALUE.AMOUNT.BUTTON_9.TEXT}
            nextScreen={NEXT_SCREEN}
            registeredProps={registeredProps}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  microphoneIcon: {
    marginLeft: 10,
  },
  list: {
    flex: 1,
    marginHorizontal: 16,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 16,
  },
  distance: {
    color: "#888",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },

  // Amountのスタイル
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  amountContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 40,
    backgroundColor: "#495B6D",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  currency: {
    color: "#fff",
    fontSize: 60,
    marginRight: 10,
  },
  amountInput: {
    color: "#fff",
    fontSize: 60,
    textAlign: "center",
  },
});

export default Amount;
