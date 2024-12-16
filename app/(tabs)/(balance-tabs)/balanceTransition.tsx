import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import RNPickerSelect from "react-native-picker-select";
import DBApi from "@/services/database/DBApi";
import utility from "@/utils/Utility";
import { LoadListContext } from "@/app/_layout";

type ListItemProps = {
  month: string;
  total_amount_by_month: number;
};

const chartData = {
  labels: [
    "1月", // January
    "2月", // February
    "3月", // March
    "4月", // April
    "5月", // May
    "6月", // June
    "7月", // July
    "8月", // August
    "9月", // September
    "10月", // October
    "11月", // November
    "12月", // December
  ],

  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ["月毎の合計金額"], // optional
};

const screenWidth = Dimensions.get("window").width;

const ListItem: React.FC<ListItemProps> = ({ ...ListItemProps }) => (
  <View style={styles.listItem}>
    <Text style={styles.month} numberOfLines={1} ellipsizeMode="tail">
      {ListItemProps.month}
    </Text>
    <Text
      style={styles.total_amount_by_month}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      ¥{ListItemProps.total_amount_by_month}
    </Text>
  </View>
);

const BlanceTransition: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );
  const { loadList } = useContext(LoadListContext);

  const years = Array.from(new Array(100), (val, index) =>
    (new Date().getFullYear() - index).toString(),
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [listData, setListData] = useState<ListItemProps[]>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const renderItem = useCallback(
    ({ index }: { index: number }) => (
      <ListItem
        month={chartData.labels[index]}
        total_amount_by_month={chartData.datasets[0].data[index]}
      />
    ),
    [],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function fetch() {
      // データを初期化
      const result: ListItemProps[] =
        await DBApi.getTotalAmountByYear(selectedYear);

      // console.log();
      // console.log();
      // console.log(result);
      // console.log();
      // console.log();
      for (let i = 1; i <= 12; i++) {
        const foundItem = result.find((item) => Number(item.month) === i); // i月のアイテムを探す
        if (foundItem) {
          chartData.datasets[0].data[i - 1] = Number(
            foundItem.total_amount_by_month,
          ); // 見つかった場合、データを代入
        } else {
          chartData.datasets[0].data[i - 1] = 0;
        }

        console.log(chartData.datasets[0].data[i - 1]); // 代入後のデータを表示
        console.log(foundItem ? foundItem.total_amount_by_month : "Not found"); // 見つかった場合の値を表示
      }
      console.log();
      console.log();
      console.log("chartData = ", chartData);
      console.log(
        "data = ",
        chartData.datasets[0].data,
        " ",
        typeof chartData.datasets[0].data[0],
      );
      console.log();
      console.log("selectedYear = ", selectedYear);
      console.log();
      setListData(result);
    }
    console.log();
    console.log("selectedYear = ", selectedYear);
    console.log();
    fetch();
  }, [selectedYear, loadList]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {}, [listData]); //データ取得後画面を再レンダリングする

  return (
    <SafeAreaView style={styles.container}>
      {/* <DateTimePicker
        value={thisYear}
        mode="date"
        display="spinner"
        onChange={() => {}}
      /> */}
      <RNPickerSelect
        style={{
          inputIOS: styles.inputIOS,
          inputAndroid: styles.inputAndroid,
        }}
        placeholder={{
          label: "表示する年を選んでください",
          value: null,
          color: "#9EA0A4",
        }}
        value={selectedYear}
        onValueChange={(value) => {
          setSelectedYear(value);
        }}
        items={years.map((year) => ({ label: year, value: year }))}
      />
      <View style={styles.chartBackground}>
        <LineChart
          data={chartData}
          width={screenWidth}
          height={180}
          chartConfig={{
            backgroundColor: "#eff3ff",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#eff3ff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            decimalPlaces: 0,
          }}
        />
        {/* <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="¥"
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#eff3ff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        /> */}
      </View>
      <FlatList
        data={chartData.labels}
        renderItem={renderItem}
        keyExtractor={(index) => index.toString()}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  chartBackground: {
    backgroundColor: "white",
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
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  month: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left", // テキストを左寄せ
    flex: 1, // 幅を保つためにflexを使用
  },

  total_amount_by_month: {
    fontSize: 16,
    flex: 1, // 幅を保つためにflexを使用
    textAlign: "right", // テキストを左寄せ
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
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
  inputIOS: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    alignSelf: "center",
    width: "90%",
    marginVertical: 10,
    pointerEvents: "box-none",
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    alignSelf: "center",
    width: "90%",
    marginVertical: 10,
  },
  // Amountのスタイル
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  amountContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 40,
    backgroundColor: "#495B6D",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  currency: {
    color: "#fff",
    fontSize: 60,
    marginRight: 10,
  },
  amountInput: {
    color: "#fff",
    fontSize: 60,
    textAlign: "center",
  },
});

export default BlanceTransition;
