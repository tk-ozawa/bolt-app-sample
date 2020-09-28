import { app } from "./config/bolt";
import * as HelloController from "./helloController";
import { UsersController } from "./users/users.controller";

(async () => {
  await app.start(process.env.PORT || 3000);

  app.message("hello", HelloController.hello);
  app.command("/echo", HelloController.echo);

  app.event("team_join", UsersController.joinTeam);

  console.log("⚡️ Bolt app is running!");
})();
