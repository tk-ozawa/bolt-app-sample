import { app } from "./config/bolt";
import { dbconfig } from "./config/db";
import { createConnection } from "typeorm";
import { SampleController } from "./sample/sample.controller";
import { ItemsController } from "./items/items.controller";
import { UsersController } from "./users/users.controller";

(async () => {
  await createConnection(dbconfig);
})();

app.message("hello", SampleController.hello);
app.command("/echo", SampleController.echo);

app.command("/item", ItemsController.createItem);

app.event("team_join", UsersController.joinTeam);
app.message("channel_leave", UsersController.leaveTeam);

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
