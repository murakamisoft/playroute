# 🎮 PlayRoute

**週末の遊びプランを自動生成するWebアプリ**  
バックエンドに Spring Boot（Java 21）＋ PostgreSQL、  
フロントエンドに Next.js（TypeScript + Tailwind CSS）を使用しています。

---

## 🧩 プロジェクト構成

```

playroute/
├── backend/                  # Spring Boot アプリ
│   ├── src/main/java/...     # ソースコード
│   ├── src/test/java/...     # テストコード
│   ├── build.gradle           # Gradle設定
│   ├── application.yaml       # DB接続設定
│   └── document/
│       └── openApi.yaml       # API仕様書（OpenAPI 3.0）
│
├── frontend/                 # Next.js アプリ
│   ├── app/                  # App Router 構成
│   ├── components/            # UIコンポーネント
│   ├── public/                # 静的ファイル
│   ├── package.json
│   └── tailwind.config.ts
│
└── db/                       # データベーススクリプト
├── create.sql             # テーブル作成
└── mst_insert.sql         # 初期データ登録

````

---

## ⚙️ 環境構築手順

### 1️⃣ PostgreSQL セットアップ

```bash
# psql ログイン
psql -U postgres

# DBとユーザー作成
CREATE DATABASE playroute_db;
CREATE USER playroute_user WITH PASSWORD 'playroute_pass';
GRANT ALL PRIVILEGES ON DATABASE playroute_db TO playroute_user;
\q

# テーブル・データ作成
psql -U playroute_user -d playroute_db -f ./db/create.sql
psql -U playroute_user -d playroute_db -f ./db/mst_insert.sql
````

---

### 2️⃣ バックエンド起動（Spring Boot）

```bash
cd backend
./gradlew bootRun
```

* 起動ポート: **8080**
* 動作確認:
  [http://localhost:8080/api/users](http://localhost:8080/api/users)
  → 初期データ（例：のり、ゆかり）が返ればOK。

---

### 3️⃣ フロントエンド起動（Next.js）

```bash
cd frontend
npm install
npm run dev
```

* 起動ポート: **3000**
* URL: [http://localhost:3000](http://localhost:3000)

.env.local に以下を設定：

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

### 4️⃣ OpenAPI の確認方法

OpenAPI 仕様書（`backend/document/openApi.yaml`）を
[Swagger Editor](https://editor.swagger.io/) にドラッグ＆ドロップ。

または、Spring Boot に Swagger UI を追加して表示することも可能です。

---

## 🧠 使用技術

| カテゴリ       | 技術                                             |
| -------------- | ------------------------------------------------ |
| バックエンド   | Java 21 / Spring Boot / Gradle / JPA             |
| データベース   | PostgreSQL                                       |
| フロントエンド | Next.js (App Router) / TypeScript / Tailwind CSS |
| API設計        | OpenAPI 3.0 (YAML形式)                           |
| 環境           | Windows 11 / VSCode / MINGW64                    |

---

## 📦 主な機能（予定含む）

* ユーザー登録・管理
* 行きたいスポット登録（例：水族館・温泉・カフェ）
* 条件から遊びプランを自動生成
* プランの共有（URLまたはQRコード）
* おしゃれで直感的なUI（Tailwind + モダンデザイン）

---

## 🚀 今後の展望

* [ ] OpenAPI から TypeScript 型を自動生成
* [ ] 「プラン生成」画面のUI実装
* [ ] Spring Boot に Swagger UI を組み込み
* [ ] Docker Compose による一括起動
* [ ] AIによるおすすめプラン生成

