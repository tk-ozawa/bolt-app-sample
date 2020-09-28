import { SlackCommandMiddlewareArgs } from "@slack/bolt";
import { createConnection } from "typeorm";
import { dbconfig } from "../config/db";
import { UserRepository } from "../users/user.repository";
import { ItemRepository } from "./item.repository";
import { CreateItemDto } from "./dto/create-item.dto";
import { FindUserDto } from "../users/dto/find-user.dto";

export class ItemsController {
  static async createItem({
    command,
    ack,
    say,
  }: SlackCommandMiddlewareArgs): Promise<void> {
    ack();

    const db = await createConnection(dbconfig);
    const itemRepository = db.getCustomRepository(ItemRepository);
    const userRepository = db.getCustomRepository(UserRepository);

    try {
      const findUserDto = new FindUserDto();
      findUserDto.slackId = command.user_id;

      const user = await userRepository.findOne(findUserDto);
      if (!user) {
        throw new Error("ユーザー情報取得に失敗");
      }

      const createItemDto = new CreateItemDto();
      createItemDto.title = command.text;

      await itemRepository.createItem(createItemDto, user);
    } catch (err) {
      console.error(err);
    }

    say(`アイテム: ${command.text}を登録しました！`);
  }
}
