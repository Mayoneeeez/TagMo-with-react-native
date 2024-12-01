import "react-native-reanimated";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext, Tabs } from "expo-router";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { TagMoHeader } from "@/components/header/TagMoHeader";

// コンポーネントのインポート
import BalanceCategory from "./balanceCategory";
import BalanceMethod from "./balanceMethod";
import BalanceTransition from "./balanceTransition";

const { Navigator } = createMaterialTopTabNavigator();

const TopTabLayout = withLayoutContext(Navigator);

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function BalanceLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <TagMoHeader hasLeftButton={false} hasRightButton={false} />
      <Tabs>
        <Tabs.Screen name="balanceCategory" options={{ title: "分類" }} />
        <Tabs.Screen name="balanceMethod" options={{ title: "支払方法" }} />
        <Tabs.Screen name="balanceTransition" options={{ title: "支出推移" }} />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contents: {
    flex: 1,
  },
});
