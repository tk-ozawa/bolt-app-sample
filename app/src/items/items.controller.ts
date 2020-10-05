import {
  SlackCommandMiddlewareArgs,
  SlackActionMiddlewareArgs,
  BlockAction,
} from "@slack/bolt";
import { app } from "../config/bolt";
import { UserRepository } from "../users/user.repository";
import { ItemRepository } from "./item.repository";
import { ThemeRepository } from "../themes/theme.repository";
import { CreateItemDto } from "./dto/create-item.dto";
import { FindUserDto } from "../users/dto/find-user.dto";
import { EntryItemFormModal } from "./views/EntryItemFormModal";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";

export class ItemsController {
  async create({
    ack,
    say,
    command,
  }: SlackCommandMiddlewareArgs): Promise<void> {
    await ack();

    const itemRepository = getCustomRepository(ItemRepository);
    const userRepository = getCustomRepository(UserRepository);
    const themeRepository = getCustomRepository(ThemeRepository);

    const findUserDto = new FindUserDto();
    findUserDto.slackId = command.user_id;

    const createItemDto = new CreateItemDto();
    createItemDto.title = command.text;

    let isError = false;
    [findUserDto, createItemDto].forEach(async (dto) => {
      const errors = await validate(dto);
      if (errors.length > 0) {
        await say(`validation failed. errors: ${errors}`);
        isError = true;
      }
    });
    if (isError) {
      return;
    }

    try {
      const [user, theme] = await Promise.all([
        userRepository.findOneOrFail(findUserDto),
        themeRepository.getCurrentThemeOrFail(),
      ]);
      const item = await itemRepository.createItem(createItemDto, user, theme);
      if (!item.theme) {
        throw new Error("テーマが存在しませんでした");
      }

      await say(
        `テーマ: ${item.theme.title}への アイテム: ${item.title}を登録しました！`
      );
    } catch (err) {
      console.error(err);
    }
  }

  async openEntryModal({
    ack,
    body,
  }: SlackActionMiddlewareArgs<BlockAction>): Promise<void> {
    await ack();

    const themeRepository = getCustomRepository(ThemeRepository);

    try {
      const theme = await themeRepository.getCurrentThemeOrFail();

      await app.client.views.open({
        trigger_id: body.trigger_id,
        view: EntryItemFormModal(theme),
      });
    } catch (e) {
      console.log(e);
    }
  }
}
