import { SlackCommandMiddlewareArgs } from "@slack/bolt";
import { UserRepository } from "../users/user.repository";
import { ItemRepository } from "./item.repository";
import { ThemeRepository } from "../themes/theme.repository";
import { CreateItemDto } from "./dto/create-item.dto";
import { FindUserDto } from "../users/dto/find-user.dto";

export class ItemsController {
  private readonly itemRepository;
  private readonly userRepository;
  private readonly themeRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
    this.userRepository = new UserRepository();
    this.themeRepository = new ThemeRepository();
  }

  async create({
    command,
    ack,
    say,
  }: SlackCommandMiddlewareArgs): Promise<void> {
    ack();

    const findUserDto = new FindUserDto();
    findUserDto.slackId = command.user_id;

    const createItemDto = new CreateItemDto();
    createItemDto.title = command.text;

    try {
      const user = await this.userRepository.findOneOrFail(findUserDto);
      const theme = await this.themeRepository.getCurrentThemeOrFail();
      const item = await this.itemRepository.createItem(
        createItemDto,
        user,
        theme
      );
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
