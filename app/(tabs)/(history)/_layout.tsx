import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "@/hooks/useColorScheme";
import History from "./history";
import HistoryDetail from "./historyDetail";
import { Stack, useRouter } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function HomeAmountLayout() {
  const colorScheme = useColorScheme();

  // const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider
      // ダークモード非対応
      // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      value={DefaultTheme}
    >
      <Stack initialRouteName="history">
        <Stack.Screen name="history" options={{ headerShown: false }} />
        <Stack.Screen name="historyDetail" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
