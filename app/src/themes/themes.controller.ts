import { ThemeRepository } from "./theme.repository";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { SlackCommandMiddlewareArgs } from "@slack/bolt";
import { validate } from "class-validator";

export class ThemesController {
  private readonly themeRepository: ThemeRepository;

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

    const errors = await validate(createThemeDto);
    if (errors.length > 0) {
      await say(`validation failed. errors: ${errors}`);
      return;
    }

    try {
      await this.themeRepository.createTheme(createThemeDto);
    } catch (err) {
      console.error(err);
    }

    say(`テーマ: ${command.text}を登録しました！`);
  }
}
