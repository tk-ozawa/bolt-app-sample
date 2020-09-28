import { createConnection } from "typeorm";
import { dbconfig } from "../config/db";
import { ThemeRepository } from "./theme.repository";
import { CreateThemeDto } from "./dto/create-theme.dto";
import { SlackCommandMiddlewareArgs } from "@slack/bolt";

export class ThemesController {
  static async createTheme({
    command,
    ack,
    say,
  }: SlackCommandMiddlewareArgs): Promise<void> {
    ack();
    const db = await createConnection(dbconfig);
    const themeRepository = db.getCustomRepository(ThemeRepository);

    try {
      const createThemeDto = new CreateThemeDto();
      createThemeDto.title = command.text;

      await themeRepository.createTheme(createThemeDto);
    } catch (err) {
      console.error(err);
    }

    say(`テーマ: ${command.text}を登録しました！`);
  }
}
