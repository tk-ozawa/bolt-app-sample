import { SlackCommandMiddlewareArgs } from "@slack/bolt";
import { createConnection } from "typeorm";
import { dbconfig } from "../config/db";
import { UserRepository } from "../users/user.repository";
import { ItemRepository } from "./item.repository";
import { CreateItemDto } from "./dto/create-item.dto";
import { FindUserDto } from "../users/dto/find-user.dto";
import { ThemeRepository } from "../themes/theme.repository";

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
    const themeRepository = db.getCustomRepository(ThemeRepository);

    try {
      const findUserDto = new FindUserDto();
      findUserDto.slackId = command.user_id;
      const user = await userRepository.findOneOrFail(findUserDto);

      // 設定中のテーマを取得
      const theme = await themeRepository.findOneOrFail({ isOpen: true });

      const createItemDto = new CreateItemDto();
      createItemDto.title = command.text;
      const item = await itemRepository.createItem(createItemDto, user, theme);
      if (!item.theme) {
        throw new Error("テーマが存在しませんでした");
      }

      say(
        `テーマ: ${item.theme.title}への アイテム: ${item.title}を登録しました！`
      );
    } catch (err) {
      console.error(err);
    }
  }
}
