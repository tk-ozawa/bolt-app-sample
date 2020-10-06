import { app } from "../config/bolt";
import { createConnection } from "typeorm";
import { dbconfig } from "../config/db";
import { ThemeRepository } from "./theme.repository";
import { UserRepository } from "../users/user.repository";
import { AnnounceThemeMessage } from "./views/AnnounceThemeMessage";

(async () => {
  await createConnection(dbconfig);
  const themeRepository = new ThemeRepository();
  const userRepository = new UserRepository();

  try {
    const [oldTheme, { min: openCount }] = await Promise.all([
      themeRepository.findOne({ isOpen: true }),
      themeRepository
        .createQueryBuilder("themes")
        .select("MIN(themes.open_count), min")
        .getRawOne(),
    ]);
    if (oldTheme) {
      oldTheme.isOpen = !oldTheme.isOpen;
      await oldTheme.save();
    }

    const newTheme = await themeRepository.findOneOrFail({
      openCount,
      isOpen: false,
    });
    newTheme.isOpen = true;
    newTheme.openCount++;
    await newTheme.save();

    console.log(`テーマが切り替えられました。今回のテーマ: ${newTheme.title}`);

    // 各ユーザーへDMでテーマ発表メッセージを送信
    const users = await userRepository.find();
    await Promise.all(
      users.map(async (user) => {
        return await app.client.chat.postMessage({
          channel: user.slackId,
          text: "hogehoge",
          blocks: AnnounceThemeMessage(newTheme),
        });
      })
    );
  } catch (err) {
    console.error(err);
  }
})();
