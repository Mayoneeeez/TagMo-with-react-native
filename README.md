# TagMo タグ型家計簿アプリ

## コンセプト

- Tag 型家計簿アプリ
- 位置情報による、小売店・飲食店などのタグ付けを用いて、支出の記録を容易にする
- シンプルで洗練された UI、あくまで使いやすく

## 画面デザイン

- Home
  <img src="https://github.com/KugoKento/store-picture/blob/main/Home.jpg" width="40%">

- Settings
  <img src="https://github.com/KugoKento/store-picture/blob/main/Settings.jpg" width="40%">

- Amount
  <img src="https://github.com/KugoKento/store-picture/blob/main/Amount.jpg" width="40%">

- History
  <img src="https://github.com/KugoKento/store-picture/blob/main/History.jpg" width="40%">

- Balance
  <img src="https://github.com/KugoKento/store-picture/blob/main/Balance.jpg" width="40%">

## 画面遷移

## 機能一覧

- Home
  - 位置情報による近隣の小売店・飲食店などの表示
  - 店舗、決済手段を指定して、金額・利用カテゴリを入力し支払い記録保存
  - Settingsに遷移し、プッシュ通知の設定
- History
  - 保存した支払い記録の閲覧
  - 表示期間指定
  - 指定された表示期間の合計金額表示
  - 支払い記録の編集
- Balance
  下記の種類のタブを表示
  - 分類
    - カテゴリ毎の合計金額と比率を表す円グラフの表示
  - 支払い方法
    - 支払い方法毎の合計金額と比率を表す円グラフの表示
  - 支出推移
  　- 年毎の支出遷移を表示


## 主な技術構成

- React Native
  - React Navigation
  - react-loading → react native では利用できないため、react native の機能で実装
  - react-native-community/datetimepicker(カレンダー機能)
  - Async Storage(プッシュ通知のON/OFF、通知時間の保存に利用)
- Typescript
- expo
  - expo-router(画面遷移)
  - expo-sqlite(DB)
  - expo-location(位置情報取得)
  - expo-notifications(プッシュ通知)
- Overpass API(OpenStreetMap のデータを扱う API)
- axios(overpass api のための HTTP メソッド)

使用予定あり

- Github Actions
- Jest(テスト用)

## メモ

一般的な支出管理アプリとは、予算の設定や進捗管理ができるようですね
無駄遣いを防ぐ機能があるとなおよい。
昔あった clarity money？とかいうやつはサブスクを勝手に解約してくれたりしたらしい。
（その後 GS に何百億とかで買われた）
将来的には、位置情報をもとにした行動アドバイスがあるといいよね。
例　スーパー行くならバローよりろぴあ行った時の方が平均 ○%安いですよ的な

## インストール方法
