import "react-native-reanimated";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext, Tabs } from "expo-router";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { TagMoHeader } from "@/components/header/TagMoHeader";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

// コンポーネントのインポート
import BalanceCategory from "./balanceCategory";
import BalanceMethod from "./balanceMethod";
import BalanceTransition from "./balanceTransition";
import { BALANCE_TABS_LAYOUT } from "@/constants/message";

const { Navigator } = createMaterialTopTabNavigator();

const TopTabLayout = withLayoutContext(Navigator);

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function BalanceLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <TagMoHeader hasLeftButton={false} hasRightButton={false} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#f8f8f8", // タブバーの背景色
          },
          tabBarActiveTintColor: "#ff6347", // アクティブなタブのアイコンの色
          tabBarInactiveTintColor: "gray", // 非アクティブなタブのアイコンの色
        }}
      >
        {/* <Tabs.Screen name="balanceCategory" options={{ title: "分類" }} />
        <Tabs.Screen name="balanceMethod" options={{ title: "支払方法" }} />
        <Tabs.Screen name="balanceTransition" options={{ title: "支出推移" }} /> */}
        <Tabs.Screen
          name="balanceCategory"
          options={{
            headerShown: false,
            title: BALANCE_TABS_LAYOUT.BALANCE_CAETGORY_TITLE,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "list" : "list-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="balanceMethod"
          options={{
            headerShown: false,
            title: BALANCE_TABS_LAYOUT.BALANCE_METHOD_TITLE,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "card" : "card-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="balanceTransition"
          options={{
            headerShown: false,
            title: BALANCE_TABS_LAYOUT.BALANCE_TRANSITION_TITLE,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "analytics" : "analytics-outline"}
                color={color}
              />
            ),
          }}
        />
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
