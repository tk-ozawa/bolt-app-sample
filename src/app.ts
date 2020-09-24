import { app } from "./config/bolt";
import * as BotController from "./controllers/helloController";

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();

app.message("hello", BotController.hello);
app.command("/echo", BotController.echo);
