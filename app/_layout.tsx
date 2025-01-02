import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/services/database";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const LoadListContext = createContext({
  loadList: false,
  setLoadList: (value: boolean) => {},
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  //金額入力したらすべてのリストが再ロードされるようにする
  const [loadList, setLoadList] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <LoadListContext.Provider value={{ loadList, setLoadList }}>
        <ThemeProvider
          // ダークモード非対応
          // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          value={DefaultTheme}
        >
          <SQLiteProvider databaseName="tagmo.db" onInit={migrateDbIfNeeded}>
            <Stack>
              {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              {/* <Stack.Screen name="+not-found" /> */}
            </Stack>
          </SQLiteProvider>
        </ThemeProvider>
      </LoadListContext.Provider>
    </NavigationContainer>
  );
}
