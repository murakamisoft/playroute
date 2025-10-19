# 🎮 PlayRoute — 週末の遊びプラン自動生成アプリ

> “行きたい場所 × 気分 × 時間帯” から、あなたにぴったりの週末プランをAIが提案✨  

---

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blueviolet)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 🌈 概要

**PlayRoute（プレイルート）** は、  
「どこ行こう？」を自動で解決する週末プラン生成Webアプリです。

- 条件を入力するだけで遊びプランをAIが提案  
- カフェ、ドライブ、水族館などを組み合わせてプラン化  
- シンプルなUIを目指しています

---

## 🧩 プロジェクト構成

```

playroute/
├── backend/                  # Spring Boot (Java 21)
│   ├── src/main/java/...     # ソースコード
│   ├── document/openApi.yaml # API仕様書（OpenAPI 3.0）
│   └── build.gradle
│
├── frontend/                 # Next.js (App Router)
│   ├── app/                  # ページ構成
│   ├── components/           # UIコンポーネント
│   └── tailwind.config.ts
│
└── db/                       # PostgreSQL スクリプト
├── create.sql            # テーブル作成
└── mst_insert.sql        # 初期データ登録

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

* 起動ポート: `8080`
* 動作確認: [http://localhost:8080/api/users](http://localhost:8080/api/users)

---

### 3️⃣ フロントエンド起動（Next.js）

```bash
cd frontend
npm install
npm run dev
```

* 起動ポート: `3000`
* URL: [http://localhost:3000](http://localhost:3000)

`.env.local` に以下を設定：

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## 🖥️ 主要画面（MVP）

| 画面ID  | パス           | 概要                       | 状況     |
| ------- | -------------- | -------------------------- | -------- |
| PLAN-01 | `/plan/create` | 条件入力フォーム           | ✅ 完成   |
| PLAN-02 | `/plan/result` | プラン結果表示（自動生成） | 🧩 開発中 |
| SPOT-01 | `/spots`       | スポット一覧表示           | 🕓 予定   |

---

## 🧠 使用技術

| カテゴリ       | 技術                                             |
| -------------- | ------------------------------------------------ |
| バックエンド   | Java 21 / Spring Boot / JPA / Gradle             |
| フロントエンド | Next.js (App Router) / TypeScript / Tailwind CSS |
| データベース   | PostgreSQL                                       |
| API設計        | OpenAPI 3.0 (YAML形式)                           |
| 環境           | Windows 11 / VSCode / MINGW64                    |

---

## 🚀 今後の展望

* [ ] OpenAPI から TypeScript 型を自動生成
* [ ] 「プラン生成」UIの改善（AI提案UI）
* [ ] Swagger UI 組み込み
* [ ] Docker Compose 対応（ワンコマンド起動）
* [ ] おすすめプランのAI自動生成機能

✨ **Play smart. Play stylish. PlayRoute.**

