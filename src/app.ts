import { app } from "./config/bolt";
import { SampleController } from "./sample/sample.controller";
import { UsersController } from "./users/users.controller";
import { ItemsController } from "./items/items.controller";
import { createConnection } from "typeorm";
import { dbconfig } from "./config/db";

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
