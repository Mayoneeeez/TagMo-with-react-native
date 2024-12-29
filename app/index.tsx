import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Index = () => {
  const colorScheme = useColorScheme();
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
  return <Redirect href="/(tabs)/(home)/home" />;
  // return <Redirect href="auth/login" />;
};

export default Index;
