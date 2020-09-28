import { createConnection } from "typeorm";
import { dbconfig } from "../config/db";
import { ItemRepository } from "./item.repository";
import { app } from "../config/bolt";

(async () => {
  await createConnection(dbconfig);
  const itemRepository = new ItemRepository();

  try {
    const raw = await itemRepository
      .createQueryBuilder("items")
      .select("MIN(items.introduced_count), min")
      .getRawOne();

    const item = await itemRepository.findOneOrFail({
      relations: ["user", "theme"],
      where: {
        introducedCount: raw.min,
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

    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();
