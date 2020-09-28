import { SlackEventMiddlewareArgs } from "@slack/bolt";
import { createConnection } from "typeorm";
import { dbconfig } from "../config/db";
import { UserRepository } from "./user.repository";
import { app } from "../config/bolt";
import { CreateUserDto } from "./dto/create-user.dto";

export class UsersController {
  static async joinTeam({
    event,
  }: SlackEventMiddlewareArgs<"team_join">): Promise<void> {
    const db = await createConnection(dbconfig);
    const userRepository = db.getCustomRepository(UserRepository);

    try {
      const createUserDto = new CreateUserDto();
      createUserDto.slackId = `${event.user}`;
      const user = await userRepository.createUser(createUserDto);

      const result = await app.client.chat.postMessage({
        channel: process.env.TEAM_JOIN_NOTIFY_CHANNEL || "#general",
        text: `Welcome to the team, <@${user.slackId}>! 🎉 You can introduce yourself in this  .`,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
