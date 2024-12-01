import { SQLiteDatabase } from "expo-sqlite";

//ここは開発が終わったら修正する

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  console.log("DBindexの実行");
  const DATABASE_VERSION = 1;

  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  console.log("DBindexの実行");
  let currentDbVersion = result ? result.user_version : 0; //resultが定義されていれば前代入、そうでなければ0代入

  // 開発用にDBはリセットされるようにする
  // 開発用データを挿入する
  // if (currentDbVersion >= DATABASE_VERSION) {
  //   return;
  // }
  if (/*currentDbVersion === 0*/ true) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS amount_list;
      CREATE TABLE amount_list (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , 
        transaction_date TIMESTAMP NOT NULL, 
        payment_location TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        category TEXT NOT NULL,
        amount INTEGER NOT NULL,
        memo TEXT
        );
    `);

    await insertSampleData(db); // データ挿入関数を呼び出す

    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  console.log("DBindexの実行");
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  console.log("DBindexの実行");
}

// 日付を1日ずつずらして10000個のデータを挿入する関数
async function insertSampleData(db: SQLiteDatabase) {
  const startDate = new Date(); // 現在の日付から始める
  const numberOfRecords = 20;
  const paymentMethods = [
    "現金",
    "クレジット",
    "QRコード",
    "交通系IC",
    "口座振込",
    "立て替え",
    "POINT",
    "商品券",
    "その他",
  ];
  const categories = [
    "食費",
    "日用品",
    "被服費",
    "娯楽",
    "医療",
    "教育",
    "その他",
  ];

  const inserts = [];

  // for (let i = 0; i < numberOfRecords; i++) {
  //   const transactionDate = new Date(startDate);
  //   transactionDate.setDate(startDate.getDate() + i);

  //   const paymentMethod = paymentMethods[i % paymentMethods.length];
  //   const category = categories[i % categories.length];
  //   const amount = Math.floor(Math.random() * 10000) + 1; // 1 から 10000 のランダムな金額

  //   inserts.push(`
  //     (${i + 1}, '${transactionDate.toISOString()}', 'Location ${
  //       i + 1
  //     }', '${paymentMethod}', '${category}', ${amount})
  //   `);
  // }

  for (let i = 0; i < numberOfRecords; i++) {
    // ランダムに年と月を生成 (例: 2020年から2024年の年、1月から12月の月)
    const randomYear = Math.floor(Math.random() * 5) + 2020; // 2020年から2024年の間
    const randomMonth = Math.floor(Math.random() * 12); // 0から11までのランダムな月 (1月は0, 12月は11)

    // 開始日をベースにして、ランダムな年と月を設定
    const transactionDate = new Date(startDate);
    transactionDate.setFullYear(randomYear); // ランダムな年を設定
    transactionDate.setMonth(randomMonth); // ランダムな月を設定
    transactionDate.setDate(startDate.getDate() + i); // 日付を設定

    const paymentMethod = paymentMethods[i % paymentMethods.length];
    const category = categories[i % categories.length];
    const amount = Math.floor(Math.random() * 10000) + 1; // 1 から 10000 のランダムな金額

    inserts.push(`(
      ${i + 1}, '${transactionDate.toISOString()}', 'Location ${i + 1}', '${paymentMethod}', '${category}', ${amount}
    )`);
  }

  const insertQuery = `
    INSERT INTO amount_list (id, transaction_date, payment_location, payment_method, category, amount) VALUES
    ${inserts.join(", ")}
  `;

  await db.execAsync(insertQuery);
}
