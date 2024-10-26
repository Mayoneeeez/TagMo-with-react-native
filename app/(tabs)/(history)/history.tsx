import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  FlatList,
} from "react-native";
import { TagMoHeader } from "@/components/header/TagMoHeader";
import { LoadListContext } from "@/app/_layout";
import DBApi from "@/services/database/DBApi";
import { DateSelecter } from "@/components/DateSelecter";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import utility from "@/utils/Utility";

type ListItemProps = {
  id: string;
  transaction_date: Date;
  category: string;
  payment_location: string;
  payment_method: string;
  amount: string;
  memo: string;
};

// 日付をyyyy-mm-dd形式に変換する関数
const formatDateToMyFormat = (dateTime: Date) => {
  const dateString = dateTime.toString();
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  // const hours = String(date.getHours()).padStart(2, "0");
  // const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const ListItem: React.FC<ListItemProps> = ({ ...ListItemProps }) => (
  <View style={styles.listItemFirst}>
    {/* <Text style={styles.category}>{category}</Text> */}
    <Text
      style={styles.transaction_date}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {formatDateToMyFormat(ListItemProps.transaction_date)}
    </Text>
    <View style={styles.listItemSecond}>
      <Text
        style={styles.payment_location}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {ListItemProps.payment_location}
      </Text>
      <Text style={styles.memo} numberOfLines={1} ellipsizeMode="tail">
        {ListItemProps.memo}
      </Text>
      <Text style={styles.amount} numberOfLines={1} ellipsizeMode="tail">
        ¥{utility.formatNumberWithCommas(ListItemProps.amount)}
      </Text>
    </View>
  </View>
);

const History: React.FC = () => {
  // const [searchText, setSearchText] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [listData, setListData] = useState<ListItemProps[]>([]);
  const [totalAmount, setTotalAmount] = useState("0");
  const [refreshing, setRefreshing] = useState(false); //Historyリストを更新するフラグ
  const { loadList } = useContext(LoadListContext);
  const [dates, setDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  });

  useEffect(() => {
    async function setup() {
      try {
        // データベースからデータを取得
        const result: ListItemProps[] = await DBApi.getAmountList(
          dates.startDate,
          dates.endDate,
        );

        const sumAmount = (result: ListItemProps[]) => {
          const sum: number = result.reduce(
            (sum, item) => sum + Number(item.amount),
            0,
          );
          return sum.toString();
        };

        // フォーマットされたデータをセット
        setListData(result);
        setTotalAmount(sumAmount(result));
        setRefreshing(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    setup(); // setup関数を呼び出して非同期処理を開始
  }, [refreshing, loadList, dates]); // `refreshing` または `loadList` が変わったときに実行される

  const handleDatesChange = (startDate: Date | null, endDate: Date | null) => {
    setDates({ startDate, endDate });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TagMoHeader hasLeftButton={false} hasRightButton={false} />
      <View>
        <DateSelecter onDatesChange={handleDatesChange} />
      </View>
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountLabel}>合計金額：</Text>
        <Text
          style={styles.totalAmountText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          ¥ {utility.formatNumberWithCommas(totalAmount)}
        </Text>
      </View>
      <FlatList
        data={listData}
        refreshing={refreshing}
        renderItem={({ item }: { item: ListItemProps }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("categoryから値遅れているか確認");
              console.log(item);
              navigation.navigate("HistoryDetail", {
                item: item,
              });
            }}
          >
            <ListItem
              transaction_date={item.transaction_date}
              amount={item.amount}
              payment_location={item.payment_location}
              id={""}
              category={""}
              payment_method={""}
              memo={item.memo}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id} // 一意のキーを指定
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  totalAmountContainer: {
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: "row", // 横方向にアイテムを配置
    justifyContent: "space-between", // スペースを均等に配置
    alignItems: "center", // 垂直方向に中央揃え
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "black", // 下線のスタイルを追加
    overflow: "hidden", // はみ出る部分を隠す
  },
  totalAmountLabel: {
    flex: 2, // ラベルの幅を少し狭くする
    fontSize: 20, // ラベルの文字サイズを大きくする
    fontWeight: "bold",
    color: "#333",
    textAlign: "left", // テキストを左寄せ
  },
  totalAmountText: {
    flex: 4, // 金額の幅を広くする
    fontSize: 30, // 金額の文字をさらに大きくする
    fontWeight: "bold",
    color: "#333",
    textAlign: "right", // テキストを右寄せ
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
  listItemFirst: {
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  listItemSecond: {
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  transaction_date: {
    fontSize: 16,
  },

  payment_location: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left", // テキストを左寄せ
    flex: 2, // 幅を保つためにflexを使用
    marginLeft: 20, // 日付との間に幅を持たせる
  },
  memo: {
    fontSize: 14, // 小さくする
    color: "#aaa", // 色を薄くする（例えば薄いグレー）
    flex: 2, // 幅を保つためにflexを使用
    textAlign: "left", // テキストを左寄せ
    alignSelf: "center", // 中央に揃える
  },
  amount: {
    fontSize: 16,
    flex: 1, // 幅を保つためにflexを使用
    textAlign: "right", // テキストを右寄せ
  },

  rowBack: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%", // 高さをリストアイテムに合わせる
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  backTextWhite: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default History;
