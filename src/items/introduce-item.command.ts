import { createConnection } from "typeorm";
import { dbconfig } from "../config/db";
import { app } from "../config/bolt";
import { ItemRepository } from "./item.repository";
import { ThemeRepository } from "../themes/theme.repository";

(async () => {
  await createConnection(dbconfig);
  const itemRepository = new ItemRepository();
  const themeRepository = new ThemeRepository();

  try {
    const { id: themeId } = await themeRepository.getCurrentThemeOrFail();

    const { min: introducedCount } = await itemRepository
      .createQueryBuilder("items")
      .select("MIN(items.introduced_count), min")
      .getRawOne();

    const item = await itemRepository.findOneOrFail({
      relations: ["user", "theme"],
      where: {
        introducedCount,
        themeId,
      },
    });
    if (!item.user || !item.theme) {
      throw new Error("relations not found");
    }

    const result = await app.client.chat.postMessage({
      channel: process.env.TEAM_JOIN_NOTIFY_CHANNEL || "#general",
      text: `
        <@${item.user.slackId}>さんが
        *${item.theme.title}* は
        *${item.title}* です！
      `,
    });
    item.introducedCount++;
    await item.save();

    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();
