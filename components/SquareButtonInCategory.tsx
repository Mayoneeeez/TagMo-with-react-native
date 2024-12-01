import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoadListContext } from "@/app/_layout";
import DBApi from "@/services/database/DBApi";

type RegisteredProps = {
  transaction_date: Date;
  payment_location: string;
  category: string;
  payment_method: string;
  amount: string;
};

type SquareButtonProps = {
  color: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  text: string;
  registeredProps?: RegisteredProps;
};

export const SquareButtonInCategory: React.FC<SquareButtonProps> = ({
  color,
  iconName,
  text,
  registeredProps,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { loadList, setLoadList } = useContext(LoadListContext);

  const handlePress = async () => {
    navigation.popToTop();
    //undefinedがありえるため避けた
    if (registeredProps === undefined) {
      return;
    }
    registeredProps.category = text;
    console.log("DBに登録する項目");
    console.log(registeredProps);
    console.log("registeredProps : " + registeredProps);
    await DBApi.registerAmountList(registeredProps);
    console.log("データベース登録が実行されているか確認");
    console.log();
    console.log(await DBApi.getAmountList(null, null));
    console.log();
    console.log("SquareButtonのloadList確認");
    console.log(loadList);
    //history, balanceのリストを更新するため一時的に値を変更
    setLoadList(!loadList);
    console.log(loadList);
    console.log();
    Alert.alert("入力完了", "入力が完了しました。");
  };
  return (
    <TouchableOpacity
      style={[styles.squareButton, { borderColor: color }]}
      onPress={handlePress}
    >
      <MaterialIcons name={iconName} size={45} color={color} />
      <Text style={[styles.squareButtonText, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  squareButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 122,
    height: 120,
    borderRadius: 10,
    borderWidth: 6,
  },
  squareButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
