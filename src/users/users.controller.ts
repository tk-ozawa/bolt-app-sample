import { SlackEventMiddlewareArgs } from "@slack/bolt";
import { UserRepository } from "./user.repository";
import { app } from "../config/bolt";
import { CreateUserDto } from "./dto/create-user.dto";

export class UsersController {
  static async joinTeam({
    event,
  }: SlackEventMiddlewareArgs<"team_join">): Promise<void> {
    const userRepository = new UserRepository();
    const createUserDto = new CreateUserDto();
    createUserDto.slackId = `${event.user}`;

    try {
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
