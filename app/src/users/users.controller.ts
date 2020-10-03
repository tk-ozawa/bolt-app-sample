import { SlackEventMiddlewareArgs } from "@slack/bolt";
import { app } from "../config/bolt";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { validateOrReject } from "class-validator";

export class UsersController {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async joinTeam({
    event,
  }: SlackEventMiddlewareArgs<"team_join">): Promise<void> {
    const createUserDto = new CreateUserDto();
    createUserDto.slackId = `${event.user}`;

    try {
      await validateOrReject(createUserDto);

      const user = await this.userRepository.createUser(createUserDto);

      const result = await app.client.chat.postMessage({
        channel: process.env.TEAM_JOIN_NOTIFY_CHANNEL || "#general",
        text: `Welcome to the team, <@${user.slackId}>! 🎉 You can introduce yourself in this  .`,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async leaveTeam({
    message,
  }: SlackEventMiddlewareArgs<"message">): Promise<void> {
    const deleteUserDto = new DeleteUserDto();
    deleteUserDto.slackId = `${message.user}`;

    try {
      await validateOrReject(deleteUserDto);

      const { id } = await this.userRepository.findOneOrFail({
        ...deleteUserDto,
      });
      await this.userRepository.delete({ id });
    } catch (err) {
      console.log(err);
    }
  }
}
