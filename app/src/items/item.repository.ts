import { EntityRepository, Repository } from "typeorm";
import { ItemEntity } from "./item.entity";
import { UserEntity } from "../users/user.entity";
import { CreateItemDto } from "./dto/create-item.dto";
import { ThemeEntity } from "../themes/theme.entity";

@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity> {
  async createItem(
    { title }: CreateItemDto,
    user: UserEntity,
    theme: ThemeEntity
  ): Promise<ItemEntity> {
    const item = new ItemEntity();
    item.title = title;
    item.userId = user.id;
    item.themeId = theme.id;

    await item.save();
    return item;
  }
}
