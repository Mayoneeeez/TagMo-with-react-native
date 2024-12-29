import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ListItemProps = {
  shopName: string;
  shopLocationName: string;
  distance: number;
};

type SquareButtonProps = {
  color: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  text: string;
  nextScreen: string;
  doRegisterAmountFlag?: boolean;
  listItemProps?: ListItemProps;
};

export const SquareButtonInHome: React.FC<SquareButtonProps> = ({
  color,
  iconName,
  text,
  nextScreen,
  listItemProps,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePress = () => {
    const listItemProps: ListItemProps = {
      shopName: text,
      shopLocationName: "",
      distance: 0,
    };
    navigation.navigate(nextScreen, { item: listItemProps });
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
