import { app } from "./config/bolt";
import * as HelloController from "./helloController";
import { UsersController } from "./users/users.controller";
import { ItemsController } from "./items/items.controller";
import { createConnection } from "typeorm";
import { dbconfig } from "./config/db";

(async () => {
  await createConnection(dbconfig);
})();

app.message("hello", HelloController.hello);
app.command("/echo", HelloController.echo);

app.command("/echo", ItemsController.createItem);

app.event("team_join", UsersController.joinTeam);
app.message("channel_leave", UsersController.leaveTeam);

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
