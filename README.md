# Socket.IO + Next.js + Supabase + OAuth

## ▼ テーマ

1. Socket.IO のクライアントを Next.js 構築
1. チャット履歴をSupabaseで管理
1. ログイン認証をGoogle認証に
1. 簡単なRLS

---

## ▼ デプロイ

https://hitorigods-socket-io-next.onrender.com/

---

## ▼ 雑感

- リアルタイム通信はSocket.IOでなくてもSupabaseのリアルタイム機能で十分だったのでは…？
- データの取得をフロントエンドで絞り混んでいるがバックエンド側で取得できるようにすべき（Supabaseのカスタムフック？）
- フォルダ構成の手探り感が…。
  - 細かく分けているがutil/hooks/libs/stores/shemasをもっとまとめたりコンポーネントに並列でまとめるとかのほうが運用しやすい？

---

## ▼ TODO

1. 画面実装
   1. ⭕create-next-app
   2. ⭕Socket部分のサーバーサイド
   3. ⭕Socket部分のクライアントサイド
   4. ⭕デプロイ
   5. ⭕フォルダ構成を整理
   6. ⭕JotaiにDevtoolsを導入
   7. ⭕ルームに直アクセスでTOPにリダイレクト
   8. ⭕TOPに戻ったときにソケットを切断する
   9. チャットの編集・削除機能
   10. 投稿が自分か他人か判定してレイアウト変える
   11. チャット内容にバリデーション（Zod）
   12. ログインフォームにバリデーション（Zod）
   13. Socket機能を一つにまとめて分離
   14. 見た目を整える
       1. ⭕ヘッダー・フッター設置
       2. ⭕TOPへ戻るボタン
       3. チャット部分をスクロールバーにして更新の度に最新に移動
2. データベース
   1. ⭕ORM（prisma）導入
   2. ⭕Supabase用意
   3. ⭕チャット履歴/ユーザー/ユーザープロフィールのテーブル用意
   4. ⭕seedデータ登録
   5. ⭕フェッチ（TanStack Query）実装
   6. ⭕データベースからチャット復元
   7. ⭕データベース更新
   8. ログインユーザーを登録
   9. RLS設定
   10. 所有ユーザーのみチャット削除・更新
   11. ルームID用のデータベースを作る
   12. プロフィールID用のデータベースを作る
3. 認証機能
   1. メールアドレス認証
   2. OAuth実装
      1. Google
      2. Github
   3. ログインエラー通知
   4. 投稿者名をニックネーム編集可能に
4. 拡張機能
   1. ルームIDで複数チャットできるように
   2. アバター画像をSupabseのStorageで運用
   3. 他ユーザーのログイン通知、入退室が目に見えるように
   4. ルーム作成・削除機能
   5. サーバー監視サービスでRendar/Supabaseを落ちなくする
5. 💀**BugFix**💀
   1. ⭕ビルドデータでリアルタイム更新できない（ウィンドウの再フォーカスでは更新される）
      1. ⇒ `useQuery`の`refetchInterval`を指定 ※run dev状態では問題なかったのになぜ？
      2. ⇒ `refetchInterval`の通信コストも本来は望ましくない？

---

## ▼ 備忘録

### ■ Prisma Migrateをdotenvを使い.env.localで実行

```
PNPM
$ ./node_modules/.bin/dotenv -e .env.local -- pnpm dlx prisma migrate dev --name init
```

### ■ prisma/seed.tsでts-nodeがエラーになる問題

#### ① tsx をインストール

```
$ pnpm i -D tsx
```

https://github.com/privatenumber/tsx

※PATHを通すため一度グローバルインストールをした

#### ② package.jsonに追記

```
"prisma": {
  "seed": "tsx prisma/seed.ts"
},
```

以下は解決できず

```
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```

https://github.com/prisma/prisma/issues/7053

### ■ supabase CLIで型ファイルを生成

npm scriptsを用意してコマンドを叩くが、SupabaseプロジェクトIDをgitに残したくないので、 `.env.local`の環境変数`SUPABASE_PROJECT_ID`を用意して、`tsx`で `supabase-types.ts`を実行

```
$ pnpm run supabase:types

↓実行
$ dotenv -e .env.local -- tsx supabase-types.ts

↓内部処理
$ supabase gen types typescript --project-id ${process.env.SUPABASE_PROJECT_ID} > src/libs/supabase.types.ts
```

https://hassakulab.com/posts/npm-script-with-dotenv/

※ts-nodeだとCommonJSモジュール扱いになりエラーがでたのでtsxを利用

クラウド版なら以下から作成できる

https://supabase.com/dashboard/project/zmjeowldxauntodensjj/api?page=tables-intro

### ■ PrismaでseedファイルをプッシュするとSupabaseのパーミッションがおかしくなることが多発

今のところプロジェクト作り直すしかどうしようもないので、GUIからCSVファイルをエクスポート/インポートで凌ぐ…

https://github.com/supabase/supabase/issues/4883

---

## ▼ チートシート

### ■ Tailwind CSS

https://tailwindcomponents.com/cheatsheet/

https://tailwindcomponents.com/

### ■ prisma チートシート (CLI)

https://qiita.com/ryskBonn92/items/c45e22ce5f37d82ec8de

### ■ Prismaデコレーター一覧

https://qiita.com/curry__30/items/95d3655fa23d84b959a3

## ▼ 公式

### ■ React Query

https://tanstack.com/query/v4/docs/react/installation

---

## ▼ 参考

### ■ Socket系参考

#### ○ Next.js で WebSocket アプリケーションを作成する

https://qiita.com/ochiochi/items/dbf5040fd665326e8fb5

https://qiita.com/ochiochi/items/102d14649396d351ab80

https://qiita.com/okumurakengo/items/92ad5aacd08c4e25ebeb

#### ○ React Queryと組み合わせる

https://tkdodo.eu/blog/using-web-sockets-with-react-query

#### ○ サーバー監視サービス

#### Uptime Robot

https://uptimerobot.com/

https://laboradian.com/uptime-robot/

### ■ DB系

#### ○ Supabase入門

https://zenn.dev/chot/articles/ddd2844ad3ae61

#### ○ Supabase + useQuery

https://makerkit.dev/blog/saas/supabase-react-query

https://zenn.dev/yu_undefined/scraps/ee259f6dd080a5

#### ○ uuidの是非

https://techblog.raccoon.ne.jp/archives/1627262796.html

#### ○ supabaseをローカルにダウンロード

https://katblog.manadream.net/index.php/2022/07/07/supabase-local/

### ■ OAuth系

#### ○ OAuth & OIDC 入門解説

https://www.youtube.com/watch?v=PKPj_MmLq5E
