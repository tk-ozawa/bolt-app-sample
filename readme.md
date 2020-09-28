# likelike-bolt

Slack の Bolt Framework の使い方把握用

Glitch とかに載せたいお気持ち(わかんね)

## ■ 使い方

### いるもの

- Docker Desktop
- ngrok
- 作成済の Slack Bot

### 導入

1. `host $ docker-compose up -d && cp -r .vscode.example .vscode && cp .env.example .env`
1. `host $ docker-compose exec app ash`
1. `app # npm i`

### デバッグ (VSCode)

1. `app # npm run watch`
1. `host $ ngrok http -host-header="0.0.0.0:3000" 3000`  
   で出てくる「`https://~~~~.ngrok.io`」に `/slack/events` をつけた URL を Event Subscriptions の RequestURL に貼り付け
1. デバッガを開いて「`Docker: Attach to Bolt`」を選択し、デバッグ実行

## ■ 作った経緯

内定先のチーム開発で作った SlackBot 用システムを作り直したかった

- システムが Laravel5.8 + PostgreSQL で動いていた
  - Laravel 用の SlackAPI ライブラリが大体の確率で死んでいた -> 自作めんど…
  - BotAPI として用意するには構成ファイル多すぎん？
  - php だと飛んでくるデータのプロパティ名がわからん & 型わからん
    - TypeScript で作りたい
      - TypeORM 採用 (過去に利用経験有)
      - Bolt 採用 (Slack 公式謹製である為)
        - Nest.js みたいな DI でイイ感じに組めるアーキテクチャにしたかった(わからん)
      - ts-node-dev + VSCode でのデバッグわからん
        - とりあえず node と tsc を nodemon でラッピングして疑似 ts-node-dev デバッグを実現
