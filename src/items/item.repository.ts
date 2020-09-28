import { EntityRepository, Repository } from "typeorm";
import { ItemEntity } from "./item.entity";
import { UserEntity } from "../users/user.entity";
import { CreateItemDto } from "./dto/create-item.dto";

@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity> {
  async createItem(
    { title }: CreateItemDto,
    user: UserEntity
  ): Promise<ItemEntity> {
    const item = new ItemEntity();
    item.title = title;
    item.userId = user.id;

    await item.save();
    return item;
  }
}
