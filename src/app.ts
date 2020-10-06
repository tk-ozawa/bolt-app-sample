import { app } from "./config/bolt";
import { dbconfig } from "./config/db";
import { createConnection } from "typeorm";
import { SampleController } from "./sample/sample.controller";
import { ItemsController } from "./items/items.controller";
import { UsersController } from "./users/users.controller";
import { ThemesController } from "./themes/themes.controller";

const sampleController = new SampleController();
const themesController = new ThemesController();
const itemsController = new ItemsController();
const usersController = new UsersController();

(async () => {
  await createConnection(dbconfig);
})();

app.message("hello", sampleController.hello);
app.command("/echo", sampleController.echo);

app.command("/theme", themesController.create);

app.command("/item", itemsController.create);
app.action("open_item_entry_form", itemsController.openEntryModal);
app.view("create_item", itemsController.createItem);

app.event("team_join", usersController.joinTeam);
app.message("channel_leave", usersController.leaveTeam);

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
