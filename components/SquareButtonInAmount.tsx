import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RegisteredProps = {
  transaction_date?: Date;
  payment_location: string;
  category: string;
  payment_method: string;
  amount: string;
};

type SquareButtonProps = {
  color: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  text: string;
  nextScreen: string;
  registeredProps: RegisteredProps;
};

export const SquareButtonInAmount: React.FC<SquareButtonProps> = ({
  color,
  iconName,
  text,
  nextScreen,
  registeredProps,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  // const { loadList, setLoadList } = useContext(LoadListContext);

  const handlePress = async () => {
    registeredProps.payment_method = text;
    navigation.navigate(nextScreen, { registerItems: registeredProps });
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
