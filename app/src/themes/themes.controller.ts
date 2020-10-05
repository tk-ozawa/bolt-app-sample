import { SlackCommandMiddlewareArgs } from "@slack/bolt";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { ThemeRepository } from "./theme.repository";

export class ThemesController {
  async create({
    command,
    ack,
    say,
  }: SlackCommandMiddlewareArgs): Promise<void> {
    ack();

    const themeRepository = getCustomRepository(ThemeRepository);

    const createThemeDto = new CreateThemeDto();
    createThemeDto.title = command.text;

    const errors = await validate(createThemeDto);
    if (errors.length > 0) {
      await say(`validation failed. errors: ${errors}`);
      return;
    }

    try {
      await themeRepository.createTheme(createThemeDto);
    } catch (err) {
      console.error(err);
      say("登録に失敗しました…");
      return;
    }

    say(`テーマ: ${command.text}を登録しました！`);
  }
}
