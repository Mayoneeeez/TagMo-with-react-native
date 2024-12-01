import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  Keyboard,
  ActivityIndicator,
  Platform,
  StatusBar,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { SquareButtonInHome } from "@/components/SquareButtonInHome";
import { TagMoHeader } from "@/components/header/TagMoHeader";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RectangleButton } from "@/components/RectangleButton";
import { router } from "expo-router";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import ShopListApi from "@/services/overpass/ShopListApi";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { usePushNotification } from "@/hooks/usePushNotification";
import { SETTINGS_MESSAGE } from "@/constants/message";

const NEXT_SCREEN: string = "Amount";

type ListItemProps = {
  shopName: string;
  shopLocationName: string;
  distance: number;
};

const ListItem: React.FC<ListItemProps> = ({ ...ListItemProps }) => (
  <View style={styles.listItem}>
    <Text style={styles.shopName}>{ListItemProps.shopName}</Text>
    <Text style={styles.shopLocationName}>
      {ListItemProps.shopLocationName}
    </Text>
    <Text style={styles.distance}>{ListItemProps.distance}m</Text>
  </View>
);

const Drawer = createDrawerNavigator();

const HomeMain: React.FC = () => {
  console.log("HomeMainが呼び出されてるか確認");
  const [searchText, setSearchText] = useState("");
  const [shopList, setShopList] = useState<ListItemProps[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  //useCurrentLocationは引数の変更によって新しい値を返す
  const { currentLocation } = useCurrentLocation(refreshing);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    setIsloading(true);
    const fetchShops = async () => {
      if (currentLocation.latitude && currentLocation.longitude) {
        const list = await ShopListApi.getShopList(searchText, currentLocation);
        setShopList(list);
        setIsloading(false);
      }
    };

    fetchShops();
  }, [currentLocation, searchText]);

  // const handleTouchOutside = () => {
  //   Keyboard.dismiss(); // キーボードを閉じる
  // };

  const onSettingsPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
    Keyboard.dismiss(); // キーボードを閉じる
  };

  return (
    // <TouchableWithoutFeedback onPress={handleTouchOutside}>
    <SafeAreaView style={styles.container}>
      <TagMoHeader
        hasLeftButton={false}
        hasRightButton={true}
        rightFontAwesomeName={"bars"}
        rightcolor={"black"}
        onRightPress={onSettingsPress}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <>
        {isLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={shopList}
            refreshing={refreshing}
            onRefresh={async () => {
              //更新で最新現在地の取得とショップ検索
              setRefreshing(true);
              setSearchText(searchText);
              setRefreshing(false);
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log(item.shopName);
                  navigation.navigate(NEXT_SCREEN, {
                    item: item,
                  });
                }}
              >
                <ListItem
                  shopName={item.shopName}
                  shopLocationName={item.shopLocationName}
                  distance={item.distance}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        )}
      </>
      <View style={styles.footer}>
        <SquareButtonInHome
          color="red"
          iconName="shopping-cart"
          text="EC"
          nextScreen={NEXT_SCREEN}
        />
        <SquareButtonInHome
          color="orange"
          iconName="commute"
          text="交通"
          nextScreen={NEXT_SCREEN}
        />
        <SquareButtonInHome
          color="green"
          iconName="help-outline"
          text="その他"
          nextScreen={NEXT_SCREEN}
        />
      </View>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

const HomeSettings: React.FC = () => {
  const navigation = useNavigation();
  const { onPressDone } = usePushNotification();
  const [onToggle, setOnToggle] = useState<boolean>(false);
  const [remindTime, setRemindTime] = useState(new Date());
  const onSettingsPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
    Keyboard.dismiss(); // キーボードを閉じる
  };

  const onSetPicker = (event: DateTimePickerEvent, remindTime?: Date) => {
    if (remindTime) {
      setRemindTime(remindTime);
    }
  };

  const onSettingsUpdate = async () => {
    onPressDone(onToggle, remindTime);
    Alert.alert(SETTINGS_MESSAGE.UPDATE_MESSAGE);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TagMoHeader
        hasLeftButton={false}
        hasRightButton={true}
        rightFontAwesomeName={"bars"}
        rightcolor={"black"}
        onRightPress={onSettingsPress}
      />
      <View style={styles.innerContainer}>
        <View style={styles.reminderRow}>
          <Text style={styles.reminderText}>{SETTINGS_MESSAGE.REMINDER}</Text>
          <Switch
            onChange={() => {
              setOnToggle(!onToggle);
            }}
            value={onToggle}
          />
          {onToggle ? (
            <DateTimePicker
              disabled={false}
              style={styles.inputDate}
              value={remindTime}
              mode="time"
              display="spinner"
              onChange={onSetPicker}
            />
          ) : (
            <DateTimePicker
              disabled={true}
              style={styles.inputDate}
              value={remindTime}
              mode="time"
              display="spinner"
              onChange={onSetPicker}
            />
          )}
        </View>
        <RectangleButton
          title={SETTINGS_MESSAGE.BUTTON_UPDATE}
          onPress={onSettingsUpdate}
        />
      </View>
    </SafeAreaView>
  );
};

const Home: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        drawerPosition: "right", // ドロワーを右から開く設定
      }}
    >
      <Drawer.Screen
        name="HomeMain"
        component={HomeMain}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={HomeSettings}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default Home;

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
  list: {
    flex: 1,
    marginHorizontal: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  shopName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  shopLocationName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left", // テキストを左寄せ
    flex: 1, // 幅を保つためにflexを使用
    marginLeft: 50, // 日付との間に幅を持たせる
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

  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: -100,
  },
  reminderRow: {
    flexDirection: "row", // 横並びにする
    alignItems: "center", // 垂直方向に中央揃え
    marginBottom: 20, // ボタンとの余白をつける
  },
  reminderText: {
    fontSize: 16,
    marginRight: 10, // トグルスイッチとの間に余白を追加
    fontWeight: "bold",
  },
  inputDate: {
    flex: 1,
    // borderColor: "#E0E0E0", // 淡い灰色の枠線
    // borderWidth: 1,
    // borderRadius: 8,
    // paddingVertical: 0,
    // paddingHorizontal: 12,
    // fontSize: 16,
    // backgroundColor: "#F9F9F9",
    height: 70,
  },
});
