# Bolt-App-Sample

Slack の Bolt Framework の使い方把握用

Glitch とかに載せたいお気持ち(わかんね)

いるもの:

- Docker Desktop
- ngrok
- 作成済の Slack Bot

VSCode でデバッグする方法:

1. `host $ docker-compose exec app ash`
1. `app # npm run watch`
1. `host $ ngrok http -host-header="0.0.0.0:3000" 3000`  
   で出てくる「https://~~~~.ngrok.io」に /slack/events をつけた URL を Event Subscriptions の RequestURL に貼り付け
