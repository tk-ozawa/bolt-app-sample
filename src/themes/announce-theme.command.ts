import { createConnection } from "typeorm";
import { dbconfig } from "../config/db";
import { ThemeRepository } from "./theme.repository";

(async () => {
  await createConnection(dbconfig);
  const themeRepository = new ThemeRepository();

  try {
    const oldTheme = await themeRepository.findOne({ isOpen: true });
    if (oldTheme) {
      oldTheme.isOpen = !oldTheme.isOpen;
      await oldTheme.save();
    }

    const { min: openCount } = await themeRepository
      .createQueryBuilder("themes")
      .select("MIN(themes.open_count), min")
      .getRawOne();

    const newTheme = await themeRepository.findOneOrFail({
      openCount,
      isOpen: false,
    });
    newTheme.isOpen = true;
    newTheme.openCount++;
    await newTheme.save();

    console.log(`テーマが切り替えられました。今回のテーマ: ${newTheme.title}`);
  } catch (err) {
    console.error(err);
  }
})();
