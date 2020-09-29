import { ThemeRepository } from "./theme.repository";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { SlackCommandMiddlewareArgs } from "@slack/bolt";

export class ThemesController {
  private readonly themeRepository;

  constructor() {
    this.themeRepository = new ThemeRepository();
  }

  async create({
    command,
    ack,
    say,
  }: SlackCommandMiddlewareArgs): Promise<void> {
    ack();
    const createThemeDto = new CreateThemeDto();
    createThemeDto.title = command.text;

    try {
      await this.themeRepository.createTheme(createThemeDto);
    } catch (err) {
      console.error(err);
    }

    say(`テーマ: ${command.text}を登録しました！`);
  }
}
